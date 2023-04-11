import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  styled
} from '@mui/material';
import { IEmployees } from 'src/lib/interfaces/IEmployees';
interface Props {
  reportList: IEmployees[];
}
export default function PdfTable({ reportList}: Props) {
  const StyledTableCell = styled(TableCell)(() => ({
    color: 'black',
    border: '1px solid black',
    padding: '7px'
  }));

  return (
    <Box>
      <Typography variant="h3" sx={{ py: 1 }} align="center">
        TRADEASY
      </Typography>
      <Typography variant="h4" sx={{ pb: 2 }} align="center">
        Employee Details
      </Typography>
      
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>ID</StyledTableCell> */}
              <StyledTableCell>EMPLOYEE NAME</StyledTableCell>
              <StyledTableCell>EMPLOYEE LOCAL NAME</StyledTableCell>
              <StyledTableCell>MOBILE NUMBER</StyledTableCell>
              <StyledTableCell>EMAIL</StyledTableCell>
              <StyledTableCell>ADDRESS</StyledTableCell>        
              <StyledTableCell>ADDRESS1	</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {reportList?.map((row,idx) => (
              <TableRow key={idx}>
                {/* <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell> */}
                <StyledTableCell>{row.employeeName}</StyledTableCell>
                <StyledTableCell>{row.employeeLocalName}</StyledTableCell>
                <StyledTableCell>{row.mobileNumber}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.address}</StyledTableCell>
                <StyledTableCell>{row.address1}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
