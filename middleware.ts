import {getToken} from "next-auth/jwt";
import {NextRequest, NextResponse} from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  if (
    !session &&
    (path === "/" ||
      path === "/users" ||
      path === "/category" ||
      path === "/category/create" ||
      path === "/hotel" ||
      path === "/profile" ||
      path === "/hotel/create" ||
      path === "/review" ||
      path === "/review/my" ||
      path.startsWith("/review/hotel") ||
      path.startsWith("/review/user") ||
      path === "/booking" ||
      path === "/booking/my" ||
      path.startsWith("/booking/hotel") ||
      path.startsWith("/booking/user") ||
      path.startsWith("/category/update") ||
      path.startsWith("/hotel/details") ||
      path.startsWith("/booking/details") ||
      path.startsWith("/hotel/update"))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (
    session &&
    session?.user?.role === "user" &&
    (path === "/users" ||
      path === "/category" ||
      path === "/category/create" ||
      path === "/hotel" ||
      path === "/hotel/create" ||
      path === "/review" ||
      path.startsWith("/review/hotel") ||
      path.startsWith("/review/user") ||
      path === "/booking" ||
      path.startsWith("/booking/hotel") ||
      path.startsWith("/booking/user") ||
      path.startsWith("/category/update") ||
      path.startsWith("/hotel/update"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
