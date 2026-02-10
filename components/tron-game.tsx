"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CYCLE_SIZE = 20;
const SPEED = 5;
const TRAIL_LIFETIME = 1000;
const SWIPE_THRESHOLD = 24;

type Section = {
  name: string;
  route: string;
  x: number;
  y: number;
  w: number;
  h: number;
  image?: string;
};

type TrailPoint = {
  x: number;
  y: number;
  timestamp: number;
};

export default function TronGame({ sections }: { sections: Section[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const router = useRouter();
  const [position, setPosition] = useState({ x: 180, y: 150 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [cycleImage, setCycleImage] = useState<HTMLImageElement | null>(null);

  const navigateFromCanvasPoint = (x: number, y: number) => {
    for (const sec of sections) {
      if (x >= sec.x && x <= sec.x + sec.w && y >= sec.y && y <= sec.y + sec.h) {
        router.push(sec.route);
        break;
      }
    }
  };

  const getCanvasPoint = (
    clientX: number,
    clientY: number,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const point = getCanvasPoint(e.clientX, e.clientY, canvas);
    navigateFromCanvasPoint(point.x, point.y);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    if (!start) return;

    const touch = e.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX < SWIPE_THRESHOLD && absY < SWIPE_THRESHOLD) {
      const canvas = canvasRef.current;
      if (canvas) {
        const point = getCanvasPoint(touch.clientX, touch.clientY, canvas);
        navigateFromCanvasPoint(point.x, point.y);
      }
      return;
    }

    if (absX > absY) {
      setDirection(deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
      return;
    }

    setDirection(deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
  };

  useEffect(() => {
    const img = new window.Image();
    img.src = "/assets/lightcycle-8bit.svg";
    img.onload = () => setCycleImage(img);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.strokeStyle = "rgba(0,255,255,0.2)";
      for (let i = 0; i < CANVAS_WIDTH; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let j = 0; j < CANVAS_HEIGHT; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(CANVAS_WIDTH, j);
        ctx.stroke();
      }

      sections.forEach((sec) => {
        if (sec.image) {
          const img = new Image();
          img.src = sec.image;
          ctx.drawImage(img, sec.x, sec.y, sec.w, sec.h);
        } else {
          ctx.fillStyle = "rgba(255,0,255,0.3)";
          ctx.fillRect(sec.x, sec.y, sec.w, sec.h);
          ctx.fillStyle = "#ffffff";
          ctx.font = "16px monospace";
          ctx.fillText(sec.name, sec.x + 5, sec.y + 20);
        }

        ctx.fillStyle = "#ffffff";
        ctx.font = "18px monospace";
        ctx.textAlign = "center";
        ctx.fillText(sec.name.replace(".exe", ""), sec.x + sec.w / 2, sec.y - 10);
      });

      trail.forEach((pt) => {
        const age = performance.now() - pt.timestamp;
        const opacity = 1 - age / TRAIL_LIFETIME;
        ctx.fillStyle = `rgba(0,255,255,${opacity})`;
        ctx.fillRect(pt.x, pt.y, CYCLE_SIZE, CYCLE_SIZE);
      });

      if (cycleImage) {
        ctx.drawImage(cycleImage, position.x, position.y, CYCLE_SIZE, CYCLE_SIZE);
      } else {
        ctx.fillStyle = "cyan";
        ctx.fillRect(position.x, position.y, CYCLE_SIZE, CYCLE_SIZE);
      }
    };

    const update = (time: number) => {
      lastTime = time;

      setPosition((prev) => {
        const newX = Math.max(
          0,
          Math.min(CANVAS_WIDTH - CYCLE_SIZE, prev.x + direction.x * SPEED)
        );
        const newY = Math.max(
          0,
          Math.min(CANVAS_HEIGHT - CYCLE_SIZE, prev.y + direction.y * SPEED)
        );

        setTrail((prevTrail) => [
          ...prevTrail,
          { x: prev.x, y: prev.y, timestamp: time },
        ]);

        return { x: newX, y: newY };
      });

      setTrail((prevTrail) =>
        prevTrail.filter((pt) => time - pt.timestamp < TRAIL_LIFETIME)
      );

      sections.forEach((sec) => {
        if (
          position.x < sec.x + sec.w &&
          position.x + CYCLE_SIZE > sec.x &&
          position.y < sec.y + sec.h &&
          position.y + CYCLE_SIZE > sec.y
        ) {
          router.push(sec.route);
        }
      });

      draw();
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, position, sections, router, trail, cycleImage]);

  return (
    <div
      className="relative mx-auto w-full max-w-4xl"
      onPointerDown={handleCanvasPointerDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="aspect-[4/3] w-full border-2 border-neon-green">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="h-full w-full"
        />
      </div>
      <p className="mt-2 text-center text-xs text-cyan-400 md:hidden">
        Swipe to move. Tap glowing objects to open pages.
      </p>
    </div>
  );
}
