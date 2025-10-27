import Link from "next/link";
import UserMenu from "./UserMenu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Navbar() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <nav className="hidden md:flex gap-6 text-2xl items-center justify-between w-max">
      <div className="flex gap-6">
        <Link href="/#sobre" className="font-medium hover:underline underline-offset-4">
          Sobre
        </Link>
        <Link href="/#como-funciona" className="font-medium hover:underline underline-offset-4">
          Como Funciona
        </Link>
        <Link href="/#equipe" className="font-medium hover:underline underline-offset-4">
          Equipe
        </Link>
        <Link href="/#contato" className="font-medium hover:underline underline-offset-4">
          Contato
        </Link>
        {session?.user.email == "vitor_hugo.f.s@hotmail.com"
          ? <Link href="/logs" className="font-medium hover:underline underline-offset-4">Logs</Link> : null}
      </div>


      <UserMenu />
    </nav>
  );
}
