import "./App.css";
import { CanvasEntry } from "./components/main";
import { TestStore } from "./components/testStore";
import { EntityStoreDevTools } from "./store/devTools";

function App() {
  return (
    <>
      <CanvasEntry />
      <TestStore />
      <EntityStoreDevTools />
    </>
  );
}

export default App;
