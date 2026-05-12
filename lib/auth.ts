import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

function getJwtSecret(): string {
  return process.env.JWT_SECRET || "lg-subscribe-cms-dev-secret-2024";
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function signToken(payload: {
  id: string;
  username: string;
  role: string;
}): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "24h" });
}

export function verifyToken(
  token: string
): { id: string; username: string; role: string } | null {
  try {
    return jwt.verify(token, getJwtSecret()) as {
      id: string;
      username: string;
      role: string;
    };
  } catch {
    return null;
  }
}

export function getTokenFromCookies(req: Request): string | null {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie.match(/(?:^|;\s*)cms_token=([^;]*)/);
  return match ? match[1] : null;
}

/**
 * Verify the cms_token cookie on a request. Returns a 401 NextResponse if
 * the token is missing or invalid; returns null if the caller is
 * authenticated.
 *
 * Edge middleware only checks token presence (it cannot import
 * jsonwebtoken). Route handlers must call this to actually verify the JWT
 * — otherwise any cookie value passes auth.
 *
 * Usage:
 *   export async function POST(req: Request) {
 *     const blocked = requireAuth(req);
 *     if (blocked) return blocked;
 *     // ... rest of handler
 *   }
 */
export function requireAuth(req: Request): NextResponse | null {
  const token = getTokenFromCookies(req);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
