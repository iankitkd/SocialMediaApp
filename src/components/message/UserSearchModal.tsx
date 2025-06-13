import { UserSearch } from '../user/UserSearch'

export default function UserSearchModal({handleClose}: {handleClose: ()=>void}) {
  return (
    <div className='absolute left-0 top-0 z-50 w-screen h-screen overflow-y-hidden flex justify-center bg-black/80 md:p-2'>
      <div className='w-full md:w-[500px] h-full overflow-y-auto bg-background rounded-xl shadow-xl border'>
        <UserSearch mode={"message"} handleBackClick={handleClose} />
      </div>
    </div>
  )
}
