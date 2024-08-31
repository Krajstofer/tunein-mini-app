import { getAllStations, Station } from "@/api/stations";
import { Tile } from "./components/tile";

export default async function Home() {
  const stations = await getAllStations();

  return (
    <main className="min-h-screen p-12 lg:p-24">
      <ul className="flex flex-wrap gap-4">
        {stations.map((station: Station) => (
          <Tile key={station.uuid} station={station} />
        ))}
      </ul>
    </main>
  );
}
