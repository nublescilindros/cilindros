import Table from "@/components/ui/Table/Table";
import estyles from "./FormCylinders.module.scss";

import { useState, useEffect } from "react";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import AlertMessages from "@/components/ui/AlertMessages/AlertMessages";
import MenuButtons from "@/components/ui/MenuButton/MenuButtons";
import ComboBox from "@/components/ui/ComboBox/ComboBox";
import { useCylinders, useFormCylinders, useUi, useUser } from "@/store/hooks";
import { stateAlertMessages, stateMessagesModal } from "@/utils/constant";
import WindowAlert from "@/components/ui/WindowAlert/WindowAlert";
import { config } from "@/utils/config";

/* 
0 vacio
1 disponible
2 solicitado
3 entregado
4 retirando
 */

const FormCylinders = () => {
  const { setUi, resetModal } = useUi();
  const {
    getAllCylinders,
    getAllCapacity,
    getAllContent,
    listCapacity,
    listContent,
    listCylinders,
  } = useCylinders();

  const {
    listCompanyCylindersCount,
    listCylindersCompany,
    pdfStateGenerate,
    getAllCompanyCylindersCount,
    getAllCylindersCompany,
    updateCylinderState,
    updateCylinderRequestAndReception,
    generatePdfCylinderCompany,
  } = useFormCylinders();

  const { listAccounts, getAllAccounts } = useUser();

  const [menu, setmenu] = useState({
    currentSelection: 0,
    stateMsj: "",
    list: [{ name: "Vacios" }, { name: "Solicitudes" }],
  });

  const [stateFormCompany, setStateFormCompany] = useState<any>({
    filterCompany: {
      text: "Razón social",
      disabled: false,
      subText: { state: false, text: "" },
    },
    searchCompany: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
  });

  const [stateFormCylinders, setStateFormCylinders] = useState<any>({
    capacity: {
      text: "10m3",
      disabled: false,
      subText: { state: false, text: "" },
    },
    content: {
      text: "Argon /Mix20",
      disabled: false,
      subText: { state: false, text: "" },
    },
    searchCylinders: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
  });

  const [stateFormAssign, setStateFormAssign] = useState<any>({
    buttonSelect: {
      text: "Seleccionar",
      disabled: true,
    },
    buttonCancel: {
      text: "Cancelar",
      disabled: false,
    },
    buttonAction: {
      text: "",
      disabled: true,
    },
    buttonPdf: {
      text: "Exportar pdf",
      disabled: true,
    },
  });

  const [stateListCompany, setStateListCompany] = useState<any>({
    currentSelection: null,
    dataSelect: {},
    arrayTitle: [
      { name: "Razón Social" },
      { name: "Rut" },
      { name: "Nombre Encargado" },
      { name: "Cantidad Cilindros" },
    ],
    arrayData: [],
  });

  const [stateCylindersCompany, setStateCylindersCompany] = useState<any>({
    currentSelection: null,
    dataSelect: {},
    arrayTitle: [
      { name: "Código" },
      { name: "Contenido" },
      { name: "Capacidad" },
      { name: "¿de ñuble?" },
      { name: "nombre responsable" },
      { name: "Estado" },
    ],
    arrayData: [],
  });

  const [stateListCylinders, setStateListCylinders] = useState<any>({
    currentSelection: null,
    dataSelect: {},
    arrayTitle: [
      { name: "Código" },
      { name: "Contenido" },
      { name: "Capacidad" },
      { name: "¿de ñuble?" },
    ],
    arrayData: [],
  });

  const [stateListAccounts, setStateListAccounts] = useState<any>({
    currentSelection: null,
    dataSelect: {},
    arrayTitle: [{ name: "Nombre" }, { name: "Rut" }],
    arrayData: [],
  });

  const changeDisabledCompany = (state: boolean) => {
    let newStateCompany = {};
    state
      ? (newStateCompany = {
          ...stateListCompany,
          dataSelect: {},
          currentSelection: null,
          arrayData: [],
        })
      : (newStateCompany = {
          ...stateListCompany,
          /*      currentSelection: null, */
          arrayData: listCompanyCylindersCount.map((list: any) => [
            list.businessName,
            list.businessRut,
            list.nameManager,
            list.cylindersCount,
          ]),
        });

    setStateListCompany(newStateCompany);
    setStateFormCompany({
      searchCompany: { ...stateFormCompany.searchCompany, disabled: state },
      filterCompany: { ...stateFormCompany.filterCompany, disabled: state },
    });
  };

  const changeDisabledCylinders = (state: boolean) => {
    let newStateCylinders = {};

    state
      ? (newStateCylinders = {
          ...stateListCylinders,
          dataSelect: {},
          currentSelection: null,
          arrayData: [],
        })
      : (newStateCylinders = {
          ...stateListCylinders,
          dataSelect: {},
          currentSelection: null,
          arrayData: listCylinders
            .filter(
              (filterList: any) =>
                filterList.stateCylinders === menu.currentSelection
            )
            .map((listMap: any) => [
              listMap.code,
              listMap.content,
              listMap.capacity,
              listMap.own === 0 ? "Si" : "No",
            ]),
        });

    setStateListCylinders(newStateCylinders);
    setStateFormCylinders({
      searchCylinders: {
        ...stateFormCylinders.searchCylinders,
        disabled: state,
      },
      content: { ...stateFormCylinders.content, disabled: state },
      capacity: { ...stateFormCylinders.capacity, disabled: state },
    });
    setStateCylindersCompany({
      ...stateCylindersCompany,
      dataSelect: {},
      currentSelection: null,
      arrayData: [],
    });
  };

  const changeDisabledAssign = (
    state0: boolean,
    state1: boolean,
    state2: boolean,
    textAction: string = menu.currentSelection === 0 ? "Disponer" : "Solicitar"
  ) => {
    setStateFormAssign({
      ...stateFormAssign,
      buttonSelect: {
        ...stateFormAssign.stateFormAssign,
        disabled: state0,
      },
      buttonCancel: {
        ...stateFormAssign.rutAccounts,
        disabled: state1,
      },
      buttonAction: {
        ...stateFormAssign.stateFormAssign,
        text: textAction,
        disabled: state2,
      },
    });
  };

  const changeInputs = (e: any, set: any, state: any) => {
    set({
      ...state,
      [e.currentTarget.name]: {
        ...state[e.currentTarget.name],
        text: e.currentTarget.value,
      },
    });
  };

  const onClickTableCylindersCompanyCount = (data: any, index: number) => {
    if (data[3] > 0) {
      getAllCylindersCompany(data[1]);
    } else {
      setStateCylindersCompany({
        ...stateCylindersCompany,
        arrayData: [],
      });
    }
    changeDisabledCylinders(false);
    setStateListCompany({
      ...stateListCompany,
      dataSelect: data,
      currentSelection: index,
    });
    setmenu({
      ...menu,
      stateMsj: stateAlertMessages.formCylinders.selectCompany(data[0]),
    });
    changeDisabledAssign(true, false, true);
  };

  const onClickTableCylindersCompany = (data: any, index: number) => {
    if (data[5] === "En uso") {
      setStateCylindersCompany({
        ...stateCylindersCompany,
        dataSelect: data,
        currentSelection: index,
      });
      setStateListCylinders({ ...stateListCylinders, currentSelection: null });
    }
  };

  const onClickTableCylinders = (data: any, index: number) => {
    setStateListCylinders({
      ...stateListCylinders,
      dataSelect: data,
      currentSelection: index,
    });
  };

  const onClickTableAccounts = (data: any, index: number) => {
    setStateListAccounts({
      ...stateListAccounts,
      dataSelect: data,
      currentSelection: index,
    });

    if (stateCylindersCompany.currentSelection != null) {
      changeDisabledAssign(false, false, false, "Retirar");
    } else {
      changeDisabledAssign(false, false, false, "Solicitar");
    }
  };

  const onClickButtonAssign = () => {
    switch (menu.currentSelection) {
      case 0:
        setUi({
          modal: {
            state: true,
            type: 1,
            text: "",
            component: (
              <WindowAlert
                title={stateMessagesModal.formCylinder[0].title}
                button={[
                  {
                    text: "Aceptar",
                    onClick: () => {
                      let codCylinder = stateListCylinders.arrayData.filter(
                        (list: any) =>
                          list[0]
                            .toLowerCase()
                            .slice(
                              0,
                              stateFormCylinders.searchCylinders.text.length
                            ) ==
                            stateFormCylinders.searchCylinders.text.toLowerCase() &&
                          list[1] == stateFormCylinders.content.text &&
                          list[2] == stateFormCylinders.capacity.text
                      )[stateListCylinders.currentSelection][0];
                      updateCylinderState(codCylinder, 1);
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

      case 1:
        setUi({
          modal: {
            state: true,
            type: 1,
            text: "",
            component: <TableAccounts />,
          },
        });

      default:
        break;
    }
  };

  const onClickButtonPdf = () => {
    generatePdfCylinderCompany({
      company: stateListCompany.arrayData.filter((list: any) => {
        let currentFilter = 0;
        switch (stateFormCompany.filterCompany.text) {
          case "Razón social":
            currentFilter = 0;
            break;
          case "Rut":
            currentFilter = 1;
            break;
          default:
            break;
        }
        return (
          list[currentFilter]
            ?.toLowerCase()
            .slice(0, stateFormCompany.searchCompany.text.length) ==
          stateFormCompany.searchCompany.text.toLowerCase()
        );
      })[stateListCompany.currentSelection],
      list: stateCylindersCompany.arrayData,
    });

    stateFormAssign.buttonPdf.disabled;
   
  };

  const TableAccounts = () => (
    <div className={estyles.containerPersonal}>
      <Table
        title="Personal responsable"
        onClick={(data: any, index: number) => {
          onClickTableAccounts(data, index);
        }}
        currentSelection={stateListAccounts.currentSelection}
        arrayTitles={stateListAccounts.arrayTitle}
        arrayData={stateListAccounts.arrayData}
      />
      <div>
        <Button
          disabled={stateFormAssign.buttonSelect.disabled}
          onclick={() => {
            let rutBusiness = stateListCompany.dataSelect[1];
            let codCylinder = stateListCylinders.dataSelect[0];
            let rutAccounts = stateListAccounts.dataSelect[1];

            if (stateCylindersCompany.currentSelection != null) {
              updateCylinderRequestAndReception(
                rutBusiness,
                stateCylindersCompany.dataSelect[0],
                rutAccounts,
                4
              );
              setStateCylindersCompany({
                ...stateCylindersCompany,
                currentSelection: null,
              });
              setStateListAccounts({
                ...stateListAccounts,
                dataSelect: {},
                currentSelection: null,
              });
              return;
            }

            updateCylinderRequestAndReception(
              rutBusiness,
              codCylinder,
              rutAccounts,
              2
            );
            resetModal();
            setStateListAccounts({
              ...stateListAccounts,
              dataSelect: {},
              currentSelection: null,
            });
          }}
          text={"Seleccionar"}
        />
        <Button
          disabled={stateFormAssign.buttonCancel.disabled}
          onclick={() => {
            resetModal();
            setStateListAccounts({
              ...stateListAccounts,
              dataSelect: {},
              currentSelection: null,
            });
            setStateListCylinders({
              ...stateListCylinders,
              dataSelect: {},
              currentSelection: null,
            });

            setStateCylindersCompany({
              ...stateCylindersCompany,
              dataSelect: {},
              currentSelection: null,
            });

            if (stateCylindersCompany.currentSelection != null) {
              changeDisabledAssign(true, false, true, "Retirar");
            }
          }}
          text={"Cancelar"}
        />
      </div>
    </div>
  );

  useEffect(() => {
    if (pdfStateGenerate === true) {
      fetch(`${config.api}/files/pdf/infoPdf.pdf`)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "infoPdf.pdf";
          link.click();
        })
        .catch(console.error);
    }
  }, [pdfStateGenerate]); 

  useEffect(() => {
    getAllCylinders();
    getAllCapacity();
    getAllContent();
    getAllCompanyCylindersCount();
    getAllAccounts();
  }, []);

  useEffect(() => {
    if (listCylinders.length > 0 && listCompanyCylindersCount.length > 0) {
      switch (menu.currentSelection) {
        case 0:
          setmenu({
            ...menu,
            stateMsj: stateAlertMessages.formCylinders.menuEmptyCylinder,
          });
          changeDisabledCompany(true);
          changeDisabledCylinders(false);
          changeDisabledAssign(true, false, true, "Disponer");
          break;
        case 1:
          setmenu({
            ...menu,
            stateMsj: stateAlertMessages.formCylinders.menuDisposeCylinder,
          });

          if (stateListCylinders.currentSelection != null) {
            changeDisabledAssign(true, false, true, "Solicitar");
            setmenu({
              ...menu,
              stateMsj: stateAlertMessages.formCylinders.selectCompany(
                stateListCompany.dataSelect[0]
              ),
            });
            changeDisabledCompany(false);
            changeDisabledCylinders(false);
            return;
          } else {
            changeDisabledCompany(false);
            changeDisabledCylinders(false);
            changeDisabledAssign(true, false, true, "Retirar");
          }

          break;
        default:
          break;
      }
    }
  }, [menu.currentSelection, listCylinders, listCompanyCylindersCount]);

  useEffect(() => {
    listCylindersCompany.length > 0
      ? setStateCylindersCompany({
          ...stateCylindersCompany,
          arrayData: listCylindersCompany.map((list: any) => {
            let nameState = "";
            switch (list.stateCylinders) {
              case 2:
                nameState = "Pendiende";
                break;
              case 3:
                nameState = "En uso";
                break;
              case 4:
                nameState = "Retirando";
                break;
              default:
                break;
            }

            return [
              list.code,
              list.content,
              list.capacity,
              list.own === 0 ? "Si" : "No",
              list.nameAccounts,
              nameState,
            ];
          }),
        })
      : setStateCylindersCompany({
          ...stateCylindersCompany,
          arrayData: [],
        });
  }, [listCylindersCompany]);

  useEffect(() => {
    if (listCapacity.length > 0 && listContent.length > 0) {
      setStateFormCylinders({
        ...stateFormCylinders,
        content: { ...stateFormCylinders.content, text: listContent[0].name },
        capacity: {
          ...stateFormCylinders.capacity,
          text: listCapacity[0].name,
        },
      });
    }
  }, [listCapacity, listContent]);

  useEffect(() => {
    if (stateListCylinders.currentSelection != null) {
      switch (menu.currentSelection) {
        case 0:
          changeDisabledAssign(true, false, false);

          break;
        case 1:
          if (stateListCompany.currentSelection != null) {
            changeDisabledAssign(true, false, false);
            setStateCylindersCompany({
              ...stateCylindersCompany,
              currentSelection: null,
            });
          }

          break;
        default:
          break;
      }
    } else {
      changeDisabledAssign(true, true, true);
      setStateListAccounts({
        ...stateListAccounts,
        dataSelect: {},
        currentSelection: null,
      });
      /*  } */
    }
  }, [stateListCylinders.currentSelection]);

  useEffect(() => {
    if (stateCylindersCompany.currentSelection != null) {
      changeDisabledAssign(true, false, false, "Retirar");
    }
  }, [stateCylindersCompany.currentSelection]);

  useEffect(() => {
    if (listAccounts.length > 0) {
      setStateListAccounts({
        ...stateListAccounts,
        arrayData: listAccounts.map((list: any) => [list.name, list.rut]),
      });
    }
  }, [listAccounts]);

  useEffect(() => {
    if (stateListAccounts.currentSelection != null) {
      setUi({
        modal: {
          state: true,
          type: 1,
          text: "",
          component: <TableAccounts />,
        },
      });
    }
  }, [stateListAccounts.currentSelection]);

  useEffect(() => {
    if (stateListCompany.currentSelection !== null) {
      setStateFormAssign({
        ...stateFormAssign,
        buttonPdf: { ...stateFormAssign.buttonPdf, disabled: false },
      });
    }else{
      setStateFormAssign({
        ...stateFormAssign,
        buttonPdf: { ...stateFormAssign.buttonPdf, disabled: true },
      });
    }
  }, [stateListCompany.currentSelection]);

  return (
    <div className={estyles.container}>
      <div>
        <MenuButtons
          menu={menu}
          onClick={(index: number) =>
            setmenu({ ...menu, currentSelection: index })
          }
        />
      </div>

      <div>
        <div>
          <Input
            Only="all"
            onChange={(e: any) => {
              changeInputs(e, setStateFormCompany, stateFormCompany);
              setStateListCompany({
                ...stateListCompany,
                dataSelect: {},
                currentSelection: null,
              });
            }}
            disabled={stateFormCompany.searchCompany.disabled}
            subText={stateFormCompany.searchCompany.subText}
            value={stateFormCompany.searchCompany.text}
            name="searchCompany"
            text="Buscar"
          />
          <ComboBox
            disabled={stateFormCompany.filterCompany.disabled}
            value={stateFormCompany.filterCompany.text}
            onClick={(e: any) =>
              changeInputs(e, setStateFormCompany, stateFormCompany)
            }
            name="filterCompany"
            text="Filtro"
            arrayOption={[{ name: "Razón social" }, { name: "Rut" }]}
          />
        </div>

        <Table
          title="Empresas"
          height="4.5rem"
          onClick={onClickTableCylindersCompanyCount}
          currentSelection={stateListCompany.currentSelection}
          arrayTitles={stateListCompany.arrayTitle}
          arrayData={stateListCompany.arrayData.filter((list: any) => {
            let currentFilter = 0;
            switch (stateFormCompany.filterCompany.text) {
              case "Razón social":
                currentFilter = 0;
                break;
              case "Rut":
                currentFilter = 1;
                break;
              default:
                break;
            }
            return (
              list[currentFilter]
                ?.toLowerCase()
                .slice(0, stateFormCompany.searchCompany.text.length) ==
              stateFormCompany.searchCompany.text.toLowerCase()
            );
          })}
        />
        <Table
          title="Cilindros solicitados"
          height="5rem"
          onClick={onClickTableCylindersCompany}
          currentSelection={stateCylindersCompany.currentSelection}
          arrayTitles={stateCylindersCompany.arrayTitle}
          arrayData={stateCylindersCompany.arrayData}
        />
      </div>

      <AlertMessages text={menu.stateMsj} />
      <div>
        <Button
          disabled={stateFormAssign.buttonAction.disabled}
          onclick={onClickButtonAssign}
          text={stateFormAssign.buttonAction.text}
        />
        <Button
          disabled={stateFormAssign.buttonPdf.disabled}
          onclick={onClickButtonPdf}
          text={stateFormAssign.buttonPdf.text}
        />
      </div>

      <div>
        <div>
          <Input
            Only="all"
            onChange={(e: any) => {
              changeInputs(e, setStateFormCylinders, stateFormCylinders);
              setStateListCylinders({
                ...stateListCylinders,
                dataSelect: {},
                currentSelection: null,
              });
            }}
            disabled={stateFormCylinders.searchCylinders.disabled}
            subText={stateFormCylinders.searchCylinders.subText}
            value={stateFormCylinders.searchCylinders.text}
            name="searchCylinders"
            text="Cilindros"
          />
          <ComboBox
            disabled={stateFormCylinders.content.disabled}
            value={stateFormCylinders.content.text}
            onClick={(e: any) => {
              changeInputs(e, setStateFormCylinders, stateFormCylinders);
              setStateListCylinders({
                ...stateListCylinders,
                dataSelect: {},
                currentSelection: null,
              });
            }}
            name="content"
            text="contenido"
            arrayOption={listContent.map((list: any) => {
              return { name: list.name };
            })}
          />
          <ComboBox
            disabled={stateFormCylinders.capacity.disabled}
            value={stateFormCylinders.capacity.text}
            onClick={(e: any) => {
              changeInputs(e, setStateFormCylinders, stateFormCylinders);
              setStateListCylinders({
                ...stateListCylinders,
                dataSelect: {},
                currentSelection: null,
              });
            }}
            name="capacity"
            text={"Capacidad"}
            arrayOption={listCapacity.map((list: any) => {
              return { name: list.name };
            })}
          />
        </div>

        <Table
          title={`Cilindros ${
            menu.currentSelection == 0 ? "vacios" : "disponibles"
          }`}
          onClick={onClickTableCylinders}
          currentSelection={stateListCylinders.currentSelection}
          arrayTitles={stateListCylinders.arrayTitle}
          arrayData={stateListCylinders.arrayData.filter(
            (list: any) =>
              list[0]
                .toLowerCase()
                .slice(0, stateFormCylinders.searchCylinders.text.length) ==
                stateFormCylinders.searchCylinders.text.toLowerCase() &&
              list[1] == stateFormCylinders.content.text &&
              list[2] == stateFormCylinders.capacity.text
          )}
        />
      </div>
    </div>
  );
};

export default FormCylinders;
