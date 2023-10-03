import { useUi } from "@/store/hooks";
import styles from "./Modal.module.scss";
import Loading from "../Loading/Index";
import { useEffect, useState } from "react";

const Modal = ({
  backgroundColor = "rgba(223, 192, 57, 0.966)",
  children,
}: any) => {
  const { modal } = useUi();

  return modal.state ? (
    modal.type === 0 ? (
      <div
        style={{ backgroundColor  }}
        className={styles.container}
      >
        <Loading text={modal.text} />
      </div>
    ) : (
      <div
        style={{
          backgroundColor: "rgba(223, 193, 57, 0.603)",
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
