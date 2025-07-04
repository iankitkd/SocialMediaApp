import { notFound } from "next/navigation";

import PostDisplay from "@/components/post/PostDisplay";
import { getLikedPosts } from "@/actions/like";
import { getCurrentUser } from "@/actions/user";
import { getUserReplies } from "@/actions/reply";

type Params = Promise<{ username: string, slug: string }>

// const AllowedSlugs = ["likes"];

export default async function page(props: {params: Params}) {
  const params = await props.params
  const { username, slug } = params;
  
  
  if(slug === "likes") {
    const currentUser = await getCurrentUser();
    if(!currentUser || currentUser.username !== username) {
      return notFound();
    }
    const {posts, pagination } = await getLikedPosts();
    return (
      <PostDisplay initialPosts={posts} initialPagination={pagination} mode={"like"} username={username} />
    )
  }

  if(slug === "replies") {
    const {posts, pagination } = await getUserReplies(username);
    return (
      <PostDisplay initialPosts={posts} initialPagination={pagination} mode={"user-reply"} username={username} />
    )
  }

  return notFound();
}