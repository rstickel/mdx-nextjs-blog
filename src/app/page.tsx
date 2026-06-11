import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import type { Post } from '@/types';

export const metadata = {
  title: 'All Posts | MDX Next.js Blog Platform',
  description: 'Explore all blog posts on our modern MDX Next.js blog.',
};

export default function HomePage() {
  const posts: Post[] = getAllPosts();

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
        Latest Articles
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
      {posts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-10 text-lg">
          No posts found. Start by creating an MDX file in `src/content`.
        </p>
      )}
    </div>
  );
}
