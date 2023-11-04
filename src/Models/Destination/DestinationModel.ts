import { Information } from "../Informations/InformationModel";
import { ModificationSuggestionType } from "../ModificationSuggestion/ModificationSuggestion";
import { User, UserContext } from "../User/UserModel";

export interface Destination {
  _id: string;
  name: string;
  coordinates: { lat: number; long: number };
  currency: string;
  informations: {
    products: DestinationProducts[];
    informations: Information[];
  };
  images: Image[];
}

export interface DestinationEdit {
  _id?: string;
  name: string;
  coordinates: { lat?: number; long?: number };
  currency: string;
  images: Image[];
}

export const initialDestinationFormData: DestinationEdit = {
  name: "",
  coordinates: { lat: undefined, long: undefined },
  currency: "",
  images: [],
};

export interface DestinationProductCreate {
  name: string;
  floor_price: number;
  ceiling_price: number;
}

export interface DestinationProducts {
  _id: string;
  product: Product;
  floor_price: number;
  ceiling_price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: string;
  product: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  value: string;
}

export interface Images {
  images: Image[];
}

export interface Image {
  url: string;
  alt: string;
}

export interface DestinationInformations {
  products: DestinationProducts;
  informations: Array<Advice>;
}

export enum AdviceType {
  ADVICE = "advice",
  COMMENT = "comment",
}

export interface Advice {
  _id?: string;
  rawText: string;
  type: AdviceType;
  validated: boolean;
  user: [User] | User | string | UserContext;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment extends Advice {
}

export enum Currency {
  EUR = "destination_currency_EUR",
  USD = "destination_currency_USD",
  GBP = "destination_currency_GBP",
  CHF = "destination_currency_CHF",
  JPY = "destination_currency_JPY",
  CAD = "destination_currency_CAD",
  AUD = "destination_currency_AUD",
  CNY = "destination_currency_CNY",
  THB = "destination_currency_THB",
  ZAR = "destination_currency_ZAR",
  ARS = "destination_currency_ARS",
  SGD = "destination_currency_SGD",
  MXN = "destination_currency_MXN",
  HKD = "destination_currency_HKD",
  DKK = "destination_currency_DKK",
  KRW = "destination_currency_KRW",
  PLN = "destination_currency_PLN",
  RUB = "destination_currency_RUB",
  BRL = "destination_currency_BRL",
  NZD = "destination_currency_NZD",
  CLP = "destination_currency_CLP",
  EGP = "destination_currency_EGP",
}

export interface DestinationSuggestion {
  _id: string;
  user: User;
  type: ModificationSuggestionType;
  destination: Destination;
  createdAt: Date;
  updatedAt: Date;
  destination_product?: DestinationProducts;
  product?: Product;
  floor_price?: number;
  ceiling_price?: number;
  information?: Information;
  information_suggestion?: string;
}

export enum SuggestionType {
  INFORMATION_ADD = "INFORMATION_ADD",
  PRODUCT_ADD = "PRODUCT_ADD",
  INFORMATION_UPDATE = "INFORMATION_UPDATE",
  PRODUCT_UPDATE = "PRODUCT_UPDATE",
  SUGGESTION_DELETE = "SUGGESTION_DELETE",
}

export interface DestinationActivity {
  type: string;

  id: string;

  self: {
    href: string;
    methods: string[];
  };

  name: string;

  shortDescription: string;

  geoCode: {
    latitude: number;
    longitude: number;
  };

  price: {
    amount: string;
    currencyCode: string;
  };

  rating: number;

  pictures: string[];

  bookingLink: string;

  minimumDuration: string;
}
