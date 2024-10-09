import { fetchNextGame, fetchTeam, fetchTeams } from "@/app/lib/data";
import { NextGame, Team, TeamEnum } from "@/app/lib/types";
import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import Schedule from "@/app/ui/Team/Schedule";

const Page = async ({ params }: { params: { team: TeamEnum } }) => {
  const team: Team = await fetchTeam(params.team);
  const game: NextGame = await fetchNextGame(params.team);

  return (
    <>
      <Header team={team} />
      <Schedule game={game} team={team} />
      <Footer />
    </>
  );
};

export default Page;
