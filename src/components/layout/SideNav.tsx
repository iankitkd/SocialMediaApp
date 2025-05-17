"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { MoreHorizontal, Feather, LogOut, Hash } from "lucide-react"

import { sideNavItems } from "@/data/navItems"
import IconLinkButton from "../shared/IconLinkButton"
import TextLinkButton from "../shared/TextLinkButton"

import { useUserStore } from "@/lib/store/userStore"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { cn } from "@/lib/utils"
import { getInitials } from "@/utils/getInitials"

export default function SideNav() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  if (!isDesktop) return null

  return <SideNavContent />
}

function SideNavContent() {
  const pathname = usePathname();
  const { username, name, avatar } = useUserStore();

  const navItems = useMemo(() => {
    return sideNavItems.map(item => {
      if (item.name === "Profile") {
        return { ...item, href: `/${username}` }
      }
      return item;
    })
  }, [username])

  return (
      <div className="flex flex-col justify-between items-center lg:items-stretch h-full">
        <div>
          {/* Logo */}
          <div className="flex gap-2 items-center pl-2 mb-8">
            <Hash strokeWidth={1.5} size={32} className="text-primary" />
            <h1 className="hidden lg:block text-2xl font-bold bg-gradient-to-b from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (<Link
                key={item.name}
                href={item.href}
                className={cn("flex items-center gap-4 p-3 rounded-full hover:bg-accent transition-colors",
                  isActive && "text-primary font-semibold bg-accent/30")}
              >
                <item.icon className="w-6 h-6" />
                <span className="hidden lg:block text-lg">{item.name}</span>
              </Link>
            )})}
          </nav>

          {/* Post Button */}
          <div className="mt-6 hidden lg:block">
            <TextLinkButton href="/compose/post" label="Post" />
          </div>
          <div className="mt-6 lg:hidden">
            <IconLinkButton href="/compose/post" Icon={Feather} />
          </div>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-0">
            <div className="mb-2 p-1 lg:px-2 rounded-full hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={avatar || undefined} />
                  <AvatarFallback>{getInitials(name || "")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 hidden lg:flex flex-col items-start">
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">@{username}</p>
                </div>
                <MoreHorizontal className="w-5 h-5 hidden lg:block" />
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="rounded-full p-0">
            <DropdownMenuItem>
              <Link href={"/logout"} className="lg:w-48 py-2 text-xl font-medium flex items-center gap-4 rounded-full hover:bg-accent transition-colors">
                <LogOut className="w-6 h-6 font-bold" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  )
}