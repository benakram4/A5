var employees = [];
var departments = [];
var managers = [];
var fs = require("fs");

exports.initialize = () => {
 return new Promise( (resolve, reject) =>{
    fs.readFile("./data/employees.json", (err, data) =>{
        if(err){
            reject("Error when reading employees data");
        }
        else{
            employees = JSON.parse(data);
            fs.readFile("./data/departments.json", (err, data) =>{
                if(err){
                    reject("Error when reading departments data");
                }
                else{
                    departments = JSON.parse(data);
                    resolve();
                }
            });
        }
    });
 });
}

exports.getAllEmployees = () =>{
    return new Promise ((resolve, reject) =>{
        if(employees.length == 0){
            reject("No Employees in the Data");
        }
        resolve(employees);
    });
}

exports.getDepartments = () =>{
    return new Promise ((resolve, reject) =>{
        if(departments.length == 0){
            reject("No Departments in the Data");
        }
        resolve(departments);
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
        if(employees.length > 0){
            for(const property in employees){
             if(employees[property].employeeNum == employeeData.employeeNum){
                   employees[property] = employeeData;
                }
            }
            resolve();
        }
        else{
          reject("No Employees in the Data");
        }
    });
}







//addEmployee function
exports.addEmployee = (employeeData) => {
    return new Promise((resolve, reject) => {
        employeeData.isManager = (employeeData.isManager === undefined) ? true : false;
        employeeData.employeeNum = employees.length + 1;
        employees.push(employeeData);
        resolve();
    });
}

//getEmployeesByStatus function
exports.getEmployeesByStatus = (status) => {    
    return new Promise((resolve, reject) => {
        // temp object to store the employees with the status
        let i = 0;
        var empStatus = []; 
        for(const property in employees){
            //console.log("Searching for employee status: " + status);
            //console.log("Employee status: " + employees[property].status);
            if(employees[property].status == status){

                //console.log(`Found ${i + 1} Employee with that status`);
                i++;
                empStatus.push(employees[property]);
            }
        }
        if(empStatus.length == 0 ){
            reject("No Employees with that status");
        }
        resolve(empStatus);
    });
}

//getEmployeesByDepartment function
exports.getEmployeesByDepartment = (department) => {   
    return new Promise((resolve, reject) => {
        // temp object to store the employees with the department
        var empDepartment = []; 
        for(const property in employees){
            if(employees[property].department == department){
                empDepartment.push(employees[property]);
            }
        }
        if(empDepartment.length == 0){
            reject("No Employees with that department");
        }
        resolve(empDepartment);
    });
};

//getEmployeesByManager function
exports.getEmployeesByManager = (managerNum) => {
    return new Promise((resolve, reject) => {
        // temp object to store the employees with the manager
        var empManager = []; 
        for(const property in employees){
            if(employees[property].employeeManagerNum == managerNum){
                console.log("Found Employees with that manager");
                empManager.push(employees[property]);
            }
        }
        if(empManager.length == 0){
            reject("No Employees with that manager");
        }
        resolve(empManager);
    });
};

//getEmployeeByNum function
exports.getEmployeeByNum = (num) => {
    return new Promise((resolve, reject) => {
        // temp object to store the employees with the number
        var empNum;
        //console.log("Searching for employee number: " + num);
        for(const property in employees){
            if(employees[property].employeeNum == num){
               empNum = employees[property]; 
        }
    }
        if(empNum == null || empNum == undefined){
            reject("No Employees with that number");
        }
        resolve(empNum);
    });
}
