"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useUserStore } from '@/lib/store/userStore';

export default function ProfilePostsTabs({ username }: { username: string }) {
  const {username: currentUsername} = useUserStore();
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 bg-background w-full flex gap-2 items-center justify-around border-b p-2">
      <Link 
        href={`/${username}`} 
        className={`${pathname === `/${username}` 
          ? 'font-semibold underline underline-offset-4 decoration-primary' 
          : 'text-muted-foreground'} p-2`}
      >
        Posts
      </Link>
      
      <Link 
        href={`/${username}/replies`} 
        className={`${pathname.includes('/replies') 
          ? 'font-semibold underline underline-offset-4 decoration-primary' 
          : 'text-muted-foreground'} p-2`}
      >
        Replies
      </Link>

      {
        username === currentUsername && (
          <Link 
            href={`/${username}/likes`}
            className={`${pathname.includes('/likes') 
              ? 'font-semibold underline underline-offset-4 decoration-primary' 
              : 'text-muted-foreground'} p-2`}
          >
            Likes
          </Link>
      )}
    </div>
  );
}