import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        // Some icecast servers need a User-Agent
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Icy-MetaData": "1",
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "audio/mpeg",
        "Transfer-Encoding": "chunked",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse("Error proxying stream", { status: 500 });
  }
}
