import React, { useState, ChangeEvent } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Collapse, Button, Checkbox, styled
} from '@mui/material';
import CustomPagination from '@/components/modules/customPagination';
import styles from './planListTable.module.scss'

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
    gap: '10px'
}));

interface Details {
    os: string;
    esimtype: string;
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
    details: Details;
}

interface SortConfig {
    key: keyof Row | null;
    direction: 'asc' | 'desc';
}

const PlanListTable: React.FC = () => {
    const [rows, setRows] = useState<Row[]>([
        { id: 1, date: '15-05-2024', accountId: '1234560', name: 'hello Doe', destination: 'America', data: '1GB', days: '3 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
        { id: 2, date: '16-05-2024', accountId: '5234560', name: 'good Doe', destination: 'west indies', data: '2GB', days: '5 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
        { id: 3, date: '20-05-2024', accountId: '7234560', name: 'morning Doe', destination: 'canada', data: '3GB', days: '1 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
        { id: 4, date: '18-05-2024', accountId: '9234560', name: 'jai Doe', destination: 'london', data: '4GB', days: '5 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
        { id: 5, date: '15-05-2024', accountId: '1234560', name: 'hello Doe', destination: 'America', data: '5GB', days: '3 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
        { id: 6, date: '16-05-2024', accountId: '5234560', name: 'good Doe', destination: 'west indies', data: '6GB', days: '5 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
        { id: 7, date: '20-05-2024', accountId: '7234560', name: 'morning Doe', destination: 'canada', data: '7GB', days: '1 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
        { id: 8, date: '18-05-2024', accountId: '9234560', name: 'jai Doe', destination: 'london', data: '8GB', days: '5 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
        { id: 9, date: '18-05-2024', accountId: '9234560', name: 'jai Doe', destination: 'london', data: '9GB', days: '5 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
        { id: 10, date: '18-05-2024', accountId: '9234560', name: 'jai Doe', destination: 'london', data: '10GB', days: '5 Days', details: { os: 'IOS', esimtype: 'Exit eSIM', iccid: '89853242022002887791', buttonText: 'In-use' } },
        
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
                        <TableCell className={styles.checkbox} padding="checkbox">
                            <Checkbox
                                indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                                checked={rows.length > 0 && selectedRows.length === rows.length}
                                onChange={handleSelectAllRows}
                            />
                        </TableCell>
                        <TableCell className={styles.collapse} />
                        <TableCell className={styles.id} padding="none">#<img onClick={() => handleSort('id')} src={columnSortingIcon} /></TableCell>
                        <TableCell className={styles.date} padding="none">Date<img onClick={() => handleSort('date')} src={columnSortingIcon} /></TableCell>
                        <TableCell className={styles.AccountId} padding="none">Account ID<img onClick={() => handleSort('accountId')} src={columnSortingIcon} /></TableCell>
                        <TableCell className={styles.name} padding="none">Name<img onClick={() => handleSort('name')} src={columnSortingIcon} /></TableCell>
                        <TableCell className={styles.destination} padding="none">Destination<img onClick={() => handleSort('destination')} src={columnSortingIcon} /></TableCell>
                        <TableCell className={styles.data} padding="none">Data<img onClick={() => handleSort('data')} src={columnSortingIcon} /></TableCell>
                        <TableCell className={styles.days} padding="none">Days<img onClick={() => handleSort('days')} src={columnSortingIcon} /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <React.Fragment key={row.id}>
                            <TableRow className={expandedRows[row.id] ? styles.expandRow : styles.tableRow} selected={isRowSelected(row.id)}>
                                <TableCell padding="checkbox" >
                                    <Checkbox
                                        checked={isRowSelected(row.id)}
                                        onChange={() => handleSelectRow(row.id)}
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                    <IconButton onClick={() => toggleExpand(row.id)} >
                                        {expandedRows[row.id] ? <img src={bottomArrowIcon} />
                                            : <img src={rightArrow} />}
                                    </IconButton>
                                </TableCell>
                                <TableCell padding="none" >{row.id}</TableCell>
                                <TableCell padding="none">{row.date}</TableCell>
                                <TableCell padding="none">{row.accountId}</TableCell>
                                <TableCell padding="none">{row.name}</TableCell>
                                <TableCell padding="none">{row.destination}</TableCell>
                                <TableCell padding="none">{row.data}</TableCell>
                                <TableCell padding="none">{row.days}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                                    <Collapse className={styles.collapseOpen} in={expandedRows[row.id]} timeout="auto">
                                        <div className={styles.collapseMargin} >
                                            <Table className={styles.collapseTable} size="small">
                                                <TableBody >
                                                    <TableRow>
                                                        <TableCell className={styles.emptySpace} padding="none" />
                                                        <TableCell className={styles.os} padding="none">Os
                                                            <div style={{ color: '#292D32' }}>{row.details.os}</div>
                                                        </TableCell>
                                                        <TableCell className={styles.esimType} padding="none">ESIM TYPE
                                                            <div>{row.details.esimtype}</div>
                                                        </TableCell>
                                                        <TableCell className={styles.iccid} padding="none">ICCID
                                                            <div>{row.details.iccid}</div>
                                                        </TableCell>
                                                        <TableCell className={styles.status} padding="none">STATUS
                                                            <div>
                                                                <InvoiceButton variant="contained">{row.details.buttonText}</InvoiceButton>
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

export default PlanListTable;
