import familyData from "../../../../db/family.json";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export interface Parent {
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
}

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
  parents: Array<{ parent: Parent }>;
  relatedEvents: any[];
}

export async function GET(request: NextRequest, response: NextResponse) {
  const result = familyData;
  return NextResponse.json({
    family: result,
  });
}

export async function POST(request: Request, response: NextResponse) {
  try {
    const newMember = await request.json();

    // Update the in-memory family data
    familyData.push(newMember);

    // Write the updated data back to the JSON file asynchronously
    const filePath = path.resolve(process.cwd(), "db/family.json");
    await fs.writeFile(filePath, JSON.stringify(familyData, null, 2));

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
