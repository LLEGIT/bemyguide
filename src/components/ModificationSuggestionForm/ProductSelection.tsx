import {
  Destination,
  DestinationProducts,
  Product,
} from "@/Models/Destination/DestinationModel";
import { ModificationSuggestionInformations } from "@/Models/ModificationSuggestion/ModificationSuggestion";
import styled from "@emotion/styled";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { IntlShape } from "react-intl";

interface ProductSelectionProps {
  modificationInfos: ModificationSuggestionInformations;
  setModificationInfos: Dispatch<
    SetStateAction<ModificationSuggestionInformations>
  >;
  i18n: IntlShape;
  destination?: Destination;
  products?: Product[];
  isDeadEnd?: boolean;
}

export const ProductSelection = ({
  modificationInfos,
  setModificationInfos,
  i18n,
  destination,
  products,
  isDeadEnd,
}: ProductSelectionProps) => {
  const handleProductStateChange = (key: string, value: any) => {
    setModificationInfos({
      ...modificationInfos,
      product: {
        ...(modificationInfos.product as DestinationProducts),
        [key]: value,
      },
    });
  };

  const defineCeilingPriceHelperText = () => {
    if (
      modificationInfos.product?.ceiling_price &&
      modificationInfos.product?.floor_price
    ) {
      if (
        modificationInfos.product.ceiling_price <=
        modificationInfos.product.floor_price
      ) {
        return i18n.formatMessage({id: "modification_suggestion_form_ceiling_price_higher"});
      } else if (modificationInfos.product.ceiling_price < 0) {
        return i18n.formatMessage({id: "modification_suggestion_form_ceiling_price_positive"});
      } else if (
        modificationInfos.originalProduct?.ceiling_price &&
        modificationInfos.product.ceiling_price !==
        modificationInfos.originalProduct?.ceiling_price
      ) {
        return (
          i18n.formatMessage({id: "modification_suggestion_form_original_price"}) + modificationInfos.originalProduct?.ceiling_price
        );
      }
    }
    
    return "";
  };

  const defineFloorPriceHelperText = () => {
    if (
      modificationInfos.product?.ceiling_price &&
      modificationInfos.product?.floor_price
    ) {
      if (
        modificationInfos.product.ceiling_price <=
        modificationInfos.product.floor_price
      ) {
        return i18n.formatMessage({id: "modification_suggestion_form_floor_price_lower"});
      } else if (modificationInfos.product.floor_price < 0) {
        return i18n.formatMessage({id: "modification_suggestion_form_floor_price_positive"});
      } else if (
        modificationInfos.originalProduct?.floor_price &&
        modificationInfos.product.floor_price !==
        modificationInfos.originalProduct?.floor_price
      ) {
        return (
          i18n.formatMessage({id: "modification_suggestion_form_original_price"}) + modificationInfos.originalProduct?.floor_price
        );
      }
    }

    return "";
  };

  return (
    <FormControl fullWidth sx={{ marginTop: "20px" }}>
      <InputLabel id="suggestion-form-product-selection">{i18n.formatMessage({id: "modification_suggestion_product"})}</InputLabel>
      <Select
        label={i18n.formatMessage({id: "modification_suggestion_product"})}
        labelId="suggestion-form-product-selection"
        value={modificationInfos.product?._id}
        onChange={(e) => {
          setModificationInfos({
            ...modificationInfos,
            product: JSON.parse(e.target.value),
            originalProduct: JSON.parse(e.target.value),
            dead_end: isDeadEnd ? true : false,
          });
        }}
      >
        {destination && destination.informations.products.map((product) => {
          return (
            <MenuItem value={JSON.stringify(product)}>
              {i18n.formatMessage({ id: product.product.name })}
            </MenuItem>
          );
        })}
        {products && products.map((product) => {
          return (
            <MenuItem value={JSON.stringify(product)}>
              {i18n.formatMessage({ id: product.name })}
            </MenuItem>
          );
        })}
      </Select>
      {modificationInfos.product && (
        <ProductPriceInputsContainer>
          <TextField
            sx={{ marginRight: "20px" }}
            fullWidth
            type="number"
            label={i18n.formatMessage({id: "destinations_product_floor_price"})}
            helperText={defineFloorPriceHelperText()}
            placeholder={i18n.formatMessage({id: "modification_suggestion_form_information_placeholder"})}
            value={modificationInfos.product.floor_price}
            onChange={(e) =>
              handleProductStateChange("floor_price", e.target.value)
            }
          />
          <ProductPriceRightInput
            fullWidth
            type="number"
            label={i18n.formatMessage({id: "destinations_product_ceiling_price"})}
            helperText={defineCeilingPriceHelperText()}
            placeholder={i18n.formatMessage({id: "modification_suggestion_form_information_placeholder"})}
            value={modificationInfos.product.ceiling_price}
            onChange={(e) =>
              handleProductStateChange("ceiling_price", e.target.value)
            }
          />
        </ProductPriceInputsContainer>
      )}
    </FormControl>
  );
};

const ProductPriceInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  @media (min-width: 600px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }
`;

const ProductPriceRightInput = styled(TextField)`
  margin-left: 0;
  margin-top: 20px;
  @media (min-width: 600px) {
    margin-left: 20px;
    margin-top: 0;
  }
`;