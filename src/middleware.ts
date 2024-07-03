import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//  routes that should be protected
const isProtectedRoute = createRouteMatcher([
    '/', 
]);

//  public routes
const publicRoutes = createRouteMatcher([

]);


export default clerkMiddleware((auth, req, res) => {
    if (publicRoutes(req)) {
        return;
    }
  
    if (isProtectedRoute(req)) {
        auth().protect();
    }
});

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
