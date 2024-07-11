import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    OTP_REDIRECT,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {

    const { nextUrl } = req;
    console.log("req.auth is : ", req.auth);
    const loggedIn = !!req.auth;
    console.log("NextURL pathname is : ", nextUrl.pathname);
    console.log("loggedIn is : ", loggedIn);

    console.log("apiAuthPrefix is : ", apiAuthPrefix);
    console.log("publicRoutes is : ", publicRoutes);
    console.log("authRoutes is : ", authRoutes);
    console.log("DEFAULT_LOGIN_REDIRECT is : ", DEFAULT_LOGIN_REDIRECT);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    console.log("isApiAuthRoute is : ", isApiAuthRoute);
    const isPublicRuote = publicRoutes.includes(nextUrl.pathname);
    console.log("isPublicRuote is : ", isPublicRuote);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    console.log("isAuthRoute is : ", isAuthRoute);

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (loggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    // if logout then redirect to "/" through checking loggedIn
    if(loggedIn && nextUrl.pathname === "/auth/confirm-otp"){
        console.log("logged in");
        return Response.redirect(new URL("/", nextUrl));
    }

    if (!loggedIn && !isPublicRuote && !isSignUpRoute) {
        console.log("not logged in");
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}