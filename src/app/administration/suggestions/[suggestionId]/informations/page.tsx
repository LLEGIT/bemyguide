"use client";
import {
  DestinationSuggestion,
  SuggestionType,
} from "@/Models/Destination/DestinationModel";
import {
  Information,
  InformationCreate,
  InformationType,
} from "@/Models/Informations/InformationModel";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import AdviceForm from "@/components/AdviceForm/AdviceForm";
import { ApproveButton, RejectButton } from "@/components/Buttons/Buttons";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { Routes } from "@/utils/routes";
import { CommonToastError, CommonToastSuccessWithTitle } from "@/utils/toast";
import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIntl } from "react-intl";
import GoBackButton from "@/components/GoBackButton/GoBackButton";

export default function AdministrationDestinationInformations({
  params,
}: {
  params: { suggestionId: string };
}) {
  const i18n = useIntl();
  const router = useRouter();
  const [destinationSuggestion, setDestinationSuggestion] =
    useState<DestinationSuggestion>();

  const [newInformation, setNewInformation] = useState<InformationCreate>({
    rawText: "",
    type: InformationType.ADVICE,
    validated: true,
  });

  const [information, setInformation] = useState<Information>({
    _id: "",
    rawText: "",
    type: InformationType.ADVICE,
    validated: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleNewInformationFormChange = (
    field: keyof InformationCreate,
    value: any
  ) => {
    setNewInformation((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFormChange = (field: keyof Information, value: any) => {
    setInformation((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const updateTypography = (suggestion: DestinationSuggestion) => (
    <CenteredTypography variant="h6">
      {i18n.formatMessage(
        {
          id: "administration_suggestions_information_user_title_update",
        },
        {
          username: suggestion.user.username,
          type: i18n.formatMessage({ id: suggestion.type }).toLowerCase(),
          destination: i18n.formatMessage({
            id: suggestion.destination.name,
          }),
        }
      )}
    </CenteredTypography>
  );

  const approvationButtons = (type: SuggestionType) => (
    <ButtonWrapper>
      <ApproveButton
        label={i18n.formatMessage({
          id: "administration_suggestions_approve_button",
        })}
        onClick={() => handleSubmit(type)}
      />
      <RejectButton
        label={i18n.formatMessage({
          id: "administration_suggestions_deny_button",
        })}
        onClick={() => handleSubmit(SuggestionType.SUGGESTION_DELETE)}
      />
    </ButtonWrapper>
  );

  const handleSubmit = async (type: SuggestionType) => {
    if (type === SuggestionType.INFORMATION_ADD) {
      const saved = await DestinationViewModel.createInformation(
        destinationSuggestion?.destination._id!,
        newInformation
      );
      if (!saved) {
        CommonToastError();
        return;
      }
    } else if (type === SuggestionType.PRODUCT_ADD) {
      const saved = await DestinationViewModel.createProduct(
        destinationSuggestion?.destination._id!,
        {
          name: destinationSuggestion?.product?.name!,
          floor_price: destinationSuggestion?.floor_price!,
          ceiling_price: destinationSuggestion?.ceiling_price!,
        }
      );
      if (!saved) {
        CommonToastError();
        return;
      }
    } else if (type === SuggestionType.INFORMATION_UPDATE) {
      const saved = await DestinationViewModel.updateInformation(information);
      if (!saved) {
        CommonToastError();
        return;
      }
    } else if (type === SuggestionType.PRODUCT_UPDATE) {
      const saved = await DestinationViewModel.updateProduct({
        _id: destinationSuggestion?.destination_product?._id!,
        product: destinationSuggestion?.destination_product?.product!,
        floor_price: destinationSuggestion?.floor_price!,
        ceiling_price: destinationSuggestion?.ceiling_price!,
        createdAt: destinationSuggestion?.destination_product?.createdAt!,
        updatedAt: new Date(),
      });
      if (!saved) {
        CommonToastError();
        return;
      }
    }

    await DestinationViewModel.deleteDestinationSuggestion(params.suggestionId);
    CommonToastSuccessWithTitle("toast_success_common");
    router.push(Routes.Administration_Suggestions);
  };

  useEffectAsync(async () => {
    const result = await DestinationViewModel.getDestinationSuggestionById(
      params.suggestionId
    );
    setDestinationSuggestion(result);
    if (result.information) {
      setInformation(result.information);
    }
  }, []);

  return (
    <Grid container padding={{ xs: "22px", lg: "20px" }}>
      <GoBackButton url={Routes.Administration} />
      <Grid item xs={12} marginTop="30px">
        {destinationSuggestion && (
          <>
            {destinationSuggestion.destination_product && (
              <>
                {updateTypography(destinationSuggestion)}
                <FormWrapper>
                  <ProductCard
                    product_name={
                      destinationSuggestion.destination_product.product.name
                    }
                    floor_price={destinationSuggestion.floor_price!}
                    ceiling_price={destinationSuggestion.ceiling_price!}
                    original_floor_price={
                      destinationSuggestion.destination_product.floor_price!
                    }
                    original_ceiling_price={
                      destinationSuggestion.destination_product.ceiling_price!
                    }
                    i18n={i18n}
                  />
                  {approvationButtons(SuggestionType.PRODUCT_UPDATE)}
                </FormWrapper>
              </>
            )}
            {destinationSuggestion.information && (
              <>
                {updateTypography(destinationSuggestion)}
                <CenteredTypography>
                  {destinationSuggestion.information_suggestion}
                </CenteredTypography>
                <AdviceForm
                  information={information}
                  handleFormChange={handleFormChange}
                  approvationButtons={approvationButtons}
                  i18n={i18n}
                />
              </>
            )}

            {!destinationSuggestion.information &&
              destinationSuggestion.information_suggestion && (
                <>
                  <CenteredTypography variant="h6">
                    {i18n.formatMessage(
                      {
                        id: "administration_suggestions_information_user_title_add",
                      },
                      {
                        username: destinationSuggestion.user.username,
                        type: i18n
                          .formatMessage({ id: destinationSuggestion.type })
                          .toLowerCase(),
                        destination: i18n.formatMessage({
                          id: destinationSuggestion.destination.name,
                        }),
                      }
                    )}
                  </CenteredTypography>
                  <CenteredTypography>
                    {destinationSuggestion.information_suggestion}
                  </CenteredTypography>
                  <AdviceForm
                    newInformation={newInformation}
                    handleNewInformationFormChange={
                      handleNewInformationFormChange
                    }
                    approvationButtons={approvationButtons}
                    i18n={i18n}
                  />
                </>
              )}

            {destinationSuggestion.product && (
              <>
                <CenteredTypography variant="h6">
                  {i18n.formatMessage(
                    {
                      id: "administration_suggestions_information_user_title_add",
                    },
                    {
                      username: destinationSuggestion.user.username,
                      type: i18n
                        .formatMessage({ id: destinationSuggestion.type })
                        .toLowerCase(),
                      destination: i18n.formatMessage({
                        id: destinationSuggestion.destination.name,
                      }),
                    }
                  )}
                </CenteredTypography>
                <FormWrapper>
                  <ProductCard
                    product_name={destinationSuggestion.product.name}
                    floor_price={destinationSuggestion.floor_price!}
                    ceiling_price={destinationSuggestion.ceiling_price!}
                    i18n={i18n}
                  />
                  {approvationButtons(SuggestionType.PRODUCT_ADD)}
                </FormWrapper>
              </>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}

export const CenteredTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: auto;
  margin-top: 80px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;
