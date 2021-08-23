import Activities from "./components/Activities/Activities";
import Dashboard from "./components/Dashboard/Dashboard";
import { ModalContextProvider } from "./contexts/modalContext";

function App() {
  return (
    <ModalContextProvider>
      <Activities />
    </ModalContextProvider>
  );
}

export default App;
