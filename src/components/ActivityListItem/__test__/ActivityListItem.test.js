import {
  screen,
  render,
  fireEvent,
  waitFor,
  queryByRole,
} from "@testing-library/react";
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

const testValues = {
  selectedActivity: null,
  activities: activities,
  activityTasks: [],
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

  it("Sets selected activity when clicked", async () => {
    renderActivityListItem();
    const nameElement = screen.getByTestId("div");
    fireEvent.click(nameElement);
    await waitFor(() => {
      screen.debug();
    });
  });
});
