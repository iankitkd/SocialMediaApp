import { create } from 'zustand'

type SelectedUserState = {
  userId: string | null
  username: string | null
  name: string | null
  avatar: string | null
  setUser: (user: { userId: string; username: string; name: string; avatar: string }) => void
  clearUser: () => void
}

export const useSelectedUserStore = create<SelectedUserState> ( (set) => ({
    userId: "dfdh",
    username: "dfdbfd",
    name: "fdh",
    avatar: null,
    setUser: (user) => set({ 
        userId: user.userId,
        username: user.username,
        name: user.name,
        avatar: user.avatar
    }),
    clearUser: () => set({ 
      userId: null,
      username: null,
      name: null,
      avatar: null 
    }),
  })
)