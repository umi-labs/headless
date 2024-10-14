import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import FieldSet from "../FieldSet";

test("renders component successfully", () => {
  render(
    <FieldSet>
      <input type="text" />
    </FieldSet>,
  );
  const element = screen.getByTestId(/test/i);
  expect(element).toBeInTheDocument();
});
