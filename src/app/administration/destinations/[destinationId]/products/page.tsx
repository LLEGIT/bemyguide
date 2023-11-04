"use client";
import {
  DestinationProductCreate,
  DestinationProducts,
} from "@/Models/Destination/DestinationModel";
import { Products } from "@/Models/Products/ProductModel";
import { TableColumn } from "@/Models/TableColumn";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { SubmitButton } from "@/components/Buttons/Buttons";
import { OptionsRow } from "@/components/OptionsRow/OptionsRow";
import PaginatedTable from "@/components/PaginatedTable/PaginatedTable";
import { CommonToastSuccessWithTitle } from "@/utils/toast";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import GoBackButton from "@/components/GoBackButton/GoBackButton";
import { Routes } from "@/utils/routes";

export default function AdministrationDestinationProducts({
  params,
}: {
  params: { destinationId: string };
}) {
  const i18n = useIntl();
  const [destinationProducts, setDestinationProducts] =
    useState<Array<DestinationProducts>>();
  const [availableProducts, setAvailableProducts] = useState<Array<string>>();

  const [newProduct, setNewProduct] = useState<DestinationProductCreate>({
    name: "",
    floor_price: 0,
    ceiling_price: 0,
  });

  const handleFormChange = (
    field: keyof DestinationProductCreate,
    value: any
  ) => {
    setNewProduct((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const columns: readonly TableColumn[] = [
    {
      id: "name",
      label: "destinations_product_name",
      minWidth: 170,
    },
    {
      id: "floor_price",
      label: "destinations_product_floor_price",
      minWidth: 100,
    },
    {
      id: "ceiling_price",
      label: "destinations_product_ceiling_price",
      minWidth: 100,
    },
    {
      id: "options",
      label: "common_options",
      minWidth: 150,
    },
  ];

  const saveProduct = async (row: DestinationProducts) => {
    await DestinationViewModel.updateProduct(
      destinationProducts?.find((product) => product._id === row._id)!
    );
    CommonToastSuccessWithTitle("toast_success_destination_product_updated");
  };

  const deleteProduct = async (row: DestinationProducts) => {
    await DestinationViewModel.deleteProduct(
      destinationProducts?.find((product) => product._id === row._id)?._id!
    );
    CommonToastSuccessWithTitle("toast_success_destination_product_deleted");
    setDestinationProducts(
      destinationProducts?.filter((product) => product._id !== row._id)
    );
  };

  const handleSubmit = async () => {
    const saved = await DestinationViewModel.createProduct(
      params.destinationId,
      newProduct
    );
    CommonToastSuccessWithTitle("toast_success_common");
    updateTable(saved);
    setNewProduct({
      name: "",
      floor_price: 0,
      ceiling_price: 0,
    });
  };

  const updateTable = (saved: DestinationProducts) => {
    setDestinationProducts((prevProducts = []) => [...prevProducts, saved]);
  };

  const availableProductsOptions = () => {
    const options = Object.keys(Products).filter(
      (key) =>
        !destinationProducts?.find(
          (destinationProduct) =>
            destinationProduct.product.name ===
            Products[key as keyof typeof Products]
        )
    );
    setAvailableProducts(options);
  };

  const displayTableCell = (row: DestinationProducts, column: TableColumn) => {
    if (column.id === "options") {
      return (
        <OptionsRow
          informationOption={false}
          productOption={false}
          photoOption={false}
          editOption={false}
          deleteModalTitle="administration_destinations_product_delete_modal_title"
          deleteModalContent="administration_destinations_product_delete_modal_content"
          deleteLabel={i18n.formatMessage({
            id: "common_delete",
          })}
          deleteAction={() => deleteProduct(row)}
          saveOption={true}
          saveLabel={i18n.formatMessage({
            id: "common_save",
          })}
          saveAction={() => saveProduct(row)}
        />
      );
    }
    if (column.id === "name") {
      return (
        <>
          {i18n.formatMessage({
            id: row.product[column.id],
          })}
        </>
      );
    }
    return (
      <TextField
        type="number"
        value={row[column.id as keyof DestinationProducts]}
        onChange={(e) =>
          setDestinationProducts(
            destinationProducts?.map((product) => {
              if (product._id === row._id) {
                return {
                  ...product,
                  [column.id]: parseFloat(e.target.value),
                };
              }
              return product;
            })
          )
        }
        fullWidth
      />
    );
  };

  const displayTableRow = (row: any) => (
    <TableRow hover tabIndex={-1} key={row._id}>
      {columns.map((column) => (
        <TableCell
          key={column.id + row._id}
          style={{
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
          }}
        >
          {displayTableCell(row, column)}
        </TableCell>
      ))}
    </TableRow>
  );

  useEffect(() => {
    DestinationViewModel.onRead(
      params.destinationId,
      undefined,
      undefined,
      undefined,
      setDestinationProducts
    );
  }, []);

  useEffect(() => {
    availableProductsOptions();
  }, [destinationProducts]);

  return (
    <>
      <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
        <GoBackButton url={Routes.Administration_Destinations} />
      </Grid>
      {destinationProducts && (
        <PaginatedTable
          columns={columns}
          data={destinationProducts}
          displayTableRow={displayTableRow}
          customMaxHeight="40vh"
          page={0}
        />
      )}
      <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
        <Grid item xs={12} marginTop="30px">
          <Typography variant="h6">
            {i18n.formatMessage({
              id: "administration_destinations_product_title",
            })}
          </Typography>
          <FormControl fullWidth>
            <Grid item xs={12} marginTop="20px">
              <FormControl fullWidth>
                <InputLabel id="product-label">
                  {i18n.formatMessage({
                    id: "destinations_product_label",
                  })}
                </InputLabel>
                <Select
                  value={newProduct.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  labelId="product-label"
                  label={i18n.formatMessage({
                    id: "destinations_product_label",
                  })}
                >
                  {availableProducts?.map((key) => (
                    <MenuItem
                      key={key}
                      value={Products[key as keyof typeof Products]}
                    >
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} marginTop="20px">
              <TextField
                type="number"
                label={i18n.formatMessage({
                  id: "destinations_product_floor_price",
                })}
                value={newProduct.floor_price}
                onChange={(e) =>
                  handleFormChange("floor_price", parseFloat(e.target.value))
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} marginTop="20px">
              <TextField
                type="number"
                label={i18n.formatMessage({
                  id: "destinations_product_ceiling_price",
                })}
                value={newProduct.ceiling_price}
                onChange={(e) =>
                  handleFormChange("ceiling_price", parseFloat(e.target.value))
                }
                fullWidth
                required
              />
            </Grid>
            <SubmitButton
              label={i18n.formatMessage({ id: "button_send" })}
              onClick={handleSubmit}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
