import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type UserState = {
  username: string | null
  name: string | null
  photoUrl: string | null
  setUser: (user: { username: string; name: string; photoUrl: string }) => void
  clearUser: () => void
}

export const useUserStore = create<UserState> ( (set) => ({
    username: null,
    name: null,
    photoUrl: null,
    setUser: (user) => set({ 
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl
    }),
    clearUser: () => set({ 
      username: null,
      name: null,
      photoUrl: null 
    }),
  })
)

// export const useUserStore = create<UserState>()(
//   persist(
//     (set) => ({
//       username: null,
//       name: null,
//       photoUrl: null,
//       setUser: (user) => set({ 
//         username: user.username,
//         name: user.name,
//         photoUrl: user.photoUrl
//       }),
//       clearUser: () => set({ 
//         username: null,
//         name: null,
//         photoUrl: null 
//       }),
//     }),
//     {
//       name: 'user-storage', // unique name for localStorage key
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({ 
//         username: state.username,
//         name: state.name,
//         photoUrl: state.photoUrl
//       }),
//     }
//   )
// )