import * as cylinders from "../models/cylinders";


const getAllCapacity = async (req: any, res: any) => {
    try {
        const result = await cylinders.getAllCapacity();
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

const getAllContent = async (req: any, res: any) => {
    try {
        const result = await cylinders.getAllContent();
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

const getAllCylinders = async (req: any, res: any) => {
    try {
        const result = await cylinders.getAllCylinders();
        console.log('cilindros api', result)
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

const insertCylinders = async (req: any, res: any) => {
    try {
        const { code, capacity, content, own } = req.body;

        const result = await cylinders.insertCylinders(code, capacity, content, own);
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

const updateCylinders = async (req: any, res: any) => {
    try {
        const { code, capacity, content, own } = req.body;
        const result = await cylinders.updateCylinders(code, capacity, content, own);
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

const deleteCylinders = async (req: any, res: any) => {
    try {
        const { code } = req.params;
        const result = await cylinders.deleteCylinders(code);
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
    getAllContent,
    getAllCapacity,
    getAllCylinders,
    insertCylinders,
    updateCylinders,
    deleteCylinders
};