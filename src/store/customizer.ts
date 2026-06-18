import { create } from "zustand"

interface CustomizerState {
  selectedColor: string | null
  autoRotate: boolean
  setColor: (color: string) => void
  toggleAutoRotate: () => void
}

export const useCustomizerStore = create<CustomizerState>((set) => ({
  selectedColor: "#C7A45D",
  autoRotate: true,

  setColor: (color) => set({ selectedColor: color }),
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
}))
