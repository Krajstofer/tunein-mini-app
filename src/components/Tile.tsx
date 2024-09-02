import { Station } from "@/api/stations";
import Image from "next/image";
import Link from "next/link";
import { PlayButton } from "./PlayButton";
import StationMetrics from "./StationMetrics";

type TileProps = {
  station: Station;
};

export const Tile = ({ station }: TileProps) => {
  return (
    <li
      key={station.uuid}
      className="flex shrink-0 flex-col rounded-md bg-neutral-950/50 p-4 sm:flex-row sm:justify-between md:w-56 md:snap-center md:flex-col md:justify-start"
    >
      <div className="flex items-center gap-3 md:flex-col md:items-start">
        <div className="aspect-square w-16 shrink-0 rounded-md md:w-48">
          <Image
            src={station.imgUrl}
            alt={station.name}
            width={128}
            height={128}
            className="aspect-square size-16 rounded-md md:size-48"
          />
        </div>
        <div className="py-2">
          <div>
            <h2 className="mb-1 font-bold">{station.name}</h2>
            <StationMetrics
              popularity={station.popularity}
              reliability={station.reliability}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 sm:mt-2 sm:justify-end">
        <PlayButton station={station} playing="Stop" paused="Play" />
        <Link
          href={`/${station.uuid}`}
          className="mt-2 flex w-full min-w-40 max-w-48 justify-center rounded-md border border-neutral-800 py-1 text-sm font-bold text-white transition-colors hover:bg-neutral-800"
        >
          Details
        </Link>
      </div>
    </li>
  );
};
