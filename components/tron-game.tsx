"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
// const cycleImage = new Image();

// const moveSound = new Audio("/sounds/move.mp3"); // Place your sound file in /public/sounds

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CYCLE_SIZE = 20; // size of the light cycle
const SPEED = 5; // movement speed
const TRAIL_LIFETIME = 1000; // ms until a trail dot fades

type Section = {
  name: string;
  route: string;
  x: number;
  y: number;
  w: number;
  h: number;
  image?: string; // optional image for a more stylized portal
};

type TrailPoint = {
  x: number;
  y: number;
  timestamp: number;
};

export default function TronGame({ sections }: { sections: Section[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [position, setPosition] = useState({ x: 180, y: 150 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [cycleImage, setCycleImage] = useState<HTMLImageElement | null>(null);

  // Handle arrow key input to update direction
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

  // Canvas click handler to detect clicks on section areas
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    // Loop through each section and check if click is within its bounds
    for (const sec of sections) {
      if (
        clickX >= sec.x &&
        clickX <= sec.x + sec.w &&
        clickY >= sec.y &&
        clickY <= sec.y + sec.h
      ) {
        router.push(sec.route);
        break;
      }
    }
  };

  useEffect(() => {
    const img = new window.Image();
    img.src = "/assets/lightcycle-8bit.svg";
    img.onload = () => setCycleImage(img);
  }, []);

  // Game loop with requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const update = (time: number) => {
      const delta = time - lastTime;
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
        // Add current position to trail
        setTrail((prevTrail) => [
          ...prevTrail,
          { x: prev.x, y: prev.y, timestamp: time },
        ]);
        return { x: newX, y: newY };
      });

      // Remove trail points older than TRAIL_LIFETIME
      setTrail((prevTrail) =>
        prevTrail.filter((pt) => time - pt.timestamp < TRAIL_LIFETIME)
      );

      // Collision detection with sections
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

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear the canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw grid background
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

      // Draw sections (use an image if provided, else fallback to a colored block)
      sections.forEach((sec) => {
        if (sec.image) {
          const img = new Image();
          img.src = sec.image;
          // Draw image once loaded (for now, it may reload on every frame)
          ctx.drawImage(img, sec.x, sec.y, sec.w, sec.h);
        } else {
          ctx.fillStyle = "rgba(255,0,255,0.3)";
          ctx.fillRect(sec.x, sec.y, sec.w, sec.h);
          ctx.fillStyle = "#ffffff";
          ctx.font = "16px monospace";
          ctx.fillText(sec.name, sec.x + 5, sec.y + 20);
        }

        // Draw text label above the section
        ctx.fillStyle = "#ffffff";
        ctx.font = "18px monospace";
        ctx.textAlign = "center";
        ctx.fillText(
          sec.name.replace(".exe", ""),
          sec.x + sec.w / 2,
          sec.y - 10
        );
      });

      // Draw the fading trail
      trail.forEach((pt) => {
        const age = performance.now() - pt.timestamp;
        const opacity = 1 - age / TRAIL_LIFETIME;
        ctx.fillStyle = `rgba(0,255,255,${opacity})`;
        ctx.fillRect(pt.x, pt.y, CYCLE_SIZE, CYCLE_SIZE);
      });

      // Draw the light cycle (could replace with a sprite image later)
      // Draw the light cycle only if the image has loaded
      if (cycleImage) {
        ctx.drawImage(
          cycleImage,
          position.x,
          position.y,
          CYCLE_SIZE,
          CYCLE_SIZE
        );
      } else {
        // Fallback: Draw a cyan rectangle while the image is loading
        ctx.fillStyle = "cyan";
        ctx.fillRect(position.x, position.y, CYCLE_SIZE, CYCLE_SIZE);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, position, sections, router, trail]);

  return (
    <div className="relative" onClick={handleCanvasClick}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="mx-auto border-2 border-neon-green"
      />
    </div>
  );
}
