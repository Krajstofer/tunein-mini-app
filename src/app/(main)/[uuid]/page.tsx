import { getAllStations, Station } from "@/api/stations";
import { PlayButton } from "@/components/PlayButton";
import StationMetrics from "@/components/StationMetrics";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

export const revalidate = 60;

type StationPageProps = {
  params: { uuid: string };
};

const getStation = cache(async (uuid: string) => {
  const allStations = await getAllStations();
  const station = allStations.find(
    (station: Station) => station.uuid.toString() === uuid,
  );

  if (!station) {
    notFound();
  }

  return station;
});

export default async function StationPage({ params }: StationPageProps) {
  const station = await getStation(params.uuid);

  return (
    <article>
      <Link
        href="/"
        className="text-gold-500 hover:text-gold-400 mb-12 flex items-center gap-1.5 text-lg font-bold transition-colors"
      >
        <ArrowUturnLeftIcon className="-mt-1 inline size-4" />
        Back
      </Link>
      <div className="mb-4 flex flex-wrap gap-4 border-b border-dashed border-neutral-600 pb-6 sm:flex-nowrap">
        <Image
          src={station.imgUrl}
          alt={station.name}
          width={128}
          height={128}
          className="shrink-0 rounded-lg"
        />
        <div>
          <StationMetrics
            popularity={station.popularity}
            reliability={station.reliability}
          />
          <h1 className="text-4xl font-bold">{station.name}</h1>
          <PlayButton station={station} playing="Stop" paused="Play" />
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Description</h2>
          <p className="max-w-md text-lg">{station.description}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Tags</h2>
          {station.tags.length > 0 && (
            <div className="mt-2 flex gap-2">
              {station.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-neutral-900 px-2 py-1 text-sm capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
