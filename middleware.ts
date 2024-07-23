import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
    DEFAULT_REDIRECT,
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const loggedIn = !!req.auth;

    console.log("nextUrl.pathname ", nextUrl.pathname);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRuote = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (loggedIn) {
            return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
        }
        return;
    }

    if (!loggedIn && !isPublicRuote) {
        console.log("not logged in");
        return Response.redirect(new URL(nextUrl.pathname, nextUrl));
    }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}