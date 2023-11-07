import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/sign-up',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "이메일아이디", type: "text", placeholder: "email" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email },
          select: {
            id: true,
            email: true,
            nickname: true,
            password: true,
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
        });
        if (!existingUser) {
          return null
        }

        const passwordMath = await compare(credentials.password, existingUser.password)

        if (!passwordMath) {
          return null
        }

        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          nickname: existingUser.nickname,
          profile_img: existingUser.user_profile_image[0]
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          nickname: user.nickname,
          id: user.id,
        }
      }
      return token
    },
    async session({ session, user, token }) {
      // session.user.profile_img = user.user_profile_image[0].url;

      return {
        ...session,
        user: {
          ...session.user,
          nickname: token.nickname,
          id: token.id,
        }
      }
    }
  }

}
