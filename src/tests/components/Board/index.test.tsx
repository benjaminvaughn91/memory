import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Board from "../../../components/Board";
import { COLORS } from "../../../constants";

describe("Board", () => {
  it("should render the board with 2 cards for each defined color", async () => {
    const { getAllByText, getByText } = render(
      <Board score={0} setScore={jest.fn()} setGameOngoing={jest.fn()} />
    );

    COLORS.forEach((color) => {
      expect(getAllByText(color)).toHaveLength(2);
    });
  });
});
