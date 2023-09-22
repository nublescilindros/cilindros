import * as cylindersHistory from "../models/cylindersHistory";
import * as XLSX from "xlsx";
import * as fs from 'fs';
import * as path from 'path';



const getAllCompanyCylindersCountHistory = async (req: any, res: any) => {
    try {
        const result = await cylindersHistory.getAllCompanyCylindersCountHistory();
        res.status(200).json({
            ...result
        });
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: true
        });
    }
}

const getAllCompanyCylindersByDate = async (req: any, res: any) => {
    try {
        const {
            rutBusiness,
            deliveredDate,
            receivedDate
        } = req.params;

        console.log(rutBusiness,
            deliveredDate,
            receivedDate)

        const result = await cylindersHistory.getAllCompanyCylindersByDate(
            rutBusiness,
            deliveredDate,
            receivedDate
        );

        res.status(200).json({
            ...result
        });
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: true
        });
    }
}

const generateExcelCylinderCompany = async (req: any, res: any) => {

    const data = req.body.map((item: any) => {
        return {
            code: item.code,
            content: item.content,
            capacity: item.capacity,
            deliveredDate: item.deliveredDate,
            receivedDate: item.receivedDate,
            dateDays: item.dateDays
        };
    });
    await createExcel("Historial", data);
    const success = await createExcel("Historial", data);
    if (success) {
        console.log("Archivo de Excel creado con éxito.");
        res.status(200).json({ state: true });
    } else {
        console.log("Hubo un error al crear el archivo de Excel.");
    }



  



};

const test = async (req: any, res: any) => {
        res.status(200).json({ state: true });

};


export {
    getAllCompanyCylindersCountHistory,
    getAllCompanyCylindersByDate,
    generateExcelCylinderCompany,
    test
};

const createExcel = async (sheetLabel: string, data: any) => {
    const fileExtension = "xlsx";
    const sheetName = sheetLabel;
    const fileName = "infoExcel";

    const ws: any = XLSX.utils.book_new();
    const wb = { Sheets: { [sheetName]: ws }, SheetNames: [sheetName] };

    const wscols = [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 5 }];

    ws["!cols"] = wscols;

    XLSX.utils.sheet_add_aoa(ws, [[
        "Código",
        "Contenido",
        "Capacidad",
        "Fecha entrega",
        "Fecha Recepción",
        "Días"
    ]], {
        origin: "A1",
    });

    XLSX.utils.sheet_add_json(ws, data, {
        origin: "A2",
        skipHeader: true,
    });

    const pdfPath = path.join(__dirname, "./../../", "output");
    const filePath = path.join(pdfPath, `${fileName}.${fileExtension}`);

    try {
        await fs.promises.writeFile(filePath, XLSX.write(wb, { bookType: fileExtension, type: 'buffer' }));
        return true;
    } catch (error) {
        console.error("Error creando el archivo de Excel:", error);
        return false;
    }
};
