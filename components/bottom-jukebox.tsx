"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipForward, Volume2, VolumeX } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  url: string;
}

const tracks: Track[] = [
  {
    title: "End of line",
    artist: "Daft Punk",
    url: "/sounds/end-of-line.mp3",
  },
  {
    title: "Derezzed",
    artist: "Daft Punk",
    url: "/sounds/derezzed.mp3",
  },
];

export default function BottomJukebox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.muted = isMuted;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      return;
    }

    audioRef.current.play().catch(() => setIsPlaying(false));
  };

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextIndex);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [currentTrack]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-cyan-700 bg-black/95 px-2 py-1.5 backdrop-blur md:px-3 md:py-2">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-2">
        <img
          src="/assets/tron-cover.jpg"
          alt="Current track art"
          className="h-8 w-8 shrink-0 rounded object-cover md:h-10 md:w-10"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-cyan-200 md:text-sm">
            {tracks[currentTrack].title}
          </p>
          <p className="truncate text-[10px] text-cyan-400 md:text-xs">
            {tracks[currentTrack].artist}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleMute}
          className="rounded-full p-1.5 text-cyan-200 transition-colors hover:bg-cyan-900/40 md:p-2"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button
          type="button"
          onClick={togglePlay}
          className="rounded-full p-1.5 text-cyan-200 transition-colors hover:bg-cyan-900/40 md:p-2"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          type="button"
          onClick={nextTrack}
          className="rounded-full p-1.5 text-cyan-200 transition-colors hover:bg-cyan-900/40 md:p-2"
          aria-label="Next track"
        >
          <SkipForward size={16} />
        </button>
      </div>
      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        onEnded={nextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}
