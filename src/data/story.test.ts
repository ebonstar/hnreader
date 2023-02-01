import topstories from "mocks/topstories.json";
import item from "mocks/item.json";
import { fetchStory, fetchTopStoryIds } from "./story";

test("top story ids are fetched correctly", async () => {
  const res = await fetchTopStoryIds();
  expect(res).toEqual(topstories);
});

test("individual story is fetched correctly", async () => {
  const res = await fetchStory(100);
  expect(res).toStrictEqual({
    ...item,
    id: 100,
  });
});
