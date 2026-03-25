import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(ja|en)/:path*',
    // localePrefix: as-needed のとき /terms 等（プレフィックスなし）も locale 解決に必須
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
