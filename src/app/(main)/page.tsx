import { getAllStations, Station } from "@/api/stations";
import Image from "next/image";

export default async function Home() {
  const stations = await getAllStations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {stations.map((station: Station) => (
          <div key={station.uuid} className="flex items-center space-x-4">
            <Image
              src={station.imgUrl}
              alt={station.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold">{station.name}</h2>
              <p className="text-sm text-gray-500">{station.description}</p>
              <span>{station.id}</span>
              <span>{station.uuid}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
