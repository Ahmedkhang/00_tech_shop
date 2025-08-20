// import { clerkMiddleware } from "@clerk/nextjs/server";

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
// import { NextResponse } from "next/server"


// export const middleware = clerkMiddleware();

// export const config = {
//   matcher: [
//     // Public routes
//     '/',
//     '/login',
//     '/signup',
//     '/contact',
//     '/about',
//     '/laptops(.*)',
//     '/mobiles(.*)',

//     // All other routes
//     "/((?!_next|.*\\..*).*)"
//   ]
// };

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isCheckoutRoute = createRouteMatcher(['/checkout'])
const isAdminRoute = createRouteMatcher(['/dashboard', '/studio'])

export default clerkMiddleware(async (auth, req) => {
  // Resolve the auth Promise
  const authResult = await auth()

  // Protect /checkout: Require sign-in
  if (isCheckoutRoute(req)) {
    if(!authResult.userId){
      return NextResponse.redirect(new URL('/sign-in',req.url))
    }
  }

  // Protect /dashboard and /studio: Require sign-in AND admin role
  if (isAdminRoute(req)) {
    if(!authResult.userId){
      return NextResponse.redirect(new URL('sign-in',req.url))
    }
    const { sessionClaims } = authResult
    if (!sessionClaims?.metadata?.role || sessionClaims.metadata.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url)) // Redirect to home
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}