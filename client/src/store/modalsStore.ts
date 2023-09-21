import { create } from "zustand";

interface modalsStore {
  loading: {
    show: boolean,
    text: string
  };
  changeState: (stateSelection: boolean) => void;
}

export const modalsStore = create<modalsStore>((set, get) => ({
  loading: { show: false, text: "Cargando" },
  changeState: (stateSelection: boolean) => {
    try {
      set((state) => ({ ...state, state: stateSelection }));
    } catch (e) {
      set((state) => ({ ...state, error: true }));
    }
  },
}));
