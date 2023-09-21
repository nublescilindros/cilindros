import { shallow } from "zustand/shallow";
import { uiStore } from "../uiStore";

const useUi = () => {
    const {
        token,
        titleNavMenu,
        modal,
        tableModal,
        errorRequest,
        errorToken
    } = uiStore(
        (state) => ({
            titleNavMenu: state.titleNavMenu,
            modal: state.modal,
            tableModal: state.tableModal,
            token: state.token,
            errorRequest: state.errorRequest,
            errorToken: state.errorToken,
        }),
        shallow
    );
    const { setUi, reset: resetUi, resetModal } = uiStore();

    return {
        token,
        modal,
        tableModal,
        titleNavMenu,
        errorRequest,
        errorToken,
        setUi,
        resetModal,
        resetUi,
    };
};

export default useUi;