import * as formCylinders from "../models/formCylinders";

/* 
0 vacio
1 disponible
2 solicitado
3 entregado
4 retirando
 */

const getAllCompanyCylindersCount = async (req: any, res: any) => {
    try {
        const result = await formCylinders.getAllCompanyCylindersCount();
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

const getAllCylindersCompanyByRut = async (req: any, res: any) => {
    try {
        const { rutBusiness } = req.params;
  
        const result = await formCylinders.getAllCylindersCompanyByRut(rutBusiness);

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

const updateCylinderState = async (req: any, res: any) => {
    try {
        const { code, state } = req.body;
        const result = await formCylinders.updateCylinderState(code, state);
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

const updateCylinderRequestAndReception = async (req: any, res: any) => {
    try {
        const { rutBusiness, codeCylinders, rutAccounts, stateCylinders } = req.body;

        const result = await formCylinders.updateCylinderRequestAndReception(
            rutBusiness, codeCylinders, rutAccounts, stateCylinders);
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

export {
    getAllCompanyCylindersCount,
    getAllCylindersCompanyByRut,
    updateCylinderState,
    updateCylinderRequestAndReception,
};