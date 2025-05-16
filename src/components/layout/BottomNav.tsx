"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { bottomNavItems } from "@/data/navItems"
import { useUserStore } from "@/lib/store/userStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  if (isDesktop) return null
  return <BottomNavContent />
}

function BottomNavContent() {
  const pathname = usePathname();
  const { username } = useUserStore();

  const navItems = useMemo(() => {
      return bottomNavItems.map(item => {
        if (item.name === "Profile") {
          return { ...item, href: `/${username}` }
        }
        return item;
      })
    }, [username])

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/80">
      <div className="flex justify-around items-center py-1">
        {navItems.map((item) => { 
          const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn("flex flex-col items-center p-2 px-4 rounded-xl hover:bg-accent dark:hover:bg-accent/50",
              isActive && "text-primary font-semibold bg-accent/30")}
          >
            <item.icon />
            <span className="text-xs">{item.name}</span>
          </Link>
        )})}
      </div>
    </nav>
  )
}