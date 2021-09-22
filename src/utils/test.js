import React from "react";
import { render } from "@testing-library/react";
import { ActivitiesContextProvider } from "../contexts/activitiesContext";
import { ModalContextProvider } from "../contexts/modalContext";
import { AddTaskModalContextProvider } from "../contexts/addtaskModalContext";
import { DeleteModalContextProvider } from "../contexts/deleteModalContext";

const activities = [
  {
    name: "Open a timber yard",
    deadline: 1631343795000,
    category: "Projects",
    complete: false,
    id: "1123423454-asasjknm-hjgasjhgas",
    createdAt: new Date(),
  },
  {
    name: "Develop a new game",
    deadline: 1631343795008,
    category: "Projects",
    complete: false,
    id: "1123423454-asasjknm-hjgasjhgas",
    createdAt: new Date(),
  },
  {
    name: "Write a book",
    deadline: 1631343795012,
    category: "Projects",
    complete: false,
    id: "1123423454-asasjknm-hjgasjhgas",
    createdAt: new Date(),
  },
];

function wrapper({ children }) {
  return (
    <ActivitiesContextProvider testActivities={activities}>
      <ModalContextProvider>
        <AddTaskModalContextProvider>
          <DeleteModalContextProvider>{children}</DeleteModalContextProvider>
        </AddTaskModalContextProvider>
      </ModalContextProvider>
    </ActivitiesContextProvider>
  );
}

function customRender(ui) {
  render(ui, { wrapper });
}

export * from "@testing-library/react";
export { customRender as render };
