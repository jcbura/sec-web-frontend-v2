import { unstable_noStore as noStore } from "next/cache";
import { Game, NextGame, OOCRecord, SortEnum, Team, TeamEnum } from "./types";
import { getDecodedName } from "./scripts";

const API_BASE = process.env.API_BASE;

export const fetchTeams = async (sort?: SortEnum) => {
  noStore();

  try {
    const res = await fetch(
      `${API_BASE}/api/teams${sort ? `?sort=${sort}` : ""}`
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
  noStore();

  try {
    const res = await fetch(`${API_BASE}/api/teams/${team}`);
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
  noStore();

  try {
    const res = await fetch(`${API_BASE}/api/games/${team}`);
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

export const fetchOOCRecord = async () => {
  noStore();

  try {
    const res = await fetch(`${API_BASE}/api/games/ooc`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const repo: OOCRecord = await res.json();
    return repo;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch out of conference record.");
  }
};

export const fetchSECCGame = async () => {
  noStore();

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
