import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "../../../utils/test";
import Activities from "../Activities";

jest.mock("../../../firebase", () => ({}));

async function testModals(altText, heading) {
  render(<Activities />);
  const activityElement = screen.getByText("Develop a new game");
  userEvent.click(activityElement);
  screen.debug();
  const deleteElement = screen.getByAltText(altText);
  userEvent.click(deleteElement);
  const containerElement = await screen.findByTestId("modal container");
  userEvent.click(containerElement);
  await waitFor(() => {
    const headerElement = screen.queryByRole("heading", {
      name: heading,
    });
    expect(headerElement).toBeNull();
  });
}

describe("Tests for Activities page", () => {
  it("Delete modal closes when conatiner div is clicked", () => {
    testModals("delete activity", "Confirm Deletion");
  });

  it("Add task modal closes when container div is clicked", async () => {
    render(<Activities />);
    const activityElement = screen.getByText("Develop a new game");
    userEvent.click(activityElement);
    screen.debug();
    const taskElement = screen.getByText("Add Task");
    userEvent.click(taskElement);
    const containerElement = await screen.findByTestId("modal container");
    userEvent.click(containerElement);
    await waitFor(() => {
      const headerElement = screen.queryByRole("heading", { name: "Add Task" });
      expect(headerElement).toBeNull();
    });
  });
});
