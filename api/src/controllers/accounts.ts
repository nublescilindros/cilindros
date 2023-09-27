
import { Console } from "console";
import * as Accounts from "../models/accounts";
import { tokeSign, verifyToken, getToken } from '../utils/jwt'

const getAllAccounts = async (req: any, res: any) => {
    try {
        const result = await Accounts.getAllAccounts();
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
const insertAccounts = async (req: any, res: any) => {
    try {
        const { name, rut, user, password } = req.body;

        const result = await Accounts.insertAccounts(name, rut, user, password);
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
const updateAccounts = async (req: any, res: any) => {
    try {
        const { name, rut, user, password } = req.body;

        const result = await Accounts.updateAccounts(name, rut, user, password);
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
const deleteAccounts = async (req: any, res: any) => {
    try {
        const { rut } = req.params;
        const result = await Accounts.deleteAccounts(rut);
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
const validateUser = async (req: any, res: any) => {
    try {
        const { id, password } = req.body;
        const result = await Accounts.validateUser(id, password);

        if (result.data.length > 0) {
            console.log(result.data[0].admin, "STATE ADMIN")
            const tokenSession = await tokeSign(result.data[0])
            res.status(200).json({
                id: result.data[0].id,
                admin: result.data[0].admin,
                token: tokenSession,
                error: false,
            });
            return;
        }
        res.status(200).json({ error: true });

    } catch (error) {
        console.log(error)
        res.status(200).json({ error: true });
    }
}
const verifyUser = async (req: any, res: any) => {

    console.log("statee adminn")

    let token = req.headers.authorization
    console.log("statee adminn")

    const tokenData: any = await verifyToken(getToken(token));
    console.log(tokenData.admin, "statee adminn")
    const result = await Accounts.validateUser(tokenData.id, tokenData.password);
    if (result.data.length > 0) {
        res.send({ id: tokenData.id, admin: tokenData.admin, rut: result.data[0].rut })
        return;
    }
    res.send({ errorToken: true })


}

export {
    getAllAccounts,
    validateUser,
    verifyUser,
    insertAccounts,
    updateAccounts,
    deleteAccounts
};