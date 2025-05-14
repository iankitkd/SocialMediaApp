import { cn } from '@/lib/utils'
import Link from 'next/link'

interface TextLinkButtonProps {
  href: string
  label: string
  className?: string
}

export default function TextLinkButton({ href, label, className }: TextLinkButtonProps) {
  return (
    <Link href={href}>
      <div className={cn(
        "p-3 rounded-full font-medium text-center bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors", 
        className
      )}>
        {label}
      </div>
    </Link>
  )
}
