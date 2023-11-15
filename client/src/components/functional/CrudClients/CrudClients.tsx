import styles from "./CrudClients.module.scss";
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
import { useUi, useClients } from "@/store/hooks";
import WindowAlert from "@/components/ui/WindowAlert/WindowAlert";

const CrudClients = () => {
  const {
    setClients,
    getAllClients,
    insertClients,
    updateClients,
    deleteClients,
    listClients,
    clientsError,
    typeError,
  } = useClients();

  const [stateForm, setStateForm] = useState<any>({
    rutBusiness: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
    nameBusiness: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
    nameManager: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
    addressBusiness: {
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

  const { setUi, resetModal } = useUi();

  const [menu, setmenu] = useState({
    currentSelection: 0,
    stateMsj: "",
    stateMsjClients: "...",
    list: [{ name: "Agregar" }, { name: "Modificar" }, { name: "Eliminar" }],
  });

  const [listBusiness, setListBusiness] = useState<any>({
    currentSelection: null,
    arrayTitle: [
      { name: "Rut Empresa" },
      { name: "Razon social" },
      { name: "Encargado" },
      { name: "Dirección" },
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
          rutBusiness: {
            subText: {
              state: false,
              text: "",
            },
            disabled: true,
            text: current[0],
          },
          nameBusiness: {
            subText: {
              state: true,
              text: current[1],
            },
            disabled: false,
            text: current[1],
          },
          nameManager: {
            subText: {
              state: true,
              text: current[2],
            },
            disabled: false,
            text: current[2],
          },
          addressBusiness: {
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
          rutBusiness: {
            subText: {
              state: false,
              text: "",
            },
            disabled: true,
            text: current[0],
          },
          nameBusiness: {
            subText: {
              state: false,
              text: "",
            },
            disabled: true,
            text: current[1],
          },
          nameManager: {
            subText: {
              state: false,
              text: "",
            },
            disabled: true,
            text: current[2],
          },
          addressBusiness: {
            subText: {
              state: false,
              text: "",
            },
            disabled: true,
            text: current[3],
          },
        });
        break;

      default:
        break;
    }
    setmenu({ ...menu, stateMsjClients: current[1] });

    setListBusiness({ ...listBusiness, currentSelection: index });
  };

  const onClickAction = () => {
    switch (menu.currentSelection) {
      case 0:
        insertClients(
          stateForm.rutBusiness.text,
          stateForm.nameBusiness.text,
          stateForm.nameManager.text,
          stateForm.addressBusiness.text
        );
        setStateForm({
          ...stateForm,
          rutBusiness: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          nameBusiness: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          nameManager: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          addressBusiness: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
        });

        break;

      case 1:
        updateClients(
          stateForm.rutBusiness.text,
          stateForm.nameBusiness.text,
          stateForm.nameManager.text,
          stateForm.addressBusiness.text
        );
        setStateForm({
          ...stateForm,
          rutBusiness: {
            text: "",
            disabled: true,
            subText: { state: false, text: "" },
          },
          nameBusiness: {
            text: "",
            disabled: true,
            subText: { state: false, text: "" },
          },
          nameManager: {
            text: "",
            disabled: true,
            subText: { state: false, text: "" },
          },
          addressBusiness: {
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
                      deleteClients(stateForm.rutBusiness.text);
                      setStateForm({
                        ...stateForm,
                        rutBusiness: {
                          text: "",
                          disabled: true,
                          subText: { state: false, text: "" },
                        },
                        nameBusiness: {
                          text: "",
                          disabled: true,
                          subText: { state: false, text: "" },
                        },
                        nameManager: {
                          text: "",
                          disabled: true,
                          subText: { state: false, text: "" },
                        },
                        addressBusiness: {
                          text: "",
                          disabled: true,
                          subText: { state: false, text: "" },
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
    getAllClients();
  }, []);

  useEffect(() => {
    switch (menu.currentSelection) {
      case 0:
        setmenu({
          ...menu,
          stateMsj: stateAlertMessages.clients.add.incomplete,
          stateMsjClients: "...",
        });
        setStateForm({
          ...stateForm,
          rutBusiness: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          nameBusiness: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          nameManager: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          addressBusiness: {
            subText: { state: false, text: "" },
            text: "",
            disabled: false,
          },
          button: { text: "Guardar", disabled: true },
        });
        setListBusiness({
          ...listBusiness,
          currentSelection: null,
        });
        break;
      case 1:
        setmenu({
          ...menu,
          stateMsj: stateAlertMessages.clients.modify.selectUser,
          stateMsjClients: "...",
        });
        setStateForm({
          ...stateForm,
          rutBusiness: { ...stateForm.code, text: "", disabled: true },
          nameBusiness: { ...stateForm.capacity, text: "", disabled: true },
          nameManager: { ...stateForm.content, text: "", disabled: true },
          addressBusiness: { ...stateForm.content, text: "", disabled: true },
          button: { text: "Modificar", disabled: true },
        });
        setListBusiness({
          ...listBusiness,
          currentSelection: null,
        });
        break;
      case 2:
        setmenu({
          ...menu,
          stateMsj: stateAlertMessages.clients.delete.selectUser,
          stateMsjClients: "...",
        });
        setStateForm({
          ...stateForm,
          rutBusiness: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          nameBusiness: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          nameManager: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          addressBusiness: {
            subText: { state: false, text: "" },
            text: "",
            disabled: true,
          },
          button: { text: "Eliminar", disabled: true },
        });
        setListBusiness({
          ...listBusiness,
          currentSelection: null,
        });
        break;
      default:
        break;
    }
  }, [menu.currentSelection]);

  useEffect(() => {
    if (
      stateForm.rutBusiness.text.length > 1 &&
      stateForm.nameBusiness.text.length > 1 &&
      stateForm.nameManager.text.length > 1 &&
      stateForm.addressBusiness.text.length > 1
    ) {
      switch (menu.currentSelection) {
        case 0:
          if (
            listBusiness.arrayData.filter(
              (list: any) => list[0] === stateForm.rutBusiness.text
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
            listBusiness.arrayData[listBusiness.currentSelection][0] ===
              stateForm.rutBusiness.text &&
            listBusiness.arrayData[listBusiness.currentSelection][1] ===
              stateForm.nameBusiness.text &&
            listBusiness.arrayData[listBusiness.currentSelection][2] ===
              stateForm.nameManager.text &&
            listBusiness.arrayData[listBusiness.currentSelection][3] ===
              stateForm.addressBusiness.text
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
    stateForm.rutBusiness.text,
    stateForm.nameBusiness.text,
    stateForm.nameManager.text,
    stateForm.addressBusiness.text,
  ]);

  useEffect(() => {
    setListBusiness({
      ...listBusiness,
      arrayData: listClients.map((list: any) => [
        list.rut,
        list.name,
        list.nameManager,
        list.address,
      ]),
    });
  }, [listClients]);

  useEffect(() => {
    if (clientsError) {
      setUi({
        modal: {
          state: true,
          type: 1,
          text: "",
          component: (
            <WindowAlert
              title={stateError.clients[typeError].title}
              button={[
                {
                  text: "Aceptar",
                  onClick: () => {
                    setClients({ error: false });
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
  }, [clientsError]);

  useEffect(() => {
    setUi({ titleNavMenu: "Clientes" });
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
          disabled={stateForm.rutBusiness.disabled}
          subText={stateForm.rutBusiness.subText}
          value={stateForm.rutBusiness.text}
          name="rutBusiness"
          text="Rut empresa"
        />
        <Input
          Only="all"
          onChange={changeInputs}
          disabled={stateForm.nameBusiness.disabled}
          subText={stateForm.nameBusiness.subText}
          value={stateForm.nameBusiness.text}
          name="nameBusiness"
          width="12rem"
          text="Razón social"
        />
        <Input
          onChange={changeInputs}
          disabled={stateForm.nameManager.disabled}
          subText={stateForm.nameManager.subText}
          value={stateForm.nameManager.text}
          name="nameManager"
          width="12rem"
          text="Encargado"
        />
        <Input
          onChange={changeInputs}
          disabled={stateForm.addressBusiness.disabled}
          subText={stateForm.addressBusiness.subText}
          value={stateForm.addressBusiness.text}
          width="12rem"
          name="addressBusiness"
          text="Dirección"
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
          text="Buscar razón social"
        />
     
        <Table
          title="Clientes"
          onClick={onClickTable}
          currentSelection={listBusiness.currentSelection}
          arrayTitles={listBusiness.arrayTitle}
          arrayData={listBusiness.arrayData.filter(
            (list: any) =>
              list[1].toLowerCase().slice(0, stateForm.search.text.length) ==
              stateForm.search.text.toLowerCase()
          )}
        />
        <AlertMessages text={menu.stateMsjClients} />
      </div>
    </div>
  );
};

export default CrudClients;
