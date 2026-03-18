import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fabriziosanino ~ git log --graph",
  description:
    "Fabrizio Sanino — Backend Engineer & Cloud Architect. MSc Computer Engineering 110L. Building cloud systems at Connect Reply for Yamaha and OCS.",
  keywords: ["Fabrizio Sanino", "Backend Engineer", "Cloud Architect", "AWS", "Azure", "Next.js"],
  authors: [{ name: "Fabrizio Sanino" }],
  openGraph: {
    title: "Fabrizio Sanino — Backend Engineer & Cloud Architect",
    description: "Portfolio of Fabrizio Sanino — Backend Engineer, Cloud Architect, and Vineyard Co-Owner.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
