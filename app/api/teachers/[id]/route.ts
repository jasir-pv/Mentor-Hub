'use server';

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 🔹 Get single student
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(params.id) },
      include: { teacher: true }, // if you have relation
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching student:", error);
    return NextResponse.json(
      { error: "Failed to fetch student", message: error.message },
      { status: 500 }
    );
  }
}

// 🔹 Update student
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const student = await prisma.student.update({
      where: { id: Number(params.id) },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        whatsapp: body.whatsapp,
        parentName: body.parentName,
        parentOccupation: body.parentOccupation,
        place: body.place,
        pincode: body.pincode,
        address: body.address,
        // enrollmentType: body.enrollmentType,
        profile_pic: body.profile_pic || "/student-avt.jpg",
        teacherId: body.teacherId || null, // if FK relation
      },
    });
    return NextResponse.json(student, { status: 200 });
  } catch (error: any) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Failed to update student", message: error.message },
      { status: 500 }
    );
  }
}

// 🔹 Delete student
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.student.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(
      { message: "Student deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student", message: error.message },
      { status: 500 }
    );
  }
}
