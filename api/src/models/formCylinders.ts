



import db from "../utils/db";
import {
    _getAllCompanyCylindersCount,
    _getAllCylindersCompanyByRut,
    _updateCylinderState,
    _updateCylinderRequestAndReception,
} from "../queries/formCylinders";

import {
    _getAllCylinders
} from "../queries/cylinders";

const getAllCompanyCylindersCount: any = async () => {
    try {
        const [rows] = await db.query(_getAllCompanyCylindersCount);
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

const getAllCylindersCompanyByRut: any = async (rutBusiness: string) => {
    try {
        const [rows] = await db.query(_getAllCylindersCompanyByRut, [rutBusiness]);
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

const updateCylinderState: any = async (code: string, state: number) => {
    try {
        const [rows0] = await db.query(_updateCylinderState, [state, code]);
        const [rows1] = await db.query(_getAllCylinders);

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

const updateCylinderRequestAndReception: any = async (
    rutBusiness: string,
    codeCylinders: string,
    rutAccounts: string,
    stateCylinders: number
) => {
    try {
        const [rows0] = await db.query(_updateCylinderRequestAndReception, [
            stateCylinders,
            rutBusiness,
            rutAccounts,
            codeCylinders
        ]);
        const [rows1] = await db.query(_getAllCylinders);
        const [rows2] = await db.query(_getAllCompanyCylindersCount);
        const [rows3] = await db.query(_getAllCylindersCompanyByRut, [rutBusiness]);

        return {
            rows: [rows1, rows2, rows3],
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            error: true,
        };
    }
};

/* const updateCylinderReception: any = async (rutBusiness: string, codeCylinders: string, rutAccounts: string,) => {
    try {
        const [rows0] = await db.query(_updateCylinderReception, [rutBusiness, rutAccounts, codeCylinders]);
        const [rows1] = await db.query(_getAllCylinders);
        const [rows2] = await db.query(_getAllCompanyCylindersCount);
        const [rows3] = await db.query(_getAllCylindersCompanyByRut, [rutBusiness]);

        return {
            rows: [rows1, rows2, rows3],
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            error: true,
        };
    }
}; */

export {
    getAllCompanyCylindersCount,
    getAllCylindersCompanyByRut,
    updateCylinderState,
    updateCylinderRequestAndReception,
};

