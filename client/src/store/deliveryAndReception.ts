import { create, useStore } from "zustand";

import { apiInstance } from "../utils/api";
import { uiStore } from "./uiStore";
import { cylindersStore } from "./cylindersStore";

interface deliveryAndReceptionState {
    typeError: number;
    listCompanyCylindersCountAccounts: any;
    listCompanyCylindersAccounts: any;
    error: boolean;
    setDeliveryAndReception: (user: any) => void;
    getAllCompanyCylindersCountAccounts: (rutAccounts: string, state: number) => void;
    getAllCompanyCylindersAccounts: (rutBusiness: string, rutAccounts: string) => void;
    updateCylinderDeliveryAndReception: (codeCylinders: string, state: number,
        rutBusiness: string, rutAccounts: string, stateCompany: number) => void;
    reset: () => void;
    resetAll: () => void;
}

const { setUi, resetModal } = uiStore.getState();
const { setCylinders } = cylindersStore.getState();

export const deliveryAndReceptionStore = create<deliveryAndReceptionState>((set, get) => ({
    listCompanyCylindersCountAccounts: [],
    listCompanyCylindersAccounts: [],
    error: false,
    typeError: 0,
    setDeliveryAndReception: async (data: any) => {
        set((state) => ({ ...state, ...data }))
    },
    getAllCompanyCylindersCountAccounts: async (rutAccounts: string, state: number) => {
        if (uiStore.getState().token != null) {
            try {
                console.log('storeeeeeee')
                setUi({ modal: { ...uiStore.getState().modal, text: "Cargando cilindros", state: true, type: 0 } })
                const { data } = await apiInstance(uiStore.getState().token).
                    apiAxios.get(`/deliveryAndReception/getAllCompanyCylindersCountAccounts/${rutAccounts}/${state}`);

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
                    ...state, listCompanyCylindersCountAccounts: data.rows,
                }));

                resetModal()
            } catch (e) {
                setUi({ errorRequest: true })
            }
        }
    },
    getAllCompanyCylindersAccounts: async (rutBusiness: string, rutAccounts: string) => {
        if (uiStore.getState().token != null) {
            try {

                setUi({ modal: { ...uiStore.getState().modal, text: "Cargando cilindros", state: true, type: 0 } })

                const { data } = await apiInstance(uiStore.getState().token).
                    apiAxios.get(
                        `/deliveryAndReception/getAllCompanyCylindersAccounts/${rutBusiness}/${rutAccounts}`);

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
                    ...state, listCompanyCylindersAccounts: data.rows,
                }));

                resetModal()
            } catch (e) {
                setUi({ errorRequest: true })
            }
        }

    },
    updateCylinderDeliveryAndReception: async (
        codeCylinders: string, state: number, rutBusiness: string, rutAccounts: string, stateCompany: number) => {
        if (uiStore.getState().token != null) {
            try {
                console.log(codeCylinders, state)
                setUi({ modal: { ...uiStore.getState().modal, text: "Disponiendo cilindro", state: true, type: 0 } })
                const { data } = await apiInstance(uiStore.getState().token).
                    apiAxios.put(`/deliveryAndReception/updateCylinderDeliveryAndReception`, {
                        codeCylinders, state, rutBusiness, rutAccounts, stateCompany
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
                console.log(data.rows, "storeeeeeeeeee")
                set((state) => ({
                    ...state,
                    listCompanyCylindersCountAccounts: data.rows[0],
                    listCompanyCylindersAccounts: data.rows[1]

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
