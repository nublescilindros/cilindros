import { useEffect, useState } from "react";
import Input from "../Input/Input";
import styles from "./Ranges.module.scss";

const Ranges = ({
  text = "Rango",
  check = true,
  nameRanges = ["dateStart", "dateEnd"],
  dateStart,
  dateEnd,
  state,
}: any) => {
  const [stateRanges, setStateRanges] = useState({
    check: true,
  });

  const onChangeRanges = (e: any) => {
    switch (e.currentTarget.name) {
      case "dateRangeStart":
        if (
          new Date(dateEnd).getTime() <
          new Date(e.currentTarget.value).getTime()
        ) {
          console.log("Fecha de inicio no puede ser mayor a fecha fin");
        } else {
          console.log(e.currentTarget.value);
          state[1]({
            ...state[0],
            dateRangeStart: {
              ...state[0].dateRangeStart,
              text: e.currentTarget.value,
            },
          });
        }

        break;
      case "dateRangeEnd":
        if (
          new Date(dateStart).getTime() >
          new Date(e.currentTarget.value).getTime()
        ) {
          console.log("Fecha fin no puede ser menor a fecha inicio");
        } else {
          console.log(e.currentTarget.value);
          state[1]({
            ...state[0],
            dateRangeEnd: {
              ...state[0].dateRangeEnd,
              text: e.currentTarget.value,
            },
          });
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setStateRanges({ ...stateRanges, check: check });
  }, [check]);

  useEffect(() => {
    console.log(dateStart, dateEnd);
  }, [dateStart, dateEnd]);

  return (
    <div className={styles.container}>
      <div>
        <input
          onChange={() => {
            if (stateRanges.check === true) {
              setStateRanges({ ...stateRanges, check: false });
            } else {
              setStateRanges({ ...stateRanges, check: true });
            }
          }}
          defaultChecked={stateRanges.check}
          type="checkbox"
        ></input>
        <h3>{text}</h3>
      </div>

      <div>
        <Input
          name={nameRanges[0]}
          disabled={!stateRanges.check}
          value={dateStart}
          text="Inicio"
          type="date"
          onChange={onChangeRanges}
        />
        <Input
          name={nameRanges[1]}
          disabled={!stateRanges.check}
          value={dateEnd}
          text="Fin"
          type="date"
          onChange={onChangeRanges}
        />
      </div>
    </div>
  );
};

export default Ranges;
