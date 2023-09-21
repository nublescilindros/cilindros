import Image from "next/image";
import styles from "./Loading.module.scss";
import svg from "@/utils/svg";
import Modal from "../Modal/Modal";

const Loading = ({ text }: any) => {
  return (
    <div className={styles.container}>
      <Image src={svg.sync} width={200} height={200} alt="sync" />
      <h2>{text}</h2>
    </div>
  );
};

export default Loading;
