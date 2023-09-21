import styles from "./MenuButtons.module.scss";

const MenuButtons = ({ menu, onClick }: any) => {
  return (
    <div className={styles.container}>
      {menu.list.map((list: any, index: number) => {
        return (
          <h2
            onClick={() => onClick(index)}
            style={
              menu.currentSelection == index
                ? {
                    backgroundColor: " rgb(119, 133, 196)",
                    color: "white",
                  }
                : {
                    backgroundColor: "rgb(217, 224, 226)",
                    color: "rgb(172, 177, 201)",
                  }
            }
            key={index}
          >
            {list.name}
          </h2>
        );
      })}
    </div>
  );
};

export default MenuButtons;
