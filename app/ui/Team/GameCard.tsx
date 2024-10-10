import { formatDate, formatTime, getDecodedName } from "@/app/lib/scripts";
import { Game, Team } from "@/app/lib/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface Props {
  game: Game;
  team: Team;
}

const GameCard = ({ game, team }: Props) => {
  const homeGame: boolean = game.home_team === team.name;
  const opponent = homeGame ? game.away_team : game.home_team;
  const opponentMascot = homeGame ? game.away_mascot : game.home_mascot;
  const opponentRank = homeGame ? game.away_rank : game.home_rank;

  const teamScore = homeGame ? game.home_score : game.away_score;
  const opponentScore = homeGame ? game.away_score : game.home_score;
  const gameResult: "w" | "l" | null =
    teamScore != null && opponentScore != null
      ? teamScore > opponentScore
        ? "w"
        : "l"
      : null;

  const [date, day] = formatDate(game.game_date);
  const [longDate, longDay] = formatDate(game.game_date, "long");
  const time = formatTime(game.game_time || "");

  return (
    <li className="w-full max-w-[700px] lg:max-w-[1200px] h-full flex flex-col justify-center items-center border border-neutral-350">
      <section className="w-full h-full px-6 py-2 flex flex-col lg:flex-row gap-3 justify-center lg:justify-start items-center">
        {game.conference_game ? (
          <Link
            href={`/teams/${getDecodedName(opponent)}`}
            className="lg:flex-1 flex flex-col lg:flex-row lg:gap-3 justify-center lg:justify-start items-center"
          >
            <Image
              src={`/teams/${getDecodedName(opponent)}.png`}
              width={200}
              height={200}
              alt={`${opponent} logo`}
              className="w-16 h-16"
            />
            <div className="flex flex-col justify-center items-center lg:items-start uppercase">
              <p className="text-2xl">
                {opponentRank} <span className="font-bold">{opponent}</span>
              </p>
              <p className="text-lg">{opponentMascot}</p>
            </div>
          </Link>
        ) : (
          <div className="lg:flex-1 flex flex-col lg:flex-row lg:gap-3 justify-center lg:justify-start items-center cursor-not-allowed">
            <Image
              src={`/teams/${getDecodedName(opponent)}.png`}
              width={200}
              height={200}
              alt={`${opponent} logo`}
              className="w-16 h-16"
            />
            <div className="flex flex-col justify-center items-center lg:items-start uppercase">
              <p className="text-2xl">
                {opponentRank} <span className="font-bold">{opponent}</span>
              </p>
              <p className="text-lg">{opponentMascot}</p>
            </div>
          </div>
        )}
        <div className="lg:flex-1 flex flex-col justify-center items-center lg:items-start uppercase">
          <p className="text-2xl font-bold">
            {game.neutral_site ? "neutral" : homeGame ? "home" : "away"}
          </p>
          <p className="text-lg text-center">{game.stadium}</p>
        </div>
      </section>
      <section className="w-full h-12 px-6 flex flex-row justify-between items-center bg-neutral-350">
        {game.game_played ? (
          <p className="text-2xl text-white uppercase">
            <span
              className={clsx("font-bold", {
                "text-red-600": gameResult === "l",
                "text-green-600": gameResult === "w",
              })}
            >
              {gameResult}
            </span>{" "}
            {teamScore} - {opponentScore}
          </p>
        ) : (
          <>
            <p className="block lg:hidden text-2xl text-white uppercase">
              <span className="font-bold">{time}</span> {day}, {date}
            </p>
            <p className="hidden lg:block text-2xl text-white uppercase">
              <span className="font-bold">{time}</span> {longDay}, {longDate}
            </p>
          </>
        )}
        {game.conference_game ? (
          <Link href="/teams">
            <Image
              src={`/sec/${getDecodedName(team.name)}.png`}
              width={64}
              height={64}
              alt="sec logo"
              className="w-8 h-8"
            />
          </Link>
        ) : null}
      </section>
    </li>
  );
};

export default GameCard;
