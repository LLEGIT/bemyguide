"use client";
import { TableColumn } from "@/Models/TableColumn";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useIntl } from "react-intl";

interface PaginatedTableProps {
  columns: readonly TableColumn[];
  data: Array<any>;
  displayTableRow: (row: any) => JSX.Element;
  customHandleChangePage?: (event: unknown, newPage: number) => void;
  handleDelete?: (id: string) => void;
  customCount?: number;
  customMaxHeight?: string;
  page: number;
}

export default function PaginatedTable({
  columns,
  data,
  ...props
}: PaginatedTableProps) {
  const i18n = useIntl();

  // Useless unless used for another purpose
  const handleChangePage = async (_event: unknown, newPage: number) => {
    return;
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: props.customMaxHeight ?? "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {i18n.formatMessage({ id: column.label })}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.customHandleChangePage
              ? data.map((row) => props.displayTableRow(row))
              : data
                  .slice(props.page * 15, props.page * 15 + 15)
                  .map((row) => props.displayTableRow(row))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={props.customCount ?? data.length}
        rowsPerPageOptions={[]}
        rowsPerPage={15}
        page={props.page}
        onPageChange={props.customHandleChangePage ?? handleChangePage}
      />
    </>
  );
}
