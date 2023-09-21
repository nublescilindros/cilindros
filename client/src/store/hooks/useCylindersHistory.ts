



import { shallow } from "zustand/shallow";
import { cylindersHistoryStore } from "../cylindersHistory";

const useCylindersHistory = () => {
    const {
        typeError,
        error: cylindersHistoryError,
        listCompanyCylindersCountHistory,
        listCompanyCylindersByDate,
        excelStateGenerate
    } = cylindersHistoryStore(
        (state) => ({
            error: state.error,
            typeError: state.typeError,
            listCompanyCylindersCountHistory: state.listCompanyCylindersCountHistory,
            listCompanyCylindersByDate: state.listCompanyCylindersByDate,
            excelStateGenerate: state.excelStateGenerate
        }),
        shallow
    );
    const {
        getAllCompanyCylindersCountHistory,
        getAllCompanyCylindersByDate,
        generateExcelCylinderCompany
    } = cylindersHistoryStore();

    return {
        typeError,
        cylindersHistoryError,
        excelStateGenerate,
        listCompanyCylindersCountHistory,
        getAllCompanyCylindersCountHistory,
        getAllCompanyCylindersByDate,
        generateExcelCylinderCompany,
        listCompanyCylindersByDate
    };
};

export default useCylindersHistory;
