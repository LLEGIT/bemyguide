import { Advice, DestinationProducts } from "../Destination/DestinationModel";

export interface ModificationSuggestion {
  user: string;
  type?: ModificationSuggestionType;
  destination_product?: string;
  product?: string;
  floor_price?: Number;
  ceiling_price?: Number;
  information?: string;
  information_suggestion?: string;
  destination?: string;
}

export interface ModificationSuggestionInformations {
  originalProduct?: DestinationProducts;
  type?: ModificationSuggestionType;
  product?: DestinationProducts;
  information?: Advice;
  information_suggestion?: string;
  dead_end?: boolean;
}

export enum ModificationSuggestionType {
  PRODUCT = "modification_suggestion_product",
  ADVICE = "modification_suggestion_advice",
}