import Button from "./components/presentationcomponents/Button/Button";
import LightButton from "./components/presentationcomponents/LightButton/LightButton";
import Input from "./components/presentationcomponents/Input/Input";
import Footer from "./components/presentationcomponents/Footer/Footer";

function App() {
  const text = "Test Button";
  const placeholder = "This is a placeholder";
  return (
    <div className="App">
      <h1>Dev Scheduler</h1>
      <Button text={text} />
      <LightButton text={text} />
      <Input placeholder={placeholder} />
      <Footer />
    </div>
  );
}

export default App;
