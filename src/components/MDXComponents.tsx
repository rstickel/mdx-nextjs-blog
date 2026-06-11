import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import React from 'react';

// These are the components that will be used to render MDX content.
// They will override the default HTML elements with custom styled components.
export const MDXComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-12 mb-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-2">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 my-4">
      {children}
    </p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
    const isExternal = href?.startsWith('http') || href?.startsWith('mailto');
    const classes = clsx(
      "text-primary-600 dark:text-primary-400 font-medium hover:underline",
      "transition-colors duration-200"
    );

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href || '#'} className={classes}>
        {children}
      </Link>
    );
  },
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside ml-4 my-4 space-y-2 text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside ml-4 my-4 space-y-2 text-gray-700 dark:text-gray-300">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="my-1 leading-relaxed">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <code
      className={clsx(
        className, // This will include classes like `language-js` from rehype-pretty-code
        "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
        "rounded-md px-1 py-0.5 text-sm font-mono"
      )}
    >
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 my-6 overflow-x-auto text-gray-200 text-sm font-mono">
      {children}
    </pre>
  ),
  img: (props: any) => (
    <Image
      className="rounded-lg my-8 mx-auto"
      loading="lazy"
      {...props}
      alt={props.alt || ''}
    />
  ),
  hr: () => (
    <hr className="my-10 border-t border-gray-200 dark:border-gray-700" />
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-50 dark:bg-gray-800">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr>{children}</tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
      {children}
    </td>
  ),
  // Add any other custom components you might need (e.g., custom Alert, Callout components)
  // Example: 
  // Alert: ({ children }) => (
  //   <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 my-4" role="alert">
  //     {children}
  //   </div>
  // ),
};
