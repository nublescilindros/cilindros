import styles from "./ButtonIcon.module.scss";

const ButtonIcon = ({
  shadowLight = false,
  icon,
  fontSize = "2rem",
  onClick,
}: any) => {
  let stylesConfig = {};
  if (shadowLight === true) {
    stylesConfig = {
      filter: "drop-shadow(0rem 0rem .2rem #fcee8c)",
    };
  }

  return (
    <div className={styles.buttonIcon}>
      <button onClick={onClick}>
        <span
          style={{
            fontSize: fontSize,
            ...stylesConfig,
          }}
          className="material-symbols-outlined"
        >
          {icon}
        </span>
      </button>
    </div>
  );
};

export default ButtonIcon;
