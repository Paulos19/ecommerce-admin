import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: '400'
});


export const metadata: Metadata = {
  title: "Painel | Admin",
  description: "Painel do Admnistrador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={roboto.className}
        >
          <ThemeProvider attribute='class' defaultTheme="system" enableSystem>
          <ToasterProvider/>
          <ModalProvider />
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
