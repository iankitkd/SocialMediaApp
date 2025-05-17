import CreatePost from "@/components/post/CreatePost";
import IconLinkButton from "@/components/shared/IconLinkButton";
import { Feather } from "lucide-react";

export default function page() {
  return (
    <>
      <div className="w-screen md:w-[600px] min-h-screen border-r">
        <CreatePost forHomePage={true} />
      </div>

      <div className="flex-1 hidden lg:block"></div>

      <div className="md:hidden absolute bottom-18 right-6">
        <IconLinkButton href="/compose/post" Icon={Feather} />
      </div>
    </>
    )
}
