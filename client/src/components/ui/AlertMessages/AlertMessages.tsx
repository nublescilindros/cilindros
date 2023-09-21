import styles from "./AlertMessages.module.scss";

const AlertMessages = ({ text = "", fontSize = " .8rem" }: any) => {
  return (
    <div className={styles.container}>
      <h3 style={{ fontSize }}>{text}</h3>
    </div>
  );
};

export default AlertMessages;
