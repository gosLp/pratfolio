"use client";

import React, { useState } from "react";
import Link from "next/link";
import BottomJukebox from "./bottom-jukebox";
import Meta from "./meta";
import { Menu, X } from "lucide-react";
import TerminalSidebar from "./terminal-sidebar";
import RetroJukebox from "./retro-jukebox";

type LayoutProps = {
  preview?: boolean;
  children: React.ReactNode;
};

export default function Layout({ preview, children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Projects", path: "/projects" },
    { name: "Research", path: "/research" },
    { name: "Resume", path: "/resume" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-black crt">
      <Meta />
      <header className="sticky top-0 z-40 w-full border-b border-neon-green bg-black/90 backdrop-blur neon-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-2xl neon-text md:text-3xl">Pratfolio</h1>

          <button
            type="button"
            className="rounded p-2 text-cyan-300 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className="hidden md:block">
            <ul className="flex justify-center space-x-6">
              {sections.map((section) => (
                <li key={section.name}>
                  <Link
                    href={section.path}
                    className="text-lg text-cyan-300 transition-colors hover:text-cyan-500 hover:underline"
                  >
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="border-t border-cyan-900/70 bg-black px-4 py-3 md:hidden">
            <ul className="space-y-3">
              {sections.map((section) => (
                <li key={section.name}>
                  <Link
                    href={section.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded border border-cyan-900 px-3 py-2 text-cyan-200 hover:border-cyan-500"
                  >
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-cyan-500">
              Music controls are always available in the bottom player.
            </p>
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-neon-green">
          <div className="flex-1 overflow-auto">
            <TerminalSidebar />
          </div>
          <div className="mt-auto">
            <RetroJukebox />
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-4 pb-16 md:pb-4">{children}</main>
      </div>

      <footer className="w-full border-t border-neon-green bg-black/70 p-2 pb-12 text-center md:pb-2">
        <p className="text-xs text-neon-blue md:text-sm">
          &copy; {new Date().getFullYear()} Pratfolio. All rights reserved.
        </p>
        <div className="mt-1 flex justify-center space-x-3 text-xs text-cyan-300 md:mt-2 md:space-x-4 md:text-sm">
          <a
            href="https://github.com/gosLp"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-cyan-500"
          >
            GitHub
          </a>
          <a
            href="mailto:pratheekps@vt.edu"
            className="transition-colors hover:text-cyan-500"
          >
            Contact Me
          </a>
        </div>
      </footer>

      <div className="md:hidden">
        <BottomJukebox />
      </div>
    </div>
  );
}
