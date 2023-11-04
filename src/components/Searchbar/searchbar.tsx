"use client";
import { frDestinations } from "@/Locales/fr/frDestinations";
import { Destination } from "@/Models/Destination/DestinationModel";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { Search } from "@mui/icons-material";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";

interface SearchBarProps {
  searchVal: string;
  setSearchVal: (value: string) => void;
  debouncedSearch: string;
  setDestinations: (data: Array<Destination>) => void;
  setSearched: Dispatch<SetStateAction<boolean>>;
}

export default function SearchBar({
  searchVal,
  setSearchVal,
  debouncedSearch,
  setDestinations,
  setSearched
}: SearchBarProps) {
  const i18n = useIntl();
  useEffectAsync(async () => {
    if (debouncedSearch) {
      const searchArray = Object.keys(frDestinations).filter((key) => {
        if (key.includes("destination_name")) {
          return frDestinations[key as keyof typeof frDestinations]
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());
        }
      });
      if (searchArray) {
        await DestinationViewModel.onSearch(searchArray, setDestinations);
        setSearched(true);
      }
    }
  }, [debouncedSearch]);

  return (
    <FormControl sx={{ width: { xs: "100%" } }} variant="outlined">
      <InputLabel htmlFor="searchbar">
        {i18n.formatMessage({ id: "homepage_searchbar_placeholder" })}
      </InputLabel>
      <OutlinedInput
        id="searchbar"
        color="primary"
        fullWidth
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
        label={i18n.formatMessage({ id: "homepage_searchbar_placeholder" })}
      />
    </FormControl>
  );
}
