
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

const _getAllCylindersCompanyByRut = `
    SELECT
cylinders.code_cylinders as code,
content.name_content as content,
capacity.name_capacity as capacity,
cylinders.own_cylinders as own,
cylinders.state_cylinders as stateCylinders,
accounts.name_accounts as nameAccounts
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
    INNER JOIN
accounts
    ON
cylinders.rut_accounts = accounts.rut_accounts
    WHERE 
cylinders.acquired_by ='100233312'    
    ORDER BY
cylinders.code_cylinders;`;

const _updateCylinderState = `
    UPDATE 
        cylinders 
    SET 
        state_cylinders = ?
    WHERE 
        cylinders.code_cylinders =?;`;

const _updateCylinderRequestAndReception = `
UPDATE 
    cylinders 
SET 
    cylinders.state_cylinders =?,
    cylinders.acquired_by =?,
    cylinders.rut_accounts=?

WHERE 
    cylinders.code_cylinders =?;`;


/* const _updateCylinderReception = `
UPDATE 
    cylinders 
SET 
    cylinders.state_cylinders = 4,
    cylinders.acquired_by =?,
    cylinders.rut_accounts=?

WHERE 
    cylinders.code_cylinders =?;`; */



export {
    _getAllCompanyCylindersCount,
    _getAllCylindersCompanyByRut,
    _updateCylinderState,
    _updateCylinderRequestAndReception,
};