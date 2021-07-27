import AddActivityModal from "./components/AddActivityModal/AddActivityModal";
import Nav from "./components/DashboardNav/DashboardNav";

function App() {
  return (
    <div className="App">
      <h1>Dev Scheduler</h1>
      <Nav />
      <AddActivityModal />
    </div>
  );
}

export default App;
