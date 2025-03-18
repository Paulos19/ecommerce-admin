import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Configuração de CORS
function handleCORS(request: Request) {
  const response = NextResponse.next()

  // Defina os cabeçalhos CORS
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001') // Substitua com sua origem
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Métodos permitidos
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Cabeçalhos permitidos
  response.headers.set('Access-Control-Allow-Credentials', 'true') // Habilitar cookies/autenticação

  // Se for uma solicitação OPTIONS (pré-vôo), retorne uma resposta de sucesso
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers
    })
  }

  return response
}

// Configuração do Clerk
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  // Primeiro, configurar CORS para todas as rotas
  const corsResponse = handleCORS(request)
  if (corsResponse) {
    return corsResponse
  }

  // Proteger rotas privadas com Clerk
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  // Continuar com a requisição normal
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Aplica o middleware para todas as rotas de API e páginas não estáticas
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre aplica para rotas de API e trpc
    '/(api|trpc)(.*)',
  ],
}
