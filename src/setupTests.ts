// msw does not support node 18+ yet, see https://github.com/mswjs/msw/issues/1388
// remove this and the node environment variable in package.json when support is added
import "whatwg-fetch";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
