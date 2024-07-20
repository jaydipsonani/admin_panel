import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Collapse, Button, Checkbox, styled,
  makeStyles
} from '@mui/material';
import CustomPagination from '@/components/modules/customPagination';
import styles from './SuccessfullListTable.module.scss'

const bottomArrowIcon = "/assets/icons/bottomArrowIcon.png";
const rightArrow = "/assets/icons/rightArrow.png";
const columnSortingIcon = "/assets/icons/columnSortingIcon.png";

interface RowDetails {
  actualCost: string;
  sellingPrice: string;
  discount: string;
  netIncome: string;
  paymentType: string;
  sale: string;
  waoclub: string;
  iccid: string;
  buttonText: string;
}

interface Row {
  id: number;
  date: string;
  accountId: string;
  name: string;
  destination: string;
  data: string;
  days: string;
  status: string;
  details: RowDetails;
}

const StatusButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  backgroundColor: '#E0F3E0',
  color: '#1A932E',
  textTransform: 'none',
  minWidth: 'auto',
  padding: '0 12px',
  '&:hover': {
    backgroundColor: '#E0F3E0',
  },
}));

const InvoiceButton = styled(Button)(({ theme }) => ({
  borderRadius: '48px',
  backgroundColor: '#1A932E',
  color: 'white',
  textTransform: 'none',
  minWidth: 'auto',
  padding: '0 12px',
  gap: '10px',
  '&:hover': {
    backgroundColor: '#1A932E',
  },
}));


const SuccessFullList: React.FC = () => {

  const [rows, setRows] = useState([
    { id: 1, date: '15-05-2024', accountId: '1234560', name: 'John Doe', destination: 'Japan', data: '8GB', days: '8 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 2, date: '18-05-2024', accountId: '2234561', name: 'Allison Bator', destination: 'India', data: '3GB', days: '2 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 3, date: '13-05-2024', accountId: '5234562', name: 'Charlie Philips', destination: 'UK', data: '4GB', days: '7 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 4, date: '19-05-2024', accountId: '3234560', name: 'hello Doe', destination: 'Japan', data: '8GB', days: '9 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 5, date: '28-05-2024', accountId: '8234561', name: 'Allison Bator', destination: 'India', data: '5GB', days: '8 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 6, date: '26-05-2024', accountId: '7234562', name: 'Charlie Philips', destination: 'UK', data: '7GB', days: '8 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 7, date: '05-05-2024', accountId: '9234560', name: 'John Doe', destination: 'Japan', data: '8GB', days: '6 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 8, date: '07-05-2024', accountId: '5234561', name: 'Allison Bator', destination: 'India', data: '8GB', days: '8 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 9, date: '05-05-2024', accountId: '9234560', name: 'John Doe', destination: 'Japan', data: '8GB', days: '6 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
    { id: 10, date: '07-05-2024', accountId: '5234561', name: 'Allison Bator', destination: 'India', data: '8GB', days: '8 Days', status: 'Completed', details: { actualCost: '$4.99', sellingPrice: '$3.59', discount: '10%', netIncome: '$1.00', paymentType: 'Card', sale: '10%', waoclub: '10%', iccid: '89853242022002887791', buttonText: 'Invoice' } },
  ]);



  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Row | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });


  const toggleExpand = (id: number) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        return prev.filter(rowId => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(rows.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const isRowSelected = (id: number) => selectedRows.includes(id);

  const handleSort = (key: keyof Row) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (sortConfig.key) {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfig.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
    }
    return 0;
  });

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table className={styles.mainTable} >
        <TableHead className={styles.tableHead}>
          <TableRow className={styles.mainTableRow}>
            <TableCell className={styles.checkbox} padding="checkbox">
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={handleSelectAllRows}
              />
            </TableCell>
            <TableCell className={styles.collapse} padding="none" />
            <TableCell className={styles.id} padding="none">
              <div className={styles.headerCell}>
                # <img onClick={() => handleSort('id')}  src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.date} padding="none">
              <div className={styles.headerCell}>
                DATE<img onClick={() => handleSort('date')}  src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.AccountId} padding="none">
              <div className={styles.headerCell}>
                ACCOUNT ID<img onClick={() => handleSort('accountId')}  src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.name} padding="none">
              <div className={styles.headerCell}>
                NAME<img onClick={() => handleSort('name')}  src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.destination} padding="none">
              <div className={styles.headerCell}>
                DESTINATION<img onClick={() => handleSort('destination')}  src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.data} padding="none">
              <div className={styles.headerCell}>
                DATA<img onClick={() => handleSort('data')}  src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.days} padding="none">
              <div className={styles.headerCell}>
                DAYS<img onClick={() => handleSort('days')}  src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.status} padding="none">
              <div className={styles.headerCell}>
                Status<img onClick={() => handleSort('status')}  src={columnSortingIcon} />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <React.Fragment key={row.id}>
              <TableRow className={expandedRows[row.id] ? styles.expandRow : styles.tableRow} selected={isRowSelected(row.id)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isRowSelected(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </TableCell>
                <TableCell padding="none">
                  <IconButton onClick={() => toggleExpand(row.id)}>
                    {expandedRows[row.id] ? <img src={bottomArrowIcon} />
                      : <img src={rightArrow} />}
                  </IconButton>
                </TableCell>
                <TableCell padding="none">{row.id}</TableCell>
                <TableCell padding="none">{row.date}</TableCell>
                <TableCell padding="none">{row.accountId}</TableCell>
                <TableCell padding="none">{row.name}</TableCell>
                <TableCell padding="none">{row.destination}</TableCell>
                <TableCell padding="none">{row.data}</TableCell>
                <TableCell padding="none">{row.days}</TableCell>
                <TableCell padding="none">
                  <StatusButton>{row.status}</StatusButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding="none" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                  <Collapse className={styles.collapseOpen} in={expandedRows[row.id]} timeout="auto">
                    <div className={styles.collapseMargin}>
                      <Table className={styles.collapseTable} size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell className={styles.emptySpace} padding="none"/>
                            <TableCell className={styles.actualCost} padding="none">
                              <span>Actual Cost</span>
                              <div>{row.details.actualCost}</div>
                            </TableCell>
                            <TableCell padding="none" className={styles.sellingPrice}>
                              <span>Selling Price</span>
                              <div>{row.details.sellingPrice}</div>
                            </TableCell >
                            <TableCell className={styles.discount} padding="none">
                              <span>Discount</span>
                              <div>{row.details.discount}</div>
                            </TableCell>
                            <TableCell className={styles.netIncome} padding="none">
                              <span>Net Income</span>
                              <div>{row.details.netIncome}</div>
                            </TableCell>
                            <TableCell className={styles.paymentType} padding="none">
                              <span>Payment Type</span>
                              <div>{row.details.paymentType}</div>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={styles.emptySpace} padding="none" />
                            <TableCell className={styles.sale}>
                              <span>Sale</span>
                              <div>{row.details.sale}</div>
                            </TableCell>
                            <TableCell className={styles.waoClub} padding="none">
                              <span>WAOClub</span>
                              <div>{row.details.waoclub}</div>
                            </TableCell>
                            <TableCell className={styles.iccicd} padding="none">
                              <span>ICCID</span>
                              <div>{row.details.iccid}</div>
                            </TableCell>
                            <TableCell className={styles.invoiceButton} colSpan={2} padding="none">
                              <InvoiceButton variant="contained">{row.details.buttonText}</InvoiceButton>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 36 * emptyRows }}>
              <TableCell colSpan={10} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CustomPagination
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default SuccessFullList;
