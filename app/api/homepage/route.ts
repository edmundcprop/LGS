import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/store";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Homepage = Record<string, unknown>;

export async function GET(req: Request) {
  const blocked = requireAuth(req);
  if (blocked) return blocked;
  try {
    const data = await readData<Homepage>("homepage");
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const blocked = requireAuth(req);
  if (blocked) return blocked;
  try {
    const body = (await req.json()) as Homepage;
    await writeData("homepage", body);
    return NextResponse.json(body);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
