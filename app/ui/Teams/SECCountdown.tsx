"use client";

import {
  formatDate,
  formatTime,
  getDecodedName,
  getTimeUntil,
} from "@/app/lib/scripts";
import { Game } from "@/app/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  game: Game;
}

const Countdown = ({ game }: Props) => {
  const [date, day] = formatDate(game.game_date || "");
  const [longDate, longDay] = formatDate(game.game_date || "", "long");
  const time = formatTime(game.game_time || "");

  const [timeLeft, setTimeleft] = useState(
    getTimeUntil(game.game_date || "", game.game_time || "00:00:00")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeleft(
        getTimeUntil(game.game_date || "", game.game_time || "00:00:00")
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [game.game_date, game.game_time]);

  const homeTeam = getDecodedName(game.home_team);
  const awayTeam = getDecodedName(game.away_team);

  const winningRank =
    game.game_played && (game?.home_score || 0) > (game?.away_score || 0)
      ? game.home_rank
      : game.away_rank;
  const winningTeam =
    game.game_played && (game?.home_score || 0) > (game?.away_score || 0)
      ? game.home_team
      : game.away_team;
  const winningMascot =
    game.game_played && (game?.home_score || 0) > (game?.away_score || 0)
      ? game.home_mascot
      : game.away_mascot;

  if (game.game_played)
    return (
      <div className="w-full max-w-[700px] lg:max-w-[1200px] flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
        <section className="w-full lg:max-w-[900px] h-full p-3 flex flex-col gap-3 justify-center lg:justify-start items-center">
          <div className="w-full px-6 flex flex-row justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <Image
                src={`/teams/${getDecodedName(winningTeam)}.png`}
                width={200}
                height={200}
                alt={`${winningTeam} logo`}
                className="w-16 h-16"
              />
              <div className="flex flex-col justify-center items-center lg:items-start uppercase">
                <p className="hidden lg:block text-2xl">
                  {winningRank} <span className="font-bold">{winningTeam}</span>{" "}
                  {winningMascot}
                </p>
                <p className="lg:hidden text-2xl">
                  {winningRank} <span className="font-bold">{winningTeam}</span>
                </p>
                <p className="lg:hidden text-lg">{winningMascot}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-12 px-6 flex flex-row justify-start items-center bg-neutral-350 dark:bg-neutral-800">
          <p className="block text-2xl text-white uppercase">
            <span className="font-bold">sec</span> champions
          </p>
        </section>
      </div>
    );

  if (game.home_team !== "PLACEHOLDER" && game.away_team !== "PLACEHOLDER")
    return (
      <div className="w-full max-w-[700px] lg:max-w-[1200px] flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
        <section className="w-full lg:max-w-[900px] h-full pt-3 flex flex-col gap-3 justify-center lg:justify-start items-center">
          <div className="w-full px-6 flex flex-row justify-center items-center">
            <div className="flex-[2_2_0%] flex flex-col justify-center items-center">
              <Image
                src={`/teams/${homeTeam}.png`}
                width={200}
                height={200}
                alt={`${game.home_team} logo`}
                className="w-16 h-16"
              />
              <p className="hidden lg:block text-2xl uppercase">
                {game.home_rank}{" "}
                <span className="font-bold">{game.home_team}</span>{" "}
                {game.home_mascot}
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <p className="text-2xl font-bold uppercase">vs</p>
            </div>
            <div className="flex-[2_2_0%] flex flex-col justify-center items-center">
              <Image
                src={`/teams/${awayTeam}.png`}
                width={200}
                height={200}
                alt={`${game.away_team} logo`}
                className="w-16 h-16"
              />
              <p className="hidden lg:block text-2xl uppercase">
                {game.away_rank}{" "}
                <span className="font-bold">{game.away_team}</span>{" "}
                {game.away_mascot}
              </p>
            </div>
          </div>
          <ol className="w-full flex flex-row justify-center items-center border-neutral-350 dark:border-neutral-800 border-t border-b-0 border-l-0 lg:border-l border-r-0 lg:border-r">
            <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
              <p className="text-2xl font-bold">{timeLeft.days}</p>
              <p className="text-lg">days</p>
            </li>
            <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
              <p className="text-2xl font-bold">{timeLeft.hours}</p>
              <p className="text-lg">hour</p>
            </li>
            <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
              <p className="text-2xl font-bold">{timeLeft.minutes}</p>
              <p className="text-lg">minutes</p>
            </li>
            <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase">
              <p className="text-2xl font-bold">{timeLeft.seconds}</p>
              <p className="text-lg">seconds</p>
            </li>
          </ol>
        </section>
        <section className="w-full h-12 px-6 flex flex-row justify-start items-center bg-neutral-350 dark:bg-neutral-800">
          <p className="flex-1 flex lg:hidden flex-row justify-start items-center text-2xl text-white uppercase">
            <span className="font-bold">{time}</span>&nbsp;{day}, {date}
          </p>
          <p className="flex-1 hidden lg:flex flex-row justify-start items-center text-2xl text-white uppercase">
            <span className="font-bold">{time}</span>&nbsp;{longDay}, {longDate}
          </p>
          <p className="flex lg:hidden flex-row justify-start items-center text-2xl text-white uppercase">
            <span className="font-bold">sec</span>cg
          </p>
          <p className="hidden lg:flex flex-row justify-start items-center text-2xl text-white uppercase">
            <span className="font-bold">sec</span>&nbsp;championship game
          </p>
        </section>
      </div>
    );

  return (
    <div className="w-full max-w-[700px] lg:max-w-[1200px] flex flex-col justify-center items-center border border-neutral-350 dark:border-neutral-700 dark:bg-neutral-700">
      <section className="w-full lg:max-w-[900px] h-full pt-3 flex flex-col gap-3 justify-center lg:justify-start items-center">
        <div className="w-full px-6 flex flex-row justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={`/sec/sec.png`}
              width={200}
              height={200}
              alt="sec logo"
              className="w-16 h-16"
            />
            <p className="text-2xl font-bold uppercase">
              sec championship game
            </p>
          </div>
        </div>
        <ol className="w-full flex flex-row justify-center items-center border-neutral-350 dark:border-neutral-800 border-t border-b-0 border-l-0 lg:border-l border-r-0 lg:border-r">
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
            <p className="text-2xl font-bold">{timeLeft.days}</p>
            <p className="text-lg">days</p>
          </li>
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
            <p className="text-2xl font-bold">{timeLeft.hours}</p>
            <p className="text-lg">hour</p>
          </li>
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 dark:border-neutral-800 border-t-0 border-b-0 border-l-0 border-r">
            <p className="text-2xl font-bold">{timeLeft.minutes}</p>
            <p className="text-lg">minutes</p>
          </li>
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase">
            <p className="text-2xl font-bold">{timeLeft.seconds}</p>
            <p className="text-lg">seconds</p>
          </li>
        </ol>
      </section>
      <section className="w-full h-12 px-6 flex flex-row justify-start items-center bg-neutral-350 dark:bg-neutral-800">
        <p className="block lg:hidden text-2xl text-white uppercase">
          <span className="font-bold">{time}</span> {day}, {date}
        </p>
        <p className="hidden lg:block text-2xl text-white uppercase">
          <span className="font-bold">{time}</span> {longDay}, {longDate}
        </p>
      </section>
    </div>
  );
};

export default Countdown;
