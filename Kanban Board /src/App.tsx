import Board from "./components/Board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#e0e0e0",
        minHeight: "100vh",
        padding: "24px"
      }}>
        <h1 style={{ textAlign: "center" }}>My Task Board</h1>
        <Board />
      </div>
    </DndProvider>
  );
}

export default App;
