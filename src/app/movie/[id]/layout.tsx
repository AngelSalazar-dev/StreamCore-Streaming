// Static export needs at least one param set; detail data loads client-side.
export function generateStaticParams() {
  return [{ id: "1" }];
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
