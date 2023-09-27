import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "./NavMenu.module.scss";
import { useUi, useUser } from "@/store/hooks";

const NavMenu = ({ adminState }: any) => {
  const router = useRouter();
  const { resetUi, titleNavMenu, setUi } = useUi();
  const { user, resetUser } = useUser();

  const [stateNavMenu, setStateNavMenu] = useState<any>({
    stateList: false,
    currentSelection: 0,
    list: [
      { name: "Inicio", route: "", admin: false },
      { name: "Cuentas", route: "accounts", admin: true },
      { name: "Cilindros", route: "cylinders", admin: true },
      { name: "Clientes", route: "clients", admin: true },
      {
        name: "Entrega y Recepción",
        route: "deliveryAndReception",
        admin: false,
      },
      { name: "Formulario Cilindros", route: "formCylinders", admin: true },
      { name: "Historial", route: "cylinderHistory", admin: true },
    ],
  });

  const changeStateList = (state: boolean) => {
    if (state) {
      setStateNavMenu({
        stateList: false,
        currentSelection: stateNavMenu.currentSelection,
        list: stateNavMenu.list,
      });
    } else {
      setStateNavMenu({
        stateList: true,
        currentSelection: stateNavMenu.currentSelection,
        list: stateNavMenu.list,
      });
    }
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li
          onClick={() => {
            changeStateList(stateNavMenu.stateList);
          }}
          style={stateNavMenu.stateList ? {} : {}}
        >
          <a
            style={
              stateNavMenu.stateList
                ? { color: "yellow", borderBottom: "solid .2rem yellow" }
                : { color: "white", borderBottom: "solid .2rem white" }
            }
          >
            Menu
          </a>
          <a>{titleNavMenu}</a>
        </li>
        <li>
          <a>{user.id}</a>
          <a
            onClick={() => {
              localStorage.removeItem("tokenCylindersMunos");
              resetUser();
              resetUi();
              router.push("/login");
            }}
          >
            Salir
          </a>
        </li>
      </ul>

      {stateNavMenu.stateList && (
        <ul>
          <style jsx>{`
            li {
              padding: 0 0 0 2rem;
              background-color: white;
              transform: skew(-15deg, 0) translate(0rem, 0rem);
              border: solid 0.1rem rgb(147, 168, 192);
              border-radius: 0 0 0.2rem 0.2rem;
              cursor: pointer;
              transition: 0.3s;
              position: relative;
              display: flex;
              justify-content: left;
              overflow: hidden;
            }

            li:nth-child(${stateNavMenu.currentSelection + 1}) {
              transform: skew(-15deg, 0) translate(0.5rem, 0rem);
            }
            li:after {
              content: "";
              z-index: -1;
              left: -2rem;
              transition: 0.3s;
              position: absolute;
              width: 0;
              height: 100%;
              background-color: yellow;
              transform: skew(15deg, 0);
            }

            li:nth-child(${stateNavMenu.currentSelection + 1}):after {
              width: 135%;
            }
          `}</style>
          {stateNavMenu.list.map((list: any, index: number) => {
            return user.admin ? (
              <li
                onClick={() => {
                  setStateNavMenu({
                    ...stateNavMenu,
                    stateList: false,
                    currentSelection: index,
                  });
                  setUi({ titleNavMenu: list.name });
                  router.push(`/home/${list.route}`);
                }}
                key={index}
              >
                <a>{list.name}</a>
              </li>
            ) : (
              list.admin == false && (
                <li
                  onClick={() => {
                    setStateNavMenu({
                      ...stateNavMenu,
                      stateList: false,
                      currentSelection: index,
                    });
                    router.push(`/home/${list.route}`);
                  }}
                  key={index}
                >
                  <a>{list.name}</a>
                </li>
              )
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default NavMenu;
