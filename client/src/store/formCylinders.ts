import { create, useStore } from "zustand";

import { apiInstance } from "../utils/api";
import { uiStore } from "./uiStore";
import { cylindersStore } from "./cylindersStore";

interface formCylindersState {
    typeError: number;
    listCompanyCylindersCount: any;
    listCylindersCompany: any;
    error: boolean;
    setFormCylinders: (user: any) => void;
    getAllCompanyCylindersCount: () => void;
    getAllCylindersCompany: (rutBusiness: string) => void;
    updateCylinderState: (code: string, state: number) => void;
    updateCylinderRequestAndReception: (
        rutBusiness: string,
        codeCylinders: string,
        rutAccounts: string,
        stateCylinders: number
    ) => void;

    reset: () => void;
    resetAll: () => void;
}

const { setUi, resetModal } = uiStore.getState();
const { setCylinders } = cylindersStore.getState();

export const formCylindersStore = create<formCylindersState>((set, get) => ({
    listCompanyCylindersCount: [],
    listCylindersCompany: [],
    error: false,
    typeError: 0,
    setFormCylinders: async (data: any) => {
        set((state) => ({ ...state, ...data }))
    },
    getAllCompanyCylindersCount: async () => {
        if (uiStore.getState().token != null) {
            try {

                setUi({ modal: { ...uiStore.getState().modal, text: "Cargando cilindros", state: true, type: 0 } })

                const { data } = await apiInstance(uiStore.getState().token).
                    apiAxios.get(`/formCylinders/getAllCompanyCylindersCount`);
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
                    ...state, listCompanyCylindersCount: data.rows,
                }));

                resetModal()
            } catch (e) {
                setUi({ errorRequest: true })
            }
        }

    },
    getAllCylindersCompany: async (rutBusiness: string) => {
        if (uiStore.getState().token != null) {
            try {

                setUi({ modal: { ...uiStore.getState().modal, text: "Cargando cilindros", state: true, type: 0 } })

                const { data } = await apiInstance(uiStore.getState().token).
                    apiAxios.get(`/formCylinders/getAllCylindersCompanyByRut/${rutBusiness}`);

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
console.log(data.rows,"storeee")
                set((state) => ({
                    ...state, listCylindersCompany: data.rows,
                }));

                resetModal()
            } catch (e) {
                setUi({ errorRequest: true })
            }
        }

    },
    updateCylinderState: async (code: string, state: number) => {
        if (uiStore.getState().token != null) {
            try {

                setUi({ modal: { ...uiStore.getState().modal, text: "Disponiendo cilindro", state: true, type: 0 } })
                const { data } = await apiInstance(uiStore.getState().token).
                    apiAxios.put(`/formCylinders/updateCylinderState`, {
                        code, state
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

                setCylinders({ listCylinders: data.rows })

                resetModal()

            } catch (e) {
                setUi({ errorRequest: true })
            }
        }
    },
    updateCylinderRequestAndReception: async (
        rutBusiness: string,
        codeCylinders: string,
        rutAccounts: string,
        stateCylinders: number
    ) => {
        if (uiStore.getState().token != null) {
            try {

                setUi({ modal: { ...uiStore.getState().modal, text: "Disponiendo cilindro", state: true, type: 0 } })
                const { data } = await apiInstance(uiStore.getState().token).
                    apiAxios.put(`/formCylinders/updateCylinderRequestAndReception`, {
                        rutBusiness, codeCylinders, rutAccounts, stateCylinders
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


                console.log(data);

                set((state) => ({
                    ...state,
                    listCompanyCylindersCount: data.rows[1],
                    listCylindersCompany: data.rows[2],

                }));
                setCylinders({ listCylinders: data.rows[0] })

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
