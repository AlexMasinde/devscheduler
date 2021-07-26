import { screen, render } from "@testing-library/react";

import AddButton from "../AddButton";

test("Add button takes props from header and renders as text", () => {
  render(<AddButton text="Add Articles" />);
  const button = screen.getByText("Add Aricles");
  expect(button).toBeInTheDocument();
  screen.debug(button);
});
