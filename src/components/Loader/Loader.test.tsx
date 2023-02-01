import { render } from "@testing-library/react";
import { Loader } from "./Loader";

test("loader matches snapshot", () => {
  const loader = render(<Loader />);
  expect(loader).toMatchSnapshot();
});
