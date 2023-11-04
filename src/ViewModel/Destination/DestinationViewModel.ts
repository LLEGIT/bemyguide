"use client";
import { ApiUrls, apiUrl } from "@/Configs/ApiConfigs";
import {
  Advice,
  Comment,
  Destination,
  DestinationInformations,
  DestinationEdit,
  DestinationProductCreate,
  DestinationProducts,
  Image,
  DestinationSuggestion,
} from "@/Models/Destination/DestinationModel";
import {
  Information,
  InformationCreate,
  InformationType,
} from "@/Models/Informations/InformationModel";
import {
  ModificationSuggestion,
  ModificationSuggestionInformations,
  ModificationSuggestionType,
} from "@/Models/ModificationSuggestion/ModificationSuggestion";
import { CommonApiResponse, Method, commonFetcher } from "@/utils/fetcher";

interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export class DestinationViewModel {
  static async getAll() {
    const response: CommonApiResponse<{ destinations: Destination[] }> =
      await commonFetcher({
        url: apiUrl(ApiUrls.DESTINATION_DETAILS),
        method: Method.GET,
      });
    return response.data.destinations;
  }

  static async getSuggestions() {
    const response: CommonApiResponse<{ destinations: Destination[] }> =
      await commonFetcher({
        url: apiUrl(ApiUrls.DESTINATION_SUGGESTION),
        method: Method.GET,
      });
    return response.data.destinations;
  }

  static async onSearch(
    names: Array<string>,
    setDestinations: (data: Array<Destination>) => void
  ) {
    const response: CommonApiResponse<{ destinations: Destination[] }> =
      await commonFetcher({
        url: apiUrl(ApiUrls.DESTINATION_SEARCH),
        method: Method.POST,
        postBody: names,
      });
    setDestinations(response.data.destinations);
  }

  static async onRead(
    destinationId: string,
    setDestinationDetails?: (data: Destination) => void,
    setDestinationImages?: (images: Image[]) => void,
    setDestinationAdvices?: (advice: Information[]) => void,
    setDestinationProducts?: (products: DestinationProducts[]) => void,
    setDestinationInformations?: (informations: Information[]) => void
  ) {
    const response: CommonApiResponse<{ destination: Destination }> =
      await commonFetcher({
        url: apiUrl(ApiUrls.DESTINATION_DETAILS + destinationId),
        method: Method.GET,
      });
    setDestinationDetails && setDestinationDetails(response.data.destination);
    setDestinationImages &&
      setDestinationImages(response.data.destination.images);
    setDestinationAdvices &&
      setDestinationAdvices(
        response.data.destination.informations?.informations.filter(
          (item: Information) => item.type === InformationType.ADVICE
        ) ?? null
      );
    setDestinationProducts &&
      setDestinationProducts(response.data.destination.informations?.products);
    setDestinationInformations &&
      setDestinationInformations(
        response.data.destination.informations?.informations
      );
  }

  static async getAllPaginated(skip: number, startId?: string) {
    const response: CommonApiResponse<{
      destinations: Destination[];
      count: number;
    }> = await commonFetcher({
      url: apiUrl(ApiUrls.DESTINATION_PAGINATED),
      method: Method.GET,
      params: {
        limit: 15,
        skip,
        startId,
      },
    });
    return response.data;
  }

  static async onCreate(body: DestinationEdit) {
    const response: CommonApiResponse<Destination> = await commonFetcher({
      url: apiUrl(ApiUrls.ADMINISTRATION_DESTINATION),
      method: Method.POST,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }

  static async onSave(body: DestinationEdit) {
    const response: CommonApiResponse<Destination> = await commonFetcher({
      url: apiUrl(ApiUrls.ADMINISTRATION_DESTINATION_ID(body._id!)),
      method: Method.PUT,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }

  static async onDelete(id: string) {
    const response: CommonApiResponse<Destination> = await commonFetcher({
      url: apiUrl(ApiUrls.ADMINISTRATION_DESTINATION_ID(id)),
      method: Method.DELETE,
      withCredentials: true,
    });
    return response.data;
  }

  static async updateProduct(body: DestinationProducts) {
    const response: CommonApiResponse<DestinationProducts[]> =
      await commonFetcher({
        url: apiUrl(ApiUrls.ADMINISTRATION_DESTINATION_PRODUCT_ID(body._id!)),
        method: Method.PUT,
        postBody: body,
        withCredentials: true,
      });
    return response.data;
  }

  static async deleteProduct(id: string) {
    const response: CommonApiResponse<DestinationProducts[]> =
      await commonFetcher({
        url: apiUrl(ApiUrls.ADMINISTRATION_DESTINATION_PRODUCT_ID(id)),
        method: Method.DELETE,
        withCredentials: true,
      });
    return response.data;
  }

  static async createProduct(id: string, body: DestinationProductCreate) {
    const response: CommonApiResponse<DestinationProducts> =
      await commonFetcher({
        url: apiUrl(ApiUrls.ADMINISTRATION_DESTINATION_PRODUCT_ID(id)),
        method: Method.POST,
        postBody: body,
        withCredentials: true,
      });
    return response.data;
  }

  static async createInformation(id: string, body: InformationCreate) {
    const response: CommonApiResponse<Information> = await commonFetcher({
      url: apiUrl(ApiUrls.DESTINATION_INFORMATION_ID(id)),
      method: Method.POST,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }

  static async updateInformation(body: Information) {
    const response: CommonApiResponse<Information> = await commonFetcher({
      url: apiUrl(ApiUrls.DESTINATION_INFORMATION_ID(body._id!)),
      method: Method.PUT,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }

  static async deleteInformation(body: Information) {
    const response: CommonApiResponse<Information> = await commonFetcher({
      url: apiUrl(ApiUrls.DESTINATION_INFORMATION_ID(body._id)),
      method: Method.DELETE,
      postBody: body,
      withCredentials: true,
    });
    return response.data;
  }

  static async getArticles(
    destinationName: string,
    setArticles: (data: Array<Article>) => void
  ) {
    const response: CommonApiResponse<Array<Article>> = await commonFetcher({
      url: apiUrl(ApiUrls.DESTINATION_ARTICLES(destinationName)),
      method: Method.GET,
    });

    setArticles(response?.data);
  }

  static async getComments(
    destinationId: string,
    setComments: (data: Array<Comment>) => void,
    setLoading: (loading: boolean) => void
  ) {
    const response: CommonApiResponse<DestinationInformations> =
      await commonFetcher({
        url: apiUrl(ApiUrls.DESTINATION_INFORMATIONS(destinationId)),
        method: Method.GET,
      });

    let destinationInformations: DestinationInformations = response.data;

    if (
      destinationInformations.informations &&
      destinationInformations.informations.length > 0
    ) {
      const onlyComments = destinationInformations.informations.filter(
        (item) => item.type === "comment"
      );

      // To retrieve user infos correctly
      for (const comment of onlyComments) {
        if (Array.isArray(comment.user) && comment.user.length > 0) {
          comment.user = comment.user[0];
        }
      }

      setComments(onlyComments);
    } else {
      setComments([]);
    }

    setLoading(false);
  }

  static async getAdvice(
    destinationId: string,
    setAdvice: (data: Array<Advice>) => void,
    setLoading: (loading: boolean) => void
  ) {
    const response: CommonApiResponse<DestinationInformations> =
      await commonFetcher({
        url: apiUrl(ApiUrls.DESTINATION_INFORMATIONS(destinationId)),
        method: Method.GET,
      });

    let destinationInformations: DestinationInformations = response.data;

    if (
      destinationInformations.informations &&
      destinationInformations.informations.length > 0
    ) {
      let onlyAdvice = destinationInformations.informations.filter(
        (item) => item.type === "advice"
      );

      if (onlyAdvice.length > 0) {
        setAdvice(onlyAdvice);
      }
    }

    setLoading(false);
  }

  static formatSuggestion(
    suggestion: ModificationSuggestionInformations,
    userId?: string,
    destinationId?: string
  ) {
    if (!userId || !suggestion.type) {
      return false;
    }
    if (!suggestion.dead_end) {
      if (
        suggestion.type === ModificationSuggestionType.ADVICE &&
        (!suggestion.information || !suggestion.information_suggestion)
      ) {
        return false;
      } else if (
        suggestion.type === ModificationSuggestionType.PRODUCT &&
        !suggestion.product
      ) {
        return false;
      }
    }

    let suggestionBody: ModificationSuggestion = {
      user: userId,
      type: suggestion.type,
    };

    if (suggestion.dead_end) {
      if (!destinationId) {
        return false;
      }
      suggestionBody.destination = destinationId;
      if (suggestion.type === ModificationSuggestionType.ADVICE) {
        suggestionBody.information_suggestion =
          suggestion.information_suggestion;
      } else if (suggestion.type === ModificationSuggestionType.PRODUCT) {
        suggestionBody.product = suggestion.product!._id;
        suggestionBody.floor_price = suggestion.product!.floor_price;
        suggestionBody.ceiling_price = suggestion.product!.ceiling_price;
      }
    } else if (suggestion.type === ModificationSuggestionType.ADVICE) {
      suggestionBody.destination = destinationId;
      suggestionBody.information = suggestion.information!._id;
      suggestionBody.information_suggestion = suggestion.information_suggestion;
    } else if (suggestion.type === ModificationSuggestionType.PRODUCT) {
      suggestionBody.destination = destinationId;
      suggestionBody.destination_product = suggestion.product!._id;
      suggestionBody.floor_price = suggestion.product!.floor_price;
      suggestionBody.ceiling_price = suggestion.product!.ceiling_price;
    }

    return suggestionBody;
  }

  static async postSuggestion(body: ModificationSuggestion) {
    const response: CommonApiResponse<ModificationSuggestion> =
      await commonFetcher({
        url: apiUrl(ApiUrls.DESTINATION_SUGGESTION),
        method: Method.POST,
        postBody: body,
        withCredentials: true,
      });
    return response.data;
  }

  static async getDestinationSuggestionsPaginated(
    skip: number,
    startId?: string
  ) {
    const response: CommonApiResponse<{
      suggestions: DestinationSuggestion[];
      count: number;
    }> = await commonFetcher({
      url: apiUrl(ApiUrls.ADMINISTRATION_DESTINATION_SUGGESTIONS_PAGINATED),
      method: Method.GET,
      params: {
        limit: 15,
        skip,
        startId,
      },
      withCredentials: true,
    });
    return response.data;
  }

  static async getDestinationSuggestionById(id: string) {
    const response: CommonApiResponse<DestinationSuggestion> =
      await commonFetcher({
        url: apiUrl(ApiUrls.ADMINISTRATION_DESTINATION_SUGGESTIONS_ID(id)),
        method: Method.GET,
        withCredentials: true,
      });
    return response.data;
  }

  static async deleteDestinationSuggestion(id: string) {
    const response: CommonApiResponse<DestinationSuggestion> =
      await commonFetcher({
        url: apiUrl(ApiUrls.ADMINISTRATION_DESTINATION_SUGGESTIONS_ID(id)),
        method: Method.DELETE,
        withCredentials: true,
      });
    return response.data;
  }
}
