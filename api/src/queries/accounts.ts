const _getAllAccounts = `
     SELECT 
        name_accounts as name,
        rut_accounts as rut,
        user_accounts as accounts,
        password_accounts as password,
        admin_accounts as admin
     FROM
        accounts
     WHERE
        admin_accounts =0
        `;

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

const _insertAccounts = `
        INSERT INTO 
            accounts 
            (name_accounts, rut_accounts, user_accounts,
             password_accounts, admin_accounts) 
        VALUES 
            (?, ?, ?, ?, '0');`;

const _updateAccounts = `
        UPDATE 
            accounts 
        SET 
            name_accounts = ?,
            user_accounts = ?,
            password_accounts = ? 
        WHERE 
            accounts.rut_accounts = ?`;

const _deleteAccounts = `
        DELETE
        FROM
            accounts 
        WHERE 
            accounts.rut_accounts = ?`;


export {
    _getAllAccounts,
    _validateUser,
    _insertAccounts,
    _updateAccounts,
    _deleteAccounts
};