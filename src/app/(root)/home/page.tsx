import CreatePost from "@/components/post/CreatePost";
import IconLinkButton from "@/components/shared/IconLinkButton";
import { Feather } from "lucide-react";


export default function page() {
  
  // const [posts, setPosts] = useState<Post[]>([]);

  // const handlePostSubmit = async (content: string, media?: File[]) => {
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1000));

    
    // const newPost: Post = {
    //   id: Math.random().toString(36).substring(2, 9),
    //   content,
    //   media: media ? media.map(() => "https://placehold.co/600x400") : [],
    //   author: currentUser,
    //   likes: 0,
    //   comments: 0,
    //   shares: 0,
    //   createdAt: new Date(),
    //   isLiked: false,
    //   isBookmarked: false
    // };
  // }

  return (
    <>
      <div className="w-screen md:w-[600px] min-h-screen border-r">
        <CreatePost />
      </div>
      <div className="flex-1 hidden lg:block"></div>

      <div className="md:hidden absolute bottom-18 right-6">
        <IconLinkButton href="/compose/post" Icon={Feather} />
      </div>
    </>
    )
}
