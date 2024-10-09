import { Game, Team } from "@/app/lib/types";
import GameCard from "./GameCard";

interface Props {
  team: Team;
}

const GameList = ({ team }: Props) => {
  const games: Game[] = team.games || [];

  return (
    <ol className="list-none w-full h-full flex flex-col gap-6 justify-center items-center">
      {games.map((game) => (
        <GameCard key={game.id} game={game} team={team} />
      ))}
    </ol>
  );
};

export default GameList;
