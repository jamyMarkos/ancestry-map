import eventsData from "../../../../db/events.json";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest, response: NextResponse) {
  const result = eventsData;
  return NextResponse.json({
    events: result,
  });
}

export async function POST(request: Request, response: NextResponse) {
  try {
    const newEvent = await request.json();

    // Update the in-memory family data
    eventsData.push(newEvent);

    // Write the updated data back to the JSON file asynchronously
    const filePath = path.resolve(process.cwd(), "db/events.json");
    await fs.writeFile(filePath, JSON.stringify(eventsData, null, 2));

    return NextResponse.json({
      result: newEvent,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update the family data",
      },
      {
        status: 500,
      }
    );
  }
}
