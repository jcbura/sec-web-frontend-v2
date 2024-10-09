import "./globals.css";
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";

const raj = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SEChedules",
  description:
    "SEC Football Website for viewing each team's schedules as well as a countdown to their next game.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${raj.className} font-medium`}>{children}</body>
    </html>
  );
};

export default RootLayout;
