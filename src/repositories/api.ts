import { AXIOS } from "./http";
import { END_POINTS } from "./constants";

export const fetchProducts = async(query: any): Promise<any> => {
  try {
    const response = await AXIOS.get(`${END_POINTS.PRODUCTS}`, {
      params: { 
        page: query.page,
        limit: query.limit
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export const searchProducts = async (query: any): Promise<any> => {
  try {
    const response = await AXIOS.get(`${END_POINTS.SEARCH_PRODUCTS}`, {
      params: { 
        q: query.q, 
        page: query.page,
        limit: query.limit
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};