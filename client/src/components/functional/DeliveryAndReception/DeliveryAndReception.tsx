import styles from "./DeliveryAndReception.module.scss";

import { useState, useEffect } from "react";

import MenuButtons from "@/components/ui/MenuButton/MenuButtons";
import AlertMessages from "@/components/ui/AlertMessages/AlertMessages";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import Table from "@/components/ui/Table/Table";
import {
  /* useCylinders, */ useCylinders,
  useUi,
  useUser,
} from "@/store/hooks";
import useDeliveryAndReception from "@/store/hooks/usedeliveryAndReception";
import WindowAlert from "@/components/ui/WindowAlert/WindowAlert";
import { stateMessagesModal } from "@/utils/constant";

/* 
0 vacio
1 disponible
2 solicitado
3 entregado
4 recojer
 */

const DeliveryAndReception = () => {
  const { setUi, resetModal } = useUi();

  const {
    getAllCompanyCylindersCountAccounts,
    listCompanyCylindersCountAccounts,
    getAllCompanyCylindersAccounts,
    listCompanyCylindersAccounts,
    updateCylinderDeliveryAndReception,
  } = useDeliveryAndReception();

  const { user } = useUser();

  const { listCylinders, getAllCylinders } = useCylinders();

  const [stateForm, setStateForm] = useState<any>({
    searchCompany: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
    button: {
      text: "Entregar",
      disabled: true,
    },
  });

  const [menu, setmenu] = useState({
    currentSelection: 0,
    stateMsjCompany: "entrega",
    stateMsjCylinders: "Cilindros",
    list: [{ name: "Entrega" }, { name: "Recepción" }],
  });

  const [stateListCompany, setStateListCompany] = useState<any>({
    currentSelection: null,
    dataSelect: {},
    arrayTitle: [
      { name: "Cantidad cilindro" },
      { name: "Empresa" },
      { name: "Rut Empresa" },
      { name: "Encargado" },
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
    ],
    arrayData: [],
  });

  const onClickTableCompany = (data: any, index: number) => {
    setStateListCompany({
      ...stateListCompany,
      dataSelect: data,
      currentSelection: index,
    });

    /*     switch (menu.currentSelection) {
      case 0:
          getAllCylinders();
        break;
      case 1:
        getAllCylinders(); 
        break;

      default:
        break;
    }  */

    if (user.rut?.length > 0) {
      console.log("data");
      getAllCompanyCylindersAccounts(data[2], user.rut);
    }
  };

  const onClickTableCylinders = (data: any, index: number) => {
    setStateListCylinders({
      ...stateListCylinders,
      dataSelect: data,
      currentSelection: index,
    });
  };

  const changeInputs = (e: any) => {
    setStateForm({
      ...stateForm,
      [e.currentTarget.name]: {
        ...stateForm[e.currentTarget.name],
        text: e.currentTarget.value,
      },
    });
  };

  const onClickButtonAction = () => {
    let items: any = {};
    let title = null;

    /*     0 vacio
    1 disponible
    2 solicitado
    3 entregado
    4 recojer */

    switch (menu.currentSelection) {
      case 0:
        items = {
          codeCylinders: stateListCylinders.arrayData[0][0],
          state: 3,
          rutCompany: stateListCompany.dataSelect[2],
          rutUser: user.rut,
          stateCompany: 2,
        };
        title = stateMessagesModal.deliveryAndReception[0].title;
        break;
      case 1:
        items = {
          codeCylinders: stateListCylinders.arrayData[0][0],
          state: 0,
          rutCompany: stateListCompany.dataSelect[2],
          rutUser: user.rut,
          stateCompany: 4,
        };
        title = stateMessagesModal.deliveryAndReception[1].title;
        break;
      default:
        break;
    }

    setUi({
      modal: {
        state: true,
        type: 1,
        text: "",
        component: (
          <WindowAlert
            title={title}
            button={[
              {
                text: "Si",
                onClick: () => {
                  if (user.rut?.length > 0) {
                    updateCylinderDeliveryAndReception(
                      items.codeCylinders,
                      items.state,
                      items.rutCompany,
                      items.rutUser,
                      items.stateCompany
                    );
                  }

                  resetModal();
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
  };

  useEffect(() => {
    switch (menu.currentSelection) {
      case 0:
        if (user.rut?.length > 0) {
          getAllCompanyCylindersCountAccounts(user.rut, 2);
          setStateListCylinders({
            ...stateListCylinders,
            currentSelection: null,
            arrayData: [],
          });
        }

        break;
      case 1:
        if (user.rut?.length > 0) {
          getAllCompanyCylindersCountAccounts(user.rut, 4);
          setStateListCylinders({
            ...stateListCylinders,
            currentSelection: null,
            arrayData: [],
          });
        }
        break;
      default:
        break;
    }
  }, [menu.currentSelection, user]);

  useEffect(() => {
    console.log(listCompanyCylindersCountAccounts);
    listCompanyCylindersCountAccounts.length > 0
      ? setStateListCompany({
          ...stateListCompany,
          currentSelection: null,
          arrayData: listCompanyCylindersCountAccounts.map((list: any) => [
            list.cylindersCount,
            list.businessName,
            list.businessRut,
            list.nameManager,
          ]),
        })
      : setStateListCompany({
          ...stateListCompany,
          arrayData: [],
        });
  }, [listCompanyCylindersCountAccounts]);

  useEffect(() => {
    console.log(listCompanyCylindersAccounts, "effectttttt");
    listCompanyCylindersAccounts.length > 0
      ? setStateListCylinders({
          ...stateListCylinders,
          currentSelection: null,
          arrayData: listCompanyCylindersAccounts
            .filter((filterList: any) =>
              menu.currentSelection === 0
                ? filterList.stateCylinders === 2
                : filterList.stateCylinders === 4
            )
            .map((list: any) => [list.code, list.content, list.capacity]),
        })
      : setStateListCylinders({
          ...stateListCylinders,
          currentSelection: null,
          arrayData: [],
          dataSelect: {},
        });
  }, [listCompanyCylindersAccounts]);

  useEffect(() => {
    stateListCylinders.currentSelection != null
      ? setStateForm({
          ...stateForm,
          button: { ...stateForm.button, disabled: false },
        })
      : setStateForm({
          ...stateForm,
          button: { ...stateForm.button, disabled: true },
        });
  }, [stateListCylinders.currentSelection]);

  useEffect(() => {
    setUi({ titleNavMenu: "Entrega y recepción" });
  }, []);

  useEffect(() => {
    console.log(stateListCylinders);
  }, [stateListCylinders]);

  return (
    <div className={styles.container}>
      <MenuButtons
        menu={menu}
        onClick={(index: number) =>
          setmenu({ ...menu, currentSelection: index })
        }
      />

      <div>
        <Input
          onChange={changeInputs}
          value={stateForm.searchCompany.text}
          name="search"
          text="Empresa"
        />
        <Table
          title={
            menu.currentSelection === 0
              ? "Empresas  entrega"
              : "Empresas  recepcion"
          }
          height="4.5rem"
          onClick={onClickTableCompany}
          currentSelection={stateListCompany.currentSelection}
          arrayTitles={stateListCompany.arrayTitle}
          arrayData={stateListCompany.arrayData.filter(
            (list: any) =>
              list[1]
                .toLowerCase()
                .slice(0, stateForm.searchCompany.text.length) ==
              stateForm.searchCompany.text.toLowerCase()
          )}
        />
      </div>

      <div>
        <AlertMessages text={menu.stateMsjCylinders} />
        <Table
          title={
            menu.currentSelection === 0
              ? "Cilindros entrega"
              : "Cilindros recepcion"
          }
          height="4.5rem"
          onClick={onClickTableCylinders}
          currentSelection={stateListCylinders.currentSelection}
          arrayTitles={stateListCylinders.arrayTitle}
          arrayData={stateListCylinders.arrayData}
        />
      </div>

      <Button
        fontSize="1.3rem"
        text={menu.currentSelection === 0 ? "Entregado" : "Recepcionado"}
        disabled={stateForm.button.disabled}
        onclick={onClickButtonAction}
      />
    </div>
  );
};

export default DeliveryAndReception;
