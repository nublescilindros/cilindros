import { shallow } from "zustand/shallow";
import { userStore } from "../userStore";

const useUser = () => {
  const {
    user,
    typeError: typeErrorUser,
    listAccounts,
    error: userError,

  } = userStore(
    (state) => ({
      user: state.user,
      error: state.error,
      typeError: state.typeError,
      listAccounts: state.listAccounts,
    }),
    shallow
  );
  const {
    verifyUser,
    validateUser,
    setUser,
    reset: resetUser,
    setError: setErrorUser,
    getAllAccounts,
    insertAccounts,
    deleteAccounts,
    updateAccounts,
  } = userStore();

  return {
    typeErrorUser,
    user,
    listAccounts,
    userError,
    insertAccounts,
    updateAccounts,
    deleteAccounts,
    getAllAccounts,
    verifyUser,
    validateUser,
    setUser,
    setErrorUser,
    resetUser,
  };
};

export default useUser;
