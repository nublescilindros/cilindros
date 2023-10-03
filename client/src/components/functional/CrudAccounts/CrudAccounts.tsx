import styles from "./CrudAccounts.module.scss";
import {
  stateAlertMessages,
  stateError,
  stateMessagesModal,
} from "@/utils/constant";

import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Index";
import Table from "@/components/ui/Table/Table";
import AlertMessages from "@/components/ui/AlertMessages/AlertMessages";

import { useEffect, useState } from "react";
import MenuButtons from "@/components/ui/MenuButton/MenuButtons";
import { useUi, useUser } from "@/store/hooks";
import WindowAlert from "@/components/ui/WindowAlert/WindowAlert";
import { useRouter } from "next/router";

const CrudAccounts = () => {
  const router = useRouter();

  const {
    getAllAccounts,
    insertAccounts,
    updateAccounts,
    deleteAccounts,
    listAccounts,
    userError,
    typeErrorUser,
    setErrorUser,
  } = useUser();

  const { setUi, resetModal } = useUi();

  const [stateForm, setStateForm] = useState<any>({
    name: { text: "", disabled: false, subText: { state: false, text: "" } },
    rut: { text: "", disabled: false, subText: { state: false, text: "" } },
    user: { text: "", disabled: false, subText: { state: false, text: "" } },
    password: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
    search: { text: "", disabled: false, subText: { state: false, text: "" } },
    button: {
      text: "Agregar",
      disabled: true,
    },
  });

  const [menu, setmenu] = useState({
    currentSelection: 0,
    stateMsj: "",
    list: [{ name: "Agregar" }, { name: "Modificar" }, { name: "Eliminar" }],
  });

  const [stateListAccounts, setStateListAccounts] = useState<any>({
    currentSelection: null,
    arrayTitle: [
      { name: "Rut" },
      { name: "Nombre  " },
      { name: "Usuario" },
      { name: "Password" },
    ],
    arrayData: [],
  });

  const changeInputs = (e: any) => {
    setStateForm({
      ...stateForm,
      [e.currentTarget.name]: {
        ...stateForm[e.currentTarget.name],
        text: e.currentTarget.value,
      },
    });
  };

  const onClickTable = (current: string, index: number) => {

    switch (menu.currentSelection) {
      case 1:
        setStateForm({
          ...stateForm,
          rut: {
            subText: {
              state: false,
              text: "",
            },
            disabled: true,
            text: current[0],
          },
          name: {
            subText: {
              state: true,
              text: current[1],
            },
            disabled: false,
            text: current[1],
          },
          user: {
            subText: {
              state: true,
              text: current[2],
            },
            disabled: false,
            text: current[2],
          },
          password: {
            subText: {
              state: true,
              text: current[3],
            },
            disabled: false,
            text: current[3],
          },
        });
        break;
      case 2:
        setStateForm({
          ...stateForm,
          name: {
            ...stateForm.name,
            disabled: true,
            text: current[1],
          },
          rut: {
            ...stateForm.rut,
            disabled: true,
            text: current[0],
          },
          user: {
            ...stateForm.user,
            disabled: true,
            text: current[2],
          },
          password: {
            ...stateForm.password,
            disabled: true,
            text: current[3],
          },
        });
        break;

      default:
        break;
    }
    setStateListAccounts({ ...stateListAccounts, currentSelection: index });
  };

  const onClickAction = () => {
    switch (menu.currentSelection) {
      case 0:
        insertAccounts(
          stateForm.rut.text,
          stateForm.name.text,
          stateForm.user.text,
          stateForm.password.text
        );
        setStateForm({
          ...stateForm,
          name: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          rut: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          user: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          password: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
        });

        break;

      case 1:
        updateAccounts(
          stateForm.rut.text,
          stateForm.name.text,
          stateForm.user.text,
          stateForm.password.text
        );
        setStateForm({
          ...stateForm,
          name: {
            ...stateForm.name,
            text: "",
            disabled: true,
            subText: { state: false, text: "" },
          },
          rut: {
            ...stateForm.rut,
            text: "",
            disabled: true,
            subText: { state: false, text: "" },
          },
          user: {
            ...stateForm.user,
            text: "",
            disabled: true,
            subText: { state: false, text: "" },
          },
          password: {
            ...stateForm.password,
            text: "",
            disabled: true,
            subText: { state: false, text: "" },
          },
        });
        break;
      case 2:
        setUi({
          modal: {
            state: true,
            type: 1,
            text: "",
            component: (
              <WindowAlert
                title={stateMessagesModal.user[0].title}
                button={[
                  {
                    text: "Eliminar",
                    onClick: () => {
                      deleteAccounts(stateForm.rut.text);
                      setStateForm({
                        ...stateForm,
                        name: {
                          subText: { state: false, text: "" },
                          text: "",
                          disabled: true,
                        },
                        rut: {
                          subText: { state: false, text: "" },
                          text: "",
                          disabled: true,
                        },
                        user: {
                          subText: { state: false, text: "" },
                          text: "",
                          disabled: true,
                        },
                        password: {
                          subText: { state: false, text: "" },
                          text: "",
                          disabled: true,
                        },
                      });
                    },
                  },
                  {
                    text: "Cancelar",
                    onClick: () => {
                      resetModal();
                    },
                  },
                ]}
                close={() => {}}
              />
            ),
          },
        });

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    switch (menu.currentSelection) {
      case 0:
        setmenu({
          ...menu,
          stateMsj: stateAlertMessages.accounts.add.incomplete,
        });
        setStateForm({
          ...stateForm,
          name: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          rut: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          user: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          password: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          button: { text: "Guardar", disabled: true },
        });
        setStateListAccounts({ ...stateListAccounts, currentSelection: null });
        break;
      case 1:
        setmenu({
          ...menu,
          stateMsj: stateAlertMessages.accounts.modify.selectUser,
        });
        setStateForm({
          ...stateForm,
          name: { ...stateForm.name, text: "", disabled: true },
          rut: { ...stateForm.rut, text: "", disabled: true },
          user: { ...stateForm.user, text: "", disabled: true },
          password: { ...stateForm.password, text: "", disabled: true },
          button: { text: "Modificar", disabled: true },
        });
        setStateListAccounts({ ...stateListAccounts, currentSelection: null });
        break;
      case 2:
        setmenu({
          ...menu,
          stateMsj: stateAlertMessages.accounts.delete.selectUser,
        });
        setStateForm({
          ...stateForm,
          name: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          rut: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          user: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          password: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          button: { text: "Eliminar", disabled: true },
        });
        setStateListAccounts({ ...stateListAccounts, currentSelection: null });
        break;
      default:
        break;
    }
  }, [menu.currentSelection]);

  useEffect(() => {
    if (
      stateForm.rut.text.length > 4 &&
      stateForm.name.text.length > 3 &&
      stateForm.user.text.length > 3 &&
      stateForm.password.text.length > 3
    ) {
      switch (menu.currentSelection) {
        case 0:
          if (
            stateListAccounts.arrayData.filter(
              (list: any) => list[0] === stateForm.rut.text
            ).length <= 0
          ) {
            setmenu({
              ...menu,
              stateMsj: stateAlertMessages.accounts.add.ready,
            });
            setStateForm({
              ...stateForm,
              button: { text: stateForm.button.text, disabled: false },
            });
          } else {
            setmenu({
              ...menu,
              stateMsj: stateAlertMessages.accounts.add.rutExisting,
            });
            setStateForm({
              ...stateForm,
              button: { text: stateForm.button.text, disabled: true },
            });
          }

          break;
        case 1:
          if (
            stateListAccounts.arrayData[
              stateListAccounts.currentSelection
            ][1] === stateForm.name.text &&
            stateListAccounts.arrayData[
              stateListAccounts.currentSelection
            ][0] === stateForm.rut.text &&
            stateListAccounts.arrayData[
              stateListAccounts.currentSelection
            ][2] === stateForm.user.text &&
            stateListAccounts.arrayData[
              stateListAccounts.currentSelection
            ][3] === stateForm.password.text
          ) {
            setmenu({
              ...menu,
              stateMsj: stateAlertMessages.accounts.modify.unmodified,
            });
            setStateForm({
              ...stateForm,
              button: { text: stateForm.button.text, disabled: true },
            });
          } else {
            setmenu({
              ...menu,
              stateMsj: stateAlertMessages.accounts.modify.ready,
            });
            setStateForm({
              ...stateForm,
              button: { text: stateForm.button.text, disabled: false },
            });
          }
          break;
        case 2:
          setmenu({
            ...menu,
            stateMsj: stateAlertMessages.accounts.delete.ready,
          });
          setStateForm({
            ...stateForm,
            button: { text: stateForm.button.text, disabled: false },
          });
          break;
        default:
          break;
      }
    } else {
      switch (menu.currentSelection) {
        case 0:
          setmenu({
            ...menu,
            stateMsj: stateAlertMessages.accounts.add.incomplete,
          });
          break;
        case 1:
          setmenu({
            ...menu,
            stateMsj: stateAlertMessages.accounts.modify.selectUser,
          });
          break;
        case 2:
          setmenu({
            ...menu,
            stateMsj: stateAlertMessages.accounts.delete.selectUser,
          });
          break;
        default:
          break;
      }

      setStateForm({
        ...stateForm,
        button: { text: stateForm.button.text, disabled: true },
      });
    }
  }, [
    stateForm.name.text,
    stateForm.rut.text,
    stateForm.user.text,
    stateForm.password.text,
  ]);

  useEffect(() => {
    getAllAccounts();
  }, []);

  useEffect(() => {
    setStateListAccounts({
      ...stateListAccounts,
      arrayData: listAccounts.map((list: any) => [
        list.rut,
        list.name,
        list.accounts,
        list.password,
      ]),
    });
  }, [listAccounts]);

  useEffect(() => {
    if (userError) {
      setUi({
        modal: {
          state: true,
          type: 1,
          text: "",
          component: (
            <WindowAlert
              title={stateError.user[typeErrorUser].title}
              button={[
                {
                  text: "Aceptar",
                  onClick: () => {
                    setErrorUser(false);
                    resetModal();
                  },
                },
              ]}
              close={() => {}}
            />
          ),
        },
      });
    }
  }, [userError]);

  useEffect(() => {
    setUi({ titleNavMenu: "Cuentas" });
  }, []);

  return (
    <div className={styles.container}>
      <MenuButtons
        menu={menu}
        onClick={(index: number) =>
          setmenu({ ...menu, currentSelection: index })
        }
      />
      <AlertMessages text={menu.stateMsj} />

      <div>
        <Input
          Only="all"
          onChange={changeInputs}
          disabled={stateForm.rut.disabled}
          subText={stateForm.rut.subText}
          value={stateForm.rut.text}
          name="rut"
          text="Rut"
        />
        <Input
          Only="text"
          onChange={changeInputs}
          disabled={stateForm.name.disabled}
          subText={stateForm.name.subText}
          value={stateForm.name.text}
          name="name"
          width="12rem"
          text="Nombre"
        />
        <Input
          onChange={changeInputs}
          disabled={stateForm.user.disabled}
          subText={stateForm.user.subText}
          value={stateForm.user.text}
          name="user"
          width="12rem"
          text="Usuario"
        />
        <Input
          onChange={changeInputs}
          disabled={stateForm.password.disabled}
          subText={stateForm.password.subText}
          value={stateForm.password.text}
          name="password"
          text="Contraseña"
        />
        <Button
          disabled={stateForm.button.disabled}
          onclick={onClickAction}
          text={stateForm.button.text}
        />
      </div>

      <div>
        <Input
          onChange={changeInputs}
          value={stateForm.search.text}
          name="search"
          width="12rem"
          text="Buscar por nombre"
        />
        <Table
          title="Cuentas"
          onClick={onClickTable}
          currentSelection={stateListAccounts.currentSelection}
          arrayTitles={stateListAccounts.arrayTitle}
          arrayData={stateListAccounts.arrayData.filter(
            (list: any) =>
              list[1].toLowerCase().slice(0, stateForm.search.text.length) ==
              stateForm.search.text.toLowerCase()
          )}
        />
      </div>
    </div>
  );
};

export default CrudAccounts;
