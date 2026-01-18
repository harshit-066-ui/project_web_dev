import { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import type { Column as ColumnTypeEnum } from "./types";

interface ColumnProps {
  columnData: ColumnTypeEnum;
  onAddCard: (columnId: number, title: string, description: string) => void;
  onEditCard: (columnId: number, cardId: number, title: string, description: string) => void;
  onDeleteCard: (columnId: number, cardId: number) => void;
  onMoveCard: (cardId: number, sourceColumnId: number, targetColumnId: number) => void;
}

function Column({ columnData, onAddCard, onEditCard, onDeleteCard, onMoveCard }: ColumnProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const ref = useRef<HTMLDivElement>(null);

 
  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: { cardId: number; sourceColumnId: number }) => {
      if (item.sourceColumnId !== columnData.id) {
        onMoveCard(item.cardId, item.sourceColumnId, columnData.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref); 

  const handleAdd = () => {
    if (title.trim() && description.trim()) {
      onAddCard(columnData.id, title, description);
      setTitle("");
      setDescription("");
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

      {columnData.cards.map((card) => (
        <Card
          key={card.id}
          cardData={card}
          columnId={columnData.id}
          onEdit={onEditCard}
          onDelete={onDeleteCard}
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
      <button onClick={handleAdd}>Add Card</button>
    </div>
  );
}

export default Column;
