import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4 pt-14 w-screen md:w-[600px] border-r">
      <LoaderCircle className="w-12 h-12 text-primary animate-spin" />
      <p className="text-lg text-muted-foreground">Loading...</p>
    </div>
  );
}
