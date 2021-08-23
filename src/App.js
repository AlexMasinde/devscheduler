import Activities from "./pages/Activities/Activities";
import { ModalContextProvider } from "./contexts/modalContext";

function App() {
  return (
    <ModalContextProvider>
      <Activities />
    </ModalContextProvider>
  );
}

export default App;
