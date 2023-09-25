"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._updateCylinderRequestAndReception = exports._updateCylinderState = exports._getAllCylindersCompanyByRut = exports._getAllCompanyCylindersCount = void 0;
const _getAllCompanyCylindersCount = `
    SELECT
        clients.business_name As businessName,
        clients.rut_business As businessRut,
        clients.name_manager As nameManager,
        COUNT(cylinders.code_cylinders) AS cylindersCount
    FROM
        clients
    LEFT JOIN
        cylinders ON clients.rut_business = cylinders.acquired_by
     
    GROUP BY
        clients.rut_business, clients.business_name;
        `;
exports._getAllCompanyCylindersCount = _getAllCompanyCylindersCount;
const _getAllCylindersCompanyByRut = `
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
        cylinders.acquired_by =?    
    ORDER BY
        cylinders.code_cylinders;`;
exports._getAllCylindersCompanyByRut = _getAllCylindersCompanyByRut;
const _updateCylinderState = `
    UPDATE 
        cylinders 
    SET 
        state_cylinders = ?
    WHERE 
        cylinders.code_cylinders =?;`;
exports._updateCylinderState = _updateCylinderState;
const _updateCylinderRequestAndReception = `
UPDATE 
    cylinders 
SET 
    cylinders.state_cylinders =?,
    cylinders.acquired_by =?,
    cylinders.rut_accounts=?

WHERE 
    cylinders.code_cylinders =?;`;
exports._updateCylinderRequestAndReception = _updateCylinderRequestAndReception;
//# sourceMappingURL=formCylinders.js.map