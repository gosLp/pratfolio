"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
} from "lucide-react";
// If you don't have a Slider component already, you can create one or use a simple input range.
// import { Slider } from "@/components/ui/slider";

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
  //   {
  //     title: "Electric Rain",
  //     artist: "Neo Tokyo",
  //     url: "/sounds/electric-rain.mp3",
  //   },
  //   {
  //     title: "Blade Dance",
  //     artist: "Replicant",
  //     url: "/sounds/blade-dance.mp3",
  //   },
  //   {
  //     title: "Future Past",
  //     artist: "Light Cycle",
  //     url: "/sounds/future-past.mp3",
  //   },
];

export default function RetroJukebox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // On mount, set volume and auto-play
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("AutoPlay error:", err);
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((err) => console.error("Play error:", err));
      }
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    if (audioRef.current) {
      audioRef.current.load(); // Reset and load the new track
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("AutoPlay error on nextTrack", err);
          setIsPlaying(false);
        });
    }
  };

  const previousTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="relative w-full bg-black border-4 border-cyan-500 rounded-lg p-4 overflow-hidden shadow-xl">
      {/* CRT Overlays (non-interactive) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px]" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-cyan-500/5" />

      {/* Content container with higher z-index */}
      <div className="relative z-20 pointer-events-auto flex flex-col items-center">
        {/* Album Art */}
        <div className="w-full aspect-square mb-4 overflow-hidden rounded border-2 border-cyan-500">
          <img
            src="/assets/tron-cover.jpg" // Replace with your actual album art path
            alt="Retro album art"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>

        {/* Track Info */}
        <div className="text-center mb-4">
          <motion.h2
            key={tracks[currentTrack].title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-500 font-bold text-lg tracking-wider"
          >
            {tracks[currentTrack].title}
          </motion.h2>
          <motion.p
            key={tracks[currentTrack].artist}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-300 text-sm"
          >
            {tracks[currentTrack].artist}
          </motion.p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={previousTrack}
            className="text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-400 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-black" />
            ) : (
              <Play className="w-6 h-6 text-black" />
            )}
          </button>
          <button
            onClick={nextTrack}
            className="text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={toggleMute}
            className="text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          {/* <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-full"
          /> */}
        </div>
      </div>

      {/* Audio Element */}
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
