import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Button,
  Checkbox,
  Switch,
  styled,
} from "@mui/material";
import CustomPagination from "@/components/modules/customPagination";
import styles from "./failedListTable.module.scss";

const columnSortingIcon = "/assets/icons/columnSortingIcon.png";

interface RowData {
  id: number;
  date: string;
  accountId: string;
  name: string;
  destination: string;
  data: string;
  days: string;
  status: string;
}

// Define the type for sorting configuration
interface SortConfig {
  key: keyof RowData | null;
  direction: "asc" | "desc";
}

const StatusButton = styled(Button)(({ theme }) => ({
  width: "51px",
  height: "25px",
  fontSize: "12px",
  borderRadius: "20px",
  backgroundColor: "#f5cbce",
  color: "#EE201C",
  textTransform: "none",
  minWidth: "auto",
  padding: "5px 8px 5px 8px",
  "&:hover": {
    backgroundColor: "#f5cbce",
  },
}));

const FailedListTable: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([
    {
      id: 1,
      date: "05-05-2024",
      accountId: "3234560",
      name: "John Doe",
      destination: "Japan",
      data: "6GB",
      days: "5 Days",
      status: "Failed",
    },
    {
      id: 2,
      date: "25-05-2024",
      accountId: "5234561",
      name: "Allison Bator",
      destination: "India",
      data: "8GB",
      days: "3 Days",
      status: "Failed",
    },
    {
        id: 3,
        date: "12-05-2024",
        accountId: "3284560",
        name: "good Doe",
        destination: "Japan",
        data: "2GB",
        days: "6 Days",
        status: "Failed",
      },
      {
        id: 4,
        date: "15-05-2024",
        accountId: "1234561",
        name: "Allison Bator",
        destination: "India",
        data: "8GB",
        days: "8 Days",
        status: "Failed",
      },
      {
        id: 5,
        date: "08-05-2024",
        accountId: "1234560",
        name: "John Doe",
        destination: "Japan",
        data: "8GB",
        days: "8 Days",
        status: "Failed",
      },
      {
        id: 6,
        date: "07-05-2024",
        accountId: "1234561",
        name: "Allison Bator",
        destination: "India",
        data: "8GB",
        days: "8 Days",
        status: "Failed",
      },
      {
        id: 7,
        date: "29-05-2024",
        accountId: "1234560",
        name: "John Doe",
        destination: "Japan",
        data: "8GB",
        days: "8 Days",
        status: "Failed",
      },
      {
        id: 8,
        date: "08-05-2024",
        accountId: "1234560",
        name: "John Doe",
        destination: "Japan",
        data: "8GB",
        days: "8 Days",
        status: "Failed",
      },
      {
        id: 9,
        date: "07-05-2024",
        accountId: "1234561",
        name: "Allison Bator",
        destination: "India",
        data: "8GB",
        days: "8 Days",
        status: "Failed",
      },
      {
        id: 10,
        date: "29-05-2024",
        accountId: "1234560",
        name: "John Doe",
        destination: "Japan",
        data: "8GB",
        days: "8 Days",
        status: "Failed",
      },
    
  ]);

  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const toggleExpand = (id: number) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAllRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(rows.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const isRowSelected = (id: number) => selectedRows.includes(id);

  const handleSort = (key: keyof RowData) => {
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className={styles.tableHead}>
          <TableRow className={styles.mainTableRow}>
            <TableCell className={styles.checkbox} padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < rows.length
                }
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={handleSelectAllRows}
              />
            </TableCell>

            <TableCell className={styles.id} padding="none">
              <div className={styles.headerCell}>
                #
                <img onClick={() => handleSort("id")} src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.date} padding="none">
              <div className={styles.headerCell}>
                Date
                <img onClick={() => handleSort("date")} src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.AccountId} padding="none" >
            <div className={styles.headerCell}  >
              Account ID
              <img onClick={() => handleSort("accountId")} src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.name} padding="none">
            <div className={styles.headerCell}>
              Name
              <img onClick={() => handleSort("name")} src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.destination} padding="none">
            <div className={styles.headerCell}>
              Destination
              <img onClick={() => handleSort("destination")} src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.data} padding="none">
            <div className={styles.headerCell}>
              Data
              <img onClick={() => handleSort("data")} src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.days} padding="none">
            <div className={styles.headerCell}>
              Days
              <img onClick={() => handleSort("days")} src={columnSortingIcon} />
              </div>
            </TableCell>
            <TableCell className={styles.status} padding="none">
            <div className={styles.headerCell}>
              Status
              <img src={columnSortingIcon} />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  className={styles.tableRow}
                  selected={isRowSelected(row.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isRowSelected(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </TableCell>

                  <TableCell padding="none">{row.id}</TableCell>
                  <TableCell padding="none">{row.date}</TableCell>
                  <TableCell padding="none">{row.accountId}</TableCell>
                  <TableCell padding="none" >{row.name}</TableCell>
                  <TableCell padding="none">{row.destination}</TableCell>
                  <TableCell padding="none">{row.data}</TableCell>
                  <TableCell padding="none">{row.days}</TableCell>
                  <TableCell padding="none">
                    <StatusButton>{row.status}</StatusButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={10}
                  ></TableCell>
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

export default FailedListTable;
