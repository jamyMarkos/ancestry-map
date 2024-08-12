import peopleData from "../../../../../db/people-trial.json";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { FamilyMember } from "../route";

export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const id = params.id;
  const parentId = parseInt(id || "", 10);

  const parentIndex = peopleData.findIndex((member) => member.id === parentId);
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
    result: peopleData[parentIndex],
  });
}

export async function PATCH(request: Request, context: any) {
  try {
    const { params } = context;
    const id = params.id;
    const updatedMember = await request.json();
    const childId = parseInt(id || "", 10);

    const filePath = path.resolve(process.cwd(), "db/people-trial.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const peopleData: FamilyMember[] = JSON.parse(fileData);

    const childIndex = peopleData.findIndex((member) => member.id === childId);
    // console.log("childIndex", childIndex);
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
      ...peopleData[childIndex].parents,
      ...updatedMember.parents,
    ];

    peopleData[childIndex].parents = updatedParents;

    await fs.writeFile(filePath, JSON.stringify(peopleData, null, 2));

    return NextResponse.json({
      result: peopleData[childIndex],
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
