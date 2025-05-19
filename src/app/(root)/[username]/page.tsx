import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/actions/user";
import { reservedUsernames } from "@/data/reservedUsernames";
import { formatDate } from "date-fns";
import { Feather } from "lucide-react";
import IconLinkButton from "@/components/shared/IconLinkButton";

import ProfileCard from "@/components/card/ProfileCard";
import PostDisplay from "@/components/post/PostDisplay";

type Params = Promise<{ username: string }>

export default async function page(props: {params: Params}) {
  const params = await props.params
  const { username } = params;

  if (reservedUsernames.includes(username.toLowerCase())) {
    return notFound();
  }
  
  const {user, posts, pagination} = await getUserByUsername(username);
  if (!user) {
    return notFound();
  }

  const modifiedUser = {
    ...user,
    joinDate: formatDate(new Date(user.createdAt), 'MMM yyyy'),
  }

  return (
    <div className="w-screen md:w-[600px] border-r">
      <ProfileCard user={modifiedUser} />

      <PostDisplay initialPosts={posts} initialPagination={pagination} mode="user" username={username} />

      <div className="md:hidden fixed bottom-20 right-6 z-50">
        <IconLinkButton href="/compose/post" Icon={Feather} />
      </div>
    </div>
  )
}
