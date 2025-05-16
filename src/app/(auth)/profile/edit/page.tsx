import ProfileForm from '@/components/auth/ProfileForm'
import { getCurrentUser } from '@/lib/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const user = await getCurrentUser();
  if(!user) {
    redirect('/login');
  }

  return (
    <div className='w-full min-h-dvh flex items-center justify-center'>
        <ProfileForm mode='edit' initialData={user} />
    </div>
  )
}
