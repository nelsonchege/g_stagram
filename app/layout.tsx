import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/fonts.css";
import { ThemeProvider } from "@/provider/theme-provider";
import TrpcProvider from "./_trpc/TrpcProvider";
import NextAuthSessionProvider from "@/provider/session-provider";
import { ToasterProvider } from "@/provider/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthSessionProvider>
            <TrpcProvider>
              <ToasterProvider />
              {children}
            </TrpcProvider>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
