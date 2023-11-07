import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const pageCount = searchParams.get("page");
  const page = Number(pageCount) || 1;

  const posts = await prisma.post.findMany({
    skip: 0 + (page - 1) * 20,
    take: 20,
    orderBy: { created_at: "desc" },
    include: {
      PostMediaImage: {
        orderBy: { ord: "asc" },
        include: {
          media: {
            select: {
              filename: true,
              url: true,
            },
          },
        },
      },
    }
  });

  return NextResponse.json({ data: posts }, { status: 200 });

  // return posts;
};