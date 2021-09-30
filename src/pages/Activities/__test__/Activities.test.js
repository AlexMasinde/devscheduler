import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "../../../utils/test";
import Activities from "../Activities";

jest.mock("../../../firebase", () => ({}));

async function testModals(text, heading) {
  render(<Activities />);
  const activityElement = screen.getByText("Develop a new game");
  userEvent.click(activityElement);
  const deleteElement = screen.getByAltText(text);
  userEvent.click(deleteElement);
  const containerElement = await screen.findByTestId("modal container");
  userEvent.click(containerElement);
  await waitFor(() => {
    expect(screen.queryByRole("heading", { name: heading })).toBeNull();
  });
}

describe("Tests for Activities page", () => {
  it("Delete modal closes when conatiner div is clicked", async () => {
    await testModals("delete activity", "Confirm Deletion");
  });

  it("Add task modal closes when container div is clicked", async () => {
    await testModals("add task", "Add Task");
  });

  it("Updates selected category when clicked", () => {
    render(<Activities />);
    const productElement = screen.getByAltText("select projects");
    userEvent.click(productElement);
    const categoryHeader = screen.getByRole("heading", { name: "Projects" });
    expect(categoryHeader).toBeInTheDocument();
    const readingsElement = screen.getByAltText("select readings");
    userEvent.click(readingsElement);
    const readingsHeader = screen.getByRole("heading", { name: "Readings" });
    expect(readingsHeader).toBeInTheDocument();
  });

  it("Add activity modal closes when container div is clicked", async () => {
    render(<Activities />);
    const addElement = screen.getByText("Add Activity");
    userEvent.click(addElement);
    const containerElement = await screen.findByTestId("modal container");
    userEvent.click(containerElement);
    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: "Add Activity" })
      ).toBeNull();
    });
  });
});
