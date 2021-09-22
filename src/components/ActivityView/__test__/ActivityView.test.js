import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import ActivityView from "../ActivityView";
import { ActivitiesContext } from "../../../contexts/activitiesContext";
import { ModalContextProvider } from "../../../contexts/modalContext";
import { DeleteModalContextProvider } from "../../../contexts/deleteModalContext";
import { AddTaskModalContextProvider } from "../../../contexts/addtaskModalContext";

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
  {
    name: "Get workers",
    deadline: "September 8, 2021 at 10:44:35 PM UTC+3",
    activityId: "123454-123445a8s-hjgasjhgas",
    complete: true,
    id: "123353454-asasjknm-hjgasjhgas",
  },
  {
    name: "Buy the roof",
    deadline: "September 12, 2021 at 10:44:35 PM UTC+3",
    activityId: "123454-123445a8s-hjgasjhgas",
    complete: false,
    id: "11223454-asasjknm-563214",
  },
  {
    name: "Finalize contracts",
    deadline: "September 25, 2021 at 10:44:35 PM UTC+3",
    activityId: "123454-123445a8s-hjgasjhgas",
    complete: false,
    id: "123as454-asasjknm-898798741",
  },
];

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

function renderActivityView() {
  return render(
    <ActivitiesContext.Provider value={testValues}>
      <ModalContextProvider>
        <AddTaskModalContextProvider>
          <DeleteModalContextProvider>
            <ActivityView />
          </DeleteModalContextProvider>
        </AddTaskModalContextProvider>
      </ModalContextProvider>
    </ActivitiesContext.Provider>
  );
}

jest.mock("../../../firebase", () => ({}));

describe("Unit test activity view component with tasks", () => {
  it("Component renders", () => {
    renderActivityView();
    const nameElement = screen.getByText(selectedActivity.name);
    const addTaskElement = screen.getByText(/Add Task/i);
    expect(nameElement).toBeInTheDocument();
    expect(addTaskElement).toBeInTheDocument();
  });

  it("Renders activity tasks", async () => {
    renderActivityView();
    await waitFor(() => {
      const taskElements = screen.getAllByTestId("task-list-item");
      expect(taskElements.length).toBe(activityTasks.length);
    });
  });

  it("Activity view removed when there is no selected task", async () => {
    renderActivityView();
    const nameElement = screen.getByText(selectedActivity.name);
    const addTaskElement = screen.getByText(/Add Task/i);
    const deleteElement = screen.getByAltText(/delete activity/i);
    fireEvent.click(deleteElement);
    setTimeout(() => {
      expect(nameElement).not.toBeInTheDocument();
      expect(addTaskElement).not.toBeInTheDocument();
    }, 500);
  });

  it("Renders edit activity modal", () => {
    renderActivityView();
    const editElement = screen.getByAltText(/edit activity/i);
    fireEvent.click(editElement);
    setTimeout(() => {
      const headerElement = screen.getByRole("heading", {
        name: "Edit Activity",
      });
      const buttonElement = screen.getByRole("button", {
        name: "Update Activity",
      });
      expect(headerElement).toBeInTheDocument();
      expect(buttonElement).toBeInTheDocument();
    }, 600);
  });

  it("Allows users to add a task", () => {
    renderActivityView();
    const addTaskElement = screen.getByText(/Add Task/i);
    fireEvent.click(addTaskElement);

    waitFor(() => {
      const taskName = screen.getByPlaceholderText("Task Name");
      fireEvent.change(taskName, { target: { value: "Test task" } });
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

      const submitElement = screen.getByRole("button", { name: "Add" });
      fireEvent.click(submitElement);
      const errorElements = screen.getAllByTestId("error");
      expect(errorElements.length).toBe(0);

      const headerElement = screen.getByRole("heading", { name: "Add Task" });
      setTimeout(() => {
        expect(headerElement).not.toBeInTheDocument();
      }, 600);
    });

    waitFor(() => {
      const newTaskElement = screen.getByText(/Test task/i);
      expect(newTaskElement).toBeInTheDocument();
    });
  });
});
