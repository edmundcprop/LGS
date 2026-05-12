import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/store";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Category = { slug: string; name?: string } & Record<string, unknown>;

export async function GET(req: Request) {
  const blocked = requireAuth(req);
  if (blocked) return blocked;
  try {
    const data = await readData<Category[]>("categories");
    return NextResponse.json(data);
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
    const body = (await req.json()) as Category;
    const categories = await readData<Category[]>("categories");

    if (!body.slug && body.name) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    categories.push(body);
    await writeData("categories", categories);

    return NextResponse.json(body, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
