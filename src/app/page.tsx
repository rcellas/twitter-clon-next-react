import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
// al ser un componente que se rederiza desde el servidor, necesitamos que el app router de nextjs cargue la informacion que necesitamos
import { cookies } from "next/headers"

import { AuthButton } from "./components/auth-button-client"
import { AuthButtonServer } from "./components/auth-button-serve"

export default async function Home() {
  const supabase = createServerComponentClient({cookies})

  const {data:posts} = await supabase.from('posts').select('*')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     Hola twitter
     <AuthButtonServer/>
     <pre>
      {JSON.stringify(posts, null, 2)}
     </pre>
    </main>
  )
}
