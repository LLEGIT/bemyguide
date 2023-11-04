import styled from "@emotion/styled";
import {
  DeleteButton,
  EditButton,
  InformationButton,
  PhotosButton,
  ProductButton,
  SaveButton,
} from "../Buttons/Buttons";
import { Routes } from "@/utils/routes";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface OptionsRowProps {
  router?: AppRouterInstance;
  pathname?: string;
  elementId?: string;
  informationOption?: boolean;
  productOption?: boolean;
  photoOption?: boolean;
  editOption?: boolean;
  deleteOption?: boolean;
  informationsLabel?: string;
  productsLabel?: string;
  photoLabel?: string;
  editLabel?: string;
  deleteModalTitle?: string;
  deleteModalContent?: string;
  deleteLabel?: string;
  deleteAction?: () => void;
  saveOption?: boolean;
  saveLabel?: string;
  saveAction?: () => void;
}

export const OptionsRow = ({
  informationOption = true,
  productOption = true,
  photoOption = true,
  editOption = true,
  deleteOption = true,
  saveOption = false,
  ...props
}: OptionsRowProps) => {
  return (
    <OptionsContainer>
      {saveOption && (
        <SaveButton label={props.saveLabel} onClick={props.saveAction} />
      )}
      {informationOption && (
        <InformationButton
          onClick={() =>
            props.router?.push(
              Routes.Administration_Informations(
                props.pathname!,
                props.elementId!
              )
            )
          }
        />
      )}
      {productOption && (
        <ProductButton
          label={props.productsLabel}
          onClick={() =>
            props.router?.push(
              Routes.Administration_Products(props.pathname!, props.elementId!)
            )
          }
        />
      )}
      {photoOption && (
        <PhotosButton
          onClick={() =>
            props.router?.push(
              Routes.Administration_Photos(props.pathname!, props.elementId!)
            )
          }
        />
      )}
      {editOption && (
        <EditButton
          onClick={() =>
            props.router?.push(
              Routes.Administration_Edit(props.pathname!, props.elementId!)
            )
          }
        />
      )}
      {deleteOption && (
        <ConfirmationModal
          title={props.deleteModalTitle}
          content={props.deleteModalContent}
          customButton={<DeleteButton />}
          innerButton="common_delete"
          callback={props.deleteAction}
        />
      )}
    </OptionsContainer>
  );
};

const OptionsContainer = styled("div")`
  display: flex;
  justify-content: space-around;
`;
