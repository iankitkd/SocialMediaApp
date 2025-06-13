import { useState } from "react";

import UserSearchModal from "./UserSearchModal";
import ChatListTile from "./ChatListTile";
import IconClickButton from "../shared/IconClickButton";
import { MessageSquarePlus } from "lucide-react";

import { useSelectedUserStore } from "@/lib/store/selectedUserStore";
import { useUserStore } from "@/lib/store/userStore";
import { useModalBackButton } from "@/hooks/useModalBackButton";
import { Conversation } from "@/lib/types/message";

export default function ChatList({conversations}: {conversations: Conversation[]}) {
  const { _id:userId } = useUserStore();
  const setSelectedUser = useSelectedUserStore().setUser;

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  const handleOpen = () => setIsSearchModalOpen(true);
  const handleClose = () => setIsSearchModalOpen(false);
  
  // Hook to handle back button behavior
  useModalBackButton(isSearchModalOpen, handleClose);


  return (
    <div className='w-full lg:w-[400px] border-r'>
      <div className="hidden md:flex justify-between px-4 py-2 border-b">
        <h1 className="font-semibold text-xl">Messages</h1>
        <MessageSquarePlus onClick={handleOpen} className="hover:cursor-pointer" />
      </div>

      <div className="p-1">
        {conversations?.length > 0 && conversations.map((conversation) => {
          const users = conversation.participants.filter(({_id})=> _id !== userId);
          const user = users.length > 0 ? users[0] : conversation.participants[0];

          return (
            <button key={conversation._id} onClick={() => {setSelectedUser(user)}} className="w-full">
              <ChatListTile user={user} lastMessage={conversation.lastMessage} />
            </button>
          )
        })}
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
