"use client";

import TeamCard from "./TeamCard";
import { useTeam } from "./TeamsContext";

const TeamsList = () => {
  const { teams } = useTeam();

  return (
    <ol className="list-none w-full h-full flex flex-col gap-6 justify-center items-center">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </ol>
  );
};

export default TeamsList;
