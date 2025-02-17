// import Container from "../components/container";
// import MoreStories from "../components/more-stories";
// import HeroPost from "../components/hero-post";
// import Intro from "../components/intro";
// import Layout from "../components/layout";
// import { getAllPosts } from "../lib/api";
// import Head from "next/head";
// import { CMS_NAME } from "../lib/constants";
// import Post from "../interfaces/post";

// type Props = {
//   allPosts: Post[];
// };

// export default function Index({ allPosts }: Props) {
//   const heroPost = allPosts[0];
//   const morePosts = allPosts.slice(1);
//   return (
//     <>
//       <Layout>
//         <Head>
//           <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
//         </Head>
//         <Container>
//           <Intro />
//           {heroPost && (
//             <HeroPost
//               title={heroPost.title}
//               coverImage={heroPost.coverImage}
//               date={heroPost.date}
//               author={heroPost.author}
//               slug={heroPost.slug}
//               excerpt={heroPost.excerpt}
//             />
//           )}
//           {morePosts.length > 0 && <MoreStories posts={morePosts} />}
//         </Container>
//       </Layout>
//     </>
//   );
// }

// export const getStaticProps = async () => {
//   const allPosts = getAllPosts([
//     "title",
//     "date",
//     "slug",
//     "author",
//     "coverImage",
//     "excerpt",
//   ]);

//   return {
//     props: { allPosts },
//   };
// };

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
        <div className="crt flex flex-col items-center justify-center min-h-screen relative">
          <h1 className="text-3xl neon-text mb-4">
            Welcome to Pratfolio: Use the Light Cycle to journey through the
            zone
          </h1>
          <TronGame sections={sections} />
          {/* Optional: additional UI elements can be added here */}
        </div>
      </Layout>
    </>
  );
}
