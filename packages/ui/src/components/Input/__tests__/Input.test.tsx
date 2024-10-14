import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Input from "../Input";

test("renders component successfully", async () => {
  const screen = render(<Input id="test" name="test" register={() => ({})} />);
  const element = screen.getByTestId(/input/i);
  expect(element).toBeInTheDocument();
});
