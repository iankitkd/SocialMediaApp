import { useRouter } from 'next/navigation';

import { useSelectedUserStore } from '@/lib/store/selectedUserStore';
import { useUserStore } from '@/lib/store/userStore';
import { ArrowLeft } from 'lucide-react'

export default function MessageHeader({onClose}: { onClose: ()=>void }) {
  const { username, name } = useSelectedUserStore();
  const {username: currentUsername} = useUserStore();
  const router = useRouter();

  return (
    <div className='flex items-center gap-4 border-b'>
      <button className='px-3 py-1 text-xl h-full hover:cursor-pointer hover:-translate-x-1 transform transition duration-300 ' 
        onClick={onClose}
      >
        <ArrowLeft />
      </button>

      <div className="flex flex-col w-full px-2 py-1 rounded-sm hover:bg-secondary/50" onClick={() => router.push(`/${username}`)}>
        <h3 className="text-xl leading-5 font-medium">{name}</h3>
        <p className="text-sm text-text-muted">{username === currentUsername ? `(Message Yourself)` : `@${username}`}</p>
      </div>
    </div>
  )
}
