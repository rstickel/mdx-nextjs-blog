export default function Home() {
  const posts = [
    { slug: 'hello-world', title: 'Hello World', date: '2024-01-01', excerpt: 'Welcome to my MDX-powered blog.' },
    { slug: 'getting-started', title: 'Getting Started with Next.js', date: '2024-01-15', excerpt: 'How to build a blog with Next.js and MDX.' },
  ]
  return (
    <main>
      <h1>📝 MDX Next.js Blog</h1>
      <p style={{ color: '#666' }}>A modern blog platform built with Next.js and MDX.</p>
      <hr />
      {posts.map(p => (
        <article key={p.slug} style={{ marginBottom: 32 }}>
          <h2 style={{ margin: '0 0 4px' }}>{p.title}</h2>
          <time style={{ color: '#999', fontSize: 14 }}>{p.date}</time>
          <p>{p.excerpt}</p>
        </article>
      ))}
    </main>
  )
}
