"use client";

import {
  formatDate,
  formatTime,
  getDecodedName,
  getTimeUntil,
} from "@/app/lib/scripts";
import { NextGame, Team } from "@/app/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  game: NextGame;
  team: Team;
}

const Countdown = ({ game, team }: Props) => {
  const nextGame = game.next_game;

  const homeGame: boolean = nextGame?.home_team === team.name;
  const opponent = homeGame ? nextGame?.away_team : nextGame?.home_team;
  const opponentMascot = homeGame
    ? nextGame?.away_mascot
    : nextGame?.home_mascot;
  const opponentRank = homeGame ? nextGame?.away_rank : nextGame?.home_rank;

  const teamIcon = getDecodedName(team.name);
  const opponentIcon = getDecodedName(opponent || "");

  const [date, day] = formatDate(nextGame?.game_date || "");
  const [longDate, longDay] = formatDate(nextGame?.game_date || "", "long");
  const time = formatTime(nextGame?.game_time || "");

  const [timeLeft, setTimeleft] = useState(
    getTimeUntil(nextGame?.game_date || "", nextGame?.game_time || "00:00:00")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeleft(
        getTimeUntil(
          nextGame?.game_date || "",
          nextGame?.game_time || "00:00:00"
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [nextGame?.game_date, nextGame?.game_time]);

  return (
    <div className="w-full max-w-[700px] lg:max-w-[1200px] flex flex-col justify-center items-center border border-neutral-400">
      <section className="w-full lg:max-w-[900px] h-full pt-2 flex flex-col gap-3 justify-center lg:justify-start items-center">
        <div className="w-full px-6 flex flex-row justify-center items-center">
          <div className="flex-[2_2_0%] flex flex-col justify-center items-center">
            <Image
              src={`/teams/${homeGame ? opponentIcon : teamIcon}.png`}
              width={200}
              height={200}
              alt={`${homeGame ? opponent || "" : team.name} logo`}
              className="w-16 h-16"
            />
            <p className="hidden lg:block text-2xl uppercase">
              {homeGame ? opponentRank : team.team_rank}{" "}
              <span className="font-bold">
                {homeGame ? opponent : team.name}
              </span>{" "}
              {homeGame ? opponentMascot : team.mascot}
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <p className="text-2xl font-bold uppercase">
              {nextGame?.neutral_site ? "vs" : homeGame ? "vs" : "at"}
            </p>
          </div>
          <div className="flex-[2_2_0%] flex flex-col justify-center items-center">
            <Image
              src={`/teams/${homeGame ? teamIcon : opponentIcon}.png`}
              width={200}
              height={200}
              alt={`${homeGame ? team.name : opponent || ""} logo`}
              className="w-16 h-16"
            />
            <p className="hidden lg:block text-2xl uppercase">
              {homeGame ? team.team_rank : opponentRank}{" "}
              <span className="font-bold">
                {homeGame ? team.name : opponent}
              </span>{" "}
              {homeGame ? team.mascot : opponentMascot}
            </p>
          </div>
        </div>
        <ol className="w-full flex flex-row justify-center items-center border-neutral-400 border-t border-b-0 border-l-0 lg:border-l border-r-0 lg:border-r">
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-400 border-t-0 border-b-0 border-l-0 border-r">
            <p className="text-2xl font-bold">{timeLeft.days}</p>
            <p className="text-lg">days</p>
          </li>
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-400 border-t-0 border-b-0 border-l-0 border-r">
            <p className="text-2xl font-bold">{timeLeft.hours}</p>
            <p className="text-lg">hour</p>
          </li>
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-400 border-t-0 border-b-0 border-l-0 border-r">
            <p className="text-2xl font-bold">{timeLeft.minutes}</p>
            <p className="text-lg">minutes</p>
          </li>
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase">
            <p className="text-2xl font-bold">{timeLeft.seconds}</p>
            <p className="text-lg">seconds</p>
          </li>
        </ol>
      </section>
      <section className="w-full h-12 px-6 flex flex-row justify-start items-center bg-neutral-400">
        <p className="block lg:hidden text-2xl text-white text-nowrap uppercase">
          <span className="font-bold">{time}</span> {day}, {date}
        </p>
        <p className="hidden lg:block text-2xl text-white text-nowrap uppercase">
          <span className="font-bold">{time}</span> {longDay}, {longDate}
        </p>
      </section>
    </div>
  );
};

export default Countdown;
