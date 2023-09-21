import React, { useEffect, useState } from "react";
import Screen from "../screen";
import NavMenu from "@/components/ui/NavMenu";
import styles from "./template.module.scss";
import { useUi } from "@/store/hooks";

const Template = ({ children }: { children: any }) => {
  return (
    <Screen>
      <div className={styles.container}>{children}</div>
    </Screen>
  );
};

export default Template;
