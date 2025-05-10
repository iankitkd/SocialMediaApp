'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MessageSquareText, 
  Users, 
  Sparkles, 
  Smartphone, 
  Video,
  Globe, 
  Calendar,
  Lock,
  TrendingUp,
  HelpCircle,
  BookOpen,
  Briefcase,
  Twitter,
  Facebook,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Socialize
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition">About</a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Contact</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="/login" 
            className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
          >
            Log in
          </a>
          <a 
            href="/signup" 
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600",
              "text-white shadow-md hover:shadow-lg transition-all duration-300",
              "hover:from-indigo-700 hover:to-purple-700"
            )}
          >
            Sign up
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Connect with <span className="text-indigo-600">friends</span> and the world around you
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              Join millions of people sharing their stories, ideas, and moments on Socialize. It's free, fun, and full of possibilities.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="/signup" 
                className={cn(
                  "px-6 py-3 text-base font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600",
                  "text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center",
                  "hover:from-indigo-700 hover:to-purple-700"
                )}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="#features" 
                className="px-6 py-3 text-base font-medium text-indigo-600 hover:text-indigo-700 transition flex items-center justify-center"
              >
                Learn More
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 relative"
          >
            <div className="relative w-full aspect-[9/16] max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-white">
              {/* Mockup phone screen content */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-purple-100 p-4 flex flex-col">
                <div className="flex-1 rounded-xl bg-white p-4 shadow-sm">
                  <div className="space-y-4">
                    {/* Mock posts */}
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-3 rounded-lg bg-gray-50">
                        <div className="h-3 w-3/4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 blur-2xl opacity-30 rounded-full"></div>
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Amazing Features</h2>
            <p className="text-lg text-gray-600">
              Socialize comes packed with everything you need to connect with friends and grow your network.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 hover:bg-white transition-all duration-300 border border-gray-100 hover:border-indigo-100 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to join our community?</h2>
          <p className="text-lg text-indigo-100 mb-8">
            Sign up today and start connecting with friends, family, and like-minded people from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup" 
              className="px-6 py-3 text-base font-medium rounded-full bg-white text-indigo-600 hover:bg-gray-100 transition flex items-center justify-center"
            >
              Sign Up Free
            </a>
            <a 
              href="/login" 
              className="px-6 py-3 text-base font-medium rounded-full border-2 border-white text-white hover:bg-white hover:bg-opacity-10 transition flex items-center justify-center"
            >
              Log In
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">Socialize</span>
            </div>
            <p className="text-sm">Connecting people around the world through shared experiences.</p>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="text-sm font-semibold text-white mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-sm hover:text-white transition flex items-center gap-2">
                      {link.icon && <link.icon className="h-4 w-4" />}
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>© {new Date().getFullYear()} Socialize. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: MessageSquareText,
    title: "Real-time Chat",
    description: "Message your friends instantly with our lightning-fast chat system."
  },
  {
    icon: Users,
    title: "Community Groups",
    description: "Join or create groups based on your interests and hobbies."
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connect with people from all around the world."
  },
  {
    icon: Video,
    title: "Live Streaming",
    description: "Go live to your followers with interactive comments and real-time reactions."
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Sync",
    description: "Seamless experience across mobile, desktop, and web with instant notifications."
  },
  {
    icon: Sparkles,
    title: "AI-Powered Feed",
    description: "Personalized content recommendations based on your interests and interactions."
  },
  {
    icon: Lock,
    title: "Advanced Privacy",
    description: "Granular privacy controls for posts, stories, and profile information."
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Create and join events to meet people in real life."
  },
  {
    icon: TrendingUp,
    title: "Trending Content",
    description: "Discover viral posts and emerging trends in your network and beyond."
  },
];

const footerLinks = [
  {
    title: "Company",
    links: [
      { text: "About", href: "#", icon: BookOpen },
      { text: "Careers", href: "#", icon: Briefcase },
      { text: "Brand Center", href: "#" },
      { text: "Blog", href: "#" }
    ]
  },
  {
    title: "Help Center",
    links: [
      { text: "Twitter", href: "#", icon: Twitter },
      { text: "Facebook", href: "#", icon: Facebook },
      { text: "Contact Us", href: "#", icon: Mail },
      { text: "Support", href: "#", icon: HelpCircle }
    ]
  },
  {
    title: "Legal",
    links: [
      { text: "Privacy Policy", href: "#" },
      { text: "Licensing", href: "#" },
      { text: "Terms & Conditions", href: "#" }
    ]
  }
];