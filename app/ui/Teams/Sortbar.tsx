"use client";

import { NextGame, OOCRecord } from "@/app/lib/types";
import { useTeam } from "./TeamsContext";
import clsx from "clsx";
import { countRankedTeams, getCombinedRecord } from "@/app/lib/scripts";

interface Props {
  alpha: NextGame[];
  rank: NextGame[];
  record: NextGame[];
  oocRecord: OOCRecord;
}

const Sortbar = ({ alpha, rank, record, oocRecord }: Props) => {
  const { teams, setTeams } = useTeam();

  const rankedTeams = countRankedTeams(alpha);

  return (
    <div className="w-full max-w-[700px] lg:max-w-[1200px] flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
      <ul className="w-full flex flex-row justify-center items-center">
        <li className="h-[76px] flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
          <button
            onClick={() => setTeams(alpha)}
            className={clsx(
              "hidden lg:block text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 font-bold uppercase",
              {
                "text-blue-600 dark:text-blue-400":
                  teams === alpha || (teams !== rank && teams !== record),
              }
            )}
          >
            alphabetical
          </button>
          <button
            onClick={() => setTeams(alpha)}
            className={clsx(
              "lg:hidden text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 font-bold uppercase",
              {
                "text-blue-600 dark:text-blue-400":
                  teams === alpha || (teams !== rank && teams !== record),
              }
            )}
          >
            alpha.
          </button>
        </li>
        <li className="h-[76px] flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
          <button
            onClick={() => setTeams(rank)}
            className={clsx(
              "text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 font-bold uppercase",
              {
                "text-blue-600 dark:text-blue-400": teams === rank,
              }
            )}
          >
            rank
          </button>
        </li>
        <li className="h-[76px] flex-1 py-2 flex flex-col justify-center items-center uppercase">
          <button
            onClick={() => setTeams(record)}
            className={clsx(
              "text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 font-bold uppercase",
              {
                "text-blue-600 dark:text-blue-400": teams === record,
              }
            )}
          >
            record
          </button>
        </li>
      </ul>
      <div className="w-full h-12 px-6 flex flex-row justify-start items-center bg-neutral-350 dark:bg-neutral-800">
        {teams === alpha || (teams !== rank && teams !== record) ? (
          <p className="text-2xl text-white uppercase">
            <span className="font-bold">16</span> sec teams
          </p>
        ) : null}
        {teams === rank ? (
          <p className="text-2xl text-white uppercase">
            <span className="font-bold">{rankedTeams}</span> cfp top 25 teams
          </p>
        ) : null}
        {teams === record ? (
          <>
            <p className="hidden lg:flex text-2xl text-white uppercase">
              <span className="font-bold">
                {oocRecord?.ooc_wins} - {oocRecord?.ooc_losses}
              </span>
              &nbsp;out of conference record
            </p>
            <p className="lg:hidden text-2xl text-white uppercase">
              <span className="font-bold">
                {oocRecord?.ooc_wins} - {oocRecord?.ooc_losses}
              </span>{" "}
              ooc record
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Sortbar;
