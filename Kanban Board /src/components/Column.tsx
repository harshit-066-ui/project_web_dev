import { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import CardModal from "./Modal";
import type { Column as ColumnTypeEnum, Priority, Card as CardType } from "./types";

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
  const ref = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | undefined>(undefined);

  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item: { cardId: number; sourceColumnId: number }) => {
      if (item.sourceColumnId !== columnData.id) {
        onMoveCard(item.cardId, item.sourceColumnId, columnData.id);
      }
    },
    collect: monitor => ({ isOver: monitor.isOver() }),
  });

  drop(ref);

  return (
    <div
      ref={ref}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        minWidth: "250px",
        backgroundColor: isOver ? "#f0f8ff" : "#fff",
      }}
    >
      <h2>{columnData.title}</h2>

      {columnData.cards.map((card, index) => (
        <Card
          key={card.id}
          cardData={card}
          columnId={columnData.id}
          index={index}
          onDelete={onDeleteCard}
          onMoveCardWithinColumn={onMoveCardWithinColumn}
          onClick={() => {
            setSelectedCard(card);
            setIsModalOpen(true);
          }}
        />
      ))}

      <button
        onClick={() => {
          setSelectedCard(undefined);
          setIsModalOpen(true);
        }}
        style={{ width: "100%", marginTop: "8px" }}
      >
        Add Card
      </button>

      <CardModal
        isOpen={isModalOpen}
        initialData={selectedCard}
        onClose={() => setIsModalOpen(false)}
        onSave={(title, description, priority) => {
          if (selectedCard) {
            onEditCard(columnData.id, selectedCard.id, title, description, priority);
          } else {
            onAddCard(columnData.id, title, description, priority);
          }
        }}
      />
    </div>
  );
}

export default Column;
