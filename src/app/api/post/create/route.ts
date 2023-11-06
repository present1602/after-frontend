import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { content, userId, tags, mentionedUsers } = body;

    const userData = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!userData) {
      return NextResponse.json({ user: null, message: '계정조회 중 문제가 발생했습니다.' }, { status: 409 })
    }


    const newPost = await prisma.post.create({
      data: {
        content,
        author_id: userId,
        tags: tags ? tags : [],
        mentioned_users: mentionedUsers ? mentionedUsers : [],
      }
    })

    return NextResponse.json({ post: newPost, message: '포스팅을 등록했습니다.' }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ message: '문제가 발생하여 포스팅에 실패했습니다.' }, { status: 500 })
  }

}


// import { prisma } from "@/lib/db";
// import { NextResponse } from "next/server"

// export async function POST(request: any) {
//   const res = await request.json()
//   const { title, content } = res;
//   const result = await prisma.post.create({
//     data: {
//       content,
//     }
//   })

//   return NextResponse.json({ result })