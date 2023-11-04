"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useIntl } from "react-intl";
import { TripModel } from "@/Models/Trip/TripModel";

interface FilterProps {
  options: TripModel[];
  onSelect: (value: TripModel | null) => void;
}

const Filter: React.FC<FilterProps> = ({ options, onSelect }) => {
  const i18n = useIntl();

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option: TripModel) => {
      const translationKey = option.destination?.name || "";
      return i18n.formatMessage({ id: translationKey }) || translationKey;
    },
  });

  return (
    <Autocomplete
      id="filter-demo"
      options={options}
      getOptionLabel={(option) =>
        option.destination?.name
          ? i18n.formatMessage({ id: option.destination?.name })
          : ""
      }
      onChange={(event, value) => onSelect(value as any)}
      filterOptions={filterOptions}
      sx={{ width: "100%", marginLeft: 2, marginRight: 2 }}
      renderInput={(params) => (
        <TextField {...params} label={i18n.formatMessage({ id: "filter" })} />
      )}
    />
  );
};

export default Filter;
