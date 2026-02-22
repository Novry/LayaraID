import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// Kita langsung arahkan ke domain Magma API
const UPSTREAM_API = "https://magma-api.biz.id";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await params;
  
  try {
    // Memperbaiki URL agar sesuai dengan struktur Magma API: /dramabox/allepisode?bookId=...
    const response = await fetch(`${UPSTREAM_API}/dramabox/allepisode?bookId=${bookId}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Gagal mengambil data dari Magma API" },
        { status: response.status }
      );
    }

    const data = await safeJson(response);
    return encryptedResponse(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error di LayarID" },
      { status: 500 }
    );
  }
}
