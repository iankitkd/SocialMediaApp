"use client"

import { useRouter } from "next/navigation"

import { Button } from "../ui/button"
import { ArrowLeft } from "lucide-react";

export default function TopBackButton() {
  const router = useRouter();

  return (
    <div className="sticky top-0 left-0 z-10 bg-background/95 flex justify-between items-center px-4 py-0 border-b">
      <Button 
        className="w-10 h-10 px-0 py-0"
        variant={"ghost"}
        onClick={() => router.back()}
      >
        <ArrowLeft className="font-bold text-2xl size-6" />
      </Button>
    </div>
  )
}
