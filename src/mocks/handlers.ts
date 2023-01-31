import { API_URL } from "data/api";
import { rest } from "msw";

import topstories from "./topstories.json";

export const handlers = [
  rest.get(API_URL + "topstories.json", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(topstories));
  }),
  rest.post(`${API_URL}item/:id.json`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id,
        title: "This is a story title",
        url: "http://google.com/q?=" + id,
        score: 200,
        descendants: 20,
        time: 1674924254,
      })
    );
  }),
];
