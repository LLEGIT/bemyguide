import { Grid } from "@mui/material";
import {
  LocalizationProvider,
  MobileDatePicker,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useIntl } from "react-intl";

interface DatePickerProps {
  handleAction?: (date: Date) => void;
  customLabel?: string;
  handleOnChange?: (date: Date) => void;
  value?: Date;
}

export default function DatePicker({
  handleAction,
  customLabel,
  handleOnChange,
  value,
}: DatePickerProps) {
  const i18n = useIntl();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        orientation="landscape"
        defaultValue={dayjs()}
        label={i18n.formatMessage({
          id: customLabel ?? "trip_select_date",
        })}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          display: { xs: "flex", lg: "none" },
          marginBottom: "20px",
        }}
        localeText={{
          okButtonLabel: i18n.formatMessage({
            id: "validate",
          }),
          cancelButtonLabel: i18n.formatMessage({
            id: "cancel",
          }),
          toolbarTitle: i18n.formatMessage({
            id: customLabel ?? "trip_select_date",
          }),
        }}
        slotProps={{ actionBar: handleOnChange ? { actions: [] } : {} }}
        minDate={dayjs()}
        onChange={(date) => {
          handleOnChange && handleOnChange(date?.toDate() as Date);
        }}
        onAccept={(date) => {
          handleAction && handleAction(date?.toDate() as Date);
        }}
        value={dayjs(value)}
      />
      <Grid sx={{ display: { xs: "none", lg: "block" } }}>
        <StaticDatePicker
          orientation="landscape"
          defaultValue={dayjs()}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            marginBottom: "20px",
          }}
          localeText={{
            okButtonLabel: `${i18n.formatMessage({
              id: "validate",
            })}`,
            cancelButtonLabel: `${i18n.formatMessage({
              id: "cancel",
            })}`,
            toolbarTitle: `${i18n.formatMessage({
              id: customLabel ?? "trip_select_date",
            })}`,
          }}
          slotProps={{ actionBar: handleOnChange ? { actions: [] } : {} }}
          minDate={dayjs()}
          onChange={(date) => {
            handleOnChange && handleOnChange(date?.toDate() as Date);
          }}
          onAccept={(date) => {
            handleAction && handleAction(date?.toDate() as Date);
          }}
          value={dayjs(value)}
        />
      </Grid>
    </LocalizationProvider>
  );
}
