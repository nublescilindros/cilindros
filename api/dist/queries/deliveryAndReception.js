"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._updateCylinderReceptionDate = exports._insertCylinderDeliveryDate = exports._updateCylinderDeliveryAndReception = exports._getAllCompanyCylindersAccounts = exports._getAllCompanyCylindersCountAccounts = void 0;
const _getAllCompanyCylindersCountAccounts = `
    SELECT
        clients.business_name As businessName,
        clients.rut_business As businessRut,
        clients.name_manager As nameManager,
        cylinders.state_cylinders As state,
        COUNT(cylinders.code_cylinders) AS cylindersCount
    FROM
        clients 
    LEFT JOIN
        cylinders ON clients.rut_business = cylinders.acquired_by
    WHERE 
        cylinders.rut_accounts =? and
        cylinders.state_cylinders =?
    GROUP BY
        clients.rut_business, clients.business_name;
        `;
exports._getAllCompanyCylindersCountAccounts = _getAllCompanyCylindersCountAccounts;
const _updateCylinderDeliveryAndReception = `
    UPDATE 
        cylinders 
    SET 
        state_cylinders =?,
        acquired_by =?,
        rut_accounts =?
    WHERE 
        cylinders.code_cylinders =?;
    `;
exports._updateCylinderDeliveryAndReception = _updateCylinderDeliveryAndReception;
const _getAllCompanyCylindersAccounts = `
        SELECT
            cylinders.code_cylinders as code,
            content.name_content as content,
            capacity.name_capacity as capacity,
            cylinders.own_cylinders as own,
            cylinders.state_cylinders as stateCylinders,
            cylinders.rut_accounts as rutAccounts
        FROM
            cylinders
        INNER JOIN
            content
        ON 
            cylinders.id_content = content.id_content
        INNER JOIN
            capacity
        ON 
            cylinders.id_capacity = capacity.id_capacity
        WHERE 
            cylinders.acquired_by =? and 
            cylinders.rut_accounts = ?    
        ORDER BY
            cylinders.code_cylinders;`;
exports._getAllCompanyCylindersAccounts = _getAllCompanyCylindersAccounts;
const _insertCylinderDeliveryDate = `
    INSERT INTO
        cylinder_history 
        (code_cylinder_history, code_cylinder, rut_business, delivered_date, received_date)
    VALUES 
        (NULL, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d'), NULL);`;
exports._insertCylinderDeliveryDate = _insertCylinderDeliveryDate;
const _updateCylinderReceptionDate = `
    UPDATE 
        cylinder_history 
    SET 
        received_date = DATE_FORMAT(NOW(), '%Y-%m-%d')
    WHERE 
        cylinder_history.code_cylinder = ? and 
        received_date is null;`;
exports._updateCylinderReceptionDate = _updateCylinderReceptionDate;
