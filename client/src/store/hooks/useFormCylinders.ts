import { shallow } from "zustand/shallow";
import { formCylindersStore } from "../formCylinders";

const useFormCylinders = () => {
    const {
        typeError,
        error: formCylindersError,
        listCompanyCylindersCount,
        listCylindersCompany
    } = formCylindersStore(
        (state) => ({
            error: state.error,
            typeError: state.typeError,
            listCompanyCylindersCount: state.listCompanyCylindersCount,
            listCylindersCompany: state.listCylindersCompany
        }),
        shallow
    );
    const {
        setFormCylinders,
        getAllCompanyCylindersCount,
        getAllCylindersCompany,
        updateCylinderState,
        updateCylinderRequestAndReception
    } = formCylindersStore();

    return {
        typeError,
        formCylindersError,
        listCompanyCylindersCount,
        listCylindersCompany,
        getAllCompanyCylindersCount,
        getAllCylindersCompany,
        updateCylinderState,
        updateCylinderRequestAndReception,
        setFormCylinders,

    };
};

export default useFormCylinders;
