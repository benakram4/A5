
const Sequelize = require('sequelize');
var sequelize = new Sequelize('swthhypo', 'swthhypo', 'yU2pNh5e_l4WkAwdaM8FXDp8Fa3D2I4w', {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true,
        rejectUnauthorized: false
    },
    query: { raw: true }
});

sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(err => console.error(`Unable to connect to the database: ${err}`));

var Employee = sequelize.define('Employee', {
    employeeNum: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});

var Department = sequelize.define('Department', {
    departmentId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    departmentName: Sequelize.STRING
});


exports.initialize = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync()
        .then(() => resolve())
        .catch(() => reject("unable to sync the database"));
    });
};

// exports.initialize = () => {
//  return new Promise( (resolve, reject) =>{
//     fs.readFile("./data/employees.json", (err, data) =>{
//         if(err){
//             reject("Error when reading employees data");
//         }
//         else{
//             employees = JSON.parse(data);
//             fs.readFile("./data/departments.json", (err, data) =>{
//                 if(err){
//                     reject("Error when reading departments data");
//                 }
//                 else{
//                     departments = JSON.parse(data);
//                     resolve();
//                 }
//             });
//         }
//     });
//  });
// }

exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        Employee.findAll()
        .then((data) => resolve(data))
        .catch((err) => reject("no results returned"));
    });
};

exports.getDepartments = () =>{
    return new Promise ((resolve, reject) =>{
        Department.findAll()
        .then((data) => resolve(data))
        .catch((err) => reject(`no results returned for department ${err}`));
    });
}

exports.getManagers = () =>{
    return new Promise ((resolve, reject) =>{
        if(employees.length == 0){
            reject("No Employees in the Data");
        }
        else{
            for(let m in employees){
                if(employees[m].isManager == true){
                    managers.push(employees[m]);
                }
            }
        }
        resolve(managers);
    });
}

//updateEmployee function
exports.updateEmployee = (employeeData) => {
    return new Promise((resolve, reject)=> {
      employeeData.isManager = (employeeData.isManager) ? true : false;
        for(const property in employeeData){
            if(employeeData[property] == ""){
                employeeData[property] = null;
            }
        };
        Employee.update(employeeData)
        .then(() => resolve())
        .catch((err) => reject(`unable to update employee ${err}`));
    });
}

//addEmployee function
exports.addEmployee = (employeeData) => {
    return new Promise((resolve, reject) => {
     employeeData.isManager = (employeeData.isManager) ? true : false;
     //check that none of the values are "" if yes set to null
        for(const property in employeeData){
            if(employeeData[property] == ""){
                employeeData[property] = null;
            }
        };
        Employee.create(employeeData)
        .then(() => resolve())
        .catch((err) => reject(`unable to create employee ${err}`));
    });
};
    

//getEmployeesByStatus function
exports.getEmployeesByStatus = (status) => {    
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: {status: status}
        })
        .then((data) => resolve(data))
        .catch((err) => reject(`no results returned for status ${err}`));
    });
}

//getEmployeesByDepartment function
exports.getEmployeesByDepartment = (department) => {   
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: {department: department}
        })
        .then((data) => resolve(data))
        .catch((err) => reject(`no results returned for department ${err}`));
    });
};

//getEmployeesByManager function
exports.getEmployeesByManager = (managerNum) => {
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: {employeeManagerNum: managerNum}
        })
        .then((data) => resolve(data))
        .catch((err) => reject(`no results returned for manager ${err}`));
    });
};

//getEmployeeByNum function
exports.getEmployeeByNum = (num) => {
    return new Promise((resolve, reject) => {
        Employee.findAll({
            where: {employeeNum: num}
        })
        .then((data) => resolve(data))
        .catch((err) => reject(`no results returned for employee number ${err}`));
    });
}
