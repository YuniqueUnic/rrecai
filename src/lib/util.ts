import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const parseTimestamp = (timestamp: string) => new Date(timestamp).getTime();

function formatTimestamp(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // 创建一个日期格式化对象
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // 格式化日期和时间
  const formattedDate = formatter.format(date);
  // const timeParts = formatter.formatToParts(date);
  // const amPmPart = timeParts.find((part) => part.type === "dayPeriod");

  return `${formattedDate}`;
}

export { parseTimestamp, formatTimestamp, cn };
