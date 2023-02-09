import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { RecordType } from "../../types/types";
import useCreateRecord from "../../hooks/useCreateRecords";

interface RecordFormProps {
  score: number;
  addRecord: (record: RecordType) => void;
}

const RecordForm = ({ score, addRecord }: RecordFormProps) => {
  const [showForm, setShowForm] = useState(true);
  const [playerName, setPlayerName] = useState("");

  const { loading, error, createRecord } = useCreateRecord();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newRecord = {
      score,
      playerName,
    };
    createRecord(newRecord);
    addRecord(newRecord);
    setShowForm(false);
  };

  if (error) return <Alert severity={"error"}>Could not post record</Alert>;

  if (!showForm) return <Typography>Added!</Typography>;

  return (
    <Box pb={4}>
      <form onSubmit={handleSubmit}>
        <Typography variant={"caption"}>
          Add your name to the highscore table
        </Typography>
        <Stack direction={"row"} spacing={1}>
          <TextField
            value={playerName}
            onChange={handleNameChange}
            fullWidth
            variant={"outlined"}
          />
          <Button type="submit" variant="outlined" color="primary">
            Enter
          </Button>
          {loading && <CircularProgress />}
        </Stack>
      </form>
    </Box>
  );
};

export default RecordForm;
