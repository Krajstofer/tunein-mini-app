"use client";

import { useAudioPlayer } from "@/providers/AudioProvider";
import Link from "next/link";
import { PlayButton } from "./PlayButton";

export default function AudioPlayer() {
  const { station } = useAudioPlayer();

  // TODO: Implement the transition
  if (!station) {
    return null;
  }

  return (
    <div className="flex h-24 items-center rounded-xl bg-neutral-800 px-8 py-4">
      <PlayButton station={station} playing="Pause" paused="Play" type="icon" />
      <div className="ml-4 max-w-sm self-start">
        <Link
          href={`/${station.uuid}`}
          className="hover:text-gold-500 line-clamp-1 font-bold transition-colors"
        >
          {station.name}
        </Link>
        <p className="line-clamp-2 text-[12px] text-neutral-500">
          {station.description}
        </p>
      </div>
    </div>
  );
}
