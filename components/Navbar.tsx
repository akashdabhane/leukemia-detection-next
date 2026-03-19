"use client";

import Link from "next/link";
import { UserCircleIcon, BeakerIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "./ThemeToggle";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/80 border-b border-gray-100/50 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-md shadow-indigo-200 dark:shadow-indigo-900">
            <BeakerIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Leukemia Detector
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link>
          <Link href="/precautions" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Precautions</Link>
          <Link href="/treatment" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Treatment</Link>
          <Link href="/help" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help</Link>
          <Link href="/chat" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            AI Assistant
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-900/30 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
            <span>Gemini Insights</span>
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
          </button>
          
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:inline-block">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <UserCircleIcon className="w-8 h-8" />
              <span className="hidden md:block">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
