const connection = require('./connection');

class DB {
    constructor(connection){
        this.connection = connection;

    }

    //function that returns all employees 
    selectAllEmployees(){
        return this.connection.query(
           'SELECT * FROM employee'
        );
    }

    //fucntion that returns employees by department 
    async viewEmployeesByDepartment(department){
        return this.connection.query(`
        SELECT 
            e.id, 
            e.first_name, 
            e.last_name, 
            r.title, 
            d.name AS department, 
            r.salary, 
            CONCAT('', m.first_name, ' ', m.last_name) AS manager
        FROM employee e 
        JOIN role r 
            ON e.role_id = r.id
        JOIN department d
            ON d.id = r.department_id AND d.name = "${department}"
        LEFT JOIN employee m
            ON e.manager_id = m.id 
        ORDER BY e.id ASC`
        );
    }

    async viewEmployeesByManager(manager){
        return this.connection.query(`
        SELECT 
            e.id, 
            e.first_name, 
            e.last_name, 
            r.title, 
            d.name AS department, 
            r.salary, 
            CONCAT('', m.first_name, ' ', m.last_name) AS manager
        FROM employee e 
        JOIN role r 
            ON e.role_id = r.id
        LEFT JOIN employee m
            ON e.manager_id = m.id
        JOIN department d
            ON d.id = r.department_id AND CONCAT('', m.first_name, ' ', m.last_name) = "${manager}"
        ORDER BY e.id ASC
        `);
    }

    //add employee
    async addEmployeeDB(employee){
        let manNum;
        switch(employee.manager_id){
            case 'Haneen Nasereddin':
                manNum = 1;
                break;
            case 'Solomon Woods':
                manNum = 3;
                break;
            case 'Sam Smith':
                manNum = 5;
                break;
            case 'Kayla James':
                manNum = 7;
                break;    
        }
        employee.manager_id = manNum;
        return this.connection.query(`
            INSERT INTO employee SET ?`, employee)
    }

    //remove employee
    async removeEmployee(employee){
        return this.connection.query(`
        DELETE FROM employee
        WHERE id = ${employee}
        `)

    }

    //update role 
    updateRole(employee, role){
        return this.connection.query(`
            UPDATE employee
            SET role_id = ${role}
            where id = ${employee}
                and role_id IN 
                (SELECT id FROM role
                WHERE id = role_id);
        `)
    }

    updateManager(employee, manager){
        return this.connection.query(`
            UPDATE employee
            SET manager_id = ${manager}
            where id = ${employee}
        `)
    }

    //function that exits the connection 
    exit(){
        return this.connection.end();
    }
    

    //helper functions
    getRoleList(){
        return this.connection.query(`
            SELECT * FROM role ORDER BY id ASC
        `);
    }

}

module.exports = new DB(connection);
