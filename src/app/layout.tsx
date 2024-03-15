import type { Metadata } from "next";
import { Encode_Sans_Expanded } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const font = Encode_Sans_Expanded({
  subsets: ["latin"],
  weight: ["200", "400", "600", "900"],
});

export const metadata: Metadata = {
  title: "Rick & Morty | Main",
  description: "Rick & Morty info about characters, episodes and locations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <header>
          <nav>
            <h3>
              <Link href={"/"}>Rick & Morty</Link>
            </h3>
            <Link href={"/"}>Home</Link>
          </nav>
        </header>
        {children}
        <footer>
          <h5>©NahuelGuirao 2024</h5>
        </footer>
      </body>
    </html>
  );
}
