import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/actions/user";
import { reservedUsernames } from "@/data/reservedUsernames";

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

  return (
    <div>

    </div>
  )
}
