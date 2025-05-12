import ProfileForm from '@/components/auth/ProfileForm'

export default function page() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
        <ProfileForm mode='onboarding' />
    </div>
  )
}
