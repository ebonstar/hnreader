export const fetchUrl = async <T>(endpoint: string): Promise<T> => {
  const url = "https://hacker-news.firebaseio.com/v0/" + endpoint;
  const response = await fetch(url);
  return response.json() as T;
};
