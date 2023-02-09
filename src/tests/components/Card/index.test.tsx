import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Board from "../../../components/Board";

describe("Card", () => {
  it("should flip the card on click", async () => {
    const { getAllByText } = render(
      <Board score={0} setScore={jest.fn()} setGameOngoing={jest.fn()} />
    );
    const someCard = getAllByText("red")[0];

    expect(someCard).toHaveClass("css-7i5kxf");

    fireEvent.click(someCard);

    await waitFor(() => {
      expect(someCard).toHaveClass("css-tj6h5t");
    });
  });
});
