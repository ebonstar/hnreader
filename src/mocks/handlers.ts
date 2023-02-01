import { rest } from "msw";
import { API_URL } from "config";

import topstories from "./topstories.json";
import item from "./item.json";

export const handlers = [
  rest.get(API_URL + "test.json", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ test: true }));
  }),
  rest.get(API_URL + "topstories.json", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(topstories));
  }),
  rest.get(API_URL + "item/:storyId.json", (req, res, ctx) => {
    const { storyId }: { storyId?: string } = req.params;
    const id = storyId ? parseInt(storyId) : 0;

    return res(ctx.status(200), ctx.json({ ...item, id }));
  }),
];
