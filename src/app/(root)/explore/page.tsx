import IconLinkButton from '@/components/shared/IconLinkButton'
import { Feather } from 'lucide-react'

export default function page() {
  return (
    <div>
      <div className="md:hidden absolute bottom-18 right-6">
        <IconLinkButton href="/compose/post" Icon={Feather} />
      </div>
    </div>
  )
}
