import styles from "./CrudCylinders.module.scss";
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
import { useCylinders, useUi, useUser } from "@/store/hooks";
import WindowAlert from "@/components/ui/WindowAlert/WindowAlert";
import ComboBox from "@/components/ui/ComboBox/ComboBox";

const CrudCylinders = () => {
  const {
    setCylinders,
    getAllCylinders,
    getAllCapacity,
    getAllContent,
    insertCylinders,
    updateCylinders,
    deleteCylinders,
    listCylinders,
    listCapacity,
    listContent,
    cylindersError,
    typeErrorUser,
  } = useCylinders();

  const { setUi, resetModal } = useUi();

  const [stateForm, setStateForm] = useState<any>({
    code: { text: "", disabled: false, subText: { state: false, text: "" } },
    capacity: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
    content: {
      text: "Si",
      disabled: false,
      subText: { state: false, text: "" },
    },
    own: { text: "", disabled: false, subText: { state: false, text: "" } },
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
      { name: "Código" },
      { name: "Capacidad  " },
      { name: "Contenido" },
      { name: "¿de ñuble?" },
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
          code: {
            subText: {
              state: false,
              text: "",
            },
            disabled: true,
            text: current[0],
          },
          capacity: {
            subText: {
              state: true,
              text: current[1],
            },
            disabled: false,
            text: current[1],
          },
          content: {
            subText: {
              state: true,
              text: current[2],
            },
            disabled: false,
            text: current[2],
          },
          own: {
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
          code: {
            subText: {
              state: false,
              text: "",
            },
            disabled: true,
            text: current[0],
          },
          capacity: {
            subText: {
              state: true,
              text: current[1],
            },
            disabled: true,
            text: current[1],
          },
          content: {
            subText: {
              state: true,
              text: current[2],
            },
            disabled: true,
            text: current[2],
          },
          own: {
            subText: {
              state: true,
              text: current[3],
            },
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
        insertCylinders(
          stateForm.code.text,
          listCapacity.filter(
            (list: any) => list.name === stateForm.capacity.text
          )[0].id,
          listContent.filter(
            (list: any) => list.name === stateForm.content.text
          )[0].id,
          stateForm.own.text == "Si" ? 0 : 1
        );

        setStateForm({
          ...stateForm,
          code: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          capacity: {
            subText: { state: false, text: "" },
            text: listCapacity[0]?.name,
            disabled: false,
          },
          content: {
            subText: { state: false, text: "" },
            text: listContent[0]?.name,
            disabled: false,
          },
          own: {
            subText: { state: false, text: "" },
            text: "Si",
            disabled: false,
          },
        });

        break;

      case 1:
        updateCylinders(
          stateForm.code.text,
          listCapacity.filter(
            (list: any) => list.name === stateForm.capacity.text
          )[0].id,
          listContent.filter(
            (list: any) => list.name === stateForm.content.text
          )[0].id,
          stateForm.own.text == "Si" ? 0 : 1
        );
        setStateForm({
          ...stateForm,
          code: {
            text: "",
            disabled: true,
            subText: { state: false, text: "" },
          },
          capacity: {
            text: listCapacity[0]?.name,
            disabled: true,
            subText: { state: false, text: "" },
          },
          content: {
            text: listContent[0]?.name,
            disabled: true,
            subText: { state: false, text: "" },
          },
          own: {
            subText: { state: false, text: "" },
            text: "Si",
            disabled: true,
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
                      deleteCylinders(stateForm.code.text);
                      setStateForm({
                        ...stateForm,
                        code: {
                          subText: { state: false, text: "" },
                          text: "",
                          disabled: true,
                        },
                        capacity: {
                          subText: { state: false, text: "" },
                          text: listCapacity[0]?.name,
                          disabled: true,
                        },
                        content: {
                          subText: { state: false, text: "" },
                          text: listContent[0]?.name,
                          disabled: true,
                        },
                        own: {
                          subText: { state: false, text: "" },
                          text: "Si",
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
    getAllCapacity();
    getAllContent();
    getAllCylinders();
  }, []);

  useEffect(() => {
    switch (menu.currentSelection) {
      case 0:
        setmenu({
          ...menu,
          stateMsj: stateAlertMessages.clients.add.incomplete,
        });
        setStateForm({
          ...stateForm,
          code: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          capacity: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          content: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          own: {
            subText: {
              state: false,
              text: "",
            },
            disabled: false,
            text: "",
          },
          button: { text: "Guardar", disabled: true },
        });
        setStateListAccounts({ ...stateListAccounts, currentSelection: null });
        break;
      case 1:
        setmenu({
          ...menu,
          stateMsj: stateAlertMessages.clients.modify.selectUser,
        });
        setStateForm({
          ...stateForm,
          code: { ...stateForm.code, text: "", disabled: true },
          capacity: { ...stateForm.capacity, text: "", disabled: true },
          content: { ...stateForm.content, text: "", disabled: true },
          own: {
            ...stateForm.own,
            disabled: true,
            text: "",
          },
          button: { text: "Modificar", disabled: true },
        });
        setStateListAccounts({ ...stateListAccounts, currentSelection: null });
        break;
      case 2:
        setmenu({
          ...menu,
          stateMsj: stateAlertMessages.clients.delete.selectUser,
        });
        setStateForm({
          ...stateForm,
          code: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          capacity: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          content: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          own: {
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
    if (listContent.length > 0 && listCapacity.length > 0) {
      setStateForm({
        ...stateForm,
        capacity: { ...stateForm.capacity, text: listCapacity[0]?.name },
        content: { ...stateForm.content, text: listContent[0]?.name },
        own: { ...stateForm.own, text: "Si" },
      });
    }
  }, [listContent, listCapacity]);

  useEffect(() => {
    if (
      stateForm.code.text.length > 4 &&
      stateForm.capacity.text.length > 1 &&
      stateForm.content.text.length > 1 &&
      stateForm.own.text.length > 1
    ) {
      switch (menu.currentSelection) {
        case 0:
          if (
            stateListAccounts.arrayData.filter(
              (list: any) => list[0] === stateForm.code.text
            ).length <= 0
          ) {
            setmenu({
              ...menu,
              stateMsj: stateAlertMessages.clients.add.ready,
            });
            setStateForm({
              ...stateForm,
              button: { text: stateForm.button.text, disabled: false },
            });
          } else {
            setmenu({
              ...menu,
              stateMsj: stateAlertMessages.clients.add.rutExisting,
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
            ][0] === stateForm.code.text &&
            stateListAccounts.arrayData[
              stateListAccounts.currentSelection
            ][1] === stateForm.capacity.text &&
            stateListAccounts.arrayData[
              stateListAccounts.currentSelection
            ][2] === stateForm.content.text &&
            stateListAccounts.arrayData[
              stateListAccounts.currentSelection
            ][3] === stateForm.own.text
          ) {
            setmenu({
              ...menu,
              stateMsj: stateAlertMessages.clients.modify.unmodified,
            });
            setStateForm({
              ...stateForm,
              button: { text: stateForm.button.text, disabled: true },
            });
          } else {
            setmenu({
              ...menu,
              stateMsj: stateAlertMessages.clients.modify.ready,
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
            stateMsj: stateAlertMessages.clients.delete.ready,
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
            stateMsj: stateAlertMessages.clients.add.incomplete,
          });
          break;
        case 1:
          setmenu({
            ...menu,
            stateMsj: stateAlertMessages.clients.modify.selectUser,
          });
          break;
        case 2:
          setmenu({
            ...menu,
            stateMsj: stateAlertMessages.clients.delete.selectUser,
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
    stateForm.code.text,
    stateForm.capacity.text,
    stateForm.content.text,
    stateForm.own.text,
  ]);

  useEffect(() => {
    setStateListAccounts({
      ...stateListAccounts,
      arrayData: listCylinders.map((list: any) => [
        list.code,
        list.capacity,
        list.content,
        list.own === 0 ? "Si" : "No",
      ]),
    });
  }, [listCylinders]);

  useEffect(() => {
    if (cylindersError) {
      setUi({
        modal: {
          state: true,
          type: 1,
          text: "",
          component: (
            <WindowAlert
              title={stateError.cylinders[typeErrorUser].title}
              button={[
                {
                  text: "Aceptar",
                  onClick: () => {
                    setCylinders({ error: false });
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
  }, [cylindersError]);

  useEffect(() => {
    setUi({ titleNavMenu: "Cilindros" });
  }, []);

  useEffect(() => {
    console.log(listContent);
  }, [listContent]);

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
          disabled={stateForm.code.disabled}
          subText={stateForm.code.subText}
          value={stateForm.code.text}
          name="code"
          text="Códe"
        />

        <ComboBox
          disabled={stateForm.capacity.disabled}
          value={stateForm.capacity.text}
          onClick={changeInputs}
          name="capacity"
          text={"Capacidad"}
          arrayOption={listCapacity.map((list: any) => {
            return { name: list.name };
          })}
        />

        <ComboBox
          disabled={stateForm.content.disabled}
          value={stateForm.content.text}
          onClick={changeInputs}
          name="content"
          text="contenido"
          arrayOption={listContent.map((list: any) => {
            return { name: list.name };
          })}
        />

        <ComboBox
          disabled={stateForm.own.disabled}
          value={stateForm.own.text}
          onClick={changeInputs}
          name="own"
          text="¿de ñuble?"
          arrayOption={[
            { id: 0, name: "Si" },
            { id: 1, name: "No" },
          ]}
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
          text="Buscar por Código"
        />
        <Table
          title="Cilindros"
          onClick={onClickTable}
          currentSelection={stateListAccounts.currentSelection}
          arrayTitles={stateListAccounts.arrayTitle}
          arrayData={stateListAccounts.arrayData.filter(
            (list: any) =>
              list[0].toLowerCase().slice(0, stateForm.search.text.length) ==
              stateForm.search.text.toLowerCase()
          )}
        />
      </div>
    </div>
  );
};

export default CrudCylinders;
