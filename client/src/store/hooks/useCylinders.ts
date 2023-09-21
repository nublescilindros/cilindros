import { shallow } from "zustand/shallow";
import { cylindersStore } from "../cylindersStore";

const useCylinders = () => {
  const {
    typeError: typeErrorUser,
    error: cylindersError,
    listCylinders,
    listContent,
    listCapacity,
  } = cylindersStore(
    (state) => ({
      error: state.error,
      typeError: state.typeError,
      listCylinders: state.listCylinders,
      listContent: state.listContent,
      listCapacity: state.listCapacity,
    }),
    shallow
  );
  const {
    setCylinders,
    getAllCylinders,
    getAllCapacity,
    getAllContent,
    insertCylinders,
    updateCylinders,
    deleteCylinders,
  } = cylindersStore();

  return {
    typeErrorUser,
    cylindersError,
    listCylinders,
    listCapacity,
    listContent,
    setCylinders,
    getAllCylinders,
    getAllCapacity,
    getAllContent,
    insertCylinders,
    updateCylinders,
    deleteCylinders,
  };
};

export default useCylinders;
