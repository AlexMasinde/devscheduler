import { screen, render, cleanup } from "@testing-library/react";
import Activities from "../Activities";
import { ActivitiesContext } from "../../../contexts/activitiesContext";
import { ModalContextProvider } from "../../../contexts/modalContext";
import { AddTaskModalContextProvider } from "../../../contexts/addtaskModalContext";
import { DeleteModalContextProvider } from "../../../contexts/deleteModalContext";

beforeEach(() => {
  cleanup();
});

const activities = {};

function renderActivities() {
  return render(
    <ActivitiesContext.Provider>
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
