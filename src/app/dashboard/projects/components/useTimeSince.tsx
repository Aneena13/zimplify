import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useEffect, useState } from "react";

export function useTimeSince(date: Date) {
  const [timeSince, setTimeSince] = useState("");

  useEffect(() => {
    if (date) {
      setTimeSince(getTimeSince(new Date(date)));
      const timeoutID = setInterval(
        () => setTimeSince(getTimeSince(new Date(date))),
        5000,
      );
      return () => clearInterval(timeoutID);
    }
  }, [date]);
  return timeSince;
}

function getTimeSince(date: Date) {
  return dayjs().to(dayjs(date))
}
