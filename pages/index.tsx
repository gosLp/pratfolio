import Head from "next/head";
import TronGame from "../components/tron-game";
import Layout from "../components/layout";

export default function Home() {
  const sections = [
    {
      name: "blog.exe",
      route: "/blog",
      x: 100,
      y: 100,
      w: 80,
      h: 80,
      image: "/images/blog.jpg",
    },
    {
      name: "research.exe",
      route: "/research",
      x: 600,
      y: 100,
      w: 80,
      h: 80,
      image: "/images/research.png",
    },
    {
      name: "projects.exe",
      route: "/projects",
      x: 100,
      y: 400,
      w: 80,
      h: 80,
      image: "/images/projects.jpg",
    },
    {
      name: "resume.exe",
      route: "/resume",
      x: 600,
      y: 400,
      w: 80,
      h: 80,
      image: "/images/resume.jpg",
    },
  ];

  return (
    <>
      <Head>
        <title>Pratfolio</title>
      </Head>
      <Layout>
        <div className="crt flex flex-col items-center justify-center min-h-full relative">
          <h1 className="mb-4 text-center text-2xl neon-text md:text-3xl">
            Welcome to Pratfolio: steer with arrow keys or swipe on mobile to
            explore the zone.
          </h1>
          <div>
            <TronGame sections={sections} />
            {/* Optional: additional UI elements can be added here */}
          </div>
        </div>
      </Layout>
    </>
  );
}
