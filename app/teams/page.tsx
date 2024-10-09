import { fetchSECCGame, fetchTeams, getNextGameArray } from "../lib/data";
import { Game, NextGame, Team } from "../lib/types";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import TeamsComponent from "../ui/Teams/TeamsComponent";

const Page = async () => {
  const game: Game = await fetchSECCGame();

  const alphaTeams: Team[] = await fetchTeams("alpha");
  const alpha: NextGame[] = await getNextGameArray(alphaTeams);

  const rankTeams: Team[] = await fetchTeams("rank");
  const rank: NextGame[] = await getNextGameArray(rankTeams);

  const recordTeams: Team[] = await fetchTeams("record");
  const record: NextGame[] = await getNextGameArray(recordTeams);

  return (
    <>
      <Header />
      <TeamsComponent game={game} alpha={alpha} rank={rank} record={record} />
      <Footer />
    </>
  );
};

export default Page;
