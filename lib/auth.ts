import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import type { BetterAuthOptions } from "better-auth"
import { prisma } from "./prisma"

const authOptions: BetterAuthOptions = {
  baseURL: process.env.BETTER_AUTH_URL,
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
}

export const auth = betterAuth(authOptions)