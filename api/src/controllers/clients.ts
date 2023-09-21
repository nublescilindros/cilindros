import * as clients from "../models/clients";

const getAllClients = async (req: any, res: any) => {
    try {
        const result = await clients.getAllClients();
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

const insertClients = async (req: any, res: any) => {
    try {
        const { rutBusiness, nameBusiness, nameManager, addressBusiness } = req.body;

        const result = await clients.insertClients(rutBusiness, nameBusiness, nameManager, addressBusiness);
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

const updateClients = async (req: any, res: any) => {
    try {
        const { rutBusiness, nameBusiness, nameManager, addressBusiness } = req.body;
        const result = await clients.updateClients(rutBusiness, nameBusiness, nameManager, addressBusiness);
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

const deleteClients = async (req: any, res: any) => {
    try {
        const { rutBusiness } = req.params;
        const result = await clients.deleteClients(rutBusiness);
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
    getAllClients,
    insertClients,
    updateClients,
    deleteClients,
};