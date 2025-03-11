import Head from "next/head";
import TronGame from "../components/tron-game";
import Layout from "../components/layout";
import Link from "next/link";

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
          <h1 className="text-3xl neon-text mb-4">
            Welcome to Pratfolio: Use the Light Cycle (&larr; &uarr; &darr;
            &rarr; ) to journey through the zone
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
