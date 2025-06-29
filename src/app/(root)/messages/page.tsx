export const dynamic = 'force-dynamic';

import Link from 'next/link';

import ChatWindow from '@/components/message/ChatWindow';
import { getConversations } from '@/actions/message';
import { getCurrentUser } from '@/actions/user';

export default async function page() {
  const user = await getCurrentUser();
  if(!user) {
    return (
      <div className='flex flex-col gap-2 p-2 items-center justify-center w-full h-full pt-10 md:pt-0'>
        <h2 className='text-xl font-medium'>Login to continue</h2>
        <Link href={"/login"} className='bg-primary text-primary-foreground px-8 py-2 rounded-full text-xl'>Login</Link>
      </div>
    )
  } 

  let conversations = [];
  try {
    conversations = await getConversations();
  } catch (error) {
    
  }

  return (
    <div className="w-screen md:w-full pt-11 md:pt-0">
      <ChatWindow conversations={conversations} />
    </div>
  )
}
