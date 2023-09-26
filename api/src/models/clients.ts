import db from "../utils/db";
import {
    _getAllClients,
    _insertClients,
    _updateClients,
    _deleteClients

} from "../queries/clients";

const getAllClients: any = async () => {
    try {
        const [rows] = await db.query(_getAllClients);
        return {
            rows: rows,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            error: true,
        };
    }

};

const insertClients: any = async (
    rutBusiness: string,
    nameBusiness: string,
    nameManager: string,
    addressBusiness: string
) => {
    try {
        const [rows0] = await db.query(_insertClients,
            [
                rutBusiness,
                nameBusiness,
                nameManager,
                addressBusiness
            ]);
        const [rows1] = await db.query(_getAllClients);

        return {
            rows: rows1,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            error: true,
        };
    }
};

const updateClients: any = async (
    rutBusiness: string,
    nameBusiness: string,
    nameManager: string,
    addressBusiness: string) => {
    try {
        const [rows0] = await db.query(_updateClients, [
            nameBusiness,
            nameManager,
            addressBusiness,
            rutBusiness]);
        const [rows1] = await db.query(_getAllClients);

        return {
            rows: rows1,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            error: true,
        };
    }
};

const deleteClients: any = async (rutBusiness: string) => {
    try {
        const [rows0] = await db.query(_deleteClients, [rutBusiness]);
        const [rows1] = await db.query(_getAllClients);

        return {
            rows: rows1,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            error: true,
        };
    }

};

export {
    getAllClients,
    insertClients,
    updateClients,
    deleteClients,
};
