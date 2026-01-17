import Board from "./components/Board";

function App() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#e0e0e0",
      minHeight: "100vh",
      padding: "24px"
    }}>
      <h1 style={{ textAlign: "center" }}>My Task Board</h1>
      <Board />
    </div>
  );
}

export default App;
