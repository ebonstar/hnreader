import { API_URL } from "config";

export const fetchUrl = async <T>(endpoint: string): Promise<T> => {
  const url = API_URL + endpoint;
  const response = await fetch(url);
  return response.json() as T;
};
