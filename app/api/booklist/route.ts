// app/api/books/route.ts (extend with GET)

import { NextResponse } from "next/server";
import prisma from "../../libs/prisma";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc", // optional: get recent first
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      data: books,
      message: "success",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "internal server error",
    });
  }
}
