import { shallow } from "zustand/shallow";
import { deliveryAndReceptionStore } from "../deliveryAndReception";

const useDeliveryAndReception = () => {
    const {
        typeError,
        error: deliveryAndReceptionError,
        listCompanyCylindersCountAccounts,
        listCompanyCylindersAccounts
    } = deliveryAndReceptionStore(
        (state) => ({
            error: state.error,
            typeError: state.typeError,
            listCompanyCylindersCountAccounts: state.listCompanyCylindersCountAccounts,
            listCompanyCylindersAccounts: state.listCompanyCylindersAccounts
        }),
        shallow
    );
    const {
        getAllCompanyCylindersCountAccounts,
        getAllCompanyCylindersAccounts,
        updateCylinderDeliveryAndReception
    } = deliveryAndReceptionStore();

    return {
        typeError,
        deliveryAndReceptionError,
        listCompanyCylindersCountAccounts,
        listCompanyCylindersAccounts,
        updateCylinderDeliveryAndReception,
        getAllCompanyCylindersCountAccounts,
        getAllCompanyCylindersAccounts
    };
};

export default useDeliveryAndReception;
