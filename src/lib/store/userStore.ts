import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

type UserState = {
  username: string | null
  name: string | null
  avatar: string | null
  setUser: (user: { username: string; name: string; avatar: string }) => void
  clearUser: () => void
}

export const useUserStore = create<UserState> ( (set) => ({
    username: null,
    name: null,
    avatar: null,
    setUser: (user) => set({ 
      username: user.username,
      name: user.name,
      avatar: user.avatar
    }),
    clearUser: () => set({ 
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