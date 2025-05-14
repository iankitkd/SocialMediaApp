import Link from "next/link"

import { bottomNavItems } from "@/data/navItems"

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t">
      <div className="flex justify-around items-center py-1">
        {bottomNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center p-2 rounded-lg hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
          >
            <item.icon />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}