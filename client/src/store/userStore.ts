import { create, useStore } from "zustand";

import { apiInstance } from "../utils/api";
import { uiStore } from "./uiStore";

interface userState {
  user: any;
  typeError: number;
  listAccounts: any;
  setError: (item: any) => void;
  error: boolean;
  setUser: (user: any) => void;
  verifyUser: () => void;
  validateUser: (id: string, password: string) => void;
  getAllAccounts: () => void;
  insertAccounts: (rut: any, name: any, user: any, password: any) => void;
  updateAccounts: (rut: any, name: any, user: any, password: any) => void;
  deleteAccounts: (rut: any) => void;
  reset: () => void;
  resetAll: () => void;
}

const initialDataUser: any = {
  id: "",
  admin: null,
};

const { setUi, resetModal } = uiStore.getState();

export const userStore = create<userState>((set, get) => ({
  listAccounts: [],
  user: initialDataUser,
  error: false,
  typeError: 0,

  setUser: async (stateUser: any) => {
    set((state) => ({ ...state, ...stateUser }));
  },
  setError: (item: any) =>
    set((state) => ({ ...state, error: item })),

  validateUser: async (id: string, password: string) => {
    try {
      setUi({ modal: { ...uiStore.getState().modal, text: "Entrando", state: true, type: 0 } })

      const { data } = await apiInstance('').apiAxios.post(`/accounts/validateUser`, {
        id,
        password,
      });

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
      localStorage.setItem("tokenCylindersMunos", JSON.stringify(data.token));

      set((state) => ({
        ...state, user: { user: data.user, admin: data.admin }
      }));

      resetModal()

    } catch (e) {
      setUi({ errorRequest: true })
    }
  },

  verifyUser: async () => {
    try {
      setUi({ modal: { ...uiStore.getState().modal, text: "Cargando", state: true, type: 0 } })
      const { data } = await apiInstance(uiStore.getState().token).
        apiAxios.get(`/accounts/verifyUser`);

      if (data.errorToken != undefined && data.errorToken === true) {
        setUi({ errorToken: data.errorToken })
        resetModal()
        return
      }

      set((state) => ({
        ...state, user: { id: data.id, admin: data.admin, rut: data.rut }
      }));

      resetModal()

    } catch (e) {
      setUi({ errorRequest: true })
    }
  },

  getAllAccounts: async () => {
    if (uiStore.getState().token != null) {
      try {

        setUi({ modal: { ...uiStore.getState().modal, text: "Cargando cuentas", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.get(`/accounts/getAllAccounts`);

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
          ...state, listAccounts: data.rows
        }));

        resetModal()
      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },

  insertAccounts: async (rut: any, name: any, user: any, password: any) => {
    if (uiStore.getState().token != null) {
      try {
        setUi({ modal: { ...uiStore.getState().modal, text: "Agrengando cuenta", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.post(`/accounts/insertAccounts`, {
            name, rut, user, password
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
          ...state, listAccounts: data.rows
        }));

        resetModal()

      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },

  updateAccounts: async (rut: any, name: any, user: any, password: any) => {
    if (uiStore.getState().token != null) {
      try {
        setUi({ modal: { ...uiStore.getState().modal, text: "Modificando cuenta", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.put(`/accounts/updateAccounts`, {
            name, rut, user, password
          });

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
          ...state, listAccounts: data.rows
        }));
        resetModal()

      } catch (e) {
        setUi({ errorRequest: true })
      }
    }

  },

  deleteAccounts: async (rut: any) => {
    if (uiStore.getState().token != null) {
      try {
        setUi({ modal: { ...uiStore.getState().modal, text: "Eliminando cuenta", state: true, type: 0 } })

        const { data } = await apiInstance(uiStore.getState().token).
          apiAxios.delete(`/accounts/deleteAccounts/${rut}`);

        if (data.errorToken != undefined && data.errorToken === true) {
          setUi({ errorToken: data.errorToken })
          resetModal()
          return
        }

        if (data.error) {
          set((state) => ({
            ...state, error: true, typeError: 4
          }));
          resetModal()
          return
        }

        set((state) => ({
          ...state, listAccounts: data.rows
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
      listAccounts: [],
      user: initialDataUser,
      typeError: 0,
      error: false,
    })),

  resetAll: () => set({}, true),
}));
