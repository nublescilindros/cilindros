import { shallow } from "zustand/shallow";
import { modalsStore } from "../modalsStore";

const useModals = () => {
  const { loading } = modalsStore(
    (state) => ({
      loading: state.loading,
    }),
    shallow
  );
  const { changeState } = modalsStore();

  return {
    changeState,
    loading,
  };
};

export default useModals;
