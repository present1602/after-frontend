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
    select: {
      content: true,
      tags: true,
      created_at: true,
      post_media_image: {
        orderBy: { ord: "asc" },
        select: {
          ord: true,
          media: {
            select: {
              url: true
            }
          }
        }
      },
      author: {
        select: {
          nickname: true,
          role: true,
          user_profile_image: {
            select: {
              url: true
            }
          }
        }
      }
    }
  });

  return NextResponse.json({ data: posts }, { status: 200 });

};