import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import type { Frontmatter } from '@/types';

const POSTS_DIR = path.join(process.cwd(), 'src/content');

export const getMDXPost = cache((slug: string) => {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  let fileContent;
  try {
    fileContent = fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error(`Error reading MDX file for slug: ${slug}`, error);
    return { content: '', frontmatter: {} as Frontmatter };
  }

  const { data, content } = matter(fileContent);

  // Validate frontmatter against expected types
  const frontmatter: Frontmatter = {
    title: data.title || 'Untitled Post',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    description: data.description || 'No description provided.',
    author: data.author || 'MDX Blog Author',
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    // Add other frontmatter fields as needed
  };

  return { content, frontmatter };
});
