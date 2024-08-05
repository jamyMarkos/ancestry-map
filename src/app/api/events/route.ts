import { events as eventsData } from "../../../../db/events.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const result = eventsData;
  return NextResponse.json({
    events: result,
  });
}
