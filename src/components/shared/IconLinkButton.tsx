import Link from 'next/link'

import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconButtonProps {
  href: string
  Icon: LucideIcon
  className?: string
}

export default function IconLinkButton({href, Icon, className}: IconButtonProps) {
  return (
    <Link href={href}>
        <div className={cn(
          "h-12 w-12 p-3 rounded-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
          className
        )}>
            <Icon className='w-full h-full' />
        </div>
    </Link>
  )
}
