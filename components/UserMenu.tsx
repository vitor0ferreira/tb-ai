"use client";

import { useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function UserMenu() {
    const { useSession, signOut } = authClient;
    const router = useRouter();
    const { data: session } = useSession();

    const menuRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setMenuOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);


    const handleClick = () => {
        setMenuOpen(!menuOpen)
    }

    return (
      <div
        onClick={(e)=>{
            e.stopPropagation();
            handleClick();
        }}
        ref={menuRef}
        className="relative rounded-full w-10 h-10 border border-gray-300 hover:ring-2 hover:ring-gray-400 transition"
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="User avatar"
            width={40}
            height={40}
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <UserCircle className="w-full h-full text-gray-400" />
        )}
        {menuOpen && (
          <div className="absolute left-1/2 top-1/2 mt-2 w-max bg-white border border-gray-200 rounded-xl shadow-lg text-base font-semibold p-1 z-100">
            {session ? (
              <button
                onClick={() =>
                  signOut({
                    fetchOptions:{
                        onSuccess: () => {
                            router.push("/");
                            router.refresh();
                            toast("Você foi deslogado.")
                        },
                    }
                  })
                }
                className="flex items-center gap-2 w-full px-3 py-2 text-left rounded-lg hover:bg-gray-200"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/sign-in")}
                className="flex items-center gap-2 w-full px-3 py-2 text-left rounded-lg hover:bg-gray-200"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    );
}
