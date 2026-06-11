import { compileMDX } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import { MDXComponents } from '@/components/MDXComponents';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { clsx } from 'clsx';

type PostPageProps = { params: { slug: string } };

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = params;
  const { frontmatter } = getPostBySlug(slug);

  if (!frontmatter) {
    return {};
  }

  return {
    title: `${frontmatter.title} | MDX Next.js Blog Platform`,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `https://your-blog-url.com/blog/${slug}`,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [frontmatter.author || 'MDX Next.js Blog'],
      tags: frontmatter.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const { content, frontmatter } = getPostBySlug(slug);

  if (!content) {
    notFound();
  }

  const { content: mdxContent } = await compileMDX<{ title: string; date: string; description: string; author?: string; tags?: string[] }>({
    source: content,
    components: MDXComponents,
    options: {
      parseFrontmatter: false, // We already parsed it with gray-matter
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, {
            theme: 'dark-plus', // You can choose other themes or define your own
            onVisitLine(node: any) {
              // Prevent lines from collapsing in `display: grid` mode, and allow empty
              // lines to be copyable
              if (node.children.length === 0) {
                node.children = [{ type: 'text', value: ' ' }];
              }
            },
            onVisitHighlightedLine(node: any) {
              node.properties.className.push('line--highlighted');
            },
            onVisitHighlightedWord(node: any) {
              node.properties.className = ['word--highlighted'];
            },
          }],
        ],
      },
    },
  });

  return (
    <article className="max-w-4xl mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          {frontmatter.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
          {frontmatter.author && <span className="font-medium">By {frontmatter.author}</span>}
          {frontmatter.author && frontmatter.date && <span className="mx-2">•</span>}
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </p>
        {frontmatter.tags && ( 
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {frontmatter.tags.map((tag) => (
              <span 
                key={tag} 
                className={clsx(
                  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                  "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose dark:prose-invert lg:prose-xl mx-auto">
        {mdxContent}
      </div>
    </article>
  );
}
