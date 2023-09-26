"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getAllCompanyCylindersByDate = exports._getAllCompanyCylindersCountHistory = void 0;
const _getAllCompanyCylindersCountHistory = `
    SELECT 
        clients.business_name As businessName,
        clients.rut_business As businessRut,
        clients.name_manager As nameManager,
        COUNT(cylinder_history.rut_business) AS businessCount
    FROM 
        clients
    LEFT JOIN
        cylinder_history ON clients.rut_business = cylinder_history.rut_business
    WHERE        	 
        not cylinder_history.delivered_date is null and 
        not cylinder_history.received_date is null
    GROUP BY
        clients.rut_business, clients.business_name
    HAVING 
        businessCount > 0;
        `;
exports._getAllCompanyCylindersCountHistory = _getAllCompanyCylindersCountHistory;
const _getAllCompanyCylindersByDate = `
SELECT 
	cylinder_history.code_cylinder as codeCylinder,
    content.name_content as nameContent,
    capacity.name_capacity as nameCapacity,
    DATE_FORMAT(cylinder_history.delivered_date, '%Y-%m-%d') as deliveredDate,
    DATE_FORMAT(cylinder_history.received_date, '%Y-%m-%d') as receivedDate
FROM 
	cylinder_history
INNER JOIN
	cylinders 
ON
	cylinder_history.code_cylinder = cylinders.code_cylinders
INNER JOIN
	content
ON 
	cylinders.id_content = content.id_content
INNER JOIN
	capacity
ON
	cylinders.id_capacity = capacity.id_capacity
WHERE
	cylinder_history.rut_business=? and
    cylinder_history.delivered_date >= ? and 
    cylinder_history.delivered_date <= ? and 
    not cylinder_history.received_date is null
   
    `;
exports._getAllCompanyCylindersByDate = _getAllCompanyCylindersByDate;
