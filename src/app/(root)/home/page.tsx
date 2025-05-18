import CreatePost from "@/components/post/CreatePost";
import PostCard from "@/components/post/PostCard";
import IconLinkButton from "@/components/shared/IconLinkButton";
import { getUserPosts } from "@/lib/actions/post";
import { Feather } from "lucide-react";

export default async function page() {
  const currentUser = {
    name: "John Doe",
    avatar: "/path/to/avatar.jpg",
    username: "iankit"
  };

  const posts = await getUserPosts(currentUser.username);

  

  return (
    <>
      <div className="w-screen md:w-[600px] min-h-screen border-r">
        <CreatePost forHomePage={true} />

         <div className="space-y-4">
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            // onLike={handleLike}
            // onBookmark={handleBookmark}
            // onComment={handleComment}
            // onShare={handleShare}
            isOwner={false}
          />
        ))}
      </div>
      </div>

      <div className="flex-1 hidden lg:block"></div>

      <div className="md:hidden absolute bottom-18 right-6">
        <IconLinkButton href="/compose/post" Icon={Feather} />
      </div>
    </>
    )
}
