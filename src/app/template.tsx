/**
 * Next.js remounts a template on every navigation, so this replays a short
 * fade-and-rise for each page. The animation leaves no transform behind
 * (fill-mode backwards), so fixed/sticky children behave normally afterwards.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
