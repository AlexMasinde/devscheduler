import { render, screen } from "@testing-library/react";
import Button from "../Button";

test("Button renders with the corrent props", () => {
  render(<Button text="Button" />);
  const button = screen.getByRole("button", { name: /Button/i });
  expect(button).toBeInTheDocument();
  screen.debug(button);
});
