import { Game, NextGame, OOCRecord } from "@/app/lib/types";
import { TeamProvider } from "./TeamsContext";
import SECCountdown from "./SECCountdown";
import Sortbar from "./Sortbar";
import TeamsList from "./TeamsList";

interface Props {
  game: Game;
  alpha: NextGame[];
  rank: NextGame[];
  record: NextGame[];
  oocRecord: OOCRecord;
}

const TeamsComponent = ({ game, alpha, rank, record, oocRecord }: Props) => {
  return (
    <main className="w-full h-full px-6 flex flex-col justify-center items-center">
      <div className="w-full h-full py-6 flex flex-col gap-12 justify-center items-center">
        <section className="w-full h-full flex flex-row justify-center items-center">
          <SECCountdown game={game} />
        </section>
        <TeamProvider defaultTeams={alpha}>
          <section className="w-full h-full flex flex-row justify-center items-cente">
            <Sortbar
              alpha={alpha}
              rank={rank}
              record={record}
              oocRecord={oocRecord}
            />
          </section>
          <section className="w-full h-full flex flex-row justify-center items-center">
            <TeamsList />
          </section>
        </TeamProvider>
      </div>
    </main>
  );
};

export default TeamsComponent;
