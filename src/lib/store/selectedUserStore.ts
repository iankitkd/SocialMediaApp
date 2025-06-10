import { create } from 'zustand'

type SelectedUserState = {
  _id: string | null
  username: string | null
  name: string | null
  avatar: string | null
  setUser: (user: { _id: string; username: string; name: string; avatar?: string }) => void
  clearUser: () => void
}

export const useSelectedUserStore = create<SelectedUserState> ( (set) => ({
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