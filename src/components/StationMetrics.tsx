import { StarIcon, WifiIcon } from "@heroicons/react/24/solid";

type StationMetricsProps = {
  popularity?: number;
  reliability: number;
};

export default function StationMetrics({
  popularity,
  reliability,
}: StationMetricsProps) {
  return (
    <div className="flex gap-2.5 text-neutral-400">
      {popularity != undefined && (
        <div className="flex items-center gap-1">
          <StarIcon className="inline size-4" />
          <span className="mt-0.5 text-sm">{popularity}</span>
        </div>
      )}
      {reliability <= 0 ? (
        <p className="mt-0.5 text-red-400">Not available</p>
      ) : (
        <div className="flex items-center gap-1">
          <WifiIcon className="inline size-4" />
          <span className="mt-0.5 text-sm">{reliability}</span>
        </div>
      )}
    </div>
  );
}
