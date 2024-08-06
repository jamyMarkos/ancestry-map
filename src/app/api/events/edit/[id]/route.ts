import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  personId: number;
}

export async function GET(request: NextRequest, context: any) {
  try {
    const { params } = context;
    const id = params.id;
    const eventId = parseInt(id || "", 10);

    const filePath = path.resolve(process.cwd(), "db/events.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const eventsData: Event[] = JSON.parse(fileData);

    const events = eventsData.filter((event) => event.id === eventId);

    if (events.length === 0) {
      return NextResponse.json(
        { error: "No events found for this person" },
        { status: 404 }
      );
    }

    return NextResponse.json({ events: events });
  } catch (error) {
    console.error("Error retrieving events data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve events data" },
      { status: 500 }
    );
  }
}
