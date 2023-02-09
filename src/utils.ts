import { COLORS } from "./constants";

export const getInitialCards = () => {
  let cards = [];
  for (let i = 0; i < COLORS.length; ++i) {
    cards.push({ id: i, color: COLORS[i] });
    cards.push({ id: i + COLORS.length, color: COLORS[i] });
  }
  return cards.sort(() => 0.5 - Math.random()); // shuffle the array of cards
};
