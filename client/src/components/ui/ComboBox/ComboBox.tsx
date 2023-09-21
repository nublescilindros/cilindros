import svg from "@/utils/svg";
import styles from "./ComboBox.module.scss";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
const ComboBox = ({
  name,
  value,
  type = 0,
  text = "text",
  arrayOption = [],
  disabled,
  width = "10rem",
  onClick = () => {},
}: any) => {
  const [comboFilter, setComboFilter] = useState({
    option: false,
  });

  let stylesDisabled: any = {};

  if (disabled) {
    stylesDisabled = {
      label: {
        backgroundColor: "rgb(176, 189, 201)",
        color: "rgb(238, 238, 213)",
      },
      select: {
        color: "white",
        backgroundColor: "rgb(201, 205, 224)",
        boxShadow: "0 0rem 0.01rem 0.001rem rgb(61, 55, 36)",
      },
    };
  } else {
    stylesDisabled = {
      label: {
        backgroundColor: "rgb(105, 133, 158)",
        color: " yellow",
      },
      select: {
        color: "rgb(109, 109, 143)",
        backgroundColor: "rgb(248, 252, 255)",
        boxShadow: "0 0.0rem 0.01rem 0.001rem rgb(61, 55, 36)",
      },
    };
  }

  return type === 0 ? (
    <div style={{ width }} className={styles.containerType0}>
      <label
        aria-disabled={disabled}
        style={stylesDisabled.label}
        htmlFor={text}
      >
        {text}
      </label>
      <select
        disabled={disabled}
        name={name}
        value={value}
        onChange={(e) => onClick(e)}
        style={stylesDisabled.select}
      >
        {arrayOption.map((list: any, index: number) => {
          return (
            <option key={index} value={list.name}>
              {list.name}
            </option>
          );
        })}
      </select>
    </div>
  ) : (
    <div className={styles.containerType1}>
      <Input
        width={width}
        icon={{
          state: true,
          img: svg.expandMore,
          onClick: () => {
            setComboFilter({ option: !comboFilter.option });
          },
          backgroundColor: "rgb(105, 133, 158)",
        }}
        text="Razon social"
      />
      <div style={{ width, display: comboFilter.option ? "flex" : "none" }}>
        {arrayOption.map((list: any) => {
          return <h3 key={list.id}>{list.name}</h3>;
        })}
      </div>
    </div>
  );
};

export default ComboBox;
