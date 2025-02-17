import { useState } from "react";
import Link from "next/link";

const directoryItems = [
  { name: "home", route: "/" },
  { name: "blog.exe", route: "/blog" },
  { name: "research.exe", route: "/research" },
  { name: "projects.exe", route: "/projects" },
  { name: "resume.exe", route: "/resume" },
];

export default function TerminalSidebar() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showListing, setShowListing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = input.trim();
      if (command === "ls") {
        setHistory((prev) => [...prev, `$ ${command}`]);
        setShowListing(true);
      } else {
        setHistory((prev) => [
          ...prev,
          `$ ${command}`,
          `Command not found: ${command}`,
        ]);
      }
      setInput("");
    }
  };

  return (
    <div className="bg-black p-4 text-green-400 font-mono text-sm h-1/2 overflow-auto">
      <div className="mb-2">
        {history.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
      <div className="flex">
        <span>user$ </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-black text-green-400 outline-none flex-1"
          autoFocus
          placeholder=" Enter ls"
        />
      </div>
      {showListing && (
        <div className="mt-2">
          {directoryItems.map((item) => (
            <div key={item.route}>
              <Link href={item.route}>
                <span className="cursor-pointer hover:underline">
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
