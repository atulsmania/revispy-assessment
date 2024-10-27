import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function middleware(req: NextRequest) {
  const loginUrl = new URL('/login', req.url);
  const homeUrl = new URL('/', req.url);

  const userSignedIn = await isSignedIn(req);

  if (!userSignedIn) {
    if (isBlockedRouteWhenNotSignedIn(req)) {
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  } else {
    if (isBlockedRouteWhenSignedIn(req)) {
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }
}

const isBlockedRouteWhenSignedIn = (req: NextRequest) => {
  const routes = ['/login', '/register', '/verify'];
  const isRoute = routes.some((route) => route === req.nextUrl.pathname);
  return !!isRoute;
};

const isBlockedRouteWhenNotSignedIn = (req: NextRequest) => {
  const routes = ['/'];
  const isRoute = routes.some((route) => route === req.nextUrl.pathname);
  return !!isRoute;
};

const isSignedIn = async (req: NextRequest) => {
  const token = req.cookies.get('token');
  console.log({ token });
  if (!token) return false;
  const { error } = await supabase.auth.getUser(token.value);
  console.log({ error });
  if (error) return false;
  return true;
};
