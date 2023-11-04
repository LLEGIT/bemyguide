import { Destination } from "@/Models/Destination/DestinationModel";
import {
  ModificationSuggestion,
  ModificationSuggestionInformations,
  ModificationSuggestionType,
} from "@/Models/ModificationSuggestion/ModificationSuggestion";
import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { ProductSelection } from "./ProductSelection";
import { AdviceSelection } from "./AdviceSelection";
import { SuggestionDeadEndComponent } from "./SuggestionDeadEndComponent";
import { CategorySelection } from "./CategorySelection";
import { AuthContext } from "@/context/AuthContext";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { CommonToastSuccessWithTitle } from "@/utils/toast";
import { SubmitButton } from "../Buttons/Buttons";

interface ModificationSuggestionFormProps {
  open: boolean;
  handleClose: () => void;
  destination: Destination;
}

export const ModificationSuggestionForm = (
  props: ModificationSuggestionFormProps
) => {
  const i18n = useIntl();
  const { userContext } = useContext(AuthContext);
  const [modificationInfos, setModificationInfos] =
    useState<ModificationSuggestionInformations>({});

  const handleModalClose = () => {
    setModificationInfos({});
    props.handleClose();
  };

  const handleSubmit = () => {
    let suggestionBody = DestinationViewModel.formatSuggestion(
      modificationInfos,
      userContext?.id,
      props.destination._id
    );
    if (!suggestionBody || isButtonDisabled()) {
      return;
    }
    DestinationViewModel.postSuggestion(
      suggestionBody as ModificationSuggestion
    );
    CommonToastSuccessWithTitle("modification_suggestion_form_submit_success");
    setModificationInfos({});
    props.handleClose();
  };

  const isButtonDisabled = () => {
    if (!modificationInfos.type) {
      return true;
    } else if (modificationInfos.type === ModificationSuggestionType.PRODUCT) {
      if (
        !modificationInfos.product?.floor_price ||
        !modificationInfos.product.ceiling_price ||
        modificationInfos.product.floor_price < 0 ||
        modificationInfos.product.ceiling_price < 0 ||
        modificationInfos.product.ceiling_price <=
          modificationInfos.product.floor_price ||
        modificationInfos.product.floor_price ===
          modificationInfos.originalProduct?.floor_price ||
        modificationInfos.product.ceiling_price ===
          modificationInfos.originalProduct?.ceiling_price
      ) {
        return true;
      }
      return false;
    } else if (modificationInfos.type === ModificationSuggestionType.ADVICE) {
      if (!modificationInfos.information_suggestion) {
        return true;
      }
      return false;
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <ModalHeader>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {i18n.formatMessage({ id: "destination_suggest_modification" })}
          </Typography>
          <Close
            onClick={() => props.handleClose()}
            sx={{ cursor: "pointer" }}
          />
        </ModalHeader>
        <ModalContent>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {i18n.formatMessage({
              id: "destination_suggest_modification_description",
            })}
          </Typography>
          {props.destination.informations ? (
            <>
              <CategorySelection
                modificationInfos={modificationInfos}
                setModificationInfos={setModificationInfos}
                i18n={i18n}
              />
              {modificationInfos.type &&
                modificationInfos.type === ModificationSuggestionType.PRODUCT &&
                (props.destination.informations.products.length > 0 ? (
                  <ProductSelection
                    modificationInfos={modificationInfos}
                    setModificationInfos={setModificationInfos}
                    i18n={i18n}
                    destination={props.destination}
                  />
                ) : (
                  <SuggestionDeadEndComponent
                    modificationInfos={modificationInfos}
                    setModificationInfos={setModificationInfos}
                    i18n={i18n}
                  />
                ))}
              {modificationInfos.type &&
                modificationInfos.type === ModificationSuggestionType.ADVICE &&
                (props.destination.informations.informations.length > 0 ? (
                  <AdviceSelection
                    modificationInfos={modificationInfos}
                    setModificationInfos={setModificationInfos}
                    i18n={i18n}
                    destination={props.destination}
                  />
                ) : (
                  <SuggestionDeadEndComponent
                    modificationInfos={modificationInfos}
                    setModificationInfos={setModificationInfos}
                    i18n={i18n}
                  />
                ))}
            </>
          ) : (
            <SuggestionDeadEndComponent
              modificationInfos={modificationInfos}
              setModificationInfos={setModificationInfos}
              i18n={i18n}
            />
          )}
        </ModalContent>
        <ButtonWrapper>
          <SubmitButton
            onClick={handleSubmit}
            label={i18n.formatMessage({
              id: "modification_suggestion_form_submit",
            })}
            disabled={isButtonDisabled()}
          />
        </ButtonWrapper>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "15px 25px",
};

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  height: 50vh;
  overflow-y: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
