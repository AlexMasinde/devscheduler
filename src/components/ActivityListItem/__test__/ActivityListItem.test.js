import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActivitiesContext } from "../../../contexts/activitiesContext";
import { AddTaskModalContextProvider } from "../../../contexts/addtaskModalContext";
import { DeleteModalContextProvider } from "../../../contexts/deleteModalContext";
import { ModalContextProvider } from "../../../contexts/modalContext";
import ActivityListItem from "../ActivityListItem";

const activity = {
  name: "Build a New House",
  category: "Projects",
  id: "123454-123445a8s-hjgasjhgas",
  deadline: "September 25, 2021 at 10:44:35 PM UTC+3",
};

const activities = [
  {
    name: "Build a New House",
    category: "Projects",
    id: "123454-123445a8s-hjgasjhgas",
    deadline: "September 25, 2021 at 10:44:35 PM UTC+3",
  },
];

const tasks = [
  {
    name: "Buy timber",
    deadline: "September 5, 2021 at 10:44:35 PM UTC+3",
    activityId: "123454-123445a8s-hjgasjhgas",
    complete: false,
    id: "1123423454-asasjknm-hjgasjhgas",
  },
];

const testValues = {
  selectedActivity: null,
  activities: activities,
  activityTasks: tasks,
  category: "Projects",
  editingItem: {
    edit: false,
    item: {},
  },
  dispatch: jest.fn(() => {}),
};

function renderActivityListItem() {
  return render(
    <ActivitiesContext.Provider value={testValues}>
      <ModalContextProvider>
        <AddTaskModalContextProvider>
          <DeleteModalContextProvider>
            <ActivityListItem activity={activity} />
          </DeleteModalContextProvider>
        </AddTaskModalContextProvider>
      </ModalContextProvider>
    </ActivitiesContext.Provider>
  );
}

jest.mock("../../../firebase", () => ({}));

describe("Test activity list item functionality", () => {
  renderActivityListItem();
  it("Renders", () => {
    const nameElement = screen.getByText(activity.name);
    expect(nameElement).toBeInTheDocument();
  });

  // it("Sets selected activity when clicked", async () => {
  //   renderActivityListItem();
  //   const nameElement = screen.getByTestId("div");
  //   userEvent.click(nameElement);
  //   const headerElement = screen.getByRole("heading", { name: activity.name });
  //   screen.debug();
  // });
});
