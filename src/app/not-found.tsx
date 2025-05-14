import { Frown } from "lucide-react";
import GoBackButton from "@/components/shared/GoBackButton";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <Frown className="w-14 h-14 text-muted-foreground mb-2" />
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground mb-4">
        Oops! Looks like this page doesn't exist.
      </p>
      <GoBackButton />
    </div>
  );
}
