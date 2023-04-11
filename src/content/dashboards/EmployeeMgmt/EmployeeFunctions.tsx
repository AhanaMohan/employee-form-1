import { IEmployees } from 'src/lib/interfaces/IEmployees';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getEmployeeList } from 'src/api/employeeReport/employeeList';
import React from 'react';
const apiUrl = 'https://mysaleappcompanyapi-7lfpakcp7q-el.a.run.app/api/Employees';  

axios.defaults.headers["dbName"] = "mysaledb33011114564";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
const EmployeeFunctions = () => {
  const initialEmployeeState: IEmployees = {
    data:[],
    totalCount:0,
    id:'',
    employeeName: '',
    employeeLocalName: '',
    mobileNumber: '',
    email: '',
    address: '',
    address1: '',
    ledgerId: '',
    departmentId: '',
    additionalDetailsMappingId: '',
    payRollMappingId: '',
    isUser: false,
    isDeleted: false,
    isCanceled: false,
    isApproved: true,
    // branchId: '',
    companyId: '6358dc15fa7df86801678548',
    createdBy: '',
    createdDate: "2023-03-17T07:07:18.687Z",
    updatedBy: null,
    updatedDate: "2023-03-17T07:07:18.687Z"
  }
  const [pageNo, setPageNo] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const qry = {
    pageNo,
    pageSize,
    };

  useEffect(() =>{
    getEmployeeList(qry as any)
    .then(response => setEmployees(response.data))
      .catch(error => console.log(error));
      // console.log("employees=",employees);
  },[])

  const [employees, setEmployees] = useState<IEmployees[]>([]);
  const [employee, setEmployee] = useState<IEmployees>(initialEmployeeState);

  const addEmployee = async (employee: IEmployees) => {
    try {
      await axios.post(apiUrl, employee);
      alert('Data added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add data');
    }
  };

  const handleUpdate = (id: string) => {
    const selectedEmployee = employees.find((e) => e.id === id);
    console.log("selected employ=",selectedEmployee);
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  };

  const updateEmployee = async (employee: IEmployees) => {
    try {
      const id=employee.id;
      await axios.put(`${apiUrl}/${id}`, employee);
      alert('Data updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update data');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      console.log("Deleted!");
      alert("Deleted successfully!");
    } catch (error) {
      console.error('Error deleting employee', error);
    }
  };

  const employeeFunctions = {
    employees,
    setEmployees,
    employee,
    setEmployee,
    handleUpdate,
    handleDelete,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };

  return employeeFunctions;
};

export default EmployeeFunctions;


