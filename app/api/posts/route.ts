import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/store";

export const dynamic = "force-dynamic";

type Post = { slug: string; title?: string } & Record<string, unknown>;

export async function GET() {
  try {
    const data = await readData<Post[]>("posts");
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Post;
    const posts = await readData<Post[]>("posts");

    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    // Upsert by slug. The blob write path has a read-modify-write window
    // that occasionally permits the same client retry to land twice;
    // making POST idempotent prevents the duplicates from accumulating
    // and dedupes any historical duplicates as a side-effect.
    const deduped = posts.filter((p) => p.slug !== body.slug);
    deduped.push(body);
    await writeData("posts", deduped);

    return NextResponse.json(body, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
