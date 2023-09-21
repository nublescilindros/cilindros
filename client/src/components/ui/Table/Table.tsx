import { useEffect } from "react";
import styles from "./Table.module.scss";
import { useUi } from "@/store/hooks";

const Table = ({
  arrayData = [],
  arrayTitles = [],
  currentSelection,
  onClick = () => {},
  height = "7rem",
  title = "",
}: any) => {
  let filter = "grayscale(0%)";
  if (arrayData.length === 0) {
    height = "0rem";
    filter = "grayscale(100%)";
  }

  return (
    <div style={{ filter: filter }} className={styles.container}>
      <div>
        <h3>{title}</h3>
        <h3>{arrayData.length}</h3>
      </div>
      <div>
        {arrayTitles.map((list: any, index: number) => {
          return <h3 key={index}>{list.name}</h3>;
        })}
      </div>

      <div style={{ height }}>
        {arrayData.map((list: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                onClick(list, index);
              }}
            >
              {list.map((listMap: string, indexMap: number) => {
                return (
                  <h3
                    key={indexMap}
                    style={
                      currentSelection === index
                        ? {
                            backgroundColor: "rgb(216, 216, 3)",
                            color: "white",
                          }
                        : {}
                    }
                  >
                    {listMap}
                  </h3>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
