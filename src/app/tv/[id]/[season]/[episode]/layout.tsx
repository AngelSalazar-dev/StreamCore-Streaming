// Static export needs at least one param set; episode data loads client-side.
export function generateStaticParams() {
  return [{ id: "1", season: "1", episode: "1" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
