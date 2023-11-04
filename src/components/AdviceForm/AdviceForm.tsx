import { SuggestionType } from "@/Models/Destination/DestinationModel";
import {
  Information,
  InformationCreate,
} from "@/Models/Informations/InformationModel";
import {
  CenteredTypography,
  FormWrapper,
} from "@/app/administration/suggestions/[suggestionId]/informations/page";
import { Checkbox, Grid, TextField, Typography } from "@mui/material";
import { IntlShape } from "react-intl";

interface AdviceFormProps {
  approvationButtons: (type: SuggestionType) => JSX.Element;
  i18n: IntlShape;
  newInformation?: InformationCreate;
  handleNewInformationFormChange?: (
    field: keyof InformationCreate,
    value: any
  ) => void;
  information?: Information;
  handleFormChange?: (field: keyof Information, value: any) => void;
}

export default function AdviceForm({
  approvationButtons,
  i18n,
  newInformation,
  handleNewInformationFormChange,
  information,
  handleFormChange,
}: AdviceFormProps) {
  return (
    <FormWrapper>
      <CenteredTypography>
        {i18n.formatMessage({
          id: "administration_suggestions_information_add_title",
        })}
      </CenteredTypography>
      <Grid item xs={12} marginTop="20px">
        <TextField
          type="text"
          label={i18n.formatMessage({
            id: "common_description",
          })}
          multiline
          value={information ? information.rawText : newInformation?.rawText}
          onChange={(e) =>
            information
              ? handleFormChange?.("rawText", e.target.value)
              : handleNewInformationFormChange?.("rawText", e.target.value)
          }
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
          checked={
            information ? information.validated : newInformation?.validated
          }
          onChange={(e) =>
            information
              ? handleFormChange?.("validated", e.target.checked)
              : handleNewInformationFormChange?.("validated", e.target.checked)
          }
        />
        <Typography variant="body2">
          {i18n.formatMessage({
            id: "common_validated",
          })}
        </Typography>
      </Grid>
      {approvationButtons(
        information
          ? SuggestionType.INFORMATION_UPDATE
          : SuggestionType.INFORMATION_ADD
      )}
    </FormWrapper>
  );
}
