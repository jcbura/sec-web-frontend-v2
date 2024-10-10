import { Team } from "@/app/lib/types";

interface Props {
  team: Team;
}

const Record = ({ team }: Props) => {
  const winPercentage =
    (team.total_wins || 0) /
    ((team.total_wins || 0) + (team.total_losses || 0));

  return (
    <div className="w-full max-w-[700px] lg:max-w-[1200px] flex flex-col justify-center items-center border border-neutral-350">
      <ul className="w-full flex flex-col lg:flex-row justify-center items-center">
        <div className="lg:flex-[2_2_0%] w-full flex flex-row">
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 border-t-0 border-b lg:border-b-0 border-l-0 border-r">
            <p className="text-2xl font-bold">
              {team.total_wins} - {team.total_losses}
            </p>
            <p className="text-lg">overall</p>
          </li>
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 border-t-0 border-b lg:border-b-0 border-l-0 border-r-0 lg:border-r">
            <p className="text-2xl font-bold">
              {team.conference_wins} - {team.conference_losses}
            </p>
            <p className="text-lg">conference</p>
          </li>
        </div>
        <div className="lg:flex-[3_3_0%] w-full flex flex-row">
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 border-t-0 border-b-0 border-l-0 border-r">
            <p className="text-2xl font-bold">
              {team.home_wins} - {team.home_losses}
            </p>
            <p className="text-lg">home</p>
          </li>
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase border-neutral-350 border-t-0 border-b-0 border-l-0 border-r">
            <p className="text-2xl font-bold">
              {team.away_wins} - {team.away_losses}
            </p>
            <p className="text-lg">away</p>
          </li>
          <li className="flex-1 py-2 flex flex-col justify-center items-center uppercase">
            <p className="text-2xl font-bold">
              {team.neutral_wins} - {team.neutral_losses}
            </p>
            <p className="text-lg">neutral</p>
          </li>
        </div>
      </ul>
      <div className="w-full h-12 px-6 flex flex-row justify-between items-center bg-neutral-350">
        <p className="text-2xl text-white uppercase">
          <span className="font-bold">{`${
            winPercentage ? winPercentage.toFixed(3) : "0.000"
          }`}</span>{" "}
          win percentage
        </p>
      </div>
    </div>
  );
};

export default Record;
