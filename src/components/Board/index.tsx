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

  const updateDeck = () => {
    setcards(
      cards.map((card) =>
        card.color !== selectedCards[0].color
          ? card
          : { ...card, color: undefined }
      )
    );
  };

  const updateGameState = () => {
    const matchedCards = cards.filter(
      (card) => card.color === undefined
    ).length;
    if (matchedCards === getInitialCards().length - 2) {
      setGameOngoing(false);
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        if (selectedCards[0].color === selectedCards[1].color) {
          setScore(score + 1);
          updateDeck();
          updateGameState();
        } else {
          setScore(score > 0 ? score - 1 : score);
        }
        setSelectedCards([]);
      }, 600);
    }
  }, [cards, score, selectedCards, setGameOngoing, setScore]);

  return (
    <Grid container spacing={1}>
      {cards.map((card) => (
        <Grid key={card.id} item>
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
