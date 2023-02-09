import styled from "@emotion/styled";

const backgroundImage = require("../../images/card_back.png");

const PADDING = "10px";
const WIDTH = "70px";
const HEIGHT = "100px";

interface StyledCardProps {
  cardColor?: string;
  revealed: boolean;
}

export const StyledCard = styled.div<StyledCardProps>`
  padding: ${PADDING};
  width: ${WIDTH};
  height: ${HEIGHT};
  border-width: 2px;
  border-style: solid;
  border-color: black;
  background-size: cover;

  &:hover {
    border-color: gray;
  }

  ${({ cardColor, revealed }) => {
    return `
    background-color: ${revealed ? cardColor : "white"};
    background-image: url(${revealed ? "" : backgroundImage});
    color: ${cardColor}
  `;
  }};
`;

export const StyledEmptySpace = styled.div`
  padding: ${PADDING};
  width: ${WIDTH};
  height: ${HEIGHT};
  border: 2px solid white;
`;
