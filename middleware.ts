import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  const token = cookies().get("jwt_token");

  // Если токена нет и запрашивается главная страница (например, корневая "/")
  if (!token && req.nextUrl.pathname === "/") {
    // Редирект на страницу логина
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Если токен есть или это другая страница
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Регистрируем middleware только для главной страницы
};
