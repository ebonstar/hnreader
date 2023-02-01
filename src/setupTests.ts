// msw does not support node 18+ yet, see https://github.com/mswjs/msw/issues/1388
// remove whatwg-fetch and the node environment variable in package.json when support is added
import "whatwg-fetch";
import matchers from "@testing-library/jest-dom/matchers";
import { beforeAll, afterEach, afterAll, expect } from "vitest";
import { server } from "mocks/server";

expect.extend(matchers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
