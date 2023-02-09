import { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Board from "../Board";
import HighscoreTable from "../HighscoreTable";

const logo = require("../../images/logo.png");

const GameApp = () => {
  const [score, setScore] = useState(0);
  const [gameOngoing, setGameOngoing] = useState(true);

  const handleNewGame = () => {
    setScore(0);
    setGameOngoing(true);
  };

  const renderGame = () => (
    <>
      <Box>
        <Typography fontSize={"large"}>Score: {score}</Typography>
      </Box>
      <Board
        score={score}
        setScore={setScore}
        setGameOngoing={setGameOngoing}
      />
    </>
  );

  const renderGameEnd = () => (
    <>
      <Typography variant={"h4"}>GAME OVER</Typography>
      <Typography fontSize={"medium"}>Your score was: {score}</Typography>
      <HighscoreTable score={score} />
      <Button variant="contained" onClick={handleNewGame}>
        Play again?
      </Button>
    </>
  );

  return (
    <Container>
      <Box margin={8} maxWidth="410px">
        <Box
          pl={"130px"}
          component="img"
          sx={{ width: 150 }}
          alt="Title image"
          src={logo}
        />
        <Stack pt={2} spacing={2} justifyContent="center" alignItems={"center"}>
          {gameOngoing ? renderGame() : renderGameEnd()}
        </Stack>
      </Box>
    </Container>
  );
};

export default GameApp;
