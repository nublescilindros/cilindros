import { create, useStore } from "zustand";

import { apiInstance } from "../utils/api";
import { uiStore } from "./uiStore";
import { userStore } from "./userStore";


interface userState {
  typeError: number;
  listClients: any;
  error: boolean;
  setClients: (user: any) => void;
  getAllClients: () => void;
  insertClients: (rutBusiness: any, nameBusiness: any, nameManager: any, addressBusiness: any) => void;
  updateClients: (rutBusiness: any, nameBusiness: any, nameManager: any, addressBusiness: any) => void;
  deleteClients: (rutBusiness: any) => void;
  reset: () => void;
  resetAll: () => void;
}

const { setUi, resetModal } = uiStore.getState();

export const clientsStore = create<userState>((set, get) => ({
  listClients: [],
  error: false,
  typeError: 0,

  setClients: async (data: any) => {
    set((state) => ({ ...state, ...data }))
  },
  getAllClients: async () => {
    if (uiStore.getState().token != null) {
      try {

        setUi({ modal: { ...uiStore.getState().modal, text: "Cargando cilindros", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.get(`/clients/getAllClients`);
        if (data.errorToken != undefined && data.errorToken === true) {
          setUi({ errorToken: data.errorToken })
          resetModal()
          return
        }

        if (data.error) {
          set((state) => ({
            ...state, error: true, typeError: 0
          }));
          resetModal()
          return
        }

        set((state) => ({
          ...state, listClients: data.rows,
        }));

        resetModal()
      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },

  insertClients: async (rutBusiness: any, nameBusiness: any, nameManager: any, addressBusiness: any) => {
    if (uiStore.getState().token != null) {
      try {
        ({ modal: { ...uiStore.getState().modal, text: "Agrengando cliente", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.post(`/clients/insertClients`, {
            rutBusiness, nameBusiness, nameManager, addressBusiness
          });

        if (data.errorToken != undefined && data.errorToken === true) {
          setUi({ errorToken: data.errorToken })
          resetModal()
          return
        }

        if (data.error) {
          set((state) => ({
            ...state, error: true, typeError: 1
          }));
          resetModal()
          return
        }

        set((state) => ({
          ...state, listClients: data.rows
        }));

        resetModal()

      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },
  updateClients: async (rutBusiness: any, nameBusiness: any, nameManager: any, addressBusiness: any) => {
    if (uiStore.getState().token != null) {
      try {

        setUi({ modal: { ...uiStore.getState().modal, text: "Modificando cliente", state: true, type: 0 } })
        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.put(`/clients/updateClients`, {
            rutBusiness, nameBusiness, nameManager, addressBusiness
          });

        if (data.errorToken != undefined && data.errorToken === true) {
          setUi({ errorToken: data.errorToken })
          resetModal()
          return
        }

        if (data.error) {
          set((state) => ({
            ...state, error: true, typeError: 2
          }));
          resetModal()
          return
        }

        set((state) => ({
          ...state, listClients: data.rows
        }));
        resetModal()

      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },
  deleteClients: async (rutBusiness: any) => {
    if (uiStore.getState().token != null) {
      try {
        setUi({ modal: { ...uiStore.getState().modal, text: "Eliminando cliente", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.delete(`/clients/deleteClients/${rutBusiness}`);

        if (data.errorToken != undefined && data.errorToken === true) {
          setUi({ errorToken: data.errorToken })
          resetModal()
          return
        }

        if (data.error) {
          set((state) => ({
            ...state, error: true, typeError: 3
          }));
          resetModal()
          return
        }

        set((state) => ({
          ...state, listClients: data.rows
        }));

        resetModal()

      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },
  reset: () =>
    set((state) => ({
      ...state,
      listCylinders: [],
      listContent: [],
      listCapacity: [],
      error: false,
      typeError: 0,
    })),

  resetAll: () => set({}, true),
}));
