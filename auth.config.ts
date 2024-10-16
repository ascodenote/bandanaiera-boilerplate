export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [],
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;

      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/auth/login");
      const isStaticFile =
        request.nextUrl?.pathname.startsWith("/_next") ||
        request.nextUrl?.pathname.startsWith("/static");

      // Abaikan middleware untuk file statis
      if (isStaticFile) {
        return true;
      }

      const publicPaths = [
        "/auth/login",
        "/api/login",
        "/api/register",
        "/oauth/sso/authorize",
      ];
      const isPublicPath = publicPaths.includes(request.nextUrl?.pathname);
      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
      if (isPublicPath) {
        return true;
      }

      if (!user) {
        return false;
      }

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
