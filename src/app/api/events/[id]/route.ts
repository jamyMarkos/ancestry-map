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
    const personId = parseInt(id || "", 10);

    const filePath = path.resolve(process.cwd(), "db/events.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const eventsData: Event[] = JSON.parse(fileData);

    const personEvents = eventsData.filter(
      (event) => event.personId === personId
    );

    if (personEvents.length === 0) {
      return NextResponse.json(
        { error: "No events found for this person" },
        { status: 404 }
      );
    }

    return NextResponse.json({ events: personEvents });
  } catch (error) {
    console.error("Error retrieving events data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve events data" },
      { status: 500 }
    );
  }
}
