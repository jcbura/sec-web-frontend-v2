import "./globals.css";
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import Providers from "./providers";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${raj.className} font-medium dark:bg-neutral-800 dark:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
