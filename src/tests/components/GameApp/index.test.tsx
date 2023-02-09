import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import GameApp from "../../../components/GameApp";
import { getInitialCards } from "../../../utils";

jest.mock("../../../components/HighscoreTable", () => () => (
  <div data-testid="HighscoreTable">HighscoreTable</div>
));
jest.mock("../../../utils");

describe("GameApp", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should increase score on match and show a game over message when game is finished", async () => {
    const cards = [
      { id: 1, color: "red" },
      { id: 2, color: "red" },
    ];

    (getInitialCards as jest.Mock).mockReturnValue(cards);

    const { getAllByText, getByText } = render(<GameApp />);

    expect(getByText("Score: 0")).toBeInTheDocument();

    const redCards = getAllByText("red");

    fireEvent.click(redCards[0]);
    fireEvent.click(redCards[1]);

    await waitFor(() => {
      expect(getByText("Your score was: 1")).toBeInTheDocument();
    });

    expect(getByText("GAME OVER")).toBeInTheDocument();
  });

  it("should decrement score if not a match", async () => {
    const cards = [
      { id: 1, color: "red" },
      { id: 2, color: "red" },
      { id: 3, color: "green" },
      { id: 4, color: "blue" },
    ];

    (getInitialCards as jest.Mock).mockReturnValue(cards);

    const { getAllByText, getByText } = render(<GameApp />);

    expect(getByText("Score: 0")).toBeInTheDocument();

    const redCards = getAllByText("red");

    fireEvent.click(redCards[0]);
    fireEvent.click(redCards[1]);

    await waitFor(() => {
      expect(getByText("Score: 1")).toBeInTheDocument();
    });

    fireEvent.click(getByText("green"));
    fireEvent.click(getByText("blue"));

    await waitFor(() => {
      expect(getByText("Score: 0")).toBeInTheDocument();
    });
  });

  it("should restart the game when clicking play again button", async () => {
    const cards = [
      { id: 1, color: "red" },
      { id: 2, color: "red" },
    ];

    (getInitialCards as jest.Mock).mockReturnValue(cards);
    const { getByText, getAllByText, queryByText } = render(<GameApp />);

    const redCards = getAllByText("red");
    fireEvent.click(redCards[0]);
    fireEvent.click(redCards[1]);

    await waitFor(() => {
      expect(getByText("GAME OVER")).toBeInTheDocument();
    });

    const tryAgainButton = getByText("Play again?");
    fireEvent.click(tryAgainButton);

    await waitFor(() => {
      expect(tryAgainButton).not.toBeInTheDocument();
    });

    expect(queryByText("GAME OVER")).not.toBeInTheDocument();
  });
});
