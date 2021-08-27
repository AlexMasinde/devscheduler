import Activities from "./pages/Activities/Activities";
import { ModalContextProvider } from "./contexts/modalContext";
import { ActivitiesContextProvider } from "./contexts/activitiesContext";

function App() {
  return (
    <ActivitiesContextProvider>
      <ModalContextProvider>
        <Activities />
      </ModalContextProvider>
    </ActivitiesContextProvider>
  );
}

export default App;
