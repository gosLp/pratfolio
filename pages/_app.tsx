import { AppProps } from "next/app";
import "../styles/index.css";
import Layout from "../components/layout";
import RetroJukebox from "../components/retro-jukebox";
import TerminalSidebar from "../components/terminal-sidebar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
