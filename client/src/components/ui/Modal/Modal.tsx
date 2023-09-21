import { useUi } from "@/store/hooks";
import styles from "./Modal.module.scss";
import Loading from "../Loading/Index";
import { useEffect, useState } from "react";

const Modal = ({
  backgroundColor = "rgba(223, 192, 57, 0.966)",
  children,
}: any) => {
  const { modal } = useUi();

  /*   const [state, setState] = useState({ show: false, opacity: 0 });

  useEffect(() => {
    if (modal.state) {
      setState({ opacity: 1, show: modal.state });
    } else {
      setState({ ...state, opacity: 0 });

      setTimeout(() => {
        setState({ ...state, show: false });
      }, 500);
    }

console.log(modal.state, state)

  }, [modal.state]); */

  return modal.state ? (
    modal.type === 0 ? (
      <div
        style={{ backgroundColor /* , opacity: state.opacity */ }}
        className={styles.container}
      >
        <Loading text={modal.text} />
      </div>
    ) : (
      <div
        style={{
          backgroundColor: "rgba(223, 193, 57, 0.603)",
          /* opacity: state.opacity, */
        }}
        className={styles.container}
      >
        {modal.component}
      </div>
    )
  ) : (
    <></>
  );
};

export default Modal;
