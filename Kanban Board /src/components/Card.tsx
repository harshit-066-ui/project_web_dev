import { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Card as CardType, Priority } from "./types";

interface CardProps {
  cardData: CardType;
  columnId: number;
  index: number;
  onEdit: (columnId: number, cardId: number, title: string, description: string, priority?: Priority) => void;
  onDelete: (columnId: number, cardId: number) => void;
  onMoveCardWithinColumn?: (columnId: number, dragIndex: number, hoverIndex: number) => void;
}

function Card({ cardData, columnId, index, onEdit, onDelete, onMoveCardWithinColumn }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(cardData.title);
  const [description, setDescription] = useState(cardData.description);
  const [priority, setPriority] = useState<Priority | undefined>(cardData.priority);

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (item: { cardId: number; sourceColumnId: number; index: number }) => {
      if (!ref.current || !onMoveCardWithinColumn) return;
      if (item.index === index && item.sourceColumnId === columnId) return;
      if (item.sourceColumnId === columnId) {
        onMoveCardWithinColumn(columnId, item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { cardId: cardData.id, sourceColumnId: columnId, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(ref));

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onEdit(columnId, cardData.id, title, description, priority);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor:
          priority === "red" ? "#ffcccc" : priority === "orange" ? "#ffe5cc" : priority === "yellow" ? "#ffffcc" : "#fff",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ display: "block", marginBottom: "4px", width: "100%" }}
          />
          <input
            type="text"
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
          <button onClick={handleSave} style={{ marginRight: "4px" }}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{cardData.title}</h3>
          <p>{cardData.description}</p>
          <button onClick={() => setIsEditing(true)} style={{ marginRight: "4px" }}>
            Edit
          </button>
          <button onClick={() => onDelete(columnId, cardData.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default Card;
