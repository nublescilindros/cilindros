import { create } from "zustand";

import { apiInstance } from "../utils/api";

interface uiState {
  titleNavMenu: string;
  token: any;
  modal: any;
  tableModal: any;
  errorRequest: boolean;
  errorToken: boolean;
  setUi: (state: any) => void;
  resetModal: () => void;
  reset: () => void;
  resetAll: () => void;
}

const initialModal = {
  state: false,
  type: 0,
  text: "Cargando",
  component: <></>,
};

export const uiStore = create<uiState>((set, get) => ({
  token: null,
  titleNavMenu: "Inicio",
  modal: initialModal,
  tableModal: {
    currentSelection: 0,
    arrayTitle: [],
    arrayData: [],
  },
  errorToken: false,
  errorRequest: false,
  setUi: async (stateUi: any) => {
    set((state) => ({ ...state, ...stateUi }));
  },
  resetModal: () =>
    set((state) => ({
      ...state,
      modal: initialModal,
    })),
  reset: () =>
    set((state) => ({
      ...state,
      token: null,
      titleNavMenu: "Inicio",
      modal: initialModal,
      errorToken: false,
      errorRequest: false,
    })),

  resetAll: () => set({}, true),
}));
