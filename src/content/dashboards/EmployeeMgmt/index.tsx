import { useState, useEffect,useContext,useRef } from 'react';
import { IEmployees } from 'src/lib/interfaces/IEmployees';
import axios from 'axios';
import * as React from 'react';

import {
  Grid,
  styled,
  Box,
  Card,
  // Paper,
  Button,
  FormControl,
  TextField,
  // Table,
  // TableBody,
  TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getEmployeeList } from 'src/api/employeeReport/employeeList';
// import { useReactToPrint } from 'react-to-print';
import Swal from 'sweetalert2';
import ReportTable from './ReportTable';
//Context
import { SidebarContext } from 'src/contexts/SidebarContext';
import { HeaderContext } from 'src/contexts/HeaderContext';
import ConfirmDialog from './ConfirmDialog';
import * as XLSX from 'xlsx';
import { useReactToPrint } from 'react-to-print';
import PdfTable from './ReportPdf';
import { saveAs } from 'file-saver';


import EmployeeFunctions from './EmployeeFunctions';

const RootWrapper = styled(Card)(() => ({
  boxShadow: 'none',
}));

const ReportWrapper = styled(Card)(() => ({
  boxShadow: 'none',

}));

function Reports() {

  const { updateEmployee, addEmployee } = EmployeeFunctions();

  const theme = useTheme();
  const { company } = useContext(HeaderContext);
  const { openSidebar } = useContext(SidebarContext);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const qry = {
    pageNo,
    pageSize
    // company
   
  };
  const StyledTableCell = styled(TableCell)(() => ({
    borderBottom: 'none'
  }));

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

  // Query Call for Employ Report List

  const {
    data: reportList,
    isLoading,
    error:reportError,
    isRefetching,
    refetch
  } = useQuery<IEmployees>(
    ['employeeList', { pageNo, pageSize,company  }],
    () => getEmployeeList(qry as any),
    {
      refetchOnWindowFocus: false,
      enabled: !!company 
    }
    );
    const [open, setOpen] = useState(false);

  const [employees, setEmployees] = useState<IEmployees[]>([]);
  const [employee, setEmployee] = useState<IEmployees>(initialEmployeeState);

  axios.defaults.headers["dbName"] = "mysaledb33011114564";
  axios.defaults.headers["Content-Type"] = "application/json";
  axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

  const displayTable = (e) => {
    e.preventDefault();
    refetch(qry as any)
  };

  useEffect(() =>{
    getEmployeeList(qry as any)
    .then(response => setEmployees(response))
      .catch(error => console.log(error));
      console.log(employees);
  },[])

  const apiUrl = 'https://mysaleappcompanyapi-7lfpakcp7q-el.a.run.app/api/Employees';  

  useEffect(() =>{
    axios.get(apiUrl)
      .then(response => setEmployees(response.data.data))
      .catch(error => console.log(error));
      console.log(employees);
  },[])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({
    ...prevData,
    [name]: value,
    }));
  };

  // const addEmployee = async (employee:IEmployees) => {
  //   try {
  //     await axios.post(apiUrl, employee);
  //     setEmployee(initialEmployeeState);
  //     alert('Data added successfully!');
  //   } 
  //   catch (error) {
  //       console.error(error);
  //       alert('Failed to add data');
  //   }
  // };

  // const updateEmployee = async (id:string) => {
  //   try {
  //       await axios.put(`${apiUrl}/${id}`, employee);
  //       setEmployee(initialEmployeeState);
  //       alert('Data updated successfully!');
  //   }
  //   catch (error) {
  //       console.error(error);
  //       alert('Failed to update data');
  //   }
  // };

  // const deleteEmployee = async (id: string) => {
  //   try {
  //     await axios.delete(`${apiUrl}/${id}`);
  //     setEmployees(employees.filter(e => e.id !== id));
  //     console.log("Deleted!");
  //   } 
    
  //   catch (error) {
  //     console.error('Error deleting employee', error);
  //   }
  // };

  // const handleUpdate = (id: string) => {
  //   const selectedEmployee = employees.find((e) => e.id === id);
  //   if (selectedEmployee) {
  //     setEmployee(selectedEmployee);
  //   }
  // };
  
  // const handleDelete = async (id: string) => {
  //   if (window.confirm('Are you sure you want to delete this employee?')) {
  //     await deleteEmployee(id);
  //   }
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     if (employee.id) {
       updateEmployee(employee);
     } else {
      addEmployee(employee);
     }
    setEmployee(initialEmployeeState);
  };

  const handleCancel = () => {
    setEmployee(initialEmployeeState);
  };  
 
  useEffect(() => {
    if (reportError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });

    }
  }, [reportError]);
  

  // Print Section
  const marginTop = '5px';
  const marginRight = '40px';
  const marginBottom = '5px';
  const marginLeft = '40px';
  
  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
  };
  
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current
  });
  
  //Excel Data Configuration
  //For Customizing header and the data.
  const headers = [
    'Id',
    'Employee Name',
    'Employee Local Name',
    'Mobile Number',
    'Email',
    'Address',
    'Address1'
  ];

  const [excelData, setExcelData] = useState([]);
  useEffect(() => {
    if (reportList?.data?.length > 0) {
      const data = reportList.data.map((item) => {
        return [
          item.id,
          item.employeeName,
          item.employeeLocalName,
          item.mobileNumber,
          item.email,
          item.address,
          item.address1

        ];
      });
      setExcelData(data);
    }
  }, [reportList]);

  //Export to Excel Function with custom header and data
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    var wscols = [
      { wch: 5 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 9 },
      { wch: 9 },
      { wch: 15 },
      { wch: 15 },
      { wch: 5 }
    ];

    wb['!cols'] = wscols;

    XLSX.utils.sheet_add_aoa(wb, [headers]);
    XLSX.utils.sheet_add_json(wb, excelData, {
      origin: 'A2',
      skipHeader: true
    });

    wb['!cols'] = wscols;

    const ws = {
      Sheets: { SaleReport: wb },
      SheetNames: ['SaleReport']
    };

    const excelBuffer = XLSX.write(ws, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true
    });
    const finalData = new Blob([excelBuffer], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(finalData, 'SaleReport.xlsx');
  };

  return (
    <>
      <RootWrapper>
      <ConfirmDialog
          open={open}
          setOpen={setOpen}
          excel={exportToExcel}
          pdf={handlePrint}
        />
        <ReportWrapper>
          <Grid container direction="row" sx={{ padding: '20px' }}>
            <Grid item>
              <Typography sx={{ pb: 1 }} variant="h4">
                Add New Employee
              </Typography>
            </Grid>

            <Grid
              item
              sx={{
                ml: 'auto',
                [theme.breakpoints.down('sm')]: {
                  mx: 0,mt: 2,display: 'flex'
                }
              }}>

              <Button  variant="contained"  onClick={(e) => displayTable(e)} 
              sx={{
                  mr: 2,
                  [theme.breakpoints.down('sm')]: {
                    mb: 1,width: '100%'
                  }
                }} >
                Show  
              </Button>
              
              <Button
                onClick={() => setOpen(true)}
                variant="contained"
                sx={{
                  mr: 2,
                  [theme.breakpoints.down('sm')]: {
                    mb: 1,width: '100%'
                  }
                }}
                // startIcon={<FileDownloadIcon />}
              >
                Export
              </Button>
            </Grid>
          </Grid>
          <Divider />

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              px: '20px',
              mt: 2,
              padding: '20px'
            }}
          >

          {/* <form className="form" onSubmit={handleSubmit}> */}

          <Box>
            <FormControl style={{ marginRight: '4rem' }}>
              <label htmlFor="employeeName">Employee Name</label>
              <TextField type="text" id="employeeName" name="employeeName" value={employee.employeeName} onChange={handleInputChange} sx={{width: 300}}/>
            </FormControl>     

            <FormControl>
              <label htmlFor="employeeLocalName">Employee Local Name</label>
              <TextField type="text" id="employeeLocalName" name="employeeLocalName" value={employee.employeeLocalName} onChange={handleInputChange} sx={{width: 300}} />
            </FormControl>
          </Box>

          <Box sx={{ my: 2 }}>
            <FormControl style={{ marginRight: '4rem' }}>
              <label htmlFor="mobilenumber">Mobile Number</label>
              <TextField type="text" id="mobileNumber" name="mobileNumber" value={employee.mobileNumber} onChange={handleInputChange} sx={{width: 300}} />
            </FormControl>
            <FormControl>
              <label htmlFor="email">Email</label>
              <TextField type="text" id="email" name="email" value={employee.email} onChange={handleInputChange} sx={{width: 300}} />
            </FormControl>
          </Box>

          <Box>
            <FormControl style={{ marginRight: '4rem' }}>
              <label htmlFor="address">Address</label>
              <TextField type="text" id="address" name="address" value={employee.address} onChange={handleInputChange} sx={{width: 300}} />
            </FormControl>
            <FormControl>
              <label htmlFor="address1">Address1</label>
              <TextField type="text" id="address1" name="address1" value={employee.address1} onChange={handleInputChange} sx={{width: 300}} />
            </FormControl>
          </Box>

          <Box sx={{ my: 2 }}>
            <FormControl style={{ marginRight: '4rem' }}>
              <label htmlFor="ledgerId">Ledger Id</label>
              <TextField id="ledgerId" name="ledgerId" value={employee.ledgerId} onChange={handleInputChange} sx={{width: 300}} />
            </FormControl> 
            <FormControl>
              <label htmlFor="departmentId">Department Id</label>
              <TextField id="departmentId" name="departmentId" value={employee.departmentId} onChange={handleInputChange} sx={{width: 300}} />
            </FormControl>
          </Box>

          <Box>
            <FormControl style={{ marginRight: '4rem' }}>
              <label htmlFor="additionalDetailsMappingId">Additional Details Mapping Id</label>
              <TextField type="text" id="additionalDetailsMappingId" name="additionalDetailsMappingId" value={employee.additionalDetailsMappingId} onChange={handleInputChange} sx={{width: 300}} />
            </FormControl>
            <FormControl>
              <label htmlFor="payRollMappingId">Payroll Mapping Id</label>
              <TextField type="text" id="payRollMappingId" name="payRollMappingId" value={employee.payRollMappingId} onChange={handleInputChange} sx={{width: 300}} />
            </FormControl>
          </Box>
        
        <Box sx={{ my: 2 }}>
          <Button type='submit' variant="contained" sx={{ height: '50px',width:'140px', mr: 1, mt: 2, borderRadius: '40px' }}>
            {employee.id ? 'Update' : 'Save'}
          </Button>
             
          <Button variant="outlined" onClick={() => handleCancel()} sx={{ height: '50px', mr: 1, width:'140px', mt: 2, borderRadius: '40px' }} >
            Cancel
          </Button>  

        </Box>
      {/* </form>           */}
      </Box>

      <div style={{ display: 'none' }}>
            <style>{getPageMargins()}</style>
            <div ref={printRef}>
              <PdfTable
                reportList={reportList?.data}
              />
            </div>
          </div>

      {/* <TableContainer component={Paper} sx={{ p: 2 }}>
        <>
          <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Employee Local Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Address1</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>  
                {employees.length > 0 && Array.from(employees).map((row) => ( 
                <TableRow key={row.id}>
                  <StyledTableCell>{row.employeeName}</StyledTableCell>
                  <StyledTableCell>{row.employeeLocalName}</StyledTableCell>
                  <StyledTableCell>{row.mobileNumber}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.address}</StyledTableCell>
                  <StyledTableCell>{row.address1}</StyledTableCell>
                  <StyledTableCell>
                      <Button type='button' onClick={() => handleUpdate(row.id)} sx={{ height: '26px', mr: 1, mt: 0.5 }} variant="contained">Update</Button>
                      <Button type='button' onClick={() => handleDelete(row.id)} sx={{ height: '26px', mr: 1, mt: 0.5 }} variant="outlined">Delete</Button>
                  </StyledTableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        </TableContainer> */}
        
        <ReportTable
            reportList={reportList}
            isLoading={isLoading}
            isRefetching={isRefetching}
            totalCount={reportList?.totalCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageNo={pageNo}
            setPageNo={setPageNo}
          />
        </ReportWrapper>
        <Box>
          <Button  variant="outlined"  onClick={(e) => displayTable(e)} 
              sx={{ height: '50px', mr: 1, width:'140px', mt: 2, borderRadius: '40px', float:'right' }} 
              >
              Refresh  
          </Button>
        </Box>
      </RootWrapper>
    </>
  );
}

export default Reports;
