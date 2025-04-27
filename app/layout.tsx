import type { Metadata } from "next";

import { Roboto } from "next/font/google";
import { BsFillLungsFill } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TB.AI",
  description: "Criado com Next e hospedado na Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="!scroll-smooth">
      <body className={`${roboto.className} antialiased`}>
        <header className="border-b w-full flex justify-center">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <BsFillLungsFill className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              <span className="text-xl md:text-3xl font-bold">TB.AI</span>
            </div>

            <Navbar />

            <Popover>
              <PopoverTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="md:hidden">
                  <span className="sr-only">Menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2 max-w-max text-lg md:hidden">
                <Link
                  href="#sobre"
                  className="font-medium hover:underline underline-offset-4"
                >
                  Sobre
                </Link>
                <Link
                  href="#como-funciona"
                  className="font-medium hover:underline underline-offset-4"
                >
                  Como Funciona
                </Link>
                <Link
                  href="#equipe"
                  className="font-medium hover:underline underline-offset-4"
                >
                  Equipe
                </Link>
                <Link
                  href="#contato"
                  className="font-medium hover:underline underline-offset-4"
                >
                  Contato
                </Link>
              </PopoverContent>
            </Popover>
          </div>
        </header>
        {children}
        <footer className="border-t bg-muted flex justify-center px-4 md:px-8">
          <div className="container flex flex-col gap-2 py-6 md:flex-row md:items-center justify-between w-full">
            <p className="text-xs text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} TB.AI. Todos os direitos
              reservados.
            </p>
            <p className="text-xs text-muted-foreground md:ml-auto md:text-right">
              <strong>Aviso:</strong> Esta ferramenta é um auxílio ao
              diagnóstico e não substitui a avaliação de um profissional de
              saúde.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
