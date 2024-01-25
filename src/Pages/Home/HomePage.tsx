import { Layout } from "../../components";
import { useTopAiringAnime } from "../../hooks/api/useTopAiringAnime";
import { List } from "../../components/list/list";
import { useRecentAnime } from "../../hooks/api/useRecentAnime";

export const HomePage = () => {
  const topAiringAnime = useTopAiringAnime();
  const recentAnime = useRecentAnime();

  return (
    <Layout>
      {topAiringAnime.isFetched && topAiringAnime.data && <List title={'Tendances'} data={topAiringAnime.data.results} />}
      {recentAnime.isFetched && recentAnime.data && <List title={'Recent'} data={recentAnime.data.results} />}
    </Layout>
  )
}