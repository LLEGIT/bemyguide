"use client";
import {
  Information,
  InformationCreate,
  InformationType,
} from "@/Models/Informations/InformationModel";
import { TableColumn } from "@/Models/TableColumn";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { SubmitButton } from "@/components/Buttons/Buttons";
import { OptionsRow } from "@/components/OptionsRow/OptionsRow";
import PaginatedTable from "@/components/PaginatedTable/PaginatedTable";
import { CommonToastSuccessWithTitle } from "@/utils/toast";
import {
  Checkbox,
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

export default function AdministrationDestinationInformations({
  params,
}: {
  params: { destinationId: string };
}) {
  const i18n = useIntl();
  const [destinationInformations, setDestinationInformations] =
    useState<Array<Information>>();

  const [newInformation, setNewInformation] = useState<InformationCreate>({
    rawText: "",
    type: InformationType.ADVICE,
    validated: true,
  });

  const handleFormChange = (field: keyof InformationCreate, value: any) => {
    setNewInformation((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const columns: readonly TableColumn[] = [
    {
      id: "type",
      label: "common_type",
      minWidth: 170,
    },
    {
      id: "rawText",
      label: "common_description",
      minWidth: 100,
    },
    {
      id: "validated",
      label: "common_validated",
      minWidth: 100,
    },
    {
      id: "options",
      label: "common_options",
      minWidth: 150,
    },
  ];

  const saveProduct = async (row: Information) => {
    await DestinationViewModel.updateInformation(
      destinationInformations?.find(
        (information) => information._id === row._id
      )!
    );
    CommonToastSuccessWithTitle(
      "toast_success_destination_information_updated"
    );
  };

  const deleteProduct = async (row: Information) => {
    await DestinationViewModel.deleteInformation(
      destinationInformations?.find(
        (information) => information._id === row._id
      )!
    );
    CommonToastSuccessWithTitle(
      "toast_success_destination_information_deleted"
    );
    setDestinationInformations(
      destinationInformations?.filter(
        (information) => information._id !== row._id
      )
    );
  };

  const handleSubmit = async () => {
    const saved = await DestinationViewModel.createInformation(
      params.destinationId,
      newInformation
    );
    CommonToastSuccessWithTitle("toast_success_common");
    updateTable(saved);
    setNewInformation({
      rawText: "",
      type: InformationType.ADVICE,
      validated: true,
    });
  };

  const updateTable = (saved: Information) => {
    setDestinationInformations((prevDestinations = []) => [
      ...prevDestinations,
      saved,
    ]);
  };

  const displayTableCell = (row: Information, column: TableColumn) => {
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
    if (column.id === "rawText") {
      return (
        <TextField
          type="text"
          multiline
          value={row[column.id]}
          onChange={(e) =>
            setDestinationInformations(
              destinationInformations?.map((information) => {
                if (information._id === row._id) {
                  return {
                    ...information,
                    [column.id]: e.target.value,
                  };
                }
                return information;
              })
            )
          }
          fullWidth
        />
      );
    }
    if (column.id === "type") {
      return (
        <FormControl fullWidth>
          <Select
            value={row[column.id]}
            onChange={(e) =>
              setDestinationInformations(
                destinationInformations?.map((information) => {
                  if (information._id === row._id) {
                    return {
                      ...information,
                      [column.id]: e.target.value,
                    };
                  }
                  return information;
                })
              )
            }
            fullWidth
          >
            {Object.keys(InformationType).map((key) => (
              <MenuItem
                key={key}
                value={InformationType[key as keyof typeof InformationType]}
              >
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    if (column.id === "validated") {
      return (
        <Checkbox
          checked={row[column.id]}
          onChange={(e) =>
            setDestinationInformations(
              destinationInformations?.map((information) => {
                if (information._id === row._id) {
                  return {
                    ...information,
                    [column.id]: e.target.checked,
                  };
                }
                return information;
              })
            )
          }
        />
      );
    }
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
      undefined,
      setDestinationInformations
    );
  }, []);

  return (
    <>
      <Grid container marginTop="30px" marginLeft={"16px"}>
        <GoBackButton url={Routes.Administration_Destinations} />
      </Grid>
      {destinationInformations && (
        <PaginatedTable
          columns={columns}
          data={destinationInformations}
          displayTableRow={displayTableRow}
          customMaxHeight="40vh"
          page={0}
        />
      )}
      <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
        <Grid item xs={12} marginTop="30px">
          <Typography variant="h6">
            {i18n.formatMessage({
              id: "administration_destinations_information_title",
            })}
          </Typography>
          <FormControl fullWidth>
            <Grid item xs={12} marginTop="20px">
              <FormControl fullWidth>
                <InputLabel id="information-label">
                  {i18n.formatMessage({
                    id: "common_information_type",
                  })}
                </InputLabel>
                <Select
                  value={newInformation.type}
                  onChange={(e) => handleFormChange("type", e.target.value)}
                  labelId="information-label"
                  label={i18n.formatMessage({
                    id: "common_information_type",
                  })}
                >
                  {Object.keys(InformationType).map((key) => (
                    <MenuItem
                      key={key}
                      value={
                        InformationType[key as keyof typeof InformationType]
                      }
                    >
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} marginTop="20px">
              <TextField
                type="text"
                label={i18n.formatMessage({
                  id: "common_description",
                })}
                multiline
                value={newInformation.rawText}
                onChange={(e) => handleFormChange("rawText", e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              marginTop="20px"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Checkbox
                checked={newInformation.validated}
                onChange={(e) =>
                  handleFormChange("validated", e.target.checked)
                }
              />
              <Typography variant="body2">
                {i18n.formatMessage({
                  id: "common_validated",
                })}
              </Typography>
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
