import { API_URL } from "data/api";
import { rest } from "msw";

import topstories from "./topstories.json";

export const handlers = [
  rest.get(API_URL + "topstories.json", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(topstories));
  }),
  rest.get(API_URL + "item/:storyId.json", (req, res, ctx) => {
    const { storyId }: { storyId?: string } = req.params;
    const id = storyId ? parseInt(storyId) : 0;

    return res(
      ctx.status(200),
      ctx.json({
        id: id,
        title: "This is a story title",
        url: "http://google.com/q?=" + id,
        score: 200,
        descendants: 20,
        time: 1674924254,
      })
    );
  }),
];
