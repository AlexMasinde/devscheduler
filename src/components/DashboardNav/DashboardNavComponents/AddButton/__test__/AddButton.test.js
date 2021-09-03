import { screen, render } from "@testing-library/react";
import { ModalContextProvider } from "../../../../../contexts/modalContext";

import AddButton from "../AddButton";

test("Add button takes props from header and renders as text", () => {
  render(
    <ModalContextProvider>
      <AddButton text="Add Articles" />
    </ModalContextProvider>
  );
  const button = screen.getByText("Add Articles");
  expect(button).toBeInTheDocument();
  screen.debug(button);
});
