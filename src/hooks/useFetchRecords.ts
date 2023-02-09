import { useState } from "react";
import axios from "axios";
import { RecordType } from "../types/types";

const useFetchRecords = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRecords = (updateData: (record: RecordType[]) => void) => {
    setLoading(true);
    axios
      .get<RecordType[]>("http://localhost:3001/api/records")
      .then((response) => {
        updateData(response.data);
        setLoading(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  return { loading, error, fetchRecords };
};

export default useFetchRecords;
