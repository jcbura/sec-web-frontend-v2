import { formatDate, formatTime, getDecodedName } from "@/app/lib/scripts";
import { NextGame } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  team: NextGame;
}

const TeamCard = ({ team }: Props) => {
  const game = team.next_game;

  const [date, day] = formatDate(game?.game_date || "");
  const [longDate, longDay] = formatDate(game?.game_date || "", "long");
  const time = formatTime(game?.game_time || "");

  return (
    <li className="w-full max-w-[700px] lg:max-w-[1200px] h-full flex flex-col justify-center items-center border border-neutral-350">
      <section className="w-full h-full px-6 py-2 flex flex-col lg:flex-row gap-3 justify-center lg:justify-start items-center">
        <Link
          href={`/teams/${getDecodedName(team.name)}`}
          className="lg:flex-1 flex flex-col lg:flex-row lg:gap-3 justify-center lg:justify-start items-center"
        >
          <Image
            src={`/teams/${getDecodedName(team.name)}.png`}
            width={200}
            height={200}
            alt={`${team.name} logo`}
            className="w-16 h-16"
          />
          <div className="flex flex-col justify-center items-center lg:items-start uppercase">
            <p className="hidden lg:block text-2xl">
              {team.team_rank} <span className="font-bold">{team.name}</span>{" "}
              {team.mascot}
            </p>
            <p className="lg:hidden text-2xl">
              {team.team_rank} <span className="font-bold">{team.name}</span>
            </p>
            <p className="lg:hidden text-lg">{team.mascot}</p>
          </div>
        </Link>
        <div className="lg:flex-1 flex flex-col justify-center items-center lg:items-start uppercase">
          <p className="text-2xl font-bold">
            {team.total_wins} - {team.total_losses}
          </p>
        </div>
      </section>
      <section className="w-full h-12 px-6 flex flex-row justify-between items-center bg-neutral-350">
        <p className="block lg:hidden text-2xl text-white uppercase">
          <span className="font-bold">{time}</span> {day}, {date}
        </p>
        <p className="hidden lg:block text-2xl text-white uppercase">
          <span className="font-bold">{time}</span> {longDay}, {longDate}
        </p>
        <Link href="/teams">
          <Image
            src={`/sec/${getDecodedName(team.name)}.png`}
            width={64}
            height={64}
            alt="sec logo"
            className="w-8 h-8"
          />
        </Link>
      </section>
    </li>
  );
};

export default TeamCard;
