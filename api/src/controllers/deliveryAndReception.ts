import * as deliveryAndReception from "../models/deliveryAndReception";


const getAllCompanyCylindersCountAccounts = async (req: any, res: any) => {
    try {

        const { rutAccounts, state } = req.params;
        console.log(rutAccounts, "asdasdas")
        const result = await deliveryAndReception.getAllCompanyCylindersCountAccounts(rutAccounts, state);
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

const getAllCompanyCylindersAccounts = async (req: any, res: any) => {
    try {

        const { rutBusiness, rutAccounts } = req.params;
        const result = await deliveryAndReception.getAllCompanyCylindersAccounts(rutBusiness, rutAccounts);
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

const updateCylinderDeliveryAndReception = async (req: any, res: any) => {
    try {
        const { codeCylinders, state, rutBusiness, rutAccounts, stateCompany } = req.body;
        console.log(codeCylinders, state, rutBusiness, rutAccounts, stateCompany)
        const result = await deliveryAndReception.updateCylinderDeliveryAndReception(
            codeCylinders, state, rutBusiness, rutAccounts, stateCompany);
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
    getAllCompanyCylindersCountAccounts,
    getAllCompanyCylindersAccounts,
    updateCylinderDeliveryAndReception
};