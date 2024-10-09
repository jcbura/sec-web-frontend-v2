import { NextGame } from "./types";

export const countRankedTeams = (teams: NextGame[]) => {
  return teams.filter((team) => team.team_rank !== null).length;
};

export const getCombinedRecord = (games: NextGame[]) => {
  return games.reduce(
    (acc, game) => {
      acc.totalWins += game.total_wins || 0;
      acc.totalLosses += game.total_losses || 0;
      return acc;
    },
    { totalWins: 0, totalLosses: 0 }
  );
};

export const getDecodedName = (team: string) => {
  return team.replace(/\s+/g, "_").toLowerCase();
};

export const getTimeUntil = (date: string, time: string) => {
  const currentDate = new Date();
  const targetDateTime = new Date(`${date}T${time}`);

  const differenceInMillis = targetDateTime.getTime() - currentDate.getTime();

  if (differenceInMillis <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;

  const days = Math.floor(differenceInMillis / millisecondsPerDay);
  const hours = Math.floor(
    (differenceInMillis % millisecondsPerDay) / millisecondsPerHour
  );
  const minutes = Math.floor(
    (differenceInMillis % millisecondsPerHour) / millisecondsPerMinute
  );
  const seconds = Math.floor(
    (differenceInMillis % millisecondsPerMinute) / millisecondsPerSecond
  );

  return { days, hours, minutes, seconds };
};

export const formatDate = (
  sqlDate: string,
  length: "short" | "long" = "short"
) => {
  const dateParts = sqlDate.split("-").map(Number);
  const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));

  const optionsDate: Intl.DateTimeFormatOptions = {
    month: length,
    day: "numeric",
    timeZone: "UTC",
  };

  const optionsDay: Intl.DateTimeFormatOptions = {
    weekday: length,
    timeZone: "UTC",
  };

  const formattedDate = date.toLocaleDateString("en-US", optionsDate);
  const formattedDay = date.toLocaleDateString("en-US", optionsDay);

  return [formattedDate, formattedDay];
};

export const formatTime = (sqlTime: string) => {
  if (sqlTime === "") return "TBD";

  const [hours, minutes, seconds] = sqlTime.split(":");
  const date = new Date();
  date.setHours(
    parseInt(hours, 10),
    parseInt(minutes, 10),
    parseInt(seconds, 10)
  );
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: undefined,
    hour12: true,
  };
  return date.toLocaleTimeString("en-US", options);
};

export const isMobile = (userAgent: string): boolean => {
  return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
};
