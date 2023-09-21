import db from "../utils/db";
import {
    _getAllContent,
    _getAllCapacity,
    _getAllCylinders,
    _insertCylinders,
    _updateCylinders,
    _deleteCylinders

} from "../queries/cylinders";

const getAllContent: any = async () => {
    try {
        const [rows] = await db.query(_getAllContent);
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

const getAllCapacity: any = async () => {
    try {
        const [rows] = await db.query(_getAllCapacity);
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

const getAllCylinders: any = async () => {
    try {
        const [rows] = await db.query(_getAllCylinders);
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

const insertCylinders: any = async (code: string, capacity: string, content: string, own: boolean) => {
    try {
        const [rows0] = await db.query(_insertCylinders, [code, capacity, content, own]);
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

const updateCylinders: any = async (code: string, capacity: string, content: string, own: boolean) => {
    try {
        const [rows0] = await db.query(_updateCylinders, [content, capacity, own, code]);
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

const deleteCylinders: any = async (code: string) => {
    try {
        console.log(code);
        const [rows0] = await db.query(_deleteCylinders, [code]);
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

export {
    getAllContent,
    getAllCapacity,
    getAllCylinders,
    insertCylinders,
    updateCylinders,
    deleteCylinders
};

