import { expect, test } from "vitest";
import { fetchUrl } from "./api";

test("api requests are handled correctly", async () => {
  const res = await fetchUrl("test.json");
  expect(res).toStrictEqual({ test: true });
});
