import clsx from "clsx";
import { fetchTeams } from "../lib/data";
import { Team } from "../lib/types";
import { getDecodedName } from "../lib/scripts";
import Image from "next/image";
import Link from "next/link";

interface Props {
  team?: Team;
}

const Header = async ({ team }: Props) => {
  const teams: Team[] = await fetchTeams();

  return (
    <header className="sticky top-0 w-full h-[120px] flex flex-col justify-center items-center">
      <div
        className={clsx(
          "w-full h-[65px] px-6 flex flex-row justify-center items-center",
          {
            "bg-sec-primary": !team,
            "bg-alabama": team?.name === "Alabama",
            "bg-arkansas": team?.name === "Arkansas",
            "bg-auburn-primary": team?.name === "Auburn",
            "bg-florida-primary": team?.name === "Florida",
            "bg-georgia": team?.name === "Georgia",
            "bg-kentucky": team?.name === "Kentucky",
            "bg-lsu-primary": team?.name === "LSU",
            "bg-mississippi-state": team?.name === "Mississippi State",
            "bg-missouri": team?.name === "Missouri",
            "bg-oklahoma": team?.name === "Oklahoma",
            "bg-ole-miss-primary": team?.name === "Ole Miss",
            "bg-south-carolina": team?.name === "South Carolina",
            "bg-tennessee-primary": team?.name === "Tennessee",
            "bg-texas": team?.name === "Texas",
            "bg-texas-a&m": team?.name === "Texas A&M",
            "bg-vanderbilt": team?.name === "Vanderbilt",
          }
        )}
      >
        <div className="w-full flex flex-row justify-start items-center">
          {team ? (
            <h1 className="flex-1 text-3xl text-white text-nowrap uppercase">
              {team.team_rank} <span className="font-bold">{team.name}</span>{" "}
              {team.mascot}
            </h1>
          ) : (
            <h1 className="flex-1 text-3xl text-white text-nowrap uppercase">
              <span className="font-bold">southeastern</span> conference
            </h1>
          )}
          {team ? (
            <Image
              src={`/sec/${getDecodedName(team.name)}.png`}
              width={64}
              height={64}
              alt="sec logo"
              className="hidden sm:block w-10 h-10"
            />
          ) : (
            <Image
              src="/sec/sec.png"
              width={64}
              height={64}
              alt="sec logo"
              className="hidden sm:block w-10 h-10"
            />
          )}
        </div>
      </div>
      <div className="w-full h-[55px] px-6 flex flex-row justify-center items-center bg-neutral-400">
        <nav className="w-full py-3 flex flex-row justify-center items-center">
          <ul className="overflow-x-auto no-scrollbar w-full flex flex-row gap-3 justify-start items-center text-white">
            <li className="px-2 py-1">
              <Link
                href="/teams"
                className="text-lg hover:text-blue-500 transition-colors duration-150 text-nowrap uppercase"
              >
                <span className="font-bold">southeastern</span> conference
              </Link>
            </li>
            {teams.map((team) => (
              <li key={team.id} className="px-2 py-1">
                <Link
                  href={`/teams/${getDecodedName(team.name)}`}
                  className="text-lg hover:text-blue-500 transition-colors duration-150 text-nowrap uppercase"
                >
                  {team.team_rank}{" "}
                  <span className="font-bold">{team.name}</span> {team.mascot}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
