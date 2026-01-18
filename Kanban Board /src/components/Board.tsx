import { useState } from "react";
import Column from "./Column";
import type { Column as ColumnTypeEnum, Card } from "./types";

function Board() {
  const [columns, setColumns] = useState<ColumnTypeEnum[]>([
    {
      id: 1,
      title: "To Do",
      cards: [
        { id: 1, title: "Learn React", description: "Understand JSX and props" },
        { id: 2, title: "Set up project", description: "Create a React app" },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      cards: [{ id: 3, title: "Build Board", description: "Create Column and Card components" }],
    },
    {
      id: 3,
      title: "Done",
      cards: [{ id: 4, title: "Install Node.js", description: "Make sure Node.js is installed" }],
    },
  ]);

  const [nextCardId, setNextCardId] = useState(5);


  const addCard = (columnId: number, title: string, description: string) => {
    const newCard: Card = { id: nextCardId, title, description };
    setNextCardId((prev) => prev + 1);

    setColumns(
      columns.map((column) =>
        column.id === columnId ? { ...column, cards: [...column.cards, newCard] } : column
      )
    );
  };


  const deleteCard = (columnId: number, cardId: number) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? { ...column, cards: column.cards.filter((card) => card.id !== cardId) }
          : column
      )
    );
  };


  const editCard = (columnId: number, cardId: number, newTitle: string, newDescription: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId ? { ...card, title: newTitle, description: newDescription } : card
              ),
            }
          : column
      )
    );
  };


  const moveCard = (cardId: number, sourceColumnId: number, targetColumnId: number) => {
    setColumns((prevColumns) => {
      let movingCard: Card | undefined;


      const newColumns = prevColumns.map((column) => {
        if (column.id === sourceColumnId) {
          const filteredCards = column.cards.filter((card) => {
            if (card.id === cardId) {
              movingCard = card;
              return false;
            }
            return true;
          });
          return { ...column, cards: filteredCards };
        }
        return column;
      });

     
      return newColumns.map((column) =>
        column.id === targetColumnId && movingCard
          ? { ...column, cards: [...column.cards, movingCard] }
          : column
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "16px",
        gap: "16px",
        overflowX: "auto",
      }}
    >
      {columns.map((column) => (
        <Column
          key={column.id}
          columnData={column}
          onAddCard={addCard}
          onEditCard={editCard}
          onDeleteCard={deleteCard}
          onMoveCard={moveCard}
        />
      ))}
    </div>
  );
}

export default Board;
