"use client"

import Link from 'next/link'
import { EllipsisVertical, Hash, LogOut } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function TopBar() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  if (isDesktop) return null
  return <TopBarContent />
}

function TopBarContent() {
  return (
    <div className="md:hidden absolute top-0 left-0 right-0 border-b py-2 flex items-center justify-center gap-2">
        <Hash strokeWidth="1.5px" className="text-primary" />
        {/* <h1 className="text-2xl font-bold bg-gradient-to-b from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {process.env.APP_NAME}
        </h1> */}

        <DropdownMenu>
          <DropdownMenuTrigger className="absolute right-4 outline-0">
            <EllipsisVertical/>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="rounded-lg p-1 bg-popover">
            <DropdownMenuItem>
              <Link href={"/logout"} className="py-1 px-2 flex items-center gap-2 rounded-full hover:bg-accent transition-colors">
                <LogOut className="w-5 h-5 font-bold" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
