import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import RecordForm from "../../../components/RecordForm";

describe("RecordForm", () => {
  it("should render textfield and button", () => {
    const { getByText, getByRole } = render(
      <RecordForm score={0} addRecord={jest.fn()} />
    );

    expect(
      getByText("Add your name to the highscore table")
    ).toBeInTheDocument();
    expect(getByRole("button")).toHaveTextContent("Enter");
    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
