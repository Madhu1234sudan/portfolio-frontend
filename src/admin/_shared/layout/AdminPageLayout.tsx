interface AdminPageLayoutProps {
  children: React.ReactNode;
}

export default function AdminPageLayout({
  children,
}: AdminPageLayoutProps) {
  return (
    <div
      className="
        p-8
        space-y-8
        max-w-7xl
        mx-auto
        w-full
      "
    >
      {children}
    </div>
  );
}