"use client"

import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const router = useRouter();
  
  return (
    <Button
      variant={"secondary"}
      onClick={() => router.back()}
    >
      Go Back
    </Button>
  )
}
