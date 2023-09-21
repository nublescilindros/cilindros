import React from "react";
import styles from "./screen.module.scss";

const Screen = ({
  children,
}: {
  children: any;
}) => {
  return (
    <div
      style={{
      }}
      className={styles.screen}
    >
      {children}
    </div>
  );
};

export default Screen;
