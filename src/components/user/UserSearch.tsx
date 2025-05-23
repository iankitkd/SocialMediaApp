"use client";

import { useState, useCallback } from "react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { UserTile } from "./UserTile";

import { searchUsers } from "@/lib/actions/user";
import { debounce } from "@/utils/debounce";

interface User {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
}

export function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="relative mx-2">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users by name or username ..."
          className="w-full pl-9"
          value={searchTerm}
          onChange={handleSearchQueryChange}
        />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-15 w-full rounded-md" />
          ))}
        </div>
      ) : users.length > 0 ? (
        <div>
          {users.map((user) => (
            <UserTile key={user._id} user={user} />
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