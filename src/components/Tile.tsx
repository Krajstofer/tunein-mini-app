import { Station } from "@/api/stations";
import { StarIcon, WifiIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type TileProps = {
  station: Station;
};

export const Tile = ({ station }: TileProps) => {
  return (
    <li
      key={station.uuid}
      className="w-56 shrink-0 snap-center rounded-md bg-gray-950/50 p-4"
    >
      <div className="aspect-square w-48 shrink-0 rounded-md">
        <Image
          src={station.imgUrl}
          alt={station.name}
          width={128}
          height={128}
          className="aspect-square size-48 rounded-md"
        />
      </div>
      <div className="py-2">
        <h2 className="mb-1 font-bold">{station.name}</h2>
        <div className="flex gap-4">
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
        <div className="mt-2">
          <button className="mt-2 w-full rounded-md bg-indigo-800 py-1 text-sm font-bold text-indigo-50 transition-colors hover:bg-indigo-700">
            Play
          </button>
          <Link
            href={`/${station.uuid}`}
            className="mt-2 flex w-full justify-center rounded-md border border-gray-800 py-1 text-sm font-bold text-white transition-colors hover:bg-gray-800"
          >
            Details
          </Link>
        </div>
      </div>
    </li>
  );
};
