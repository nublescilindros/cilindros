"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._deleteCylinders = exports._updateCylinders = exports._insertCylinders = exports._getAllCylinders = exports._getAllCapacity = exports._getAllContent = void 0;
const _getAllContent = `
    SELECT
        id_content as id,
        name_content as name
    FROM content;
        `;
exports._getAllContent = _getAllContent;
const _getAllCapacity = `
    SELECT 
        id_capacity as id,
        name_capacity as name 
    FROM 
        capacity
        `;
exports._getAllCapacity = _getAllCapacity;
const _getAllCylinders = `
    SELECT
        cylinders.code_cylinders as code,
        content.name_content as content,
        capacity.name_capacity as capacity,
        cylinders.state_cylinders as stateCylinders,
        own_cylinders as own,
        acquired_by as acquiredBy,
        rut_accounts as rut
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
        ORDER BY
    cylinders.code_cylinders
        ;
        `;
exports._getAllCylinders = _getAllCylinders;
const _insertCylinders = `
        INSERT INTO 
            cylinders 
            (code_cylinders, id_content, id_capacity, state_cylinders, own_cylinders) 
        VALUES 
            (?, ?, ?, 0, ?);`;
exports._insertCylinders = _insertCylinders;
const _updateCylinders = `
        UPDATE 
            cylinders 
        SET 
            id_content = ?,
            id_capacity = ?,
            own_cylinders = ?
        WHERE 
            cylinders.code_cylinders = ?`;
exports._updateCylinders = _updateCylinders;
const _deleteCylinders = ` 
        DELETE
        FROM
            cylinders 
        WHERE 
            cylinders.code_cylinders = ?`;
exports._deleteCylinders = _deleteCylinders;
