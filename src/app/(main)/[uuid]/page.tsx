import { getAllStations, Station } from "@/api/stations";
import {
  ArrowUturnLeftIcon,
  StarIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

export const revalidate = 60;

type StationPageProps = {
  params: { uuid: string };
};

const getStation = cache(async (uuid: string) => {
  let allStations = await getAllStations();
  let station = allStations.find(
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
        className="mb-12 flex items-center gap-1.5 text-lg font-bold text-indigo-500 transition-colors hover:text-indigo-400"
      >
        <ArrowUturnLeftIcon className="-mt-1 inline size-4" />
        Back
      </Link>
      <div className="mb-4 flex gap-4 border-b border-dashed border-neutral-600 pb-6">
        <Image
          src={station.imgUrl}
          alt={station.name}
          width={128}
          height={128}
          className="shrink-0 rounded-lg"
        />
        <div>
          <div className="flex gap-3 text-neutral-400">
            {station.popularity != undefined && (
              <div className="flex items-center gap-1">
                <StarIcon className="inline size-4" />
                <span className="mt-0.5 text-sm">{station.popularity}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <WifiIcon className="inline size-4" />
              <span className="mt-0.5 text-sm">{station.reliability}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold">{station.name}</h1>
          <button className="mt-2 w-full max-w-48 rounded-md bg-indigo-800 py-1 text-sm font-bold text-indigo-50 transition-colors hover:bg-indigo-700">
            Play
          </button>
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
