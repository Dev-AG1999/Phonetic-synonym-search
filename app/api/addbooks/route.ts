// app/api/books/route.ts

import { NextResponse } from "next/server";
import prisma from "../../libs/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { title } = body;

  try {
    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { message: "Cannot add book", success: false },
        { status: 400 }
      );
    }

    const book = await prisma.book.create({
      data: {
        title: title.trim(),
      },
    });

    return NextResponse.json({
      message: "Success",
      success: true,
      data: book,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "connection error",
      success: false,
      status: 500,
    });
  }
}
