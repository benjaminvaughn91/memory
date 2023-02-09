import { useState } from "react";
import axios from "axios";
import { RecordType } from "../types/types";

const useCreateRecord = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const createRecord = (newRecord: RecordType) => {
    setLoading(true);
    axios
      .post<RecordType>("http://localhost:3001/api/records", newRecord)
      .then(() => {
        setLoading(false);
      })
      .catch(() => setError(true));
  };

  return { loading, error, createRecord };
};

export default useCreateRecord;
