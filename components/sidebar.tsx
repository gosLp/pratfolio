// components/sidebar.tsx
import TerminalSidebar from "./terminal-sidebar";
import RetroJukebox from "./retro-jukebox";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full">
      {/* Top: Terminal area */}
      <div className="flex-1 overflow-auto">
        <TerminalSidebar />
      </div>
      {/* Bottom: Retro Jukebox */}
      <div className="mt-auto">
        <RetroJukebox />
      </div>
    </div>
  );
}
