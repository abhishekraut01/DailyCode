import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();

  console.log(res);

  return NextResponse.json({
    message: "user signedup successfully",
    success: true,
  });
}

export async function GET() {
  return NextResponse.json({
    message: "Hello i am get",
    success: true,
  });
}
