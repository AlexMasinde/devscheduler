import Activities from "./pages/Activities/Activities";

import { ModalContextProvider } from "./contexts/modalContext";
import { ActivitiesContextProvider } from "./contexts/activitiesContext";
import { AddTaskModalContextProvider } from "./contexts/addtaskModalContext";
import { DeleteModalContextProvider } from "./contexts/deleteModalContext";
import UserForm from "./components/UserForm/UserForm";
import { AuthContextProvider } from "./contexts/authContext";

function App() {
  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
}

export default App;
