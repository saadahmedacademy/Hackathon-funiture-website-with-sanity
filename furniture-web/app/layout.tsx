"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import GlobalLoading from "@/components/GlobalLoading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="en">
      <body>{loading ? <GlobalLoading /> : children}</body>
    </html>
  );
}
