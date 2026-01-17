import Card from "./Card";
import type { Column as ColumnType } from "./types";

interface ColumnProps {
  columnData: ColumnType;
}

function Column({ columnData }: ColumnProps) {
  return (
    <div className="cards">
      <h2>{columnData.title}</h2>
      {columnData.cards.map(card => (
        <Card key={card.id} cardData={card} />
      ))}
    </div>
  );
}

export default Column;