import Layout from "../components/layout";
import { getPostBySlug } from "../lib/api";
import Container from "../components/container";
import PostBody from "../components/post-body";
import Header from "../components/header";
import PostHeader from "../components/post-header";
import PostTitle from "../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import markdownToHtml from "../lib/markdownToHtml";
import type PostType from "../interfaces/post";

type Props = {
  post: PostType;
  preview?: boolean;
};

export default function Resume({ post, preview }: Props) {
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        <article className="mb-32">
          <Head>
            <title>{`${post.title} | Next.js Blog Example with ${CMS_NAME}`}</title>
            <meta property="og:image" content={post.ogImage.url} />
          </Head>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={post.content} />
        </article>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  // Load your resume markdown file; assume its slug is "resume"
  const post = getPostBySlug("resume", [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}
