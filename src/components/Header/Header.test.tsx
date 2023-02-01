import { render } from "@testing-library/react";
import { Header } from "./Header";

test("header matches snapshot", () => {
  const header = render(<Header />);
  expect(header).toMatchSnapshot();
});
