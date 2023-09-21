import { create, useStore } from "zustand";

import { apiInstance } from "../utils/api";
import { uiStore } from "./uiStore";
import { cylindersStore } from "./cylindersStore";

interface cylindersHistoryState {
    typeError: number;
    listCompanyCylindersCountHistory: any;
    listCompanyCylindersByDate: any;
    excelStateGenerate: boolean;
    error: boolean;
    setDeliveryAndReception: (user: any) => void;
    getAllCompanyCylindersCountHistory: () => void;
    getAllCompanyCylindersByDate: (rutBusiness: string, deliveredDate: Date, receivedDate: Date) => void;
    generateExcelCylinderCompany: (dataForm: any) => void;
    reset: () => void;
    resetAll: () => void;
}

const { setUi, resetModal } = uiStore.getState();

export const cylindersHistoryStore = create<cylindersHistoryState>((set, get) => ({
    listCompanyCylindersCountHistory: [],
    excelStateGenerate: false,
    listCompanyCylindersByDate: [],
    error: false,
    typeError: 0,
    setDeliveryAndReception: async (data: any) => {
        set((state) => ({ ...state, ...data }))
    },
    getAllCompanyCylindersCountHistory: async () => {
        if (uiStore.getState().token != null) {
            try {
                setUi({ modal: { ...uiStore.getState().modal, text: "Cargando Empresas", state: true, type: 0 } })
                const { data } = await apiInstance(uiStore.getState().token).
                    apiAxios.get(`/cylindersHistory/getAllCompanyCylindersCountHistory`);

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
                    ...state, listCompanyCylindersCountHistory: data.rows,
                }));

                resetModal()
            } catch (e) {
                setUi({ errorRequest: true })
            }
        }
    },
    getAllCompanyCylindersByDate: async (rutBusiness: string, deliveredDate: Date, receivedDate: Date) => {
        if (uiStore.getState().token != null) {
            try {

                setUi({ modal: { ...uiStore.getState().modal, text: "Cargando cilindros", state: true, type: 0 } })

                const { data } = await apiInstance(uiStore.getState().token).
                    apiAxios.get(`/cylindersHistory/getAllCompanyCylindersByDate/${rutBusiness}/${deliveredDate}/${receivedDate}`);

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
                    ...state, listCompanyCylindersByDate: data.rows,
                }));

                resetModal()
            } catch (e) {
                setUi({ errorRequest: true })
            }
        }

    },
    generateExcelCylinderCompany: async (dataForm: any) => {
        if (uiStore.getState().token != null) {
            try {
                set((state) => ({
                    ...state, excelStateGenerate: false,
                }));
                setUi({ modal: { ...uiStore.getState().modal, text: "Cargando Excel", state: true, type: 0 } })

                const { data } = await apiInstance(uiStore.getState().token).
                    apiAxios.post(`/cylindersHistory/generateExcelCylinderCompany`, dataForm);

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

                console.log(data,"22222222")

                set((state) => ({
                    ...state, excelStateGenerate: data.state,
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
