import { NextGame, Team } from "@/app/lib/types";
import GameList from "./GameList";
import Record from "./Record";
import Countdown from "./Countdown";

interface Props {
  game: NextGame;
  team: Team;
}

const Schedule = ({ game, team }: Props) => {
  return (
    <main className="w-full h-full px-6 flex flex-col justify-center items-center">
      <div className="w-full h-full py-6 flex flex-col gap-12 justify-center items-center">
        <section className="w-full h-full flex flex-row justify-center items-center">
          <Countdown game={game} team={team} />
        </section>
        <section className="w-full h-full flex flex-row justify-center items-cente">
          <Record team={team} />
        </section>
        <section className="w-full h-full flex flex-row justify-center items-center">
          <GameList team={team} />
        </section>
      </div>
    </main>
  );
};

export default Schedule;
