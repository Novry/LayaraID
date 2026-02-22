import { safeJson, encryptedResponse } from "@/lib/api-utils";
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = "https://magma-api.biz.id/dramabox/vip"; // Pintu untuk daftar drama VIP

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(UPSTREAM_API, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Gagal mengambil daftar drama" },
        { status: response.status }
      );
    }

    const data = await safeJson(response);
    
    // PENTING: Jika Magma API membungkus datanya di dalam 'result' atau 'data', 
    // kita harus memastikannya di sini agar UI bisa membacanya.
    return encryptedResponse(data);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
