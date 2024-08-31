import { Station } from "@/api/stations";
import Image from "next/image";

type TileProps = {
  station: Station;
};

export const Tile = ({ station }: TileProps) => {
  return (
    <li
      key={station.uuid}
      className="flex cursor-pointer flex-col gap-2 rounded-lg p-3 hover:bg-gray-100 hover:shadow-md"
    >
      <div className="aspect-square w-48 shrink-0 rounded-md bg-gray-300">
        <Image
          src={station.imgUrl}
          alt={station.name}
          width={128}
          height={128}
          className="aspect-square size-48 rounded-md"
        />
      </div>
      <div className="py-2">
        <h2 className="font-bold">{station.name}</h2>
        <div className="flex flex-col">
          {station.popularity != undefined && (
            <span className="text-sm">Popularity: {station.popularity}</span>
          )}
          <span className="text-sm">Reliability: {station.reliability}</span>
        </div>
      </div>
    </li>
  );
};
