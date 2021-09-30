import Activities from "./pages/Activities/Activities";

import { ModalContextProvider } from "./contexts/modalContext";
import { ActivitiesContextProvider } from "./contexts/activitiesContext";
import { AddTaskModalContextProvider } from "./contexts/addtaskModalContext";
import { DeleteModalContextProvider } from "./contexts/deleteModalContext";
import UserForm from "./components/SIgnup/UserForm";

function App() {
  return (
    <ActivitiesContextProvider>
      <ModalContextProvider>
        <AddTaskModalContextProvider>
          <DeleteModalContextProvider>
            <UserForm />
            <Activities />
          </DeleteModalContextProvider>
        </AddTaskModalContextProvider>
      </ModalContextProvider>
    </ActivitiesContextProvider>
  );
}

export default App;
