import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TuneIn",
  description: "A minimalistic music player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white antialiased">
      {/* Maybe add AudioProvider */}
      <body className={cn(nunito.className, "flex min-h-full")}>
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
