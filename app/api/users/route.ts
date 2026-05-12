import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { readData, writeData } from "@/lib/store";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

type User = {
  id: string;
  username: string;
  password: string;
  role: string;
};

export async function GET(req: Request) {
  const blocked = requireAuth(req);
  if (blocked) return blocked;
  try {
    const users = await readData<User[]>("users");
    const safe = users.map(({ password: _password, ...rest }) => rest);
    return NextResponse.json(safe);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const blocked = requireAuth(req);
  if (blocked) return blocked;
  try {
    const body = (await req.json()) as Partial<User>;
    const users = await readData<User[]>("users");

    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const exists = users.find((u) => u.username === body.username);
    if (exists) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    const newUser: User = {
      id: String(Date.now()),
      username: body.username,
      password: hashPassword(body.password),
      role: body.role || "editor",
    };

    users.push(newUser);
    await writeData("users", users);

    const { password: _password, ...safe } = newUser;
    return NextResponse.json(safe, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const blocked = requireAuth(req);
  if (blocked) return blocked;
  try {
    const { id } = (await req.json()) as { id?: string };

    if (!id) {
      return NextResponse.json(
        { error: "User id is required" },
        { status: 400 }
      );
    }

    const users = await readData<User[]>("users");
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const removed = users.splice(index, 1)[0];
    await writeData("users", users);

    const { password: _password, ...safe } = removed;
    return NextResponse.json(safe);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
