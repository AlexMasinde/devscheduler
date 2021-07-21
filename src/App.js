import Button from "./components/presentationcomponents/Button/Button";

function App() {
  const text = "Test Button";
  return (
    <div className="App">
      <h1>Dev Scheduler</h1>
      <Button text={text} />
    </div>
  );
}

export default App;
