import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPostsByTag(tag: string, fields: string[] = []) {
  // Make sure we include "tags" (and "date" if we want to sort) in the fields
  const combinedFields = Array.from(new Set([...fields, "tags", "date"]));

  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, combinedFields))
    .filter((post) => {
      // Ensure post.tags is an array and contains the given tag
      return Array.isArray(post.tags) && post.tags.includes(tag);
    })
    // Optional: sort by date descending
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
