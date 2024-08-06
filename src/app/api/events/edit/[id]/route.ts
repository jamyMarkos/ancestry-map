import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { EventType } from "@/components/SavedDataSection/FamilyDetails";

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

export async function PATCH(request: Request, context: any) {
  try {
    const { params } = context;
    const eventId = parseInt(params.id, 10);
    const updatedEventData = await request.json();

    const filePath = path.resolve(process.cwd(), "db/events.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const eventsData: Event[] = JSON.parse(fileData);

    // Find the index of the event to update
    const eventIndex = eventsData.findIndex((event) => event.id === eventId);
    if (eventIndex === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Update the event with new data
    eventsData[eventIndex] = {
      ...eventsData[eventIndex],
      ...updatedEventData,
    };

    // Write the updated events data back to the file
    await fs.writeFile(filePath, JSON.stringify(eventsData, null, 2));

    return NextResponse.json({
      result: eventsData[eventIndex],
    });
  } catch (error) {
    console.error("Error updating event data:", error);
    return NextResponse.json(
      { error: "Failed to update event data" },
      { status: 500 }
    );
  }
}
