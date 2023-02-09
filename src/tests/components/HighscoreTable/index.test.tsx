import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  queryByText,
} from "@testing-library/react";
import HighscoreTable from "../../../components/HighscoreTable";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let table = [
  { score: 8, playerName: "name1" },
  { score: 7, playerName: "name2" },
  { score: 6, playerName: "name3" },
  { score: 5, playerName: "name4" },
  { score: 5, playerName: "name5" },
  { score: 2, playerName: "name6" },
];

describe("HighscoreTable", () => {
  it("should render the list of names and points", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: table });

    const { getByText, queryByText } = render(<HighscoreTable score={0} />);

    await waitFor(() => {
      expect(getByText("----- H I G H - S C O R E -----")).toBeInTheDocument();
    });

    expect(getByText("name1")).toBeInTheDocument();
    expect(getByText("name2")).toBeInTheDocument();
    expect(getByText("name3")).toBeInTheDocument();
    expect(getByText("name4")).toBeInTheDocument();
    expect(getByText("name5")).toBeInTheDocument();
    expect(queryByText("name6")).not.toBeInTheDocument();
  });

  it("should show a different message if highscore table is empty", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    const { getByText, queryByText } = render(<HighscoreTable score={0} />);

    await waitFor(() => {
      expect(
        getByText("Be the first player to enter your highscore:")
      ).toBeInTheDocument();
    });
  });

  it("should add a record to highscore list when entering name", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: table });
    mockedAxios.post.mockResolvedValueOnce({});

    const { getByText, getByRole, queryByText } = render(
      <HighscoreTable score={8} />
    );

    await waitFor(() => {
      expect(
        getByText("Add your name to the highscore table")
      ).toBeInTheDocument();
    });

    const input = getByRole("textbox");
    const enterButton = getByRole("button");

    expect(queryByText("new name")).not.toBeInTheDocument();
    expect(queryByText("Added!")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "new name" } });
    fireEvent.click(enterButton);

    expect(getByText("new name")).toBeInTheDocument();
    expect(getByText("Added!")).toBeInTheDocument();
  });
});
