
const _getAllClients = `
        SELECT
            rut_business as rut,
            business_name as name,
            name_manager as nameManager,
            address_business as address 
        FROM 
            clients;
        ;
        `;

const _insertClients = `
        INSERT INTO 
            clients 
            (rut_business, business_name, name_manager, address_business) 
        VALUES 
            (?, ?, ?, ?);`;

const _updateClients = `
        UPDATE 
        clients 
        SET 
            business_name = ?,
            name_manager = ?,
            address_business = ?
        WHERE 
            clients.rut_business = ?`;

const _deleteClients = `
        DELETE
        FROM
            clients 
        WHERE 
            clients.rut_business = ?`;

const _deleteClientsResetCylinders = `
UPDATE 
    cylinders SET acquired_by = '',
    rut_accounts= '', 
    state_cylinders= ''
    WHERE
    cylinders.acquired_by = ?;`

export {
    _getAllClients,
    _insertClients,
    _updateClients,
    _deleteClients,
    _deleteClientsResetCylinders
};