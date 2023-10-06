"use client";

import {
  type Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
// sirve para refresh de la pagina
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GithubIcon } from "./icons";

export function AuthButton({session}:{session:Session | null}) {
  // esto lo tipa pq es ts
  // const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSingIn = async () => {
    // esto nos servirá para que el usuario pueda iniciar sesion con su cuenta de github
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        // esto nos permitirá devolver al usuario las credenciales de acceso al login
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header>
      {session === null ? (
        <button
          type="button"
          onClick={handleSingIn}
          className="text-white bg-[#24292F]  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
        >
          {/* <GithubIcon/> */}
          Iniciar sessión Github
        </button>
      ) : (
        <button onClick={handleSignOut}>Cerrar sessión</button>
      )}
    </header>
  );
}
