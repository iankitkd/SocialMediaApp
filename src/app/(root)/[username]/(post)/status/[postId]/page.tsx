import { notFound } from "next/navigation";

import PostCard from "@/components/post/PostCard"
import PostDisplay from "@/components/post/PostDisplay";
import ReplyPostSection from "@/components/post/ReplyPostSection";
import TopBackButton from "@/components/shared/TopBackButton";

import { getPostDetails } from "@/lib/actions/post";
import { getPostReplies } from "@/lib/actions/reply";

type Params = Promise<{ postId: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params;
  const {postId} = params;

  const searchParams = await props.searchParams
  const reply = searchParams.reply

  const post = await getPostDetails(postId);
  if(!post) {
    return notFound();
  }

  const {posts: replies, pagination} = await getPostReplies(postId);

  return (
    <div className="w-screen md:w-[600px] border-r">
      <TopBackButton />
      <PostCard post={post} />
      <ReplyPostSection postId={postId} reply={!!reply} />

      <div className="border-t border-foreground/30 h-6"></div>

      {
        (replies?.length > 0) ? (
          <PostDisplay initialPosts={replies} initialPagination={pagination} postId={postId} mode="post-reply" />
        ) : (
          <div className="text-muted-foreground text-sm text-center p-4">No Replies</div>
        )
      }
    </div>
  )
}
