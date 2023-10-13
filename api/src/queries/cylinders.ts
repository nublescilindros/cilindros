const _getAllContent = `
    SELECT
        id_content as id,
        name_content as name
    FROM content;
        `;
        
const _getAllCapacity = `
    SELECT 
        id_capacity as id,
        name_capacity as name 
    FROM 
        capacity
        `;

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

const _insertCylinders = `
        INSERT INTO 
            cylinders 
            (code_cylinders, id_content, id_capacity, state_cylinders, own_cylinders, acquired_by, rut_accounts) 
        VALUES 
            (?, ?, ?, 0, ?, '', '');`;

const _updateCylinders = `
        UPDATE 
            cylinders 
        SET 
            id_content = ?,
            id_capacity = ?,
            own_cylinders = ?
        WHERE 
            cylinders.code_cylinders = ?`;

const _deleteCylinders = ` 
        DELETE
        FROM
            cylinders 
        WHERE 
            cylinders.code_cylinders = ?`;

export {
    _getAllContent,
    _getAllCapacity,
    _getAllCylinders,
    _insertCylinders,
    _updateCylinders,
    _deleteCylinders
};