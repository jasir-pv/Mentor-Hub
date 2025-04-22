// import { pool } from '@/lib/db';
// import { NextRequest, NextResponse } from 'next/server';
// import React from 'react';

// export async function GET() {
//   try {
//     const result = await pool.query('SELECT * FROM teachers');
//     return Response.json(result.rows);
//   }catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { name, email, profile_pic, status } = await request.json();
//     const result = await pool.query(
//       'INSERT INTO teachers (name, email, profile_pic, status) VALUES ($1, $2, $3, $4) RETURNING *',
//       [name, email, profile_pic, status]
//     );
//     return Response.json(result.rows[0], { status: 201 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//   }
// }