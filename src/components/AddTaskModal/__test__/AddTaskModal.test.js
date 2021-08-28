import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActivitiesContextProvider } from "../../../contexts/activitiesContext";
import { AddTaskModalContextProvider } from "../../../contexts/addtaskModalContext";
import AddTaskModal from "../AddTaskModal";

beforeAll(() => {
  cleanup();
});

jest.mock("../../../firebase", () => ({
  database: {
    tasks: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(() => Promise.resolve("Promise resolved")),
      })),
    })),
  },
}));

function rednerAddTaskModal() {
  return render(
    <ActivitiesContextProvider>
      <AddTaskModalContextProvider>
        <AddTaskModal />
      </AddTaskModalContextProvider>
    </ActivitiesContextProvider>
  );
}

describe("Test overall functioning of the add task modal", () => {
  it("Ensure component renders", () => {
    rednerAddTaskModal();
    const headerElement = screen.getByRole("heading", { name: /Add Task/i });
    const inputElement = screen.getByPlaceholderText(/Task Name/i);
    expect(headerElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it("Ensure task name input changes when user types", () => {
    rednerAddTaskModal();
    const inputElement = screen.getByPlaceholderText(/Task Name/i);
    fireEvent.change(inputElement, { target: { value: "Get home fast" } });
    expect(inputElement).toHaveValue("Get home fast");
  });

  it("Display error when input is empty on submit", () => {
    rednerAddTaskModal();
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(buttonElement);
    const errorElement = screen.getByText(/Name cannot be empty/i);
    expect(errorElement).toBeInTheDocument();
  });

  it("Display error when input contains numbers or symbols", () => {
    rednerAddTaskModal();
    const inputElement = screen.getByPlaceholderText(/Task Name/i);
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    fireEvent.change(inputElement, { target: { value: "Chill%%" } });
    fireEvent.click(buttonElement);
    const errorElement = screen.getByText(
      /Activity name should include letters and spaces only/i
    );
    expect(errorElement).toBeInTheDocument();
  });

  it("Ensure user cannot provide backward deadline", () => {
    rednerAddTaskModal();
    const buttonElement = screen.getByRole("button", { name: /Add/i });

    const monthInput = screen.getByLabelText(/Month/i);
    const dayInput = screen.getByLabelText(/Day/i);
    const yearInput = screen.getByLabelText(/Year/i);
    const hourInput = screen.getByLabelText(/Hour/i);
    const minuteInput = screen.getByLabelText(/Minute/i);
    const secondInput = screen.getByLabelText(/Second/i);
    const selectInput = screen.getByLabelText(/Select AM/i);

    fireEvent.change(monthInput, { target: { value: 8 } });
    fireEvent.change(dayInput, { target: { value: 30 } });
    fireEvent.change(yearInput, { target: { value: 2020 } });
    fireEvent.change(hourInput, { target: { value: 10 } });
    fireEvent.change(minuteInput, { target: { value: 15 } });
    fireEvent.change(secondInput, { target: { value: 30 } });
    userEvent.selectOptions(selectInput, "pm");

    fireEvent.click(buttonElement);
    const errorElement = screen.getByText(/Please select a valid deadline/i);
    expect(errorElement).toBeInTheDocument();
  });

  it("Close icon closes modal on click", () => {
    rednerAddTaskModal();
    const closeElement = screen.getByAltText("close");
    const headerElement = screen.getByRole("heading", { name: /Add Task/i });
    const inputElement = screen.getByPlaceholderText(/Task Name/i);
    fireEvent.click(closeElement);
    setTimeout(() => {
      expect(headerElement).not.toBeInTheDocument();
      expect(inputElement).not.toBeInTheDocument();
    }, 550);
  });

  it("Close modal on submi with no errors", () => {
    rednerAddTaskModal();
    const buttonElement = screen.getByRole("button", { name: /Add/i });
    const headerElement = screen.getByRole("heading", { name: /Add Task/i });
    const inputElement = screen.getByPlaceholderText(/Task Name/i);
    fireEvent.change(inputElement, {
      target: { value: "You have a new task" },
    });

    const monthInput = screen.getByLabelText(/Month/i);
    const dayInput = screen.getByLabelText(/Day/i);
    const yearInput = screen.getByLabelText(/Year/i);
    const hourInput = screen.getByLabelText(/Hour/i);
    const minuteInput = screen.getByLabelText(/Minute/i);
    const secondInput = screen.getByLabelText(/Second/i);
    const selectInput = screen.getByLabelText(/Select AM/i);

    fireEvent.change(monthInput, { target: { value: 8 } });
    fireEvent.change(dayInput, { target: { value: 30 } });
    fireEvent.change(yearInput, { target: { value: 2020 } });
    fireEvent.change(hourInput, { target: { value: 10 } });
    fireEvent.change(minuteInput, { target: { value: 15 } });
    fireEvent.change(secondInput, { target: { value: 30 } });
    userEvent.selectOptions(selectInput, "pm");

    fireEvent.click(buttonElement);

    setTimeout(() => {
      expect(inputElement).toBeInTheDocument();
      expect(headerElement).toBeInTheDocument();
    }, 550);
  });
});
