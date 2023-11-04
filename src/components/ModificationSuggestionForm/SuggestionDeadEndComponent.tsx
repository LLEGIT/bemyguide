import { Dispatch, SetStateAction, useState } from "react";
import { Input, Typography } from "@mui/material";
import {
  ModificationSuggestionInformations,
  ModificationSuggestionType,
} from "@/Models/ModificationSuggestion/ModificationSuggestion";
import { IntlShape } from "react-intl";
import { CategorySelection } from "./CategorySelection";
import { Product } from "@/Models/Destination/DestinationModel";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { ProductViewModel } from "@/ViewModel/Product/ProductViewModel";
import { ProductSelection } from "./ProductSelection";

interface SuggestionDeadEndComponentProps {
  modificationInfos: ModificationSuggestionInformations;
  setModificationInfos: Dispatch<
    SetStateAction<ModificationSuggestionInformations>
  >;
  i18n: IntlShape;
}

export const SuggestionDeadEndComponent = ({
  modificationInfos,
  setModificationInfos,
  i18n,
}: SuggestionDeadEndComponentProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffectAsync(async () => {
    setProducts(await ProductViewModel.getProducts());
  }, []);

  return (
    <>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {i18n.formatMessage({
          id: "modification_suggestion_form_dead_end_description",
        })}
      </Typography>
      <CategorySelection
        modificationInfos={modificationInfos}
        setModificationInfos={setModificationInfos}
        i18n={i18n}
      />

      {modificationInfos.type &&
        modificationInfos.type === ModificationSuggestionType.PRODUCT &&
        (products.length > 0 ? (
          <ProductSelection
            modificationInfos={modificationInfos}
            setModificationInfos={setModificationInfos}
            i18n={i18n}
            products={products}
            isDeadEnd={true}
          />
        ) : (
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
                dead_end: true,
                information_suggestion: e.target.value,
              })
            }
          />
        ))}
      {modificationInfos.type &&
        modificationInfos.type === ModificationSuggestionType.ADVICE && (
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
                  dead_end: true,
                  information_suggestion: e.target.value,
                })
              }
            />
          </>
        )}
    </>
  );
};
