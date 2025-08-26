// app/api/students/[id]/route.ts
'use server';

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  try {
    const student = await prisma.student.findUnique({
      where: { id },
      include: { teacher: true },
    });
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const body = await req.json();

  try {
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        class_name: body.class_name,
        reg_no: body.reg_no,
        whatsapp: body.whatsapp,
        parentName: body.parentName,
        parentOccupation: body.parentOccupation,
        place: body.place,
        pincode: body.pincode,
        address: body.address,
        profile_pic: body.profile_pic || '/student-avt.jpg',
        teacherId: body.teacherId ? Number(body.teacherId) : undefined, // ✅ optional teacher
        status: body.status,
      },
    });

    return NextResponse.json(updatedStudent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    const deletedStudent = await prisma.student.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Student deleted successfully',
      deletedStudent,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
