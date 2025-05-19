import IconLinkButton from '@/components/shared/IconLinkButton'
import { Feather } from 'lucide-react'

export default function page() {
  return (
    <div>
      <div className="md:hidden fixed bottom-20 right-6 z-50">
        <IconLinkButton href="/compose/post" Icon={Feather} />
      </div>
    </div>
  )
}
