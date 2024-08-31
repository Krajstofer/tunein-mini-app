import "@/styles/globals.css";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

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
    <html lang="en" className="h-full bg-gray-950 text-gray-50 antialiased">
      <body className={cn("flex min-h-full", nunito.className)}>
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
}
