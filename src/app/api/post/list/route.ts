import { prisma } from "@/lib/db";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  // const { searchParams } = new URL(req.url);
  // const pageCount = searchParams.get("page");

  // const router = useRouter()
  // const { page } = router.query

  // const pageNumber = Number(page) || 1;

  const page = 1

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