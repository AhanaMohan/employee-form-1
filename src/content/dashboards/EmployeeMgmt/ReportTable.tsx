import * as React from 'react';
import { useContext } from 'react';
import {
  Box,
  // Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  Button,
  Paper,
  // FormControl,
  // Select,
  // MenuItem,
  // InputLabel
} from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { IEmployees } from 'src/lib/interfaces/IEmployees';
import { getEmployeeList } from 'src/api/employeeReport/employeeList';
// import {handleUpdate, handleDelete} from './index'
//Skeleton Loading
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NoDataAnimation from 'src/assets/NoDataAnimation';
import { HeaderContext } from 'src/contexts/HeaderContext';

import EmployeeFunctions from './EmployeeFunctions';

interface Props {
  reportList: IEmployees;
  isLoading: Boolean;
  isRefetching: Boolean;
  pageSize: number;
  pageNo: number;
  totalCount: number;
  setPageNo: (pageNo: number) => void;
  setPageSize: (pageSize: number) => void;
}

function Row(props: { row: IEmployees }) {

  const { handleUpdate, handleDelete } = EmployeeFunctions();


  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const StyledTableCell = styled(TableCell)(() => ({
    borderBottom: 'none'
  }));
  const { company, setCompany } = useContext(HeaderContext);
  const [pageNo, setPageNo] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const qry = {
    pageNo,
    pageSize,
    company
    };
  //Get employee Details
  const { data: employeeDetails, isLoading: reportDetailsLoading } =
    useQuery<IEmployees>(
      ['employeeDetails', qry],
      () => getEmployeeList(qry as any),
      {
        refetchOnWindowFocus: false,
        enabled: !!open && !!row.id && !!company
      }
    );

  return (
    <React.Fragment>      
      <TableRow>
        {/* <StyledTableCell component="th" scope="row">{row.id === '' ? '--' : row.id}</StyledTableCell> */}
        <StyledTableCell>{row.employeeName}</StyledTableCell>
        <StyledTableCell>{row.employeeLocalName}</StyledTableCell>
        <StyledTableCell>{row.mobileNumber}</StyledTableCell>
        <StyledTableCell>{row.email} </StyledTableCell>
        <StyledTableCell>{row.address} </StyledTableCell>
        <StyledTableCell>{row.address1} </StyledTableCell>
        <StyledTableCell>

        <Button type='button' onClick={() => handleUpdate(row.id)}>
          Update
        </Button>

        <Button type='button' onClick={() => handleDelete(row.id)}>
          Delete
        </Button>

        </StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function employeeReportTable({
  reportList,
  isLoading,
  isRefetching,
  pageNo,
  pageSize,
  totalCount,
  setPageNo,
  setPageSize
}: Props) {
  return (
    <>
      <TableContainer component={Paper} sx={{ p: 2 }}>
        {isLoading || isRefetching ? (
          <Skeleton count={pageSize} height={45} />
        ) : (
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
                {reportList?.data?.map((row: any, idx) => (
                  <Row key={idx} row={row} />
                ))}
              </TableBody>
            </Table>
            {reportList?.data?.length === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  my: 3
                }}
              >
                <NoDataAnimation />
              </Box>
            )}
            <Box
              p={2}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              
            </Box>
          </>
        )}
      </TableContainer>
    </>
  );
}

