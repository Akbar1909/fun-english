import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

const protectedRoutes = ["/content-make/word"];

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/content-make")) {
    const requestForNextAuth = {
      headers: {
        cookie: req.headers.get("cookie"),
      },
    };
    const session = await getSession({ req: requestForNextAuth });

    console.log({ session }, "session mid");

    // {
    //   session: {
    //   user: { name: 'target', email: 'tech.bobomurodov@gmail.com' },
    //   expires: '2024-01-23T12:36:24.212Z',
    //   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFrYmFyIiwic3ViIjoxNSwiaWF0IjoxNzAzNDIxMjg5LCJleHAiOjE3MDQwMjYwODl9.NyEC4Ni55SY7Enwk90GRNkQP--HhjCtNZGJq6pdhqnU'
    // }

    if (
      !session?.accessToken &&
      protectedRoutes.includes(req.nextUrl.pathname)
    ) {
      const absoluteURL = new URL("/?signin=false", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}
