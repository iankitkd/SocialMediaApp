'use client' // Error boundaries must be Client Components
 
import GoBackButton from '@/components/shared/GoBackButton'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-2'>
      <AlertTriangle className="w-14 h-14 animate-pulse text-destructive" />
      <h2 className='text-lg font-semibold'>Something went wrong!</h2>
      <p className='text-muted-foreground text-sm mb-4'>{error.message || "We'll get this fixed soon."}</p>
      <div className='flex gap-4'>
        {/* <Button
            variant={"outline"}
            onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
            }
        >
            Try again
        </Button> */}
        <GoBackButton />
      </div>
    </div>
  )
}