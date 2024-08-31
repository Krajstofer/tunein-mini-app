export type Station = {
  id: string;
  uuid: string;
  description: string;
  name: string;
  imgUrl: string;
  streamUrl: string;
  reliability: number;
  popularity: number;
  tags: string[];
};

type StationsResponse = {
  data: Station[];
};

const STATIONS_URL = process.env.NEXT_PUBLIC_API_URL + "/stations.json";

export async function getAllStations() {
  const data: StationsResponse = await fetch(STATIONS_URL).then((res) =>
    res.json(),
  );

  // workaround for missing uuid (we have the same id for two stations)
  return data.data.map((station) => ({
    ...station,
    uuid: station.id + station.name.replace(/\s/g, "").toLowerCase(),
  }));
}
