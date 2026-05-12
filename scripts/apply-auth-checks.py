#!/usr/bin/env python3
"""Apply requireAuth() to every protected API route handler.

Strategy:
  - Add `import { requireAuth } from "@/lib/auth";` if missing
  - For each `export async function (GET|POST|PUT|DELETE)(...)`:
      * rename first arg from `_req` to `req` (so we can pass it)
      * if no first arg, inject `req: Request`
      * inject `const blocked = requireAuth(req); if (blocked) return blocked;`
        as the first statement of the function body
  - Skip files in PUBLIC_ROUTES
  - Skip handlers in PUBLIC_HANDLERS

This is intentionally simple regex-based — the routes follow a tight,
uniform structure. Verify with `npx tsc --noEmit` after.
"""

import os
import re

ROUTE_DIR = os.path.join("app", "api")

# Fully public route files (no auth check applied to any handler)
PUBLIC_ROUTES = {
    "app/api/auth/login/route.ts",
    "app/api/auth/logout/route.ts",
    "app/api/uploads/[filename]/route.ts",
}

# Specific (file, METHOD) pairs that must stay public
PUBLIC_HANDLERS = {
    # visitor click logging from sendBeacon
    ("app/api/whatsapp-log/route.ts", "POST"),
}

# Already manually patched (skip)
ALREADY_PATCHED = {
    "app/api/posts/route.ts",
    "app/api/posts/[slug]/route.ts",
}

IMPORT_LINE = 'import { requireAuth } from "@/lib/auth";'


def walk_routes():
    for root, _, files in os.walk(ROUTE_DIR):
        for fname in files:
            if fname == "route.ts":
                yield os.path.join(root, fname)


def patch_file(path: str) -> bool:
    if path in PUBLIC_ROUTES or path in ALREADY_PATCHED:
        return False

    with open(path, "r", encoding="utf-8") as f:
        src = f.read()
    original = src

    # 1. Add import after the last existing import line at the top
    if IMPORT_LINE not in src:
        # Find the last import statement in the leading import block
        lines = src.split("\n")
        last_import = -1
        for i, line in enumerate(lines):
            if line.startswith("import "):
                last_import = i
            elif last_import >= 0 and not line.startswith("import ") and line.strip():
                break
        if last_import >= 0:
            lines.insert(last_import + 1, IMPORT_LINE)
            src = "\n".join(lines)

    # 2. For each handler, ensure req: Request and inject the auth check
    handler_re = re.compile(
        r"export async function (GET|POST|PUT|DELETE)\s*\(([^)]*)\)([^{]*)\{",
        re.MULTILINE,
    )

    def patch_handler(m):
        method = m.group(1)
        args = m.group(2).strip()
        rest = m.group(3)
        if (path, method) in PUBLIC_HANDLERS:
            return m.group(0)

        # Normalise the first arg name and ensure it's typed
        if not args:
            new_args = "req: Request"
        else:
            # Split top-level commas (handles `req: Request, { params }: ...`)
            depth = 0
            parts = []
            cur = ""
            for ch in args:
                if ch in "({[":
                    depth += 1
                elif ch in ")}]":
                    depth -= 1
                if ch == "," and depth == 0:
                    parts.append(cur)
                    cur = ""
                else:
                    cur += ch
            parts.append(cur)
            first = parts[0].strip()
            # Rename `_req: Request` -> `req: Request`
            first = re.sub(r"^_req(\s*:)", r"req\1", first)
            # If first arg is just `_req` (no type), make it `req: Request`
            if first in {"_req", "_req: Request"}:
                first = "req: Request"
            # If there is no first arg at all (unlikely with parts list), inject
            if not first:
                first = "req: Request"
            parts[0] = " " + first if args.startswith(" ") else first
            new_args = ",".join(parts).strip()

        return f"export async function {method}({new_args}){rest}{{"

    src = handler_re.sub(patch_handler, src)

    # 3. Inject the auth check after each handler's opening brace, if not present
    inject_re = re.compile(
        r"(export async function (GET|POST|PUT|DELETE)\s*\([^)]*\)[^{]*\{)\n(?!\s*const blocked = requireAuth)",
        re.MULTILINE,
    )

    def inject_check(m):
        method = m.group(2)
        if (path, method) in PUBLIC_HANDLERS:
            return m.group(0)
        return (
            m.group(1)
            + "\n  const blocked = requireAuth(req);\n  if (blocked) return blocked;\n"
        )

    src = inject_re.sub(inject_check, src)

    if src != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        return True
    return False


def main():
    patched = []
    skipped = []
    for path in walk_routes():
        if patch_file(path):
            patched.append(path)
        else:
            skipped.append(path)
    print("PATCHED:")
    for p in patched:
        print(f"  {p}")
    print("SKIPPED:")
    for p in skipped:
        print(f"  {p}")


if __name__ == "__main__":
    main()
