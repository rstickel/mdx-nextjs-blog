export const metadata = { title: 'MDX Blog', description: 'A Next.js blog platform' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body style={{ fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto', padding: 40 }}>{children}</body></html>
}
