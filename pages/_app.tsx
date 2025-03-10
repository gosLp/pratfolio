import { AppProps } from "next/app";
import "../styles/index.css";
import Layout from "../components/layout";
import RetroJukebox from "../components/retro-jukebox";
import TerminalSidebar from "../components/terminal-sidebar";
import Sidebar from "../components/sidebar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Persistent Sidebar */}
      <div className="w-60 border-r border-neon-green">
        <Sidebar />
      </div>
      {/* Main content area */}
      <main className="flex-1 overflow-hidden">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
