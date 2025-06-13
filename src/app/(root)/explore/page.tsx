import IconLinkButton from '@/components/shared/IconLinkButton'
import { UserSearch } from '@/components/user/UserSearch'
import { Feather } from 'lucide-react'

export default function page() {
  return (
    <div className='w-screen md:w-[600px] border-r pt-11 md:pt-0'>
      <UserSearch />

      <div className="md:hidden fixed bottom-20 right-6 z-50">
        <IconLinkButton href="/compose/post" Icon={Feather} />
      </div>
    </div>
  )
}
