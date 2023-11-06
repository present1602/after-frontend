import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, nickname, password, gender, birth_date } = body;

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email }
    })

    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: '이미 가입된 이메일입니다.' }, { status: 409 })
    }

    const hashedPasswrd = await hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPasswrd,
        nickname,
        gender,
        birth_date
      }
    })

    return NextResponse.json({ user: newUser, message: '회원가입에 성공했습니다.' }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ message: '회원가입 중 문제가 발생하여 회원가입에 실패했습니다.' }, { status: 500 })
  }

}