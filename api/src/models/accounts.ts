import db from "../utils/db";
import {
    _getAllAccounts,
    _validateUser,
    _insertAccounts,
    _updateAccounts,
    _deleteAccounts
} from "../queries/accounts";

const getAllAccounts: any = async () => {
    try {
        const [rows] = await db.query(_getAllAccounts);
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

const insertAccounts: any = async (name: string, rut: string, user: string, password: string) => {
    try {
        const [rows0] = await db.query(_insertAccounts, [name, rut, user, password]);
        const [rows1] = await db.query(_getAllAccounts);

        return {
            rows: rows1,
            error: false,
        };
    } catch (error) {
        return {
            error: true,
        };
    }
};

const updateAccounts: any = async (name: string, rut: string, user: string, password: string) => {
    try {
        const [rows0] = await db.query(_updateAccounts, [name, user, password, rut]);
        const [rows1] = await db.query(_getAllAccounts);

        return {
            rows: rows1,
            error: false,
        };
    } catch (error) {
        return {
            error: true,
        };
    }
};

const deleteAccounts: any = async (rut: string) => {
    try {
        const [rows0] = await db.query(_deleteAccounts, [rut]);
        const [rows1] = await db.query(_getAllAccounts);

        return {
            rows: rows1,
            error: false,
        };
    } catch (error) {
        return {
            error: true,
        };
    }

};

const validateUser: any = async (id: string, password: string) => {
    try {
        const [rows] = await db.query(_validateUser, [id, password]);
        return {
            data: rows,
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
    getAllAccounts,
    validateUser,
    insertAccounts,
    updateAccounts,
    deleteAccounts
};

