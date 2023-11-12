import { prisma } from "@/lib/db";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";


// const { searchParams } = new URL(req.url);
// const pageCount = searchParams.get("page");

// const router = useRouter()
// const { page } = router.query

// const pageNumber = Number(page) || 1;
export async function GET(req: Request) {
  const url = new URL(req.url)
  const searchParams = new URLSearchParams(url.search)
  const _start = searchParams.get("_start")

  let start = Number(_start) || 0

  const posts = await prisma.post.findMany({
    // skip: 0 + (pageNumber - 1) * 3,
    skip: start,
    take: 3,
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
          id: true,
          nickname: true,
          role: true,
          user_profile_image: {
            where: {
              is_active: true
            },
            orderBy: {
              created_at: "desc",
            },
            take: 1,
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