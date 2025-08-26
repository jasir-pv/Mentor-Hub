import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all teachers
export async function GET() {
     
  try {
    console.log("Fetching teachers from DB...");
    const teachers = await prisma.teacher.findMany({
      orderBy: { name: "asc" },
      // ❌ remove include if you don't have students relation
      include: { students: true }
    });
    return NextResponse.json(teachers, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json(
      { error: "Failed to fetch teachers", message: error.message },
      { status: 500 }
    );
  }
}

// POST new teacher
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const teacher = await prisma.teacher.create({
      data: {
        emp_id: body.emp_id,
        name: body.name,
        email: body.email,
        phone: body.phone, // optional
        profile_pic: body.profile_pic || '/teacher-avt.jpg', // optional
        department: body.department,
        status: body.status || "Active", // defaults to Active
        subjects: body.subjects || [], // array
        classes_handled: body.classes_handled || [], 
      },
    });
    return NextResponse.json(teacher, { status: 201 });
  } catch (error: any) {
    console.error("Error creating teacher:", error);
    return NextResponse.json(
      { error: "Failed to create teacher", message: error.message },
      { status: 500 }
    );
  }
}
