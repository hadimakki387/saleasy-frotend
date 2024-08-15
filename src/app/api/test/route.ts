import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));
  return NextResponse.json({ items });
}
