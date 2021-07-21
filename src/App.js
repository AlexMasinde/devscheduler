import Button from "./components/presentationcomponents/Button/Button";
import LightButton from "./components/presentationcomponents/LightButton/LightButton";

function App() {
  const text = "Test Button";
  return (
    <div className="App">
      <h1>Dev Scheduler</h1>
      <Button text={text} />
      <LightButton text={text} />
    </div>
  );
}

export default App;
