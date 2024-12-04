import createMiddleware from 'next-intl/middleware';
import { routing } from './libs/i18nNavigation';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(
  request: NextRequest,
) {
  // Run Clerk middleware only when it's necessary
  // if (
  //   isAuthPage(request) || isProtectedRoute(request)
  // ) {
  //   return clerkMiddleware(async (auth, req) => {
  //     if (isProtectedRoute(req)) {
  //       const locale
  //         = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';

  //       const signInUrl = new URL(`${locale}/sign-in`, req.url);

  //       await auth.protect({
  //         // `unauthenticatedUrl` is needed to avoid error: "Unable to find `next-intl` locale because the middleware didn't run on this request"
  //         unauthenticatedUrl: signInUrl.toString(),
  //       });
  //     }

  //     return intlMiddleware(req);
  //   })(request, event);
  // }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
