import Activities from "./pages/Activities/Activities";

import { ModalContextProvider } from "./contexts/modalContext";
import { ActivitiesContextProvider } from "./contexts/activitiesContext";
import { AddTaskModalContextProvider } from "./contexts/addtaskModalContext";

function App() {
  return (
    <ActivitiesContextProvider>
      <ModalContextProvider>
        <AddTaskModalContextProvider>
          <Activities />
        </AddTaskModalContextProvider>
      </ModalContextProvider>
    </ActivitiesContextProvider>
  );
}

export default App;
