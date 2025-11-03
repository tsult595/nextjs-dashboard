import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Список защищённых роутов
      const protectedPaths = [
        '/dashboard',
        '/apartments',
        '/favorites',
        '/letters',
        '/invoices',
        '/customers',
      ];

      // Проверяем, начинается ли путь с защищённого роута
      const isProtectedRoute = protectedPaths.some(path => 
        pathname.startsWith(path)
      );

      // Если защищённый роут и НЕ залогинен → редирект на /login
      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      // Если залогинен и пытается зайти на /login → редирект на /dashboard
      if (pathname === '/login' && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;