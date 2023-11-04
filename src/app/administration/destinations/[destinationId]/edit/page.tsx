"use client";
import {
  Currency,
  DestinationEdit,
  initialDestinationFormData,
} from "@/Models/Destination/DestinationModel";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { SubmitButton } from "@/components/Buttons/Buttons";
import { Routes } from "@/utils/routes";
import { CommonToastSuccessWithTitle } from "@/utils/toast";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

export default function AdministrationDestinationDetails({
  params,
}: {
  params: { destinationId: string };
}) {
  const i18n = useIntl();
  const router = useRouter();
  const [destinationDetails, setDestinationDetails] = useState<DestinationEdit>(
    initialDestinationFormData
  );

  const handleFormChange = (field: keyof DestinationEdit, value: any) => {
    setDestinationDetails((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const saved =
      params.destinationId === "create"
        ? await DestinationViewModel.onCreate(destinationDetails)
        : await DestinationViewModel.onSave(destinationDetails);
    CommonToastSuccessWithTitle("toast_success_common");
    if (params.destinationId === "create") {
      router.push(
        Routes.Administration_Edit(
          Routes.Administration_Destinations,
          saved._id
        )
      );
      return;
    }
    setDestinationDetails(saved);
  };

  useEffect(() => {
    if (params.destinationId !== "create") {
      DestinationViewModel.onRead(params.destinationId, setDestinationDetails);
    }
  }, []);

  return (
    <Grid container padding={{ xs: "22px", lg: "20px 29%" }}>
      <Grid container>
        <FormControl fullWidth>
          <Grid item xs={12} marginTop="20px">
            <TextField
              label={i18n.formatMessage({
                id: "common_name",
              })}
              value={destinationDetails.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} marginTop="20px">
            <TextField
              label={i18n.formatMessage({
                id: "destinations_latitude_label",
              })}
              type="number"
              value={destinationDetails.coordinates.lat}
              onChange={(e) =>
                handleFormChange("coordinates", {
                  ...destinationDetails.coordinates,
                  lat: parseFloat(e.target.value),
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} marginTop="20px">
            <TextField
              label={i18n.formatMessage({
                id: "destinations_longitude_label",
              })}
              type="number"
              value={destinationDetails.coordinates.long}
              onChange={(e) =>
                handleFormChange("coordinates", {
                  ...destinationDetails.coordinates,
                  long: parseFloat(e.target.value),
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} marginTop="20px">
            <FormControl fullWidth>
              <InputLabel id="currency-label">
                {i18n.formatMessage({
                  id: "destinations_currency_label",
                })}
              </InputLabel>
              <Select
                value={destinationDetails.currency}
                onChange={(e) => handleFormChange("currency", e.target.value)}
                labelId="currency-label"
                label={i18n.formatMessage({
                  id: "destinations_currency_label",
                })}
              >
                {Object.keys(Currency).map((key) => (
                  <MenuItem
                    key={key}
                    value={Currency[key as keyof typeof Currency]}
                  >
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <SubmitButton
            label={i18n.formatMessage({ id: "button_send" })}
            onClick={handleSubmit}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
