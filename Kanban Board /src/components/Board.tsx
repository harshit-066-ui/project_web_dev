import { useState, useEffect } from "react";
import Column from "./Column";
import type { Column as ColumnTypeEnum, Card, Priority } from "./types";

const STORAGE_KEY = "kanban-board-state";

function Board() {
  const [columns, setColumns] = useState<ColumnTypeEnum[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [
        { id: 1, title: "To Do", cards: [] },
        { id: 2, title: "In Progress", cards: [] },
        { id: 3, title: "Done", cards: [] },
      ];
    }
    try {
      return JSON.parse(stored).columns as ColumnTypeEnum[];
    } catch {
      return [
        { id: 1, title: "To Do", cards: [] },
        { id: 2, title: "In Progress", cards: [] },
        { id: 3, title: "Done", cards: [] },
      ];
    }
  });

  const [nextCardId, setNextCardId] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 1;
    try {
      return (JSON.parse(stored).nextCardId as number) ?? 1;
    } catch {
      return 1;
    }
  });

  const [searchText, setSearchText] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "">("");

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ columns, nextCardId })
    );
  }, [columns, nextCardId]);

  const addCard = (columnId: number, title: string, description: string, priority?: Priority) => {
    const newCard: Card = { id: nextCardId, title, description, priority };
    setNextCardId((prev: number) => prev + 1);
    setColumns((prev: ColumnTypeEnum[]) =>
      prev.map(col =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    );
  };

  const deleteCard = (columnId: number, cardId: number) => {
    setColumns((prev: ColumnTypeEnum[]) =>
      prev.map(col =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter(c => c.id !== cardId) }
          : col
      )
    );
  };

  const editCard = (columnId: number, cardId: number, title: string, description: string, priority?: Priority) => {
    setColumns((prev: ColumnTypeEnum[]) =>
      prev.map(col =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map(c =>
                c.id === cardId ? { ...c, title, description, priority } : c
              ),
            }
          : col
      )
    );
  };

  const moveCard = (cardId: number, sourceColumnId: number, targetColumnId: number) => {
    setColumns((prev: ColumnTypeEnum[]) => {
      let movingCard: Card | undefined;
      const withoutCard = prev.map(col => {
        if (col.id === sourceColumnId) {
          return {
            ...col,
            cards: col.cards.filter(c => {
              if (c.id === cardId) {
                movingCard = c;
                return false;
              }
              return true;
            }),
          };
        }
        return col;
      });
      return withoutCard.map(col =>
        col.id === targetColumnId && movingCard
          ? { ...col, cards: [...col.cards, movingCard] }
          : col
      );
    });
  };

  const moveCardWithinColumn = (columnId: number, dragIndex: number, hoverIndex: number) => {
    setColumns((prev: ColumnTypeEnum[]) =>
      prev.map(col => {
        if (col.id !== columnId) return col;
        const updated = [...col.cards];
        const [moved] = updated.splice(dragIndex, 1);
        updated.splice(hoverIndex, 0, moved);
        return { ...col, cards: updated };
      })
    );
  };

  const filteredColumns = columns.map(col => ({
    ...col,
    cards: col.cards.filter(card => {
      const matchesTitle = card.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesPriority = priorityFilter ? card.priority === priorityFilter : true;
      return matchesTitle && matchesPriority;
    }),
  }));

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ marginRight: "8px", padding: "4px" }}
        />
        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value as Priority | "")}
          style={{ padding: "4px" }}
        >
          <option value="">All Priorities</option>
          <option value="red">Urgent (Red)</option>
          <option value="orange">Essential (Orange)</option>
          <option value="yellow">Optional (Yellow)</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "16px", overflowX: "auto" }}>
        {filteredColumns.map(col => (
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
    </div>
  );
}

export default Board;
