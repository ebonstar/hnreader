export const API_URL = "https://hacker-news.firebaseio.com/v0/";

export const fetchUrl = async <T>(endpoint: string): Promise<T> => {
  const url = API_URL + endpoint;
  const response = await fetch(url);
  return response.json() as T;
};
