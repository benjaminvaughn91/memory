import React from "react";
import { StyledCard, StyledEmptySpace } from "./styles";
import { CardType } from "../../types/types";

interface CardProps {
  revealed: boolean;
  card: CardType;
  handleCardClick: (card: CardType) => void;
}

const Card = ({ revealed, card, handleCardClick }: CardProps) => {
  const { color } = card;

  if (!color) return <StyledEmptySpace />;

  return (
    <StyledCard
      data-testid={"card"}
      cardColor={color}
      revealed={revealed}
      onClick={() => handleCardClick(card)}
    ></StyledCard>
  );
};

export default Card;
