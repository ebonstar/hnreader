import { render, screen } from "@testing-library/react";

import App from "./App";

// story list tests are in StoryList.test.tsx
test("app renders heading and loading spinner", () => {
  render(<App />);

  expect(screen.getByRole("heading")).toHaveTextContent("Hacker News");
  expect(screen.getByRole("status")).toBeInTheDocument();
});
