// app/api/students/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received data:", data); // Debug log
    
    const newStudent = await prisma.student.create({ 
      data: {
        reg_no: data.reg_no,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        parentName: data.parentName,
        parentOccupation: data.parentOccupation || null,
        place: data.place,
        pincode: data.pincode,
        address: data.address,
        class_name: data.class_name || "Default Class",
        status: data.status || "Pending",
        profile_pic: data.photo || "/default-avatar.png",
        teacherId: data.teacherId || 1, // Ensure this teacher exists
      }
    });
    
    return NextResponse.json(newStudent);
  } catch (error: any) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create student" },
      { status: 500 }
    );
  }
}