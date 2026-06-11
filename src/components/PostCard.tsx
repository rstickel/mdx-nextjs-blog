import Link from 'next/link';
import type { Post } from '@/types';
import { clsx } from 'clsx';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={clsx(
        "block rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out",
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        "group"
      )}
    >
      <article className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {post.frontmatter.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {formattedDate}
          {post.frontmatter.author && <span className="ml-2">• {post.frontmatter.author}</span>}
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {post.frontmatter.description}
        </p>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span 
                key={tag} 
                className={clsx(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                  "bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="mt-4 text-primary-600 dark:text-primary-400 font-medium group-hover:underline transition-colors">
          Read more &rarr;
        </p>
      </article>
    </Link>
  );
}
