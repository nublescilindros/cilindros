import db from "../utils/db";

import {
    _getAllCompanyCylindersCountHistory,
    _getAllCompanyCylindersByDate
} from "../queries/cylindersHistory";

import {
    _getAllCylinders
} from "../queries/cylinders";

const getAllCompanyCylindersCountHistory: any = async () => {
    try {
        const [rows] = await db.query(_getAllCompanyCylindersCountHistory);
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

const getAllCompanyCylindersByDate: any = async (
    rutBusiness: string,
    deliveredDate: Date,
    receivedDate: Date) => {
    try {
        const [rows] = await db.query(_getAllCompanyCylindersByDate, [
            rutBusiness,
            deliveredDate,
            receivedDate
        ]);

        console.log(rows)

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


export {
    getAllCompanyCylindersCountHistory,
    getAllCompanyCylindersByDate
};
