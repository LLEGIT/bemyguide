import { Destination } from "@/Models/Destination/DestinationModel";
import { ModificationSuggestionInformations } from "@/Models/ModificationSuggestion/ModificationSuggestion";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { IntlShape } from "react-intl";
import { SuggestionDeadEndComponent } from "./SuggestionDeadEndComponent";

interface AdviceSelectionProps {
  destination: Destination;
  modificationInfos: ModificationSuggestionInformations;
  setModificationInfos: Dispatch<
    SetStateAction<ModificationSuggestionInformations>
  >;
  i18n: IntlShape;
}

export const AdviceSelection = ({
  modificationInfos,
  setModificationInfos,
  i18n,
  ...props
}: AdviceSelectionProps) => {
  const advices = props.destination.informations.informations.filter(
    (information) => information.type === "advice"
  );
  return (
    <FormControl fullWidth sx={{ marginTop: "20px" }}>
      {advices.length > 0 ? (
        <>
          <InputLabel
            id="suggestion-form-advice-selection"
            shrink={modificationInfos.information ? true : false}
          >
            {i18n.formatMessage({ id: "modification_suggestion_advice" })}
          </InputLabel>
          <Select
            label={i18n.formatMessage({ id: "modification_suggestion_advice" })}
            labelId="suggestion-form-advice-selection"
            value={modificationInfos.information?._id}
            SelectDisplayProps={{ style: { textOverflow: "ellipsis" } }}
            notched={modificationInfos.information ? true : false}
            onChange={(e) => {
              setModificationInfos({
                ...modificationInfos,
                information: JSON.parse(e.target.value),
                dead_end: undefined,
              });
            }}
          >
            {advices.map((information) => {
              if (information.type !== "advice") return;
              return (
                <MenuItem value={JSON.stringify(information)}>
                  {information.rawText}
                </MenuItem>
              );
            })}
          </Select>
          {modificationInfos.information && (
            <>
              <Input
                sx={{ marginTop: "20px" }}
                fullWidth
                placeholder={i18n.formatMessage({
                  id: "modification_suggestion_form_information_placeholder",
                })}
                value={modificationInfos.information_suggestion}
                onChange={(e) =>
                  setModificationInfos({
                    ...modificationInfos,
                    information_suggestion: e.target.value,
                  })
                }
              />
            </>
          )}
        </>
      ) : (
        <SuggestionDeadEndComponent
          modificationInfos={modificationInfos}
          setModificationInfos={setModificationInfos}
          i18n={i18n}
        />
      )}
    </FormControl>
  );
};
