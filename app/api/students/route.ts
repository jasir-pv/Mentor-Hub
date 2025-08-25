'use server';

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 🔹 Get all students
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { name: "asc" },
      include: { teacher: true }, // if relation exists
    });
    return NextResponse.json(students, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students", message: error.message },
      { status: 500 }
    );
  }
}

// 🔹 Create new student
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const student = await prisma.student.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        class_name: body.class_name,   // ✅ required
        reg_no: body.reg_no,           // ✅ required
        whatsapp: body.whatsapp,
        parentName: body.parentName,
        parentOccupation: body.parentOccupation,
        place: body.place,
        pincode: body.pincode,
        address: body.address,
        profile_pic: body.profile_pic || "/student-avt.jpg",
        teacherId: body.teacherId || null, // if FK relation
      },
    });
    return NextResponse.json(student, { status: 201 });
  } catch (error: any) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Failed to create student", message: error.message },
      { status: 500 }
    );
  }
}
