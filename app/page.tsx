"use client"

import Image from "next/image"
import { useSession, signOut } from "@/lib/auth-client"
import Link from "next/link"

export default function Home() {
  const { data: session, isPending } = useSession()

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload()
        },
      },
    })
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Authentication Header */}
      <div className="absolute top-4 right-4">
        {session?.user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {session.user.name || session.user.email}!
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/auth/sign-in"
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medicaid Transition
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Helping you qualify for Medicaid benefits
          </p>
        </div>

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {session?.user ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              You're signed in!
            </h2>
            <p className="text-green-700">
              Email: {session.user.email}
            </p>
            {session.user.name && (
              <p className="text-green-700">
                Name: {session.user.name}
              </p>
            )}
            <p className="text-sm text-green-600 mt-2">
              You can now access all Medicaid transition features.
            </p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Get Started
            </h2>
            <p className="text-blue-700 mb-4">
              Sign in or create an account to access personalized Medicaid guidance.
            </p>
            <Link
              href="/auth/sign-in"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In / Sign Up
            </Link>
          </div>
        )}

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            {session?.user ? "Explore Medicaid benefits" : "Create an account to get started"}
          </li>
          <li className="tracking-[-.01em]">
            {session?.user ? "Track your application progress" : "Sign in to access personalized features"}
          </li>
        </ol>
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
