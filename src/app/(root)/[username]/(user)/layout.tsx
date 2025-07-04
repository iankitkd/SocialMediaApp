import { notFound } from "next/navigation"

import ProfileCard from "@/components/user/ProfileCard"
import IconLinkButton from "@/components/shared/IconLinkButton"
import ProfilePostsTabs from "@/components/shared/ProfilePostsTabs"
import TopBackButton from "@/components/shared/TopBackButton"

import { Feather } from "lucide-react"
import { formatDate } from "date-fns"
import { reservedUsernames } from "@/data/reservedUsernames"
import { getUserByUsername } from "@/actions/user"

type Params = Promise<{ username:string}>

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params:  Params
}) {

  const { username } = await params;

  if (reservedUsernames.includes(username.toLowerCase())) {
    return notFound();
  }
  
  const res = await getUserByUsername(username);
  if (!res) {
    return notFound();
  }
  
  const user = res.user;
  const modifiedUser = {
    ...user,
    joinDate: formatDate(new Date(user.createdAt), 'MMM yyyy'),
  }

  return (
    <div className="w-screen md:w-[600px] border-r">
      <TopBackButton />
      <ProfileCard user={modifiedUser} />

      <ProfilePostsTabs username={username} />

      {children}

      <div className="md:hidden fixed bottom-20 right-6 z-50">
        <IconLinkButton href="/compose/post" Icon={Feather} />
      </div>
    </div>
  )
}
