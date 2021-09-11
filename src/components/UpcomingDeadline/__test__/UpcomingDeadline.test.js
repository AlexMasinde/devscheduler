import { screen, render } from "@testing-library/react";
import UpcomingDeadline from "../UpcomingDeadline";
import { ActivitiesContext } from "../../../contexts/activitiesContext";
import { ModalContextProvider } from "../../../contexts/modalContext";
import { DeleteModalContextProvider } from "../../../contexts/deleteModalContext";
import { AddTaskModalContextProvider } from "../../../contexts/addtaskModalContext";

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

jest.mock("../../../firebase", () => ({
  database: {
    activities: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve("activities found")),
    })),
  },
}));

function renderUpcomingDeadline() {
  return render(
    <ActivitiesContext.Provider value={testValues}>
      <ModalContextProvider>
        <AddTaskModalContextProvider>
          <DeleteModalContextProvider>
            <UpcomingDeadline />
          </DeleteModalContextProvider>
        </AddTaskModalContextProvider>
      </ModalContextProvider>
    </ActivitiesContext.Provider>
  );
}

describe("Upcoming deadine", () => {
  it("Upcoming deadline renders", () => {
    renderUpcomingDeadline();
    const headerElement = screen.getByRole("heading", {
      name: "Upcoming Deadline",
    });
    expect(headerElement).toBeInTheDocument();
  });

  it("Renders 00:00:00 when deadline is past", async () => {
    const activity = [
      {
        name: "Buy the roof",
        deadline: 1611427512370,
        category: "Projects",
        complete: false,
        id: "11223454-asasjknm-563214",
        createdAt: new Date(),
      },
    ];

    const testValues = {
      selectedActivity: activities[0],
      activities: activity,
      activityTasks: [],
      category: "Projects",
      editingItem: {
        edit: false,
        item: {},
      },
      dispatch: jest.fn(() => {}),
    };

    render(
      <ActivitiesContext.Provider value={testValues}>
        <ModalContextProvider>
          <AddTaskModalContextProvider>
            <DeleteModalContextProvider>
              <UpcomingDeadline />
            </DeleteModalContextProvider>
          </AddTaskModalContextProvider>
        </ModalContextProvider>
      </ActivitiesContext.Provider>
    );

    const elapsedDeadline = await screen.findByText("00:00:00");
    expect(elapsedDeadline).toBeInTheDocument();
  });
});
