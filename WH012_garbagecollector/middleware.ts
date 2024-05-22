import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [""],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [""],
});
export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
