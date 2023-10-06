import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextResponse, type NextRequest} from 'next/server'

// opción de Next.js, para evitar que cachee de forma estatica la ruta,
// y que la renderice en el servidor
export const dynamic = 'force-dynamic'

export async function GET(request:NextRequest){
    // la plataforma web
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if(code !==null){
        const supabase = createRouteHandlerClient({cookies})
        // nos devuelve la sesion
        await supabase.auth.exchangeCodeForSession(code)
    }
    return NextResponse.redirect(requestUrl.origin)
}