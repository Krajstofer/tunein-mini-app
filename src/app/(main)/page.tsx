import { getAllStations, Station } from "@/api/stations";
import { Tile } from "@/components/Tile";
import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";

export default async function Home() {
  const stations = await getAllStations();

  return (
    <main className="min-h-screen space-y-4 bg-neutral-950">
      <h2 className="text-3xl font-bold">Stations</h2>
      <section className="not-prose relative overflow-hidden">
        <div className="mb-2 flex items-center gap-1">
          <CursorArrowRippleIcon className="inline size-4 text-neutral-400" />
          <p className="text-sm text-neutral-400">
            Scroll through the list of stations.
          </p>
        </div>
        <div className="relative overflow-auto">
          <ul className="relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto rounded-lg bg-neutral-900 p-4">
            {stations.map((station: Station) => (
              <Tile key={station.uuid} station={station} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
