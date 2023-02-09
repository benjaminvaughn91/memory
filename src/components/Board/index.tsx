import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Card from "../Card";
import { getInitialCards } from "../../utils";
import { CardType } from "../../types/types";

interface BoardProps {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  setGameOngoing: Dispatch<SetStateAction<boolean>>;
}

const Board = ({ score, setScore, setGameOngoing }: BoardProps) => {
  const [cards, setcards] = useState<Array<CardType>>(getInitialCards());
  const [selectedCards, setSelectedCards] = useState<Array<CardType>>([]);

  const handleCardClick = (card: CardType) => {
    if (selectedCards.length === 0) setSelectedCards([card]);
    if (selectedCards.length === 1 && card.id !== selectedCards[0].id)
      setSelectedCards([selectedCards[0], card]);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        if (selectedCards[0].color === selectedCards[1].color) {
          setScore(score + 1);
          setcards(
            cards.map((card) =>
              card.color !== selectedCards[0].color
                ? card
                : { id: card.id, color: undefined }
            )
          );
          const wins = cards.filter((card) => card.color === undefined).length;
          if (wins === getInitialCards().length - 2) setGameOngoing(false);
        } else {
          setScore(score > 0 ? score - 1 : score);
        }
        setSelectedCards([]);
      }, 40);
    }
  }, [score, selectedCards]);

  return (
    <Grid container spacing={1}>
      {cards.map((card, i) => (
        <Grid key={i} item>
          <Card
            card={card}
            revealed={
              card.id === selectedCards[0]?.id ||
              card.id === selectedCards[1]?.id
            }
            handleCardClick={handleCardClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
