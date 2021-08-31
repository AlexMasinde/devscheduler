import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActivitiesContextProvider } from "../../../contexts/activitiesContext";
import { ModalContextProvider } from "../../../contexts/modalContext";
import AddActivityModal from "../AddActivityModal";

beforeEach(() => {
  cleanup();
});

jest.mock("../../../firebase", () => ({
  database: {
    activities: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(() => Promise.resolve("Promise resolved")),
      })),
    })),
  },
}));

function renderAddActivityModal() {
  return render(
    <ActivitiesContextProvider>
      <ModalContextProvider>
        <AddActivityModal />
      </ModalContextProvider>
    </ActivitiesContextProvider>
  );
}

describe("Add Activity Modal", () => {
  it("Add activity component renders", () => {
    renderAddActivityModal();
    const headerElement = screen.getByRole("heading", {
      name: /Add Activity/i,
    });
    expect(headerElement).toBeInTheDocument();
  });

  it("Activity name changes according to user input", () => {
    renderAddActivityModal();
    const inputElement = screen.getByPlaceholderText(/Activity Name/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, {
      target: { value: "Build new website" },
    });
    expect(inputElement.value).toBe("Build new website");
  });

  it("Dropdown menu when select category is clicked", () => {
    renderAddActivityModal();
    const selectElement = screen.getByText(/Select Category/i);
    fireEvent.click(selectElement);
    const dropdownElements = screen.getAllByTestId("add-activity-category");
    expect(dropdownElements.length).toBe(3);
  });

  it("Display an error when activity name is empty on submit", () => {
    renderAddActivityModal();
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    const inputElement = screen.getByPlaceholderText(/Activity Name/i);
    fireEvent.change(inputElement, { target: { value: "" } });
    fireEvent.click(buttonElement);
    const errorElement = screen.getByText(/Name cannot be empty/i);
    expect(errorElement).toBeInTheDocument();
  });

  it("Display an error when activity name containes numbers or symbols", () => {
    renderAddActivityModal();
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    const inputElement = screen.getByPlaceholderText(/Activity Name/i);
    fireEvent.change(inputElement, {
      target: { value: "Build %$5" },
    });
    fireEvent.click(buttonElement);
    const errorElement = screen.getByText(
      /Activity name should include letters and spaces only/i
    );
    expect(errorElement).toBeInTheDocument();
  });

  it("Display an error when category is not selected", () => {
    renderAddActivityModal();
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    const selectElement = screen.getByText(/Select Category/i);
    fireEvent.click(buttonElement);
    const errorElement = screen.getByText(/Please select a category/i);
    expect(errorElement).toBeInTheDocument();
    if (selectElement) {
      expect(errorElement).toBeInTheDocument();
    } else {
      expect(errorElement).not.toBeInTheDocument();
    }
  });

  it("Close modal when add function is complete", async () => {
    renderAddActivityModal();

    const activityName = screen.getByPlaceholderText(/Activity Name/i);
    fireEvent.change(activityName, { target: { value: "Test Activity" } });
    const selectElement = screen.getByText(/Select Category/i);
    fireEvent.click(selectElement);
    const category = screen.getByText(/Projects/i);
    fireEvent.click(category);

    const monthInput = screen.getByLabelText(/Month/i);
    const dayInput = screen.getByLabelText(/Day/i);
    const yearInput = screen.getByLabelText(/Year/i);
    const hourInput = screen.getByLabelText(/Hour/i);
    const minuteInput = screen.getByLabelText(/Minute/i);
    const secondInput = screen.getByLabelText(/Second/i);
    const selectInput = screen.getByLabelText(/Select AM/i);

    fireEvent.change(monthInput, { target: { value: 9 } });
    fireEvent.change(dayInput, { target: { value: 30 } });
    fireEvent.change(yearInput, { target: { value: 2021 } });
    fireEvent.change(hourInput, { target: { value: 10 } });
    fireEvent.change(minuteInput, { target: { value: 15 } });
    fireEvent.change(secondInput, { target: { value: 30 } });
    userEvent.selectOptions(selectInput, "pm");

    const addButton = screen.getByRole("button", { name: "Add Activity" });
    fireEvent.click(addButton);
    const headerElement = await screen.findByRole("heading", {
      name: "Add Activity",
    });
    const errorElement = screen.queryAllByTestId("error");
    expect(errorElement.length).toBe(0);

    setTimeout(() => {
      expect(headerElement).not.toBeInTheDocument();
    }, 600);
  });
});
