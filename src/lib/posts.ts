import fs from 'fs';
import path from 'path';
import { getMDXPost } from './mdx';
import type { Post, Frontmatter } from '@/types';

const POSTS_DIR = path.join(process.cwd(), 'src/content');

export function getPostSlugs(): string[] {
  // Read all .mdx file names from the posts directory
  const fileNames = fs.readdirSync(POSTS_DIR);
  return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): { content: string; frontmatter: Frontmatter } {
  const { content, frontmatter } = getMDXPost(slug);
  return { content, frontmatter };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const { frontmatter } = getMDXPost(slug);
      return { slug, frontmatter };
    })
    .filter(post => post.frontmatter.title); // Filter out posts without a title or invalid frontmatter

  // Sort posts by date in descending order
  posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}
