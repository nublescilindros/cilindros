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
    getAllCompanyCylindersCount,
    getAllCylindersCompany,
    updateCylinderState,
    updateCylinderRequestAndReception,
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
      { name: "¿de ñubles?" },
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
      { name: "¿de ñubles?" },
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
    console.log(data)

    if (data[3] > 0) {
      console.log(data)
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
console.log(listCylindersCompany);

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
      /*       if (stateCylindersCompany.currentSelection != null) {
        changeDisabledAssign(true, false, false, "Retirar");
      } else { */
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



let asd = `
58081,	       1, 20	CILINDRO ALTA PRESION 200 BAR 10.0	
77542,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
73992,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
76279,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
732798726,     4,	CILINDRO ALTA PRESION 200 BAR 10.0
93550,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
87217,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
1007754,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
56557,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
58085,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
58754,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
60660,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
59509,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
61440,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
62326,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
62801,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
66780,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
68923,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
69141,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
69966A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
71066,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
7160A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
71693,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
72784,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
73029,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
73278486,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
43402,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
43654,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
471B,	         4,	CILINDRO ALTA PRESION 200 BAR 10.0
5038F,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
50398,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
507B,	         4,	CILINDRO ALTA PRESION 200 BAR 10.0
5121A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
5177C,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
52478,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
53558,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
53829,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
55127A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
55351,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
56045A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
55071,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
55103B,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
56740,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
1009032,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
101766,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
102385,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
102773,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
11205,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
10957,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
1158F,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
11771,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
13111,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
1772,	         4,	CILINDRO ALTA PRESION 200 BAR 10.0
2046A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
2136C,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
22077,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
24979A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
2823520,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
2872C,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
3057110,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
3057277,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
3076176,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
3076388,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
3101092,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
3101183,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
3149638,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
3151117,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
4139A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
4273,	         4,	CILINDRO ALTA PRESION 200 BAR 10.0
77879,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
79047,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
79344,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
8021D,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
79670,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
80880A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
732930763,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732931046,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
73279240,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
732798326,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732798521,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732798692,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732798761,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732800219,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732800264,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732800326,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732800354,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732800555,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732799763,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732799941,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732800781,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732801437,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732802790,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732925011,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732925267,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732925275,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732925349,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732925760,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732802136,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732927067,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732927137,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732926643,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732927861,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732928335,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
732928782,	   4,	CILINDRO ALTA PRESION 200 BAR 10.0
8161A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
82417,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
82596,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
83495,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
84976,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
85288,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
84541,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
8575344,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
8575445,	     4,	CILINDRO ALTA PRESION 200 BAR 10.0
86788,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
86993,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
87641,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
87952,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
88971,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
90079,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
9031D,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
90411,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
90504,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
90510,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
90548,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
90920,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
90954,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
9129B,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
91478,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
92569,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
92765A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
93062,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
94666A,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
94599,	       4,	CILINDRO ALTA PRESION 200 BAR 10.0
8631177,	     4,	CILINDRO ALTA PRESION 150 BAR 6	
86537,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
8575651,	     NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
85870,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
82233,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
8575272,	     NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
85390,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
86758,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
94485B,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
93760,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
93851B,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
930184,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
732799017,	   NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
8105G,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
80017,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
79009,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
8065C,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
80272A,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
76501,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
76506A,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
42211A,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
12884,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
1008799,	     NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
57185,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
53902,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
5043D,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
5025B,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
68604,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
62035,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 200 BAR 10.0
60301,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 150 BAR 6	
71642A,	       NITROGENO GASEOSO	CILINDRO ALTA PRESION 150 BAR 6	
9521,	         NITROGENO GASEOSO	CILINDRO ALTA PRESION 150 BAR 6	
89581,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
90260,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
91926,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
87457,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
8780425,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
88159,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
88281,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
85404A,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
83417,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
83456,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
82687,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
81998,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
82230,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
8575527,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
8575624,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
76923,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
76963,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
75778,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
75929,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
78768,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
78330,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
8153F,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732931174,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732929754,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732929918,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732931618,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732931346,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732931352,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732931356,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732931432,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732931438,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
73605,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732798504,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732800728,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732927531,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732927573,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732927630,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732927638,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732926683,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732927429,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732927455,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732927500,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732927517,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732926011,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732926227,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732925877,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
732926101,	   ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
71541,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
71551,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
72872,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
68843,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
72729,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
71168,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
71189,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
7052B,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
70819,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
713635,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
6032B,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
58301,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0
5807,	         ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	
6123681,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	
62166,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	
62186,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	
61669,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	
62608,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	
68671,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	
67950,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	
6655194,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	13-07-2023
50385,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	12-06-2020
4410A,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	06-01-2023
453B,	         ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
456523,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	04-04-2022
5100D,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
52499,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	16-05-2023
53916,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	24-08-2021
461,	         ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	16-02-2022
52421,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	17-05-2023
54568,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	16-05-2023
54852A,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
57963,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
55121,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	06-02-2020
56697,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	28-09-2023
56218,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
56386A,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	21-12-2020
1007374,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	06-01-2022
101885,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	19-05-2023
101441,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
1141463,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	17-05-2023
1144D,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	30-01-2023
11557,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	13-07-2023
1039979,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	11-02-2022
1049B,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	16-05-2023
107801,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	18-02-2020
22607A,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	01-07-2022
22796,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	28-05-2021
150221,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
124,	         ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	26-05-2022
1347,	         ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	19-05-2023
11851,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	28-09-2023
11980,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	28-07-2022
1205151,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	13-07-2023
3057016,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	24-03-2023
3076252,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	05-04-2022
3076273,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
3100979,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	06-07-2023
3075878,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	16-05-2023
3076031,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	28-09-2023
3076092,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	17-05-2023
23245,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	19-08-2021
23326,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	17-05-2023
23472,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	14-07-2023
23908,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	09-05-2023
24283,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
43109A,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
4190A,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
316030,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
3149530,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
3150634,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	23-07-2020
3578688,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
383290,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	09-03-2023
41269,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	29-08-2023
413187,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	13-07-2023
413218,	       ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	15-01-2023
3147095,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
3443697,	     ARGON GASEOSO WELDING	CILINDRO ALTA PRESION 200 BAR 10.0	17-03-2023
3443897,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-07-2023
3447038,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	13-07-2023
3447061,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	21-06-2019
3534,	         AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
3578434,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
3578436,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	10-08-2023
3578453,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
3118820,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	19-11-2021
3149706,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
3149969,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-10-2022
3150137,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	25-04-2023
3150289,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	23-08-2022
3151222,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	01-12-2021
3182B,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	28-08-2023
32118A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-07-2023
42978,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	17-07-2023
24476,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
24488A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	15-09-2021
24758,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-04-2022
24206,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	02-03-2023
23258,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
25435,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	22-09-2022
2993966,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-07-2020
3002A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-07-2023
3076099,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-07-2023
3063426,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	06-06-2023
3063681,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	17-08-2022
3063935,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
3063945,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	17-05-2023
3075875,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
3076834,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
3076270,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-08-2023
12155,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	25-10-2022
12238,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-07-2023
1236161,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
11802A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	09-03-2023
102671,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	13-04-2023
1174,	         AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-08-2023
13520,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-08-2023
13542,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-06-2023
1405A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-04-2021
12409,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-03-2023
13468,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	04-08-2022
1505719,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
199944,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-04-2023
210341,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	15-02-2022
2112E,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
23077,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-07-2019
232038,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-08-2023
22608,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
2182A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-08-2023
21864,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-07-2023
220152,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
22023,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	22-09-2022
1086D,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	28-08-2023
102839,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-08-2023
102941,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
10378,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-05-2023
1156E,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	06-06-2023
1097A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	03-08-2023
101473,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
102289,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
102386,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-03-2021
102493,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	17-07-2023
102514,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	03-12-2020
1007384,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	09-03-2023
1007469,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-07-2023
1008788,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-06-2023
1007125,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
1007364,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
56693,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-07-2022
58029,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
57005,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	10-08-2023
57277,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	15-06-2023
57572,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-08-2023
54941A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	15-06-2023
55050B,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	25-02-2020
54584,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-09-2022
54629,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-01-2023
556,	         AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
55722,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
55911,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
53696,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	15-06-2023
52693,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-06-2023
52732,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
52845,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
52953,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
53131,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
53400,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-07-2023
535,	         AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-06-2023
5186F,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
52191,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
52306,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	09-12-2019
51226,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	19-07-2022
51535,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
51686,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-08-2023
51062,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	10-04-2023
50885,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-06-2023
5069B,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
473,	         AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
5018B,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
66628,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
63084,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-07-2023
686915,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
62633,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	06-06-2023
624743,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
59941,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-01-2021
60165,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
6079B,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
6106C,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
61147,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	04-07-2023
59062,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-12-2022
59201,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-05-2023
60373,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-08-2023
606,	         AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	02-03-2023
60654,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-06-2023
71484,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	17-07-2023
71507,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-04-2022
70880,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-08-2023
7122E,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	11-07-2023
70102,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
70272,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
70371,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
69355,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-08-2023
69119,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-08-2023
73278548,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	06-07-2023
73278681,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
73278954,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-07-2023
73278994,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-08-2023
73279123,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-08-2023
71632,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-06-2023
71667,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-06-2023
72357,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	21-03-2023
72635,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	02-03-2023
732926128,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-08-2023
732926178,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	19-10-2022
732926182,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	21-03-2023
732926210,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
732926224,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
732925986,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
732802279,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	09-08-2023
732802710,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
732926317,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
732926529,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-08-2023
732926050,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	11-05-2023
732927332,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	22-06-2022
732927424,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	11-01-2023
732927518,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
732927456,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-08-2023
732927438,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	11-01-2023
732927447,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	11-07-2023
732929511,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
732929627,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-05-2023
732929693,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-08-2023
732799989,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	03-08-2023
732801667,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
732801996,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
732925830,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	13-07-2022
732803339,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
732803599,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
732803845,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
732803970,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-06-2023
732803993,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	19-07-2022
732804054,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-08-2023
732799032,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-07-2023
732799114,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-06-2023
732799139,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-05-2023
732799378,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
732799655,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	03-08-2023
732800563,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	17-05-2023
732800660,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
732798850,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	06-05-2022
732798869,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
732799014,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-08-2023
732798424,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	21-04-2023
73682,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
73799,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-08-2023
73803A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	22-06-2022
732931615,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-07-2023
74162,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	31-05-2023
74278,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-08-2023
74880,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	18-04-2023
75025,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
75355,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
75419,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
75420,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-07-2023
75427,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	04-07-2019
75498,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-08-2023
75651,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-08-2023
732931674,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	15-06-2023
732931678,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	04-08-2022
732931688,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
732931690,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	08-04-2022
732931693,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-07-2023
732931705,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
73464,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	06-07-2023
73472,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
732929770,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	11-07-2023
732931190,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-08-2023
732930882A,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	16-08-2023
81553,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-07-2023
81243,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	13-06-2023
8134A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	28-08-2023
80887,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	10-08-2023
8101C,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-06-2023
81023,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-08-2023
80275,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	11-08-2022
80408,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
8043F,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	09-08-2023
80452,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	05-09-2023
80458,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	11-07-2023
78372,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	28-09-2022
78739,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-05-2023
78262,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	28-08-2023
79589,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-05-2023
77264,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	28-08-2023
77511,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	13-06-2023
77517,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	24-05-2023
77133,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	25-05-2021
8575356,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	09-08-2023
8575435,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
84636,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-09-2023
86031,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	02-03-2023
8575666,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-02-2022
86568,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
86430,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	17-07-2023
82232,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	31-03-2021
83072,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-08-2019
83247,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	04-12-2020
83901,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
84004,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	15-06-2023
85487,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-07-2023
88507,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
88749,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
9010,	         AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	29-08-2023
89202,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-08-2023
89516A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	20-04-2022
87942,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-09-2023
86915,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	09-08-2023
86971,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-08-2023
9149E,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-03-2023
9158C,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-09-2023
9184F,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
91906,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
91382,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	15-06-2023
90600A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	22-04-2021
9042F,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
9044A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	04-07-2023
90483,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-09-2023
920796,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	14-02-2022
92311,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
92591,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	12-08-2022
94267,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	26-09-2023
94279A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	28-08-2023
94538,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	15-05-2023
95304,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	30-08-2023
94621A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	17-07-2023
787A,	         AGA MIX 20	CILINDRO ALTA PRESION 150 BAR 6	09-08-2021
4574A,	       AIRE MEDICINAL	CILINDRO ALTA PRESION 150 BAR 6	29-09-2022
E3583767,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	03-08-2023
E3584105,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	29-06-2023
E130815,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	18-06-2020
E23407,	       ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	12-04-2023
E273181,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	03-08-2023
E331379,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	29-06-2023
E331737,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	29-08-2023
E332114,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	18-06-2020
E332334,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	30-01-2023
E332762,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	19-04-2021
E333091,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	30-07-2021
E3580256,	     ACETILENO	CILINDRO ACETILENO 17 BAR 8.0	04-10-2022
E3580937,	     ACETILENO	CILINDRO ACETILENO 17 BAR 8.0	28-09-2023
E3581273,	     ACETILENO	CILINDRO ACETILENO 17 BAR 8.0	09-03-2023
E3581687,	     ACETILENO	CILINDRO ACETILENO 17 BAR 8.0	14-09-2023
E3583229,	     ACETILENO	CILINDRO ACETILENO 17 BAR 8.0	09-07-2021
E64450,	       ACETILENO	CILINDRO ACETILENO 17 BAR 8.0	26-09-2023
116C,	         ANHIDRIDO CARBONICO	CILINDRO ALTA PRESION 150 BAR 27.0	29-10-2021
2160C,	       ANHIDRIDO CARBONICO	Cilindro alta presion 150 bar 36	04-03-2022
732930583,	   ANHIDRIDO CARBONICO	Cilindro alta presion 150 bar 36	01-02-2022
57930,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	17-11-2018
54169,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	22-03-2022
102562,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-02-2019
2044A,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	07-03-2019
3147160,	     AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	27-09-2018
732798806,	   AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	23-10-2018
77239,	       AGA MIX 20	CILINDRO ALTA PRESION 200 BAR 10.0	28-04-2022
E3584297,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	31-08-2018
E333158,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	10-08-2018
E277776,	     ACETILENO	CILINDRO ACETILENO 17 BAR 7.0	10-03-2019`










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
