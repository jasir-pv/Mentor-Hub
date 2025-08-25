'use server'

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: Number(params.id) },
      include: { students: true },
    });
    
    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teacher);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch teacher" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const teacher = await prisma.teacher.update({
      where: { id: Number(params.id) }, // make sure id type matches schema
      data: {
        emp_id: body.emp_id,
        name: body.name,
        email: body.email,
        phone: body.phone,
        department: body.department,
        status: body.status,
        profile_pic: body.profile_pic,
      },
    });
    return NextResponse.json(teacher);
  } catch (error) {
    console.error("Update teacher error:", error);
    return NextResponse.json({ error: "Failed to update teacher" }, { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.teacher.delete({
      where: { id: Number(params.id) },
    });
    
    return NextResponse.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete teacher" },
      { status: 500 }
    );
  }
}