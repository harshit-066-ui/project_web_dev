import { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import type { Column as ColumnTypeEnum, Priority } from "./types";

interface ColumnProps {
  columnData: ColumnTypeEnum;
  onAddCard: (columnId: number, title: string, description: string, priority?: Priority) => void;
  onEditCard: (columnId: number, cardId: number, title: string, description: string, priority?: Priority) => void;
  onDeleteCard: (columnId: number, cardId: number) => void;
  onMoveCard: (cardId: number, sourceColumnId: number, targetColumnId: number) => void;
  onMoveCardWithinColumn: (columnId: number, dragIndex: number, hoverIndex: number) => void;
}

function Column({
  columnData,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onMoveCard,
  onMoveCardWithinColumn,
}: ColumnProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: { cardId: number; sourceColumnId: number }) => {
      if (item.sourceColumnId !== columnData.id) onMoveCard(item.cardId, item.sourceColumnId, columnData.id);
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  drop(ref);

  const handleAdd = () => {
    if (title.trim() && description.trim()) {
      onAddCard(columnData.id, title, description, priority);
      setTitle("");
      setDescription("");
      setPriority(undefined);
    }
  };

  return (
    <div
      ref={ref}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        minWidth: "250px",
        backgroundColor: isOver ? "#f0f8ff" : "#fff",
        transition: "background-color 0.2s",
      }}
    >
      <h2>{columnData.title}</h2>

      {columnData.cards.map((card, index) => (
        <Card
          key={card.id}
          cardData={card}
          columnId={columnData.id}
          index={index}
          onEdit={onEditCard}
          onDelete={onDeleteCard}
          onMoveCardWithinColumn={onMoveCardWithinColumn}
        />
      ))}

      <input
        type="text"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: "4px", width: "100%" }}
      />
      <input
        type="text"
        placeholder="Card description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: "4px", width: "100%" }}
      />
      <select
        value={priority || ""}
        onChange={(e) => setPriority(e.target.value as Priority)}
        style={{ display: "block", marginBottom: "4px", width: "100%" }}
      >
        <option value="">No Priority</option>
        <option value="red">Urgent (Red)</option>
        <option value="orange">Essential (Orange)</option>
        <option value="yellow">Optional (Yellow)</option>
      </select>
      <button onClick={handleAdd}>Add Card</button>
    </div>
  );
}

export default Column;

