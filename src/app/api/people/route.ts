import peopleData from "../../../../db/people-trial.json";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export interface FamilyMember {
  id: number;
  firstName: string;
  lastName: string;
  gender: string | null;
  dob: string | null;
  deathDate: string | null;
  birthPlace: string | null;
  countryCode: string | null;
  isUser: boolean;
  isAlive: boolean | null;
  isAdopted: boolean;
  hasChangedName: boolean;
  hasChangedGender: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  parents: number[];
  relatedEvents: any[];
  spouseId?: number | null;
}

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

    // check if the new member has a spouseId
    if (newMember.spouseId) {
      const husbandId = newMember.spouseId;

      // find the husband in the people data and update his spouseId
      const husband = peopleData.find(
        (member) => String(member.id) === String(husbandId)
      );

      if (husband) {
        // update the husband's spouseId
        husband.spouseId = Number(newMember.id);
        husband.updatedAt = new Date().toISOString();
      }
    }

    // Write the updated data back to the JSON file asynchronously
    const filePath = path.resolve(process.cwd(), "db/people-trial.json");
    await fs.writeFile(filePath, JSON.stringify(peopleData, null, 2));

    return NextResponse.json({
      result: newMember,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update the people json data",
      },
      {
        status: 500,
      }
    );
  }
}
