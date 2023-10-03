import Table from "@/components/ui/Table/Table";
import styles from "./CylinderHistory.module.scss";

import { useState, useEffect } from "react";
import AlertMessages from "@/components/ui/AlertMessages/AlertMessages";
import Input from "@/components/ui/Input/Input";
import ComboBox from "@/components/ui/ComboBox/ComboBox";
import Ranges from "@/components/ui/Ranges/Ranges";
import Button from "@/components/ui/Button/Button";
import { useCylinders, useUi } from "@/store/hooks";
import useCylindersHistory from "@/store/hooks/useCylindersHistory";
import dateCurrent from "@/utils/date";
import { config } from "@/utils/config";

const CylinderHistory = () => {
  const { setUi } = useUi();

  const {
    listCompanyCylindersCountHistory,
    listCompanyCylindersByDate,
    excelStateGenerate,
    getAllCompanyCylindersCountHistory,
    getAllCompanyCylindersByDate,
    generateExcelCylinderCompany,
  } = useCylindersHistory();

  const { listCapacity, listContent, getAllCapacity, getAllContent } =
    useCylinders();

  const [stateForm, setStateForm] = useState<any>({
    searchCompany: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
    searchCylinder: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
    button: {
      text: "Generar Excel",
      disabled: true,
    },
  });

  const [stateListCylindersCompanyDate, setStateListCylindersCompanyDate] =
    useState<any>({
      currentSelection: null,
      arrayTitle: [
        { name: "Código" },
        { name: "Contenido" },
        { name: "Capacidad" },
        { name: "Fecha entrega" },
        { name: "Fecha recepción" },
        { name: "Dias" },
        { name: "¿De Ñubles?" },
      ],
      arrayData: [],
    });

  const [menu, setMenu] = useState({
    stateMsj: "",
  });

  const [stateListCompanyCount, setStateListCompanyCount] = useState<any>({
    currentSelection: null,
    dataSelect: {},
    arrayTitle: [{ name: "Cantidad" }, { name: "Empresa" }, { name: "Rut" }],
    arrayData: [],
  });

  const [stateFormHistory, setStateFormHistory] = useState<any>({
    searchCompany: {
      text: "",
      disabled: false,
      subText: { state: false, text: "" },
    },
    dateRangeStart: {
      text: `${dateCurrent().year}-${dateCurrent().month}-${dateCurrent().day}`,
      disabled: false,
      subText: { state: false, text: "" },
    },
    dateRangeEnd: {
      text: `${dateCurrent().year}-${dateCurrent().month}-${dateCurrent().day}`,
      disabled: false,
      subText: { state: false, text: "" },
    },
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

  const onClickTableCompany = (data: any, index: number) => {
    setStateListCompanyCount({
      ...stateListCompanyCount,
      dataSelect: data,
      currentSelection: index,
    });

    getAllCompanyCylindersByDate(
      data[2],
      stateFormHistory.dateRangeStart.text,
      stateFormHistory.dateRangeEnd.text
    );
  };

  useEffect(() => {
    getAllCompanyCylindersCountHistory();
    getAllCapacity();
    getAllContent();
  }, []);

  
  useEffect(() => {
    console.log(dateCurrent());
  }, []);

  useEffect(() => {
    console.log(stateListCompanyCount);

    stateListCompanyCount.dataSelect.length > 0
      ? setMenu({
          stateMsj:
            "Empresa seleccionada: " + stateListCompanyCount.dataSelect[1],
        })
      : setMenu({
          stateMsj: "Información de la empresa seleccionada ",
        });
  }, [stateListCompanyCount.dataSelect]);

  useEffect(() => {
    listCompanyCylindersCountHistory.length > 0
      ? setStateListCompanyCount({
          ...stateListCompanyCount,
          arrayData: listCompanyCylindersCountHistory.map((list: any) => [
            list.businessCount,
            list.businessName,
            list.businessRut,
          ]),
        })
      : setStateListCompanyCount({ ...stateListCompanyCount, arrayData: [] });
  }, [listCompanyCylindersCountHistory]);

  useEffect(() => {
    listCompanyCylindersByDate.length > 0
      ? setStateListCylindersCompanyDate({
          ...stateListCylindersCompanyDate,
          arrayData: listCompanyCylindersByDate.map((list: any) => {
            let dateDays;
            let deliveredDate: any = new Date(list.deliveredDate);
            let receivedDate: any = new Date(list.receivedDate);
            dateDays = receivedDate - deliveredDate;
            dateDays = dateDays / (1000 * 60 * 60 * 24);
            let own = list.ownCylinders === 0 ? "Si" : "No";

            return [
              list.codeCylinder,
              list.nameContent,
              list.nameCapacity,
              list.deliveredDate,
              list.receivedDate,
              dateDays,
              own,
            ];
          }),
        })
      : setStateListCylindersCompanyDate({
          ...stateListCylindersCompanyDate,
          currentSelection: null,
          arrayData: [],
        });
  }, [listCompanyCylindersByDate]);

  useEffect(() => {
    setUi({ titleNavMenu: "Historial" });
  }, []);

  useEffect(() => {
    stateListCylindersCompanyDate.arrayData.length > 0
      ? setStateForm({
          ...stateForm,
          button: { ...stateForm.button, disabled: false },
        })
      : setStateForm({
          ...stateForm,
          button: { ...stateForm.button, disabled: true },
        });
  }, [stateListCylindersCompanyDate.arrayData]);

  useEffect(() => {
    if (excelStateGenerate === true) {
      fetch(`${config.api}/files/excel/infoExcel.xlsx`)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "infoExcel.xlsx";
          link.click();
        })
        .catch(console.error);
    }
  }, [excelStateGenerate]);

  return (
    <div className={styles.container}>
      <div>
        <Input
          value={stateForm.searchCompany.text}
          Only="all"
          onChange={changeInputs}
          disabled={stateForm.searchCompany.disabled}
          subText={stateForm.searchCompany.subText}
          name="searchCompany"
          text="Empresa"
        />

        <Table
          title="Registro empresas"
          onClick={onClickTableCompany}
          currentSelection={stateListCompanyCount.currentSelection}
          arrayTitles={stateListCompanyCount.arrayTitle}
          arrayData={stateListCompanyCount.arrayData.filter(
            (list: any) =>
              list[1]
                .toLowerCase()
                .slice(0, stateForm.searchCompany.text.length) ==
              stateForm.searchCompany.text.toLowerCase()
          )}
        />

        <AlertMessages text={menu.stateMsj} />
      </div>

      <div>
        <div>
          <Ranges
            dateStart={stateFormHistory.dateRangeStart.text}
            dateEnd={stateFormHistory.dateRangeEnd.text}
            state={[stateFormHistory, setStateFormHistory]}
            nameRanges={["dateRangeStart", "dateRangeEnd"]}
            updateList={() => {
              getAllCompanyCylindersByDate(
                stateListCompanyCount.dataSelect[2],
                stateFormHistory.dateRangeStart.text,
                stateFormHistory.dateRangeEnd.text
              );
            }}
            check={true}
            text="Rango de fechas"
          />
        </div>

        <div>
          <Input
            value={stateForm.searchCylinder.text}
            Only="all"
            onChange={changeInputs}
            disabled={stateForm.searchCylinder.disabled}
            subText={stateForm.searchCylinder.subText}
            name="searchCylinder"
            text="Cilindros"
          />

          <Button
            text={stateForm.button.text}
            disabled={stateForm.button.disabled}
            onclick={() => {
              console.log("sss");
              generateExcelCylinderCompany(
                stateListCylindersCompanyDate.arrayData.map((item: any) => {
                  return {
                    code: item[0],
                    content: item[1],
                    capacity: item[2],
                    deliveredDate: item[3],
                    receivedDate: item[4],
                    dateDays: item[5],
                    ownCyliders: item[6],
                  };
                })
              );
            }}
          />

          <Table
            title="Registros de la empresa"
            currentSelection={stateListCylindersCompanyDate.currentSelection}
            arrayTitles={stateListCylindersCompanyDate.arrayTitle}
            arrayData={stateListCylindersCompanyDate.arrayData.filter(
              (list: any) =>
                list[0]
                  .toLowerCase()
                  .slice(0, stateForm.searchCylinder.text.length) ==
                stateForm.searchCylinder.text.toLowerCase()
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CylinderHistory;
