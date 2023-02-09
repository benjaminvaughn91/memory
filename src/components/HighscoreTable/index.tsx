import { useEffect, useState } from "react";
import {
  Alert,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { RecordType } from "../../types/types";
import RecordForm from "../RecordForm";
import useFetchRecords from "../../hooks/useFetchRecords";

const TABLE_ROWS = 5;

interface HighscoreTableProps {
  score: number;
}

const HighscoreTable = ({ score }: HighscoreTableProps) => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const { fetchRecords, loading, error } = useFetchRecords();

  useEffect(() => {
    fetchRecords(updateTable);
  }, []);

  const updateTable = (updatedRecords: RecordType[]) => {
    setRecords(
      updatedRecords
        .sort((a, b) => a.score - b.score)
        .reverse()
        .slice(0, TABLE_ROWS)
    );
  };

  if (error)
    return <Alert severity={"error"}>Could not fetch highscore table</Alert>;

  if (loading) return <CircularProgress />;

  if (records.length === 0)
    return (
      <Typography>Be the first player to enter your highscore:</Typography>
    );

  return (
    <>
      <Stack alignItems={"center"}>
        <Typography>----- H I G H - S C O R E -----</Typography>
        <Table>
          <TableBody>
            {records.map((record: RecordType, i: number) => (
              <TableRow key={i}>
                <TableCell>{i + 1}.</TableCell>
                <TableCell>{record.playerName}</TableCell>
                <TableCell align={"right"}>{record.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
      <RecordForm
        score={score}
        addRecord={(record: RecordType) => updateTable([record, ...records])}
      />
    </>
  );
};

export default HighscoreTable;
