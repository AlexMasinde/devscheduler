import { getByPlaceholderText, render, screen } from "@testing-library/react";

import Input from "../Input";

test("Test input to see if it renders with props", () => {
  render(<Input placeholder="placeholder" />);
  const input = screen.getByPlaceholderText(/placeholder/i);
  screen.debug(input);
});
