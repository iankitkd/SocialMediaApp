"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import UserTile from "./UserTile";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Search } from "lucide-react";

import { searchUsers } from "@/actions/user";
import { debounce } from "@/utils/debounce";
import { useSelectedUserStore } from "@/store/selectedUserStore";
import { User } from "@/types/user";


interface UserSearchProps {
  mode?: "profile" | "message";
  handleBackClick?: () => void;
}

export function UserSearch({mode = "profile", handleBackClick}: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const setSelectedUser = useSelectedUserStore().setUser;

  const fetchUsers = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.trim() === "") {
        setIsLoading(false);
        return;
      }
      const response = await searchUsers(searchTerm);
      setUsers(response);
      setIsLoading(false);
    }, 500),
    []
  );
  
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery)
    setUsers([]);
    setIsLoading(true);

    fetchUsers(searchQuery);
    // setIsLoading(false);
  };

  return (
    <div className="w-full space-y-4 py-2 px-4">
      <div className="flex items-center">
        { handleBackClick && (
            <button className='px-3 py-1 text-xl h-full hover:cursor-pointer' 
              onClick={() => handleBackClick()}
            >
              <ArrowLeft />
            </button>
        )}

        <div className="relative mx-2 w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users by name or username ..."
            className="w-full pl-9"
            value={searchTerm}
            autoFocus={mode === "message"}
            onChange={handleSearchQueryChange}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-15 w-full rounded-md" />
          ))}
        </div>
      ) : (users.length > 0 && handleBackClick) ? (
        <div>
          {users.map((user) => (
            <button key={user._id} onClick={() => {setSelectedUser(user); handleBackClick();}} className="w-full">
              <UserTile user={user} />
            </button>
          ))}
        </div>
      ) : users.length > 0 ? (
        <div>
          {users.map((user) => (
            <button key={user._id} onClick={() => router.push(`/${user.username}`)} className="w-full">
              <UserTile user={user} />
            </button>
          ))}
        </div>
      ) : searchTerm ? (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          No users found
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          Start typing to search for users
        </div>
      )}
    </div>
  );
}