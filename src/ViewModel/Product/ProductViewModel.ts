import { ApiUrls, apiUrl } from "@/Configs/ApiConfigs";
import { Product } from "@/Models/Destination/DestinationModel";
import { CommonApiResponse, Method, commonFetcher } from "@/utils/fetcher";

export class ProductViewModel {
  static async getProducts() {
    const response: CommonApiResponse<Product[]> =
      await commonFetcher({
        url: apiUrl(ApiUrls.PRODUCT),
        method: Method.GET,
      });
    return response.data;
  }
}
