import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconButtonProps {
  handleClick: () => void;
  Icon: LucideIcon;
  className?: string;
}

export default function IconClickButton({handleClick, Icon, className}: IconButtonProps) {
  return (
    <button className={cn(
        "h-12 w-12 p-3 rounded-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        className
      )}
      onClick={() => handleClick()}
    >
        <Icon className='w-full h-full' />
    </button>
  )
}
