import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import { getAllPosts, getPostsByTag } from "../lib/api";

export default function Research({ researchPosts }) {
  const heroPost = researchPosts[0];
  const morePosts = researchPosts.slice(1);
  return (
    <Layout>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const researchPosts = getPostsByTag("research", [
    "slug",
    "title",
    "date",
    "tags",
    "author",
    "coverImage",
  ]);
  console.log(" the posts are :", researchPosts);
  return { props: { researchPosts } };
}
