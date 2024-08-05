import familyData from "../../../../../db/family.json";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { FamilyMember } from "../route";

export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const id = params.id;
  const parentId = parseInt(id || "", 10);

  const parentIndex = familyData.findIndex((member) => member.id === parentId);
  if (parentIndex === -1) {
    return NextResponse.json(
      {
        error: "Family member not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    result: familyData[parentIndex],
  });
}

export async function PATCH(request: Request, context: any) {
  try {
    // const { id } = request.nextUrl.searchParams;
    const { params } = context;
    console.log("params", params);
    const id = params.id;
    const updatedMember = await request.json();
    const childId = parseInt(id || "", 10);

    const filePath = path.resolve(process.cwd(), "db/family.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const familyData: FamilyMember[] = JSON.parse(fileData);

    const childIndex = familyData.findIndex((member) => member.id === childId);
    console.log("childIndex", childIndex);
    if (childIndex === -1) {
      return NextResponse.json(
        {
          error: "Family member not found",
        },
        {
          status: 404,
        }
      );
    }

    // Update the parents array with new parents data
    const updatedParents = [
      ...familyData[childIndex].parents,
      ...updatedMember.parents,
    ];

    familyData[childIndex].parents = updatedParents;

    await fs.writeFile(filePath, JSON.stringify(familyData, null, 2));

    return NextResponse.json({
      result: familyData[childIndex],
    });
  } catch (error) {
    console.error("Error updating family data:", error);
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
