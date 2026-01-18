import { useState } from "react";
import Column from "./Column";
import type { Column as ColumnTypeEnum, Card, Priority } from "./types";

function Board() {
  const [columns, setColumns] = useState<ColumnTypeEnum[]>([
    { id: 1, title: "To Do", cards: [] },
    { id: 2, title: "In Progress", cards: [] },
    { id: 3, title: "Done", cards: [] },
  ]);

  const [nextCardId, setNextCardId] = useState(1);

  const addCard = (columnId: number, title: string, description: string, priority?: Priority) => {
    const newCard: Card = { id: nextCardId, title, description, priority };
    setNextCardId(prev => prev + 1);
    setColumns(prev => prev.map(col => col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col));
  };

  const deleteCard = (columnId: number, cardId: number) => {
    setColumns(prev => prev.map(col => col.id === columnId ? { ...col, cards: col.cards.filter(c => c.id !== cardId) } : col));
  };

  const editCard = (columnId: number, cardId: number, title: string, description: string, priority?: Priority) => {
    setColumns(prev => prev.map(col => col.id === columnId ? { ...col, cards: col.cards.map(c => c.id === cardId ? { ...c, title, description, priority } : c) } : col));
  };

  const moveCard = (cardId: number, sourceColumnId: number, targetColumnId: number) => {
    setColumns(prev => {
      let movingCard: Card | undefined;
      const newCols = prev.map(col => {
        if (col.id === sourceColumnId) {
          const filtered = col.cards.filter(c => {
            if (c.id === cardId) { movingCard = c; return false; }
            return true;
          });
          return { ...col, cards: filtered };
        }
        return col;
      });
      return newCols.map(col => col.id === targetColumnId && movingCard ? { ...col, cards: [...col.cards, movingCard] } : col);
    });
  };

  const moveCardWithinColumn = (columnId: number, dragIndex: number, hoverIndex: number) => {
    setColumns(prev => prev.map(col => {
      if (col.id !== columnId) return col;
      const updated = [...col.cards];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, moved);
      return { ...col, cards: updated };
    }));
  };

  return (
    <div style={{ display: "flex", padding: "16px", gap: "16px", overflowX: "auto" }}>
      {columns.map(col => (
        <Column
          key={col.id}
          columnData={col}
          onAddCard={addCard}
          onEditCard={editCard}
          onDeleteCard={deleteCard}
          onMoveCard={moveCard}
          onMoveCardWithinColumn={moveCardWithinColumn}
        />
      ))}
    </div>
  );
}

export default Board;
