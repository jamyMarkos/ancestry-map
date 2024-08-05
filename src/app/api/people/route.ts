import peopleData from "../../../../db/people.json";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest, response: NextResponse) {
  const result = peopleData;
  return NextResponse.json({
    people: result,
  });
}

export async function POST(request: Request, response: NextResponse) {
  try {
    const newMember = await request.json();

    // Update the in-memory family data
    peopleData.push(newMember);

    // Write the updated data back to the JSON file asynchronously
    const filePath = path.resolve(process.cwd(), "db/people.json");
    await fs.writeFile(filePath, JSON.stringify(peopleData, null, 2));

    return NextResponse.json({
      result: newMember,
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
