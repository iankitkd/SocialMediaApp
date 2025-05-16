import Link from 'next/link';
import { ArrowRight, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Social App";

export default function Home() {
  return (
    <div className="min-h-[calc(100dvh+64px)] flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <header className="px-6 py-4 flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Hash className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-2xl font-bold bg-gradient-to-b from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {APP_NAME}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/login" 
            className="px-4 py-2 font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
          >
            Log in
          </Link>
          <Link href="/signup" 
            className={cn(
              "px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600",
              "text-white shadow-md hover:shadow-lg transition-all duration-300",
              "hover:from-indigo-700 hover:to-purple-700",
              "dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600"
            )}
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 px-6 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Connect with friends and the <span className="text-indigo-600 dark:text-indigo-400"> world </span> around you
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join  endless voices sharing their stories, ideas, and moments on {APP_NAME}. It's free, fun, and full of possibilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" 
                className={cn(
                  "px-6 py-3 text-base font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600",
                  "text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center",
                  "hover:from-indigo-700 hover:to-purple-700",
                  "dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600"
                )}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/home" 
                className="px-6 py-3 text-base font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition flex items-center justify-center"
              >
                Explore
              </Link>
            </div>
          </div>

          <div className='md:w-1/4 relative"'>
            <div className="relative w-full aspect-[9/16] max-w-md mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border-8 border-white dark:border-gray-800">
              {/* Mockup phone screen content */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-900 p-4 flex flex-col">
                <div className="flex-1 rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm">
                  <div className="space-y-6">
                    {/* Mock posts */}
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 py-6 text-center text-sm text-gray-400 bg-gray-900">
        <p> &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
}