import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
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
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email }
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
          id: user.id
        }
      }
      return token
    },
    async session({ session, user, token }) {
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
