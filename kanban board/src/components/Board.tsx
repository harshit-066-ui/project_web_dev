import Column from "./Column";
import  type { Column as ColumnType } from "./types";

function Board() {
  const columns: ColumnType[] = [
    {
      id: 1,
      title: "To Do",
      cards: [
        { id: 1, title: "Learn React", description: "Understand JSX and props" },
        { id: 2, title: "Set up project", description: "Create a React app" }
      ]
    },
    {
      id: 2,
      title: "In Progress",
      cards: [
        { id: 3, title: "Build Board", description: "Create Column and Card components" }
      ]
    },
    {
      id: 3,
      title: "Done",
      cards: [
        { id: 4, title: "Install Node.js", description: "Make sure Node.js is installed" }
      ]
    }
  ];

  return (
    <div style={{
      display: "flex",
      padding: "16px",
      gap: "16px",
      overflowX: "auto"
    }}>
      {columns.map(column => (
        <Column key={column.id} columnData={column} />
      ))}
    </div>
  );
}

export default Board;