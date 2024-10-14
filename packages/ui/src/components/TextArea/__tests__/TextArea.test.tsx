import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import TextArea from "../TextArea";

test("renders component successfully", () => {
  render(<TextArea />);
  const element = screen.getByTestId(/test/i);
  expect(element).toBeInTheDocument();
});
