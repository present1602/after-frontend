import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";


interface IFileEl {
  url: string,
  filename: string,
  ord: number
}

export async function POST(req: Request) {
  try {

    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ status: 401, message: "Un-Authorized" });
    }

    const body = await req.json()
    const { content, userId, fileList } = body;

    const userData = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!userData) {
      return NextResponse.json({ user: null, message: '계정조회 중 문제가 발생했습니다.' }, { status: 409 })
    }


    const transaction = await prisma.$transaction(async (tx) => {
      const newPost = await tx.post.create({
        data: {
          content: content,
          author_id: userId,
        }
      })

      if (!newPost.id) {
        throw new Error("Failed to create post");
      }

      console.log("newPost :", newPost)
      debugger
      for (const fileEl of fileList) {
        const newMedia = await tx.media.create({
          data: {
            url: fileEl.url,
            filename: fileEl.filename,
            related_to: { table: 'post', content_id: newPost.id } as Prisma.JsonObject
          },
        })
        if (!newMedia.id) {
          throw new Error("Failed to save media");
        }
        const md = await tx.postMediaImage.create({
          data: {
            media_id: newMedia.id,
            post_id: newPost.id,
            ord: fileEl.ord
          }
        })
      }
    });

    return NextResponse.json({ post: transaction, message: '포스팅을 등록했습니다.' }, { status: 200 });


    // return NextResponse.json({ post: {}, message: '포스팅을 등록했습니다.' }, { status: 200 });



    // const newPost = await prisma.post.create({
    //   data: {
    //     content,
    //     author_id: userId,
    //   }
    // })

    //     const transaction = prisma.$transaction();

    // try {
    //   await transaction.users.create(data.a);
    // } catch (error) {
    //   // Transaction이 실패하면 모든 쿼리가 실패한 것으로 간주됩니다.
    //   console.error(error);
    // }

    // await transaction.commit();

    // const body = await req.json()
    // const { content, userId, tags, mentionedUsers } = body;

    // const userData = await prisma.user.findUnique({
    //   where: { id: userId }
    // })

    // if (!userData) {
    //   return NextResponse.json({ user: null, message: '계정조회 중 문제가 발생했습니다.' }, { status: 409 })
    // }


    // const newPost = await prisma.post.create({
    //   data: {
    //     content,
    //     author_id: userId,
    //     tags: tags ? tags : [],
    //     mentioned_users: mentionedUsers ? mentionedUsers : [],
    //   }
    // })

    // return NextResponse.json({ post: newPost, message: '포스팅을 등록했습니다.' }, { status: 200 });
  }
  catch (err) {
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