import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { ActivitiesContext } from "../../../contexts/activitiesContext";
import { AddTaskModalContextProvider } from "../../../contexts/addtaskModalContext";
import { DeleteModalContextProvider } from "../../../contexts/deleteModalContext";
import { ModalContextProvider } from "../../../contexts/modalContext";
import TaskListItem from "../TaskListItem";

const selectedActivity = {
  name: "Build a New House",
  category: "Projects",
  id: "123454-123445a8s-hjgasjhgas",
  deadline: "September 25, 2021 at 10:44:35 PM UTC+3",
};

const activityTasks = [
  {
    name: "Buy timber",
    deadline: "September 5, 2021 at 10:44:35 PM UTC+3",
    activityId: "123454-123445a8s-hjgasjhgas",
    complete: false,
    id: "1123423454-asasjknm-hjgasjhgas",
  },
];

const task = {
  name: "Buy timber",
  deadline: "September 5, 2021 at 10:44:35 PM UTC+3",
  activityId: "123454-123445a8s-hjgasjhgas",
  complete: false,
  id: "1123423454-asasjknm-hjgasjhgas",
};

const testValues = {
  selectedActivity: selectedActivity,
  activities: [],
  activityTasks: activityTasks,
  category: "Projects",
  editingItem: {
    edit: false,
    item: {},
  },
  dispatch: jest.fn(() => {}),
};

beforeEach(() => {
  cleanup();
});

function renderTaskListItem() {
  return render(
    <ActivitiesContext.Provider value={testValues}>
      <ModalContextProvider>
        <AddTaskModalContextProvider>
          <DeleteModalContextProvider>
            <TaskListItem task={task} />
          </DeleteModalContextProvider>
        </AddTaskModalContextProvider>
      </ModalContextProvider>
    </ActivitiesContext.Provider>
  );
}

jest.mock("../../../firebase", () => ({}));

describe("Unit tests for task list item", () => {
  it("Renders the passed task", () => {
    renderTaskListItem();
    const nameElement = screen.getByText(task.name);
    expect(nameElement).toBeInTheDocument();
  });

  it("Supports edit task functionality", () => {
    renderTaskListItem();
    const editElement = screen.getByAltText("edit task");
    fireEvent.click(editElement);

    waitFor(() => {
      const inputElement = screen.getByPlaceholderText("Task Name");
      fireEvent.change(inputElement, {
        target: { value: "Changed Task Name" },
      });
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

      const submitElement = screen.getByRole("button", { name: "Update" });
      fireEvent.click(submitElement);
      const errorElements = screen.getAllByTestId("error");
      expect(errorElements.length).toBe(0);
    });

    waitFor(() => {
      const headerElement = screen.getByRole("heading", { name: "Edit Task" });
      const editedTaskElement = screen.getByRole("paragraph", {
        name: "Changed Task Name",
      });
      expect(editedTaskElement).toBeInTheDocument();
      expect(headerElement).not.toBeInTheDocument();
    });
  });

  it("Mark task as complete and incomplete", () => {
    renderTaskListItem();
    const checkboxElement = screen.getByRole("checkbox");
    const nameElement = screen.getByText(task.name);
    fireEvent.click(checkboxElement);
    waitFor(() => {
      expect(nameElement).toHaveStyle("text-decoration: line-through");
    });
    fireEvent.click(checkboxElement);
    waitFor(() => {
      expect(nameElement).not.toHaveStyle("text-decoration: line-through");
    });
  });

  it("Deletes task", () => {
    renderTaskListItem();
    const deleteElement = screen.getByAltText("delete task");
    fireEvent.click(deleteElement);
    waitFor(() => {
      const headerElement = screen.getByRole("heading", {
        name: "Confirm Deletion",
      });
      expect(headerElement).toBeInTheDocument();
      const deleteButtonElement = screen.getByRole("button", {
        name: "Delete",
      });
      fireEvent.click(deleteButtonElement);
      waitFor(() => {
        const nameElement = screen.queryByRole("paragraph", {
          name: task.name,
        });
        expect(nameElement).toBe(null);
      });
    });
  });
});
