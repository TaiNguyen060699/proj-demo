import { AXIOS } from "./http";
import { END_POINTS } from "./constants";

export const fetchProducts = async(page: number, limit: number): Promise<any> => {
  try {
    const response = await AXIOS.get(`${END_POINTS.PRODUCTS}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export const searchProducts = async (query: string, page: number): Promise<any> => {
  try {
    const response = await AXIOS.get(`${END_POINTS.SEARCH_PRODUCTS}`, {
      params: { q: query, page },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};