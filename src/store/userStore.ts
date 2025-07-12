import { create } from "zustand"
import { persist } from "zustand/middleware" 
export interface User {
  id: string
  email: string
  name: string
  isPro: boolean
  avatar?: string
}

interface UserState {
  user: User | null
  isSignedIn: boolean
  showSignInPopup: boolean
  signIn: (user: User) => void
  signOut: () => void
  setShowSignInPopup: (show: boolean) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isSignedIn: false,
      showSignInPopup: false,

      signIn: (user) =>
        set({
          user,
          isSignedIn: true,
          showSignInPopup: false,
        }),

      signOut: () =>
        set({
          user: null,
          isSignedIn: false,
        }),

      setShowSignInPopup: (show) => set({ showSignInPopup: show }),
    }),
    {
      name: "user-storage",
    },
  ),
)
