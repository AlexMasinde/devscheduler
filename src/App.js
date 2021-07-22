import PendingTasksCounter from "./components/presentationcomponents/PendingTasksCounter/PendingTasksCounter";

function App() {
  const count = "113";
  return (
    <div className="App">
      <h1>Dev Scheduler</h1>
      <PendingTasksCounter count={count} />
    </div>
  );
}

export default App;
