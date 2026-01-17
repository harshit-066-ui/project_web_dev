import type { Card as CardType} from "./types";

interface CardProps{
    cardData: CardType;
}
function Card({cardData}: CardProps) {
    return(
        <div style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "8px",
            marginBottom:"8px",
            backgroundColor: "#fff"
        }}>
            <h3>{cardData.title}</h3>
            <p>{cardData.description}</p>
        </div>
    );
    
}
export default Card;