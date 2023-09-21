import { shallow } from "zustand/shallow";
import { clientsStore } from "../clientsStore";

const useClients = () => {
  const {
    typeError,
    error: clientsError,
    listClients
  } = clientsStore(
    (state) => ({
      error: state.error,
      typeError: state.typeError,
      listClients: state.listClients,
    }),
    shallow
  );
  const {
    setClients,
    getAllClients,
    insertClients,
    updateClients,
    deleteClients,
  } = clientsStore();

  return {
    typeError,
    clientsError,
    listClients,
    setClients,
    getAllClients,
    insertClients,
    updateClients,
    deleteClients,
  };
};

export default useClients;
