import { NextRequest, NextResponse } from "next/server";

// const rewrites = [
//   {
//     source: /^\/nieuws$/,
//     destination: "/nieuws/overview/1",
//   },
//   {
//     source: /^\/nieuws\?page=(?<pageNr>\d+)/gi,
//     destination: "/nieuws/overview/$<pageNr>",
//   },
// ];

// /**
//  * Returns the rewritten URL if it matches any rewrites. Otherwise returns `null`.
//  * @param req
//  * @returns
//  */
// function getRewriteUrl(req: NextRequest): string | null {
//   const protocol = req.nextUrl.protocol;
//   const host = req.headers.get("host");
//   const search = req.nextUrl.search;
//   const pathname = req.nextUrl.pathname;
//   let rewriteUrl: string | null = null;
//   for (let i = 0; i < rewrites.length; ++i) {
//     if (`${pathname}${search}`.match(rewrites[i].source)) {
//       const rewritten = `${pathname}${search}`.replace(
//         rewrites[i].source,
//         rewrites[i].destination
//       );
//       if (rewritten !== `${pathname}${search}`) {
//         if (rewritten.indexOf("://") === -1) {
//           rewriteUrl = `${protocol}//${host}${rewritten}`;
//         } else {
//           rewriteUrl = rewritten;
//         }
//         break;
//       }
//     }
//   }
//   return rewriteUrl;
// }

// export function middleware(req: NextRequest) {
//   const rewriteUrl = getRewriteUrl(req);
//   if (rewriteUrl) {
//     return NextResponse.rewrite(rewriteUrl);
//   }

//   return NextResponse.next();
// }

export function middleware(req: NextRequest) {
  return NextResponse.next();
}
