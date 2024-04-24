import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Atividade",
  description: "Desenvolvimento de Sistemas",
};

// Componente de cabeçalho
const Header = () => {
  return (
    <header className="bg-green-800 text-white py-4">
      <div className="container flex flex-col">
        <nav className="flex justify-between items-center">
          <div className="flex gap-5 items-center ml-10">
            <Link
              className="text-black hover:text-gray-300 transition-colors duration-300 cursor-pointer"
              href="/"
            >
              Página Inicial
            </Link>
            <Link
              className="text-black hover:text-gray-300 transition-colors duration-300 cursor-pointer"
              href="/newEquip"
            >
              Cadastrar Equipamento
            </Link>
          </div>
          <div>
            <Link href="/logout">Logout</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

// Componente de rodapé
const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white py-4 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">@AMF</div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <div className="flex flex-col min-h-screen">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}