import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router";

import { ModalContextProvider } from "./contexts/modalContext";
import { ActivitiesContextProvider } from "./contexts/activitiesContext";
import { AddTaskModalContextProvider } from "./contexts/addtaskModalContext";
import { DeleteModalContextProvider } from "./contexts/deleteModalContext";
import { AuthContextProvider } from "./contexts/authContext";

import Activities from "./pages/Activities/Activities";
import UserForm from "./components/UserForm/UserForm";
import Login from "./components/Login/Login";

function App() {
  return (
    <AuthContextProvider>
      <ActivitiesContextProvider>
        <ModalContextProvider>
          <AddTaskModalContextProvider>
            <DeleteModalContextProvider>
              <Login />
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
