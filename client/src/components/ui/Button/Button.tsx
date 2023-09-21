import styles from "./Button.module.scss";

const Button = ({
  key = 0,
  text = "text",
  onclick = () => {},
  disabled = false,
  fontSize = " 0.8rem",
}: any) => {
  let stylesDisabled: any = {};

  if (disabled) {
    stylesDisabled = {
      styles: {
        fontSize,
        color: "rgb(238, 238, 213)",
        backgroundColor: "rgb(176, 189, 201)",
        border: "solid .01rem rgb(147, 168, 192)",
        boxShadow: " 0 0.01rem 0.05rem 0.001rem transparent ",
      },
      jsxStyle: `button{cursor:default;}`,
    };
  } else {
    stylesDisabled = {
      styles: {
        fontSize,
        border: "solid 0.01rem rgb(150, 150, 150)",
        color: "rgb(156, 146, 98)",
        backgroundColor: "rgb(247, 233, 115)",
        boxShadow: " 0 0.05rem 0.05rem 0.001rem rgb(153, 141, 103)",
      },
      jsxStyle: `
      button{cursor: pointer;}
      button:hover {
        color: rgb(184, 172, 117);
        background-color: rgb(247, 236, 137) !important;
        box-shadow: 0 0.01rem 0.3rem 0.001rem transparent !important;
      }`,
    };
  }

  return (
    <div key={key} className={styles.container}>
      <style jsx>{`
        ${stylesDisabled.jsxStyle}
      `}</style>
      <button
        style={stylesDisabled.styles}
        disabled={disabled}
        onClick={onclick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
