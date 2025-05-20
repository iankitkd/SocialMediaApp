import PostDisplay from "@/components/post/PostDisplay";
import { getUserPosts } from "@/lib/actions/post";

type Params = Promise<{ username: string }>

export default async function page(props: {params: Params}) {
  const params = await props.params
  const { username } = params;
  
  const { posts, pagination} = await getUserPosts(username);

  return (  
    <PostDisplay initialPosts={posts} initialPagination={pagination} mode="user" username={username} />
  )
}
