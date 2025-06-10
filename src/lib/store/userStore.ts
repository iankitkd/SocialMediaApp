import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

type UserState = {
  _id: string | null
  username: string | null
  name: string | null
  avatar: string | null
  setUser: (user: { _id: string; username: string; name: string; avatar: string }) => void
  clearUser: () => void
}

export const useUserStore = create<UserState> ( (set) => ({
    _id: null,
    username: null,
    name: null,
    avatar: null,
    setUser: (user) => set({ 
      _id: user._id,
      username: user.username,
      name: user.name,
      avatar: user.avatar
    }),
    clearUser: () => set({ 
      _id: null,
      username: null,
      name: null,
      avatar: null 
    }),
  })
)

// export const useUserStore = create<UserState>()(
//   persist(
//     (set) => ({
//       username: null,
//       name: null,
//       avatar: null,
//       setUser: (user) => set({ 
//         username: user.username,
//         name: user.name,
//         avatar: user.avatar
//       }),
//       clearUser: () => set({ 
//         username: null,
//         name: null,
//         avatar: null 
//       }),
//     }),
//     {
//       name: 'user-storage', // unique name for localStorage key
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({ 
//         username: state.username,
//         name: state.name,
//         avatar: state.avatar
//       }),
//     }
//   )
// )