import { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import type { Card as CardType } from "./types";

interface CardProps {
  cardData: CardType;
  columnId: number;
  onEdit: (columnId: number, cardId: number, title: string, description: string) => void;
  onDelete: (columnId: number, cardId: number) => void;
}

function Card({ cardData, columnId, onEdit, onDelete }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(cardData.title);
  const [description, setDescription] = useState(cardData.description);

  
  const ref = useRef<HTMLDivElement>(null);


  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { cardId: cardData.id, sourceColumnId: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  drag(ref);

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      onEdit(columnId, cardData.id, title, description);
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
        backgroundColor: "#fff",
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
