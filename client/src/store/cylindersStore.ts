import { create, useStore } from "zustand";

import { apiInstance } from "../utils/api";
import { uiStore } from "./uiStore";
import { userStore } from "./userStore";


interface userState {
  typeError: number;
  listCylinders: any;
  listContent: any;
  listCapacity: any;
  error: boolean;
  setCylinders: (user: any) => void;
  getAllCylinders: () => void;
  getAllContent: () => void;
  getAllCapacity: () => void;
  insertCylinders: (code: any, capacity: any, content: any, own: number) => void;
  updateCylinders: (code: any, capacity: any, content: any, own: number) => void;
  deleteCylinders: (code: any) => void;
  reset: () => void;
  resetAll: () => void;
}

const { setUi, resetModal } = uiStore.getState();

export const cylindersStore = create<userState>((set, get) => ({
  listCylinders: [],
  listContent: [],
  listCapacity: [],
  error: false,
  typeError: 0,

  setCylinders: async (data: any) => {
    set((state) => ({ ...state, ...data }))
  },
  getAllCylinders: async () => {
    if (uiStore.getState().token != null) {
      try {

        setUi({ modal: { ...uiStore.getState().modal, text: "Cargando cilindros", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.get(`/cylinders/getAllCylinders`);

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
          ...state, listCylinders: data.rows,
        }));

        resetModal()
      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },
  getAllContent: async () => {
    if (uiStore.getState().token != null) {
      try {

        setUi({ modal: { ...uiStore.getState().modal, text: "Cargando cilindros", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.get(`/cylinders/getAllContent`);

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
          ...state, listContent: data.rows,
        }));

        resetModal()
      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },
  getAllCapacity: async () => {
    if (uiStore.getState().token != null) {
      try {

        setUi({ modal: { ...uiStore.getState().modal, text: "Cargando cilindros", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.get(`/cylinders/getAllCapacity`);

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
          ...state, listCapacity: data.rows,
        }));

        resetModal()
      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },
  insertCylinders: async (code: any, capacity: any, content: any, own: any) => {
    if (uiStore.getState().token != null) {
      try {
        ({ modal: { ...uiStore.getState().modal, text: "Agrengando cilindro", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.post(`/cylinders/insertCylinders`, {
            code, capacity, content, own
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
          ...state, listCylinders: data.rows
        }));

        resetModal()

      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },
  updateCylinders: async (code: any, capacity: any, content: any, own: any) => {
    if (uiStore.getState().token != null) {
      try {
        console.log(code, capacity, content)
        setUi({ modal: { ...uiStore.getState().modal, text: "Modificando cilindro", state: true, type: 0 } })
        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.put(`/cylinders/updateCylinders`, {
            code, capacity, content, own
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
          ...state, listCylinders: data.rows
        }));
        resetModal()

      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },
  deleteCylinders: async (code: any) => {
    if (uiStore.getState().token != null) {
      try {
        setUi({ modal: { ...uiStore.getState().modal, text: "Eliminando cilindro", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.delete(`/cylinders/deleteCylinders/${code}`);

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
          ...state, listCylinders: data.rows
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
