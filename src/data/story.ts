import { Story } from "components/StoryItem";
import { fetchUrl } from "./api";

export const fetchTopStoryIds = async () => {
  try {
    return fetchUrl<number[]>("topstories.json");
  } catch (err) {
    console.error("Could not load top stories", err);
    throw err;
  }
};

export const fetchStory = async (id: number) => {
  try {
    return fetchUrl<Story>(`item/${id}.json`);
  } catch (err) {
    console.error("Could not load story", id, err);
    throw err;
  }
};
