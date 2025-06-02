// app/api/upload/[id]/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Validasi
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 10MB" },
        { status: 400 }
      );
    }

    // Upload ke Vercel Blob
    const { url } = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN, // Pastikan ini ada di .env
    });

    return NextResponse.json(
      { url },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      {
        error: "File upload failed",
        details:
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error),
      },
      { status: 500 }
    );
  }
}
