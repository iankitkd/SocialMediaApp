import { useState } from "react";

import UserSearchModal from "./UserSearchModal";
import ChatListTile from "./ChatListTile";
import IconClickButton from "../shared/IconClickButton";
import { MessageSquarePlus } from "lucide-react";

import { useSelectedUserStore } from "@/store/selectedUserStore";
import { useUserStore } from "@/store/userStore";
import { useModalBackButton } from "@/hooks/useModalBackButton";
import { Conversation } from "@/types/message";
import { useRouter } from "next/navigation";

export default function ChatList({conversations}: {conversations: Conversation[]}) {
  const { _id:userId } = useUserStore();
  const setSelectedUser = useSelectedUserStore().setUser;
  const router = useRouter();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  const handleOpen = () => setIsSearchModalOpen(true);
  const handleClose = () => setIsSearchModalOpen(false);
  
  // Hook to handle back button behavior
  useModalBackButton(isSearchModalOpen, handleClose);


  return (
    <div className='w-full lg:w-[388px] border-r'>
      <div className="hidden md:flex justify-between px-4 py-2 border-b">
        <h1 className="font-semibold text-xl">Messages</h1>
        <MessageSquarePlus onClick={handleOpen} className="hover:cursor-pointer" />
      </div>

      <div className="p-1">
        {conversations?.length > 0 ? (
          conversations.map((conversation) => {
            const conversationId = conversation.conversationId;
            const users = conversationId.participants.filter(({_id})=> _id !== userId);
            const user = users.length > 0 ? users[0] : conversation.conversationId.participants[0];

            return (
              <button key={conversation._id} onClick={() => {setSelectedUser(user); router.refresh();}} className="w-full">
                <ChatListTile user={user} lastMessage={conversationId.lastMessage} unreadCount={conversation.unreadCount} />
              </button>
            )
          })
        ): (
          <div className="text-center p-2 text-muted-foreground">No conversations to show</div>
        )
        }
      </div>
      
      <div className="md:hidden fixed bottom-20 right-6 z-50">
        <IconClickButton handleClick={handleOpen} Icon={MessageSquarePlus} />
      </div>

      {isSearchModalOpen && (
        <UserSearchModal handleClose={handleClose} />
      )}
    </div>
  )
}
