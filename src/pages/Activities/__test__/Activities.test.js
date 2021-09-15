import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import Activities from "../Activities";
import { ActivitiesContext } from "../../../contexts/activitiesContext";
import {
  ModalContext,
  ModalContextProvider,
} from "../../../contexts/modalContext";
import {
  AddTaskModalContext,
  AddTaskModalContextProvider,
} from "../../../contexts/addtaskModalContext";
import {
  DeleteModalContext,
  DeleteModalContextProvider,
} from "../../../contexts/deleteModalContext";

const activities = [
  {
    name: "Buy timber",
    deadline: 1631343795000,
    category: "Projects",
    complete: false,
    id: "1123423454-asasjknm-hjgasjhgas",
    createdAt: new Date(),
  },
  {
    name: "Get workers",
    deadline: 1631350940000,
    category: "Courses",
    complete: true,
    id: "123353454-asasjknm-hjgasjhgas",
    createdAt: new Date(),
  },
  {
    name: "Buy the roof",
    deadline: 1631427512370,
    category: "Projects",
    complete: false,
    id: "11223454-asasjknm-563214",
    createdAt: new Date(),
  },
];

const testValues = {
  selectedActivity: activities[0],
  activities: activities,
  activityTasks: [],
  category: "Projects",
  editingItem: {
    edit: false,
    item: {},
  },
  dispatch: jest.fn(() => {}),
};

function renderActivities() {
  return render(
    <ActivitiesContext.Provider value={testValues}>
      <ModalContextProvider>
        <AddTaskModalContextProvider>
          <DeleteModalContextProvider>
            <Activities />
          </DeleteModalContextProvider>
        </AddTaskModalContextProvider>
      </ModalContextProvider>
    </ActivitiesContext.Provider>
  );
}

function closeModal(heading) {
  const headerElement = screen.getByRole("heading", { name: `${heading}` });
  const containerElement = screen.getByTestId("modal container");
  fireEvent.click(containerElement);

  setTimeout(() => {
    expect(headerElement).not.toBeInTheDocument();
  }, 600);
}

jest.mock("../../../firebase", () => {});

describe("Unit tests for activities page", () => {
  it("Renders all component", () => {
    renderActivities();
    const pendingTasksComponent = screen.getByRole("heading", {
      name: "Pending Tasks",
    });
    const activityListComponent = screen.getByRole("heading", {
      name: "Projects",
    });
    const upcomingDeadlineComponent = screen.getByRole("heading", {
      name: "Upcoming Deadline",
    });
    const activityViewComponent = screen.getByRole("heading", {
      name: "Buy timber",
    });
    expect(pendingTasksComponent).toBeInTheDocument();
    expect(activityListComponent).toBeInTheDocument();
    expect(upcomingDeadlineComponent).toBeInTheDocument();
    expect(activityViewComponent).toBeInTheDocument();
  });

  it("Add activity modal closes when container div is clicked", () => {
    const modalValue = { adding: true, setAdding: jest.fn(), mounted: true };
    render(
      <ActivitiesContext.Provider value={testValues}>
        <ModalContext.Provider value={modalValue}>
          <AddTaskModalContextProvider>
            <DeleteModalContextProvider>
              <Activities />
            </DeleteModalContextProvider>
          </AddTaskModalContextProvider>
        </ModalContext.Provider>
      </ActivitiesContext.Provider>
    );

    const heading = "Add Activity";
    closeModal(heading);
  });

  it("Add task modal closes when container div is clicked", () => {
    const addTaskValue = {
      addingTask: true,
      setAddingTask: jest.fn(),
      mountedTaskModal: true,
    };

    render(
      <ActivitiesContext.Provider value={testValues}>
        <ModalContextProvider>
          <AddTaskModalContext.Provider value={addTaskValue}>
            <DeleteModalContextProvider>
              <Activities />
            </DeleteModalContextProvider>
          </AddTaskModalContext.Provider>
        </ModalContextProvider>
      </ActivitiesContext.Provider>
    );

    const heading = "Add Task";
    closeModal(heading);
  });

  it("Delete modal closes when container div is clicked", () => {
    const deleteValue = {
      deleting: true,
      setDeleting: jest.fn(),
      deleteMounted: true,
      setItemToDelete: jest.fn(),
      itemToDelete: {
        name: "Buy the roof",
        deadline: 1631427512370,
        category: "Projects",
        complete: false,
        id: "11223454-asasjknm-563214",
        createdAt: new Date(),
      },
    };

    render(
      <ActivitiesContext.Provider value={testValues}>
        <ModalContextProvider>
          <AddTaskModalContextProvider>
            <DeleteModalContext.Provider value={deleteValue}>
              <Activities />
            </DeleteModalContext.Provider>
          </AddTaskModalContextProvider>
        </ModalContextProvider>
      </ActivitiesContext.Provider>
    );
    const heading = "Confirm Deletion";
    closeModal(heading);
  });
});
