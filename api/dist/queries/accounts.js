"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._deleteAccounts = exports._updateAccounts = exports._insertAccounts = exports._validateUser = exports._getAllAccounts = void 0;
const _getAllAccounts = `
     SELECT 
        name_accounts as name,
        rut_accounts as rut,
        user_accounts as accounts,
        password_accounts as password,
        admin_accounts as admin
     FROM
        accounts
        `;
exports._getAllAccounts = _getAllAccounts;
const _validateUser = `
        SELECT 
            user_accounts as id,
            admin_accounts as admin, 
            password_accounts as password,
            rut_accounts as rut
        FROM
            accounts
       WHERE 
            user_accounts = ? and
            password_accounts =?`;
exports._validateUser = _validateUser;
const _insertAccounts = `
        INSERT INTO 
            accounts 
            (name_accounts, rut_accounts, user_accounts,
             password_accounts, admin_accounts) 
        VALUES 
            (?, ?, ?, ?, '0');`;
exports._insertAccounts = _insertAccounts;
const _updateAccounts = `
        UPDATE 
            accounts 
        SET 
            name_accounts = ?,
            user_accounts = ?,
            password_accounts = ? 
        WHERE 
            accounts.rut_accounts = ?`;
exports._updateAccounts = _updateAccounts;
const _deleteAccounts = `
        DELETE
        FROM
            accounts 
        WHERE 
            accounts.rut_accounts = ?`;
exports._deleteAccounts = _deleteAccounts;
//# sourceMappingURL=accounts.js.map