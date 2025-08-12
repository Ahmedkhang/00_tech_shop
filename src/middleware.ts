import { clerkMiddleware } from "@clerk/nextjs/server";

export const middleware = clerkMiddleware();

export const config = {
  matcher: [
    // Public routes
    '/',
    '/login',
    '/signup',
    '/contact',
    '/about',
    '/laptops(.*)',
    '/mobiles(.*)',

    // All other routes
    "/((?!_next|.*\\..*).*)"
  ]
};
