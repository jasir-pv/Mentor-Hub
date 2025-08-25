// pages/api/teachers/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { emp_id, name, email, phone, department } = req.body;

      const teacher = await prisma.teacher.create({
        data: { emp_id, name, email, phone, department }
      });

      return res.status(201).json(teacher);
    } catch (error) {
      console.error("Error creating teacher:", error);
      return res.status(500).json({ error: "Failed to create teacher" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
