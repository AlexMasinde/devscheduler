import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ModalContextProvider } from "./contexts/modalContext";
import { ActivitiesContextProvider } from "./contexts/activitiesContext";
import { AddTaskModalContextProvider } from "./contexts/addtaskModalContext";
import { DeleteModalContextProvider } from "./contexts/deleteModalContext";
import { AuthContextProvider } from "./contexts/authContext";

import Activities from "./pages/Activities/Activities";
import UserForm from "./pages/UserForm/UserForm";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <AuthContextProvider>
      <ActivitiesContextProvider>
        <ModalContextProvider>
          <AddTaskModalContextProvider>
            <DeleteModalContextProvider>
              <Router>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={UserForm} />
                  <PrivateRoute path="/" component={Activities} exact />
                  <PrivateRoute path="/profile" component={UserProfile} />
                </Switch>
              </Router>
            </DeleteModalContextProvider>
          </AddTaskModalContextProvider>
        </ModalContextProvider>
      </ActivitiesContextProvider>
    </AuthContextProvider>
  );
}

export default App;
