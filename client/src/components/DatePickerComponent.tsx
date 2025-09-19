"use client";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";

export default function DatePickerComponent() {
  const [start, setStart] = useState<Dayjs | null>(dayjs());
  const [end, setEnd] = useState<Dayjs | null>(dayjs());
  return (
    <>
      <DatePicker label="Start" value={start} onChange={setStart} />
      <DatePicker
        label="End"
        value={end}
        onChange={(v) => v && !start?.isAfter(v) && setEnd(v)}
      />
    </>
  );
}
