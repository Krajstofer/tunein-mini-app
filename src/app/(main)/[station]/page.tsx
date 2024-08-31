import { getAllStations, Station } from "@/api/stations";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

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

export default async function StationPage({
  params,
}: {
  params: { station: string };
}) {
  let station = await getStation(params.station);

  return (
    <main>
      <div>
        <Image
          src={station.imgUrl}
          alt={station.name}
          width={128}
          height={128}
          className="shrink-0 rounded-lg"
        />
        <h1 className="text-3xl font-bold">{station.name}</h1>
        <p>{station.description}</p>
      </div>
    </main>
  );
}
