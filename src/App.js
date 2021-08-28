import Activities from "./pages/Activities/Activities";
import { ModalContextProvider } from "./contexts/modalContext";
import { ActivitiesContextProvider } from "./contexts/activitiesContext";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal";

function App() {
  return (
    <ActivitiesContextProvider>
      <ModalContextProvider>
        <Activities />
        <AddTaskModal />
      </ModalContextProvider>
    </ActivitiesContextProvider>
  );
}

export default App;
