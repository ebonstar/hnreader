import { expect, test } from "vitest";
import topstories from "mocks/topstories.json";
import { fetchStory, fetchTopStoryIds } from "./story";

test("top story ids are fetched correctly", async () => {
  const res = await fetchTopStoryIds();
  expect(res).toEqual(topstories);
});

test("individual story is fetched correctly", async () => {
  const res = await fetchStory(100);
  expect(res).toStrictEqual({
    id: 100,
    title: "This is a story title",
    url: "http://google.com/q?=100",
    score: 200,
    descendants: 20,
    time: 1674924254,
  });
});
