export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import ProfileForm from '@/components/auth/ProfileForm'
import { getCurrentUser } from '@/lib/actions/user';

export default async function page() {
  const user = await getCurrentUser();
  if(!user) {
    redirect('/login');
  }
  if(user.isOnboarded) {
    redirect('/home');
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
        <ProfileForm mode='onboarding' />
    </div>
  )
}
