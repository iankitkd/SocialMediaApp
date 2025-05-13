import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/actions/user';

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}
