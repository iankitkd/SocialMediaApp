import ChatList from '@/components/message/ChatList'
import ChatWindow from '@/components/message/ChatWindow'

export default function page() {
  return (
    <div className="w-full h-full flex">
      <ChatList />
      <ChatWindow />
    </div>
  )
}
