import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Calendar, MapPin, UserPlus, UserMinus } from "lucide-react";

import { getInitials } from "@/utils/getInitials";
import { cn } from "@/lib/utils";

interface ProfileDetailsProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    bio?: string;
    location?: string;
    joinDate: string;
    // followingCount: number;
    // followersCount: number;
    // isFollowing: boolean;
    isCurrentUser?: boolean;
  };
}

export default function ProfileCard({ user }: ProfileDetailsProps) {
  return (
    <Card className="w-full border-none rounded-lg bg-background">
      <CardContent className="p-6">
        {/* Profile Header */}
        <div className="flex justify-between items-end">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          
          <div className="flex gap-2">
            {user.isCurrentUser ? (
                <Link href={'/profile/edit'} className={cn(buttonVariants({ variant: 'outline' }), "rounded-full")}>
                    Edit Profile
                </Link>
            ) : (
              <>
                {/* <Button variant="ghost" size="sm" className="rounded-full p-2">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button 
                  variant={user.isFollowing ? "outline" : "default"} 
                  size="sm" 
                  className="rounded-full gap-1"
                >
                  {user.isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Follow
                    </>
                  )}
                </Button> */}
              </>
            )}
          </div>
        </div>
        
        {/* User Info */}
        <div className="mt-4">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
          <p className="mt-4 text-sm">{user.bio}</p>
          
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {user.joinDate}</span>
            </div>
          </div>
        </div>
        
        {/* <div className="flex gap-4 mt-4 text-sm">
          <Link href={`/${user.username}/following`} className="hover:underline">
            <span className="font-semibold">{user.followingCount.toLocaleString()}</span>{' '}
            <span className="text-muted-foreground">Following</span>
          </Link>
          <Link href={`/${user.username}/followers`} className="hover:underline">
            <span className="font-semibold">{user.followersCount.toLocaleString()}</span>{' '}
            <span className="text-muted-foreground">Followers</span>
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}