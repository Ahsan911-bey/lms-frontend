import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function handleProxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    try {
        const pathArray = (await params).path || [];
        const path = pathArray.join("/");
        const url = new URL(req.url);
        const search = url.search;
        const targetUrl = `${API_URL}/${path}${search}`;

        const cookieStore = await cookies();
        const token = cookieStore.get("jwt_token")?.value;

        const headers = new Headers(req.headers);
        headers.delete("host"); // Let 'fetch' manage the host header

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        const method = req.method;
        const hasBody = method !== "GET" && method !== "HEAD";
        const body = hasBody ? await req.blob() : undefined;

        const res = await fetch(targetUrl, {
            method,
            headers,
            body,
            redirect: "manual",
        });

        // Forward backend response to client
        const responseHeaders = new Headers(res.headers);
        // Exclude content-encoding to prevent browser gzip issues
        responseHeaders.delete("content-encoding");

        return new NextResponse(res.body, {
            status: res.status,
            statusText: res.statusText,
            headers: responseHeaders,
        });

    } catch (error: any) {
        console.error("Proxy error:", error);
        return NextResponse.json({ message: "Internal Proxy Error", error: error.message }, { status: 500 });
    }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
