import { NextRequest, NextResponse } from "next/server";

const CLASS_HOST = "class.elitestaysafrica.com";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="ESA Academy", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function isClassRequest(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];
  return host === CLASS_HOST || request.nextUrl.pathname.startsWith("/class");
}

function isAuthorized(request: NextRequest) {
  const username = process.env.CLASS_USERNAME;
  const password = process.env.CLASS_PASSWORD;

  if (!username || !password) {
    return false;
  }

  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return false;

  try {
    const decoded = atob(auth.slice(6));
    const separator = decoded.indexOf(":");
    if (separator === -1) return false;
    const user = decoded.slice(0, separator);
    const pass = decoded.slice(separator + 1);
    return user === username && pass === password;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  if (!isClassRequest(request)) return NextResponse.next();

  if (!isAuthorized(request)) return unauthorized();

  const host = request.headers.get("host")?.split(":")[0];
  if (host === CLASS_HOST && !request.nextUrl.pathname.startsWith("/class")) {
    const url = request.nextUrl.clone();
    url.pathname = request.nextUrl.pathname === "/" ? "/class" : `/class${request.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/class/:path*", "/((?!_next/static|_next/image|favicon.ico|favicon.png|images).*)"],
};
