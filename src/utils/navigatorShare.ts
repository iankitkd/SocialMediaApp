import { toast } from "sonner";

export const handleShare = async (postUrl:string) => {
    if (navigator.share) {
      try {
        await navigator.share({url: postUrl});
      } catch (error) {
        toast.error("Error sharing content");
      }
    } else {
      toast.error("Share not supported on this browser");
    }
}

export const handleCopyLink = async (postUrl:string) => {
    try {
      await navigator.clipboard.writeText(postUrl);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Error copying link");
    } finally {
    }
}