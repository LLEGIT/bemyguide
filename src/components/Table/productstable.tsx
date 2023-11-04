import { useState, ChangeEvent, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { DestinationProducts } from "@/Models/Destination/DestinationModel";
import { useIntl } from "react-intl";

interface ProductsTableProps {
  products: Array<DestinationProducts>;
}
interface Column {
  id: "product" | "category" | "floor_price" | "ceiling_price" | "quantity";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Products {
  product: string;
  category?: string;
  floor_price: number;
  ceiling_price: number;
  quantity?: string;
}

function createData(
  product: string,
  category: string,
  floor_price: number,
  ceiling_price: number,
  quantity: string
): Products {
  return { product, category, floor_price, ceiling_price, quantity };
}

function createMobileData(
  product: string,
  floor_price: number,
  ceiling_price: number
): Products {
  return { product, floor_price, ceiling_price };
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const i18n = useIntl();
  const [rows, setRows] = useState<Array<Products>>([]);
  const [mobileRows, setMobileRows] = useState<Array<Products>>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const columns: readonly Column[] = [
    {
      id: "product",
      label: i18n.formatMessage({ id: "destination_products_label_product" }),
      minWidth: 10,
    },
    {
      id: "category",
      label: i18n.formatMessage({ id: "destination_products_label_category" }),
      minWidth: 10,
    },
    {
      id: "floor_price",
      label: i18n.formatMessage({
        id: "destination_products_label_floor_price",
      }),
      minWidth: 10,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "ceiling_price",
      label: i18n.formatMessage({
        id: "destination_products_label_ceiling_price",
      }),
      minWidth: 10,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "quantity",
      label: i18n.formatMessage({ id: "destination_products_label_quantity" }),
      minWidth: 10,
      align: "right",
    },
  ];

  const mobileColumns: readonly Column[] = [
    {
      id: "product",
      label: i18n.formatMessage({ id: "destination_products_label_product" }),
      minWidth: 8,
    },
    {
      id: "floor_price",
      label: i18n.formatMessage({
        id: "destination_products_label_floor_price",
      }),
      minWidth: 5,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "ceiling_price",
      label: i18n.formatMessage({
        id: "destination_products_label_ceiling_price",
      }),
      minWidth: 5,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US"),
    },
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const generateRows = () => {
    const array: Array<Products> = [];
    products.map((destinationProducts: DestinationProducts) => {
      const tmp = createData(
        destinationProducts.product.name,
        destinationProducts.product.category,
        destinationProducts.floor_price,
        destinationProducts.ceiling_price,
        destinationProducts.product.value
      );
      array.push(tmp);
    });
    setRows(array);
    return array;
  };

  const generateMobileRows = () => {
    const array: Array<Products> = [];
    products.map((destinationProducts: DestinationProducts) => {
      const tmp = createMobileData(
        destinationProducts.product.name,
        destinationProducts.floor_price,
        destinationProducts.ceiling_price
      );
      array.push(tmp);
    });
    setMobileRows(array);
    return array;
  };

  useEffect(() => {
    generateRows();
    generateMobileRows();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{ maxHeight: 740, display: { xs: "block", sm: "none" } }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {mobileColumns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mobileRows.length > 0 &&
              mobileRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={"mobile" + index}
                    >
                      {mobileColumns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : i18n.formatMessage({
                                  id:
                                    (value as string) ??
                                    "destination_products_label_no_value",
                                })}
                          </TableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer
        sx={{ maxHeight: 740, display: { xs: "none", sm: "block" } }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={"desktop" + index}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : i18n.formatMessage({
                                  id:
                                    (value as string) ??
                                    "destination_products_label_no_value",
                                })}
                          </TableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 25, 50]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={i18n.formatMessage({
          id: "destination_products_table_results_per_page",
        })}
      />
    </Paper>
  );
}
