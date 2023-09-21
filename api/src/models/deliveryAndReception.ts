import db from "../utils/db";

import {
    _getAllCompanyCylindersCountAccounts,
    _getAllCompanyCylindersAccounts,
    _updateCylinderDeliveryAndReception,
    _insertCylinderDeliveryDate,
    _updateCylinderReceptionDate
    /*     _insertCylinderReceptionDate */
} from "../queries/deliveryAndReception";

import {
    _getAllCylinders
} from "../queries/cylinders";

const getAllCompanyCylindersCountAccounts: any = async (rutAccounts: string, state: number) => {
    try {
        const [rows] = await db.query(_getAllCompanyCylindersCountAccounts, [rutAccounts, state]);
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

const getAllCompanyCylindersAccounts: any = async (rutBusiness: string, rutAccounts: string) => {
    try {
        const [rows] = await db.query(_getAllCompanyCylindersAccounts, [rutBusiness, rutAccounts]);
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

const updateCylinderDeliveryAndReception: any = async (
    code: string, stateCylinders: number, rutBusiness: string, rutAccounts: string, stateCompany: number) => {

    try {
        let rutBusinessQuery = rutBusiness;
        let rutAccountsQuery = rutAccounts;
        let dateQuery = _insertCylinderDeliveryDate;
        if (stateCylinders === 0) {
            rutBusinessQuery = ""
            rutAccountsQuery = ""
            dateQuery = _updateCylinderReceptionDate;

        }
        const [rows0] = await db.query(_updateCylinderDeliveryAndReception, [
            stateCylinders,
            rutBusinessQuery,
            rutAccountsQuery,
            code]);
        const [rows1] = await db.query(_getAllCompanyCylindersCountAccounts, [rutAccounts, stateCompany]);
        const [rows2] = await db.query(_getAllCompanyCylindersAccounts, [rutBusiness, rutAccounts]);
        const [rows3] = await db.query(dateQuery, [code, rutBusiness]);

        return {
            rows: [rows1, rows2],
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
    getAllCompanyCylindersCountAccounts,
    getAllCompanyCylindersAccounts,
    updateCylinderDeliveryAndReception
};
