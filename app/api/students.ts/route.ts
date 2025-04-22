// import { pool } from '@/lib/db';
// import { NextRequest, NextResponse } from 'next/server';
// import { Student, CreateStudentDTO } from '@/app/types/student';



// export async function GET() {
//   try {
//     const result = await pool.query(`
//       SELECT s.*, c.name as class_name, t.name as teacher_name, 
//              t.email as teacher_email, t.profile_pic as teacher_pic
//       FROM students s
//       LEFT JOIN classes c ON s.class_id = c.id
//       LEFT JOIN teachers t ON c.teacher_id = t.id
//     `);
//     return NextResponse.json(result.rows);
//   } catch (error) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Database error' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const studentData: CreateStudentDTO = await request.json();
    
//     // Validate required fields
//     if (!studentData.reg_no || !studentData.name || !studentData.email) {
//       return NextResponse.json(
//         { error: 'Missing required fields (reg_no, name, email)' },
//         { status: 400 }
//       );
//     }

//     const result = await pool.query<Student>(
//       `INSERT INTO students 
//        (reg_no, name, email, profile_pic, class_id, status) 
//        VALUES ($1, $2, $3, $4, $5, $6) 
//        RETURNING *`,
//       [
//         studentData.reg_no,
//         studentData.name,
//         studentData.email,
//         studentData.profile_pic,
//         studentData.class_id,
//         studentData.status || 'active' // Default status
//       ]
//     );
    
//     return NextResponse.json(result.rows[0], { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Database error' },
//       { status: 500 }
//     );
//   }
// }