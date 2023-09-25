"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._deleteClients = exports._updateClients = exports._insertClients = exports._getAllClients = void 0;
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
exports._getAllClients = _getAllClients;
const _insertClients = `
        INSERT INTO 
            clients 
            (rut_business, business_name, name_manager, address_business) 
        VALUES 
            (?, ?, ?, ?);`;
exports._insertClients = _insertClients;
const _updateClients = `
        UPDATE 
        clients 
        SET 
            business_name = ?,
            name_manager = ?,
            address_business = ?
        WHERE 
            clients.rut_business = ?`;
exports._updateClients = _updateClients;
const _deleteClients = `
        DELETE
        FROM
            clients 
        WHERE 
            clients.rut_business = ?`;
exports._deleteClients = _deleteClients;
//# sourceMappingURL=clients.js.map