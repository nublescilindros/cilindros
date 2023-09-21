import Button from "../Button/Button";
import styles from "./WindowAlert.module.scss";

const WindowAlert = ({ title = "", text = "", button = [] }: any) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <h3>{text}</h3>
      <div>
        {button.map((list: any, key: number) => (
          <div key={key}>
            <Button onclick={list.onClick} text={list.text} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WindowAlert;
