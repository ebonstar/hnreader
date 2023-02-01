import { describe, expect, test } from "vitest";
import { getNextChunk } from "./StoryList";

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
