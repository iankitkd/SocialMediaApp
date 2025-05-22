"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { EllipsisVertical, Hash, LogOut } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { reservedUsernames } from '@/data/reservedUsernames'

export default function TopBar() {
  const pathname = usePathname();

  const isDesktop = useMediaQuery('(min-width: 768px)')
  if (isDesktop) return null
  
  const path = pathname.split('/')[1];
  if(!reservedUsernames.includes(path)) return null;

  return <TopBarContent />
}

function TopBarContent() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlTopbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShow(false);
      } else {
        // Scrolling up
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlTopbar);
      return () => {
        window.removeEventListener('scroll', controlTopbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div className={cn('fixed top-0 left-0 w-full z-50 bg-background/90 border-b transition-transform duration-300 md:hidden flex items-center justify-center py-2',
      {
        'translate-y-0': show,
        '-translate-y-full': !show,
      }
    )}>

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
