import Link from "next/link"

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { MoreHorizontal, Globe, Feather, LogOut } from "lucide-react"

import { sideNavItems } from "@/data/navItems"
import IconLinkButton from "../shared/IconLinkButton"
import TextLinkButton from "../shared/TextLinkButton"

export default function SideNav() {

  return (
    <aside className="hidden md:flex flex-col h-screen lg:w-64 px-4 py-4 border-r">
      <div className="flex flex-col justify-between items-center lg:items-stretch h-full">
        <div>
          {/* Logo */}
          <div className="flex gap-2 items-center pl-2 mb-8">
            <Globe strokeWidth={1.5} size={32} className="text-primary" />
            <h1 className="hidden lg:block text-2xl font-bold bg-gradient-to-b from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {process.env.APP_NAME}
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sideNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-4 p-3 rounded-full hover:bg-accent transition-colors"
              >
                <item.icon className="w-6 h-6" />
                <span className="hidden lg:block text-lg">{item.name}</span>
              </Link>
            ))}
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
          <DropdownMenuTrigger>
            <div className="mb-2 p-3 rounded-full hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1 hidden lg:block">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">@johndoe</p>
                </div>
                <MoreHorizontal className="w-5 h-5 hidden lg:block" />
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="rounded-full p-0">
            <DropdownMenuItem>
              <Link href={"/logout"} className="w-48 py-2 text-xl font-medium flex items-center gap-4 rounded-full hover:bg-accent transition-colors">
                <LogOut className="w-6 h-6 font-bold" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}