import CreatePost from '@/components/post/CreatePost'

export default function page() {
  return (
    <div className='h-screen bg-foreground/50'>
        <div className='h-screen md:h-auto w-screen max-w-2xl mx-auto'>
            <CreatePost forHomePage={false} />
        </div>
    </div>
  )
}
