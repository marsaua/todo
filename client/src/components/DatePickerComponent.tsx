"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useMemo, useState, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const formatDate = (d: Dayjs) => d.format("YYYY-MM-DD");

export default function DatePickerComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const today = useMemo(() => dayjs(), []);
  const [start, setStart] = useState<Dayjs>(
    startDate ? dayjs(startDate) : today
  );
  const [end, setEnd] = useState<Dayjs>(endDate ? dayjs(endDate) : today);

  const replaceParams = useCallback(
    (startDate: Dayjs, endDate: Dayjs) => {
      const currStart = searchParams.get("startDate");
      const currEnd = searchParams.get("endDate");
      const nextStart = formatDate(startDate);
      const nextEnd = formatDate(endDate);

      if (currStart === nextStart && currEnd === nextEnd) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set("startDate", nextStart);
      params.set("endDate", nextEnd);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    const startToStr = startDate;
    const endToStr = endDate;

    const start =
      startToStr && dayjs(startToStr).isValid() ? dayjs(startToStr) : today;
    const end = endToStr && dayjs(endToStr).isValid() ? dayjs(endToStr) : today;

    if (!start.isSame(start, "day")) setStart(start);
    if (!end.isSame(end, "day")) setEnd(end);

    if (!startToStr || !endToStr) replaceParams(start, end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onStartChange = (v: Dayjs | null) => {
    if (!v) return;
    if (end && v.isAfter(end, "day")) return;
    setStart(v);
    replaceParams(v, end ?? v);
  };

  const onEndChange = (v: Dayjs | null) => {
    if (!v) return;
    if (start && v.isBefore(start, "day")) return;
    setEnd(v);
    replaceParams(start ?? v, v);
  };

  return (
    <>
      <DatePicker label="Start" value={start} onChange={onStartChange} />
      <DatePicker label="End" value={end} onChange={onEndChange} />
    </>
  );
}
