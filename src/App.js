import "./App.css";
import Squared from "./components/Squared";

function App() {
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Squared />
    </div>
  );
}

export default App;
