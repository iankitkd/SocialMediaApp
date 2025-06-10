import ChatList from '@/components/message/ChatList'
import ChatWindow from '@/components/message/ChatWindow'

export default function page() {
  return (
    <div className="w-screen md:w-full h-full flex pt-10 md:pt-0">
      <ChatList />
      <ChatWindow />
    </div>
  )
}
