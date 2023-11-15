import { shallow } from "zustand/shallow";
import { formCylindersStore } from "../formCylinders";

const useFormCylinders = () => {
    const {
        typeError,
        error: formCylindersError,
        listCompanyCylindersCount,
        listCylindersCompany,
        pdfStateGenerate
    } = formCylindersStore(
        (state) => ({
            error: state.error,
            typeError: state.typeError,
            listCompanyCylindersCount: state.listCompanyCylindersCount,
            listCylindersCompany: state.listCylindersCompany,
            pdfStateGenerate: state.pdfStateGenerate
        }),
        shallow
    );
    const {
        setFormCylinders,
        getAllCompanyCylindersCount,
        getAllCylindersCompany,
        updateCylinderState,
        updateCylinderRequestAndReception,
        generatePdfCylinderCompany
    } = formCylindersStore();

    return {
        typeError,
        formCylindersError,
        listCompanyCylindersCount,
        listCylindersCompany,
        pdfStateGenerate,
        getAllCompanyCylindersCount,
        getAllCylindersCompany,
        updateCylinderState,
        updateCylinderRequestAndReception,
        generatePdfCylinderCompany,
        setFormCylinders,

    };
};

export default useFormCylinders;
