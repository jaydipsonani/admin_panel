import React, { useState, ChangeEvent } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Collapse, Button, Checkbox, styled
} from '@mui/material';
import CustomPagination from '@/components/modules/customPagination';
import styles from './esimListTable.module.scss';

const bottomArrowIcon = "/assets/icons/bottomArrowIcon.png";
const rightArrow = "/assets/icons/rightArrow.png";
const columnSortingIcon = "/assets/icons/columnSortingIcon.png";

const InvoiceButton = styled(Button)(({ theme }) => ({
  width: '80px',
  height: '25px',
  borderRadius: '50px',
  backgroundColor: '#b1d3fa',
  color: '#1883FF',
  textTransform: 'none',
  minWidth: 'auto',
  padding: '0 12px',
  gap: '10px',
  '&:hover': {
    backgroundColor: '#b1d3fa',
  },
}));

interface Details {
  installTime: string;
  updateTime: string;
  installDevice: string;
  buttonText: string;
}

interface Row {
  id: number;
  iccid: string;
  accountId: string;
  country: string;
  reinstall: string;
  details: Details;
}

interface SortConfig {
  key: keyof Row | null;
  direction: 'asc' | 'desc';
}

const EsimListTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, iccid: '19852342022002887791', accountId: '2234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 2, iccid: '29852342022002887791', accountId: '3234560', country: 'AMERICA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 3, iccid: '39852342022002887791', accountId: '4234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 4, iccid: '49852342022002887791', accountId: '5234560', country: 'AUSTRALIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 5, iccid: '59852342022002887791', accountId: '1234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 6, iccid: '69852342022002887791', accountId: '9234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 7, iccid: '89852342022002887791', accountId: '1234560', country: 'NEW ZEALAND', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 8, iccid: '9852342022002887791', accountId: '6234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 9, iccid: '79852342022002887791', accountId: '1234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 10, iccid: '89852342022002887791', accountId: '1234560', country: 'CORIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 11, iccid: '89852342022002887791', accountId: '7234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 12, iccid: '99852342022002887791', accountId: '1234560', country: 'UK', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
    { id: 13, iccid: '89852342022002887791', accountId: '8234560', country: 'INDIA', reinstall: '10', details: { installTime: '12:00 PM', updateTime: '15:00 PM', installDevice: 'ios', buttonText: 'Installed' } },
  ]);

  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  const toggleExpand = (id: number) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleSelectAllRows = (event: ChangeEvent<HTMLInputElement>) => {
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead className={styles.tableHead}>
          <TableRow className={styles.mainTableRow}>
            <TableCell padding='checkbox'>
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={handleSelectAllRows}
              />
            </TableCell>
            <TableCell className={styles.collapse} padding="none" />
            <TableCell className={styles.id} padding="none">#
              <img onClick={() => handleSort('id')} src={columnSortingIcon} alt="sort icon" />
            </TableCell>
            <TableCell className={styles.iccid} padding="none">ICCID
              <img onClick={() => handleSort('iccid')} src={columnSortingIcon} alt="sort icon" />
            </TableCell>
            <TableCell className={styles.AccountId} padding="none">ACCOUNT ID
              <img onClick={() => handleSort('accountId')} src={columnSortingIcon} alt="sort icon" />
            </TableCell>
            <TableCell className={styles.country} padding="none">COUNTRY
              <img onClick={() => handleSort('country')} src={columnSortingIcon} alt="sort icon" />
            </TableCell>
            <TableCell className={styles.reInstall} padding="none">REINSTALL
              <img onClick={() => handleSort('reinstall')} src={columnSortingIcon} alt="sort icon" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <React.Fragment key={row.id}>
              <TableRow className={expandedRows[row.id] ? styles.expandRow : styles.tableRow} selected={isRowSelected(row.id)}>
                <TableCell padding="none">
                  <Checkbox
                    checked={isRowSelected(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </TableCell>
                <TableCell padding="none">
                  <IconButton onClick={() => toggleExpand(row.id)}>
                    {expandedRows[row.id] ? <img src={bottomArrowIcon} alt="collapse icon" />
                      : <img src={rightArrow} alt="expand icon" />}
                  </IconButton>
                </TableCell>
                <TableCell padding="none">{row.id}</TableCell>
                <TableCell padding="none">{row.iccid}</TableCell>
                <TableCell padding="none">{row.accountId}</TableCell>
                <TableCell padding="none">{row.country}</TableCell>
                <TableCell padding="none">{row.reinstall}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                  <Collapse className={styles.collapseOpen} in={expandedRows[row.id]} timeout="auto">
                    <div className={styles.collapseMargin}>
                      <Table className={styles.collapseTable} size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell className={styles.emptySpace} padding="none" />
                            <TableCell className={styles.installTime} padding="none">INSTALL TIME
                              <div style={{ color: '#292D32' }}>{row.details.installTime}</div>
                            </TableCell>
                            <TableCell className={styles.esimType} padding="none">UPDATE TIME
                              <div>{row.details.updateTime}</div>
                            </TableCell>
                            <TableCell className={styles.insallDevice} padding="none">INSTALL DEVICE
                              <div>{row.details.installDevice}</div>
                            </TableCell>
                            <TableCell className={styles.status} padding="none">STATUS
                              <div>
                                <InvoiceButton>{row.details.buttonText}</InvoiceButton>
                              </div>
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

export default EsimListTable;
