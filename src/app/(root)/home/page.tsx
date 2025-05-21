export const dynamic = 'force-dynamic';

import CreatePost from "@/components/post/CreatePost";
import PostDisplay from "@/components/post/PostDisplay";
import IconLinkButton from "@/components/shared/IconLinkButton";
import { Feather } from "lucide-react";

import { getLatestPosts } from "@/lib/actions/post";

export default async function page() {

  const {posts, pagination} = await getLatestPosts();

  return (
    <>
      <div className="w-screen md:w-[600px] min-h-screen border-r">
        <CreatePost forHomePage={true} />
        
        <PostDisplay initialPosts={posts} initialPagination={pagination} mode="latest" />
      </div>

      <div className="flex-1 hidden lg:block"></div>

      <div className="md:hidden fixed bottom-20 right-6 z-50">
        <IconLinkButton href="/compose/post" Icon={Feather} />
      </div>
    </>
    )
}
