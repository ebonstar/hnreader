import { render, screen } from "@testing-library/react";
import { HN_ITEM_LINK, StoryItem } from "./StoryItem";
import story from "mocks/item.json";

test("storyItem matches snapshot", () => {
  const storyItem = render(<StoryItem story={story} />);
  expect(storyItem).toMatchSnapshot();
});

test("story with no external url links to hacker news page", () => {
  const { url, ...storyWithoutUrl } = story;
  render(<StoryItem story={storyWithoutUrl} />);

  const storyLink: HTMLAnchorElement = screen.getByRole("link", {
    name: /story title/,
  });

  expect(storyLink.href).toContain(HN_ITEM_LINK);
});
