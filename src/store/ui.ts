import { create } from "zustand"

interface UIState {
  isMenuOpen: boolean
  isSearchOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
  toggleSearch: () => void
  closeSearch: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  isSearchOpen: false,

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),

  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),
}))
