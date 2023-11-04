import {
  ModificationSuggestionInformations,
  ModificationSuggestionType,
} from "@/Models/ModificationSuggestion/ModificationSuggestion";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { IntlShape } from "react-intl";

interface CategorySelectionProps {
  modificationInfos: ModificationSuggestionInformations;
  setModificationInfos: Dispatch<
    SetStateAction<ModificationSuggestionInformations>
  >;
  i18n: IntlShape;
}

export const CategorySelection = ({
  modificationInfos,
  setModificationInfos,
  i18n,
}: CategorySelectionProps) => {
  return (
    <FormControl fullWidth sx={{ marginTop: "20px" }}>
      <InputLabel id="suggestion-form-category-selection">{i18n.formatMessage({ id: "modification_suggestion_type" })}</InputLabel>
      <Select
        labelId="suggestion-form-category-selection"
        label={i18n.formatMessage({ id: "modification_suggestion_type" })}
        value={modificationInfos.type ?? ""}
        onChange={(e) =>
          setModificationInfos({
            ...modificationInfos,
            type: e.target.value as ModificationSuggestionType,
            product: undefined,
            information: undefined,
            dead_end: undefined,
          })
        }
      >
        {Object.keys(ModificationSuggestionType).map((key) => (
          <MenuItem
            value={
              ModificationSuggestionType[
                key as keyof typeof ModificationSuggestionType
              ]
            }
          >
            {i18n.formatMessage({
              id: ModificationSuggestionType[
                key as keyof typeof ModificationSuggestionType
              ],
            })}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
