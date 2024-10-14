import { Game, NextGame, SortEnum, Team, TeamEnum } from "./types";
import { getDecodedName } from "./scripts";

const API_BASE = process.env.API_BASE;

const getRevalidationPeriod = () => {
  const day = new Date().getDay();
  if (day === 6) {
    // Sat: game results being added throughout the whole day
    return 0; // essentially the same as noStore()
  } else if (day === 0) {
    // Sun: team's ranks are updated when AP poll comes out
    return 3600; // every hour
  } else {
    // Mon - Fri : game times occasionaly get updated from TBD
    return 43200; // every 12 hours
  }
};

export const fetchTeams = async (sort?: SortEnum) => {
  const revalPeriod = getRevalidationPeriod();

  try {
    const res = await fetch(
      `${API_BASE}/api/teams${sort ? `?sort=${sort}` : ""}`,
      { next: { revalidate: revalPeriod } }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: Team[] = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch teams.");
  }
};

export const fetchTeam = async (team: TeamEnum) => {
  const revalPeriod = getRevalidationPeriod();

  try {
    const res = await fetch(`${API_BASE}/api/teams/${team}`, {
      next: { revalidate: revalPeriod },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: Team = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch team.");
  }
};

export const fetchNextGame = async (team: TeamEnum) => {
  const revalPeriod = getRevalidationPeriod();

  try {
    const res = await fetch(`${API_BASE}/api/games/${team}`, {
      next: { revalidate: revalPeriod },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: NextGame = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch game.");
  }
};

export const fetchSECCGame = async () => {
  // Update to include revalidation closer to when teams are selected to play for SECCG

  try {
    const res = await fetch(`${API_BASE}/api/games/sec`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: Game = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch game.");
  }
};

export const getNextGameArray = async (teams: Team[]) => {
  const nextGames: NextGame[] = await Promise.all(
    teams.map(async (team) => {
      const nextGame = await fetchNextGame(
        getDecodedName(team.name) as TeamEnum
      );
      return nextGame;
    })
  );
  return nextGames;
};
