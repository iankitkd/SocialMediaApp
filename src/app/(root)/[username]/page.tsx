import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/actions/user";
import { reservedUsernames } from "@/data/reservedUsernames";
import ProfileCard from "@/components/card/ProfileCard";
import { formatDate } from "date-fns";

type Params = Promise<{ username: string }>

export default async function page(props: {params: Params}) {
  const params = await props.params
  const { username } = params;

  if (reservedUsernames.includes(username.toLowerCase())) {
    return notFound();
  }
  
  const user = await getUserByUsername(username);
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
    </div>
  )
}
