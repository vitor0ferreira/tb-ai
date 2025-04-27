import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="hidden md:flex gap-6 text-2xl">
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
    </nav>
  );
}

