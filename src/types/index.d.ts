export interface Frontmatter {
  title: string;
  date: string; // ISO string format
  description: string;
  author?: string;
  tags?: string[];
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
}
