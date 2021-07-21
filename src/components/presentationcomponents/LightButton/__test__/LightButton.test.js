import { render, screen } from "@testing-library/react";
import LightButton from "../LightButton";

test("Button renders with the corrent props", () => {
  render(<LightButton text="Light Button" />);
  const button = screen.getByRole("button", { name: /Light Button/i });
  screen.debug(button);
});
