import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import type { BetterAuthOptions } from "better-auth"
import { prisma } from "./prisma"

const authOptions: BetterAuthOptions = {
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  }, 
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  }, 
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
}

export const auth = betterAuth(authOptions)