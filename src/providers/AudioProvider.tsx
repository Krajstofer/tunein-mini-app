"use client";

import { createContext, useContext, useMemo, useReducer, useRef } from "react";

import { type Station } from "@/api/stations";

type PlayerState = {
  isPlaying: boolean;
  station: Station | null;
};

type PlayerActions = {
  play: (station?: Station) => void;
  pause: () => void;
  toggle: (station?: Station) => void;
  checkIsPlaying: (station?: Station) => boolean;
};

export type PlayerAPI = PlayerState & PlayerActions;

const enum ActionType {
  SET_STATION = "SET_STATION",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
}

type Action =
  | { type: ActionType.SET_STATION; payload: Station }
  | { type: ActionType.PLAY }
  | { type: ActionType.PAUSE };

const AudioPlayerContext = createContext<PlayerAPI | null>(null);

function audioReducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case ActionType.SET_STATION:
      return { ...state, station: action.payload };
    case ActionType.PLAY:
      return { ...state, isPlaying: true };
    case ActionType.PAUSE:
      return { ...state, isPlaying: false };
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, {
    isPlaying: false,
    station: null,
  });
  const playerRef = useRef<React.ElementRef<"audio">>(null);

  const actions = useMemo<PlayerActions>(() => {
    return {
      play(station) {
        if (station) {
          dispatch({ type: ActionType.SET_STATION, payload: station });

          if (
            playerRef.current &&
            playerRef.current.currentSrc !== station.streamUrl
          ) {
            playerRef.current.src = station.streamUrl;
            playerRef.current.load();
            playerRef.current.pause();
          }
        }

        playerRef.current?.play().catch((error) => {
          // Log error for example to Sentry or similar service
          // TODO: send error to Error Boundary
          console.error("Error playing audio ", error);

          dispatch({ type: ActionType.PAUSE });
        });
      },
      pause() {
        playerRef.current?.pause();
      },
      toggle(station) {
        this.checkIsPlaying(station) ? actions.pause() : actions.play(station);
      },
      checkIsPlaying(station) {
        return station
          ? state.isPlaying &&
              playerRef.current?.currentSrc === station.streamUrl
          : state.isPlaying;
      },
    };
  }, [state.isPlaying]);

  const api = useMemo<PlayerAPI>(
    () => ({ ...state, ...actions }),
    [state, actions],
  );

  return (
    <>
      <AudioPlayerContext.Provider value={api}>
        {children}
      </AudioPlayerContext.Provider>
      <audio
        ref={playerRef}
        onPlay={() => dispatch({ type: ActionType.PLAY })}
        onPause={() => dispatch({ type: ActionType.PAUSE })}
      />
    </>
  );
}

export function useAudioPlayer(station?: Station) {
  const player = useContext(AudioPlayerContext);

  return useMemo<PlayerAPI>(
    () => ({
      ...player!,
      play() {
        player!.play(station);
      },
      toggle() {
        player!.toggle(station);
      },
      get isPlaying() {
        return player!.checkIsPlaying(station);
      },
    }),
    [player, station],
  );
}
