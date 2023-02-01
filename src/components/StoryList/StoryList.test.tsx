import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { CHUNK_SIZE } from "config";
import {
  intersectionMockInstance,
  mockAllIsIntersecting,
} from "react-intersection-observer/test-utils";
import { getNextChunk, StoryList } from "./StoryList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test.only("storylist fetches and displays data", async () => {
  const result = render(
    <QueryClientProvider client={queryClient}>
      <StoryList />
    </QueryClientProvider>
  );

  // displays loading spinner on load
  const loading = screen.getByRole("status");
  expect(loading).toBeInTheDocument();

  // data is displayed and loader disappears
  await screen.findByRole("list");
  expect(loading).not.toBeInTheDocument();

  // intersection observer has been added
  const intersectionTarget = result.container.querySelector("#load-more");
  if (!intersectionTarget)
    throw Error("intersection observer target not found");
  const instance = intersectionMockInstance(intersectionTarget);
  expect(instance.observe).toHaveBeenCalledWith(intersectionTarget);

  // one chunk is loaded initially
  const initialStories = screen.getAllByRole("listitem");
  expect(initialStories.length).toBe(CHUNK_SIZE);

  // IMPORTANT: removing initial stories from dom to better test loading the next chunk
  screen.getAllByRole("listitem").forEach((el) => el.remove());

  // when observer is called, another chunk starts loading
  mockAllIsIntersecting(true);
  mockAllIsIntersecting(false);
  await screen.findByRole("status");

  // another chunk is loaded
  waitForElementToBeRemoved(screen.queryByRole("status"));
  const nextStories = await screen.findAllByRole("listitem");
  expect(nextStories.length).toBe(CHUNK_SIZE);
});

const TEST_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe("getNextChunk function", () => {
  test.each([
    {
      rule: "produces chunks of the correct size",
      start: 0,
      chunk: 3,
      expected: TEST_ARRAY.slice(0, 3),
    },
    {
      rule: "returns the correct chunk for a start index larger than 0",
      start: 5,
      chunk: 2,
      expected: TEST_ARRAY.slice(5, 7),
    },
    {
      rule: "returns nothing if chunk is 0",
      start: 0,
      chunk: 0,
      expected: [],
    },
    {
      rule: "returns only remaining items if chunk size exceeds remaining items",
      start: 7,
      chunk: 10,
      expected: TEST_ARRAY.slice(7, 11),
    },
  ])("($rule)", ({ start, chunk, expected }) => {
    expect(getNextChunk(TEST_ARRAY, start, chunk)).toStrictEqual(expected);
  });
});
