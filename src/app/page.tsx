import Link from 'next/link';
import { ArrowRight, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { features } from '@/data/features';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Social App";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Hash className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-2xl font-bold bg-gradient-to-b from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {APP_NAME}
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition">Features</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition">About</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition">Contact</a>
        </nav>
        
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
      <main className="px-6 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Connect with friends and the <span className="text-indigo-600 dark:text-indigo-400"> world </span> around you
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join millions of people sharing their stories, ideas, and moments on {APP_NAME}. It's free, fun, and full of possibilities.
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

      {/* Features Section */}
      <section id="features" className="px-6 py-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Amazing Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {APP_NAME} comes packed with everything you need to connect with friends and grow your network.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:border-indigo-100 dark:hover:border-indigo-900 hover:shadow-md transition-all duration-300'>
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-10 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to join our community?
          </h2>
          <p className="text-lg text-indigo-100 dark:text-indigo-200 mb-6">
            Sign up today and start connecting with friends, family, and like-minded people from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" 
              className="px-6 py-3 font-medium rounded-full bg-white text-indigo-600 hover:bg-gray-100 transition"
            >
              Sign Up Free
            </Link>
            <Link href="/login" 
              className="px-6 py-3 font-medium rounded-full border border-white text-white hover:bg-white/20 transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400 bg-gray-900">
        <p> &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
}