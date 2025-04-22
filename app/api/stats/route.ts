// import { pool } from '@/lib/db';
// import { NextResponse } from 'next/server';

// export interface StatsResponse {
//   students: {
//     total: number;
//     active: number;
//   };
//   teachers: {
//     total: number;
//     active: number;
//   };
// }

// export async function GET() {
//   try {
//     const [students, teachers] = await Promise.all([
//       pool.query<{ total: string, active: string }>(
//         `SELECT 
//           COUNT(*) as total, 
//           COUNT(CASE WHEN status = 'active' THEN 1 END) as active 
//          FROM students`
//       ),
//       pool.query<{ total: string, active: string }>(
//         `SELECT 
//           COUNT(*) as total, 
//           COUNT(CASE WHEN status = 'active' THEN 1 END) as active 
//          FROM teachers`
//       )
//     ]);
    
//     const response: StatsResponse = {
//       students: {
//         total: parseInt(students.rows[0].total),
//         active: parseInt(students.rows[0].active)
//       },
//       teachers: {
//         total: parseInt(teachers.rows[0].total),
//         active: parseInt(teachers.rows[0].active)
//       }
//     };
    
//     return NextResponse.json(response);
//   } catch (error) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }