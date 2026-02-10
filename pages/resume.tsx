import { useState } from "react";
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
  const resumeTypes = ["research", "systems", "fullstack"] as const;
  const [selectedResume, setSelectedResume] = useState<(typeof resumeTypes)[number]>("research");

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
          <div className="mb-8 flex flex-wrap items-center gap-3">
            {resumeTypes.map((resumeType) => {
              const isActive = selectedResume === resumeType;

              return (
                <button
                  key={resumeType}
                  type="button"
                  onClick={() => setSelectedResume(resumeType)}
                  className={`rounded border px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "border-cyan-400 bg-cyan-400 text-black"
                      : "border-cyan-700 text-cyan-300 hover:border-cyan-500 hover:text-cyan-200"
                  }`}
                >
                  {resumeType}
                </button>
              );
            })}
          </div>

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
