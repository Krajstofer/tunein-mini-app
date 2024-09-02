"use client";

import { type Station } from "@/api/stations";
import { useAudioPlayer } from "@/providers/AudioProvider";
import { cn } from "@/utils/cn";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";

type PlayButtonProps = {
  station: Station;
  playing: React.ReactNode;
  paused: React.ReactNode;
  type?: "default" | "icon";
};

export function PlayButton({
  station,
  playing,
  paused,
  type = "default",
}: PlayButtonProps) {
  const { toggle, isPlaying } = useAudioPlayer(station);

  const isIconType = type === "icon";
  const disabled = station.popularity <= 0;

  return (
    <button
      type="button"
      onClick={() => toggle()}
      className={cn(
        isPlaying
          ? "bg-pink-800 text-pink-50 hover:bg-pink-700"
          : disabled
            ? "cursor-not-allowed bg-neutral-800 text-neutral-400"
            : "bg-gold-600 text-gold-50 hover:bg-gold-500",
        isIconType
          ? "size-16 shrink-0 rounded-full p-1"
          : "mt-2 w-full min-w-40 max-w-48 rounded-md py-1 text-sm font-bold transition-colors",
        "transition-colors",
      )}
      disabled={disabled}
    >
      <span className={cn(isIconType ? "sr-only" : "")}>
        {isPlaying ? playing : paused}
      </span>
      {isIconType && (
        <div>
          {isPlaying ? (
            <PauseIcon className="inline size-12" />
          ) : (
            <PlayIcon className="inline size-12" />
          )}
        </div>
      )}
    </button>
  );
}
