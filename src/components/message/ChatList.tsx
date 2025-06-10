"use client"

import { useState } from "react";

import UserSearchModal from "./UserSearchModal";
import { MessageSquarePlus } from "lucide-react";
import IconClickButton from "../shared/IconClickButton";
import { useSelectedUserStore } from "@/lib/store/selectedUserStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ChatList() {
  const { _id } = useSelectedUserStore();
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  // hidden on mobile while viewing chat window
  if (_id && !isDesktop) return null;

  const handleOpen = () => setIsSearchModalOpen(true);
  const handleClose = () => setIsSearchModalOpen(false);

  return (
    <div className='w-full lg:w-[400px] border-r'>
      <div className="hidden md:flex justify-between px-4 py-2 border-b">
        <h1 className="font-semibold text-xl">Messages</h1>
        <MessageSquarePlus onClick={handleOpen} className="hover:cursor-pointer" />
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
