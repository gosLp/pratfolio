// import Alert from './alert'
// import Footer from './footer'
// import Meta from './meta'

// type Props = {
//   preview?: boolean
//   children: React.ReactNode
// }

// const Layout = ({ preview, children }: Props) => {
//   return (
//     <>
//       <Meta />
//       <div className="min-h-screen">
//         {/* <Alert preview={preview} /> */}
//         <main>{children}</main>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default Layout

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import TerminalSidebar from "./terminal-sidebar";
import Footer from "./footer";
import Meta from "./meta";
import RetroJukebox from "./retro-jukebox";

type LayoutProps = {
  preview?: boolean;
  children: React.ReactNode;
};

export default function Layout({ preview, children }: LayoutProps) {
  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter();

  const sections = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Projects", path: "/projects" },
    { name: "Research", path: "/research" },
    { name: "Resume", path: "/resume" },
  ];
  return (
    <div className="w-full h-screen flex flex-col crt">
      {/* Top 'status bar' / header (optional) */}
      <header className="w-full bg-black/70 border-b border-neon-green text-center p-4 neon-border">
        <h1 className="text-3xl neon-text">Pratfolio</h1>
        <nav className="mt-4">
          <ul className="flex justify-center space-x-6">
            {sections.map((section) => (
              <li key={section.name}>
                {/* <Link href={section.path}>
                  <a className="text-lg text-cyan-300 hover:text-cyan-500 transition-colors">
                    {section.name}
                  </a>
                </Link> */}
                <Link
                  href={section.path}
                  className=" text-lg text-cyan-300 hover:text-cyan-500 transition-colors hover:underline"
                >
                  {section.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main container with side nav + main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Side Navigation Panel */}
        {/* <nav className="w-60 bg-black/70 border-r border-neon-green p-4 overflow-auto">
          <ul className="space-y-4">
            {sections.map((section) => (
              <li key={section.name}>
                <Link href={section.path}>
                  <span
                    onClick={() => setActiveSection(section.name.toLowerCase())}
                    className={`block px-4 py-2 cursor-pointer transition-colors 
                      ${
                        router.pathname === section.path
                          ? "bg-neon-green text-black"
                          : "hover:bg-neon-green/20"
                      }`}
                  >
                    {section.name}.exe
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav> */}
        {/* <div className="w-60 border-r border-neon-green">
          <div className="flex-1 overflow-auto">
            <TerminalSidebar />
          </div>
          <div className="mt-auto">
            <RetroJukebox />
          </div>
        </div> */}
        {/* <div className="relative h-full w-60 border-r border-neon-green flex flex-col">
          <div className="flex-1 overflow-auto">
            <TerminalSidebar />
          </div>
          <div className="mt-auto">
            <RetroJukebox />
          </div>
        </div> */}

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>

      {/* Footer (optional) */}
      <footer className="w-full bg-black/70 border-t border-neon-green text-center p-2">
        <p className="text-sm text-neon-blue">
          &copy; {new Date().getFullYear()} Pratfolio. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4 text-cyan-300">
          <a
            href="https://github.com/gosLp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500 transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:pratheekps@vt.edu"
            className="hover:text-cyan-500 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </footer>
    </div>
  );
}
