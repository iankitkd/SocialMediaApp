import CreatePost from "@/components/post/CreatePost";
import IconLinkButton from "@/components/shared/IconLinkButton";
import { Feather } from "lucide-react";

export default async function page() {

  return (
    <>
      <div className="w-screen md:w-[600px] min-h-screen border-r">
        <div className="hidden md:block min-h-[158px]">
          <CreatePost forHomePage={true} />
        </div>
      </div>

      <div className="flex-1 hidden lg:block"></div>

      <div className="md:hidden fixed bottom-20 right-6 z-50">
        <IconLinkButton href="/compose/post" Icon={Feather} />
      </div>
    </>
    )
}
