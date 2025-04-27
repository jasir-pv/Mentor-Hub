// types/student.ts
export interface Student {
    id: number;
    reg_no: string;
    name: string;
    email: string;
    profile_pic?: string;
    class_id?: number;
    status?: string;
    class_name?: string;
    teacher_name?: string;
    teacher_email?: string;
    teacher_pic?: string;
  }
  
  export interface CreateStudentDTO {
    reg_no: string;
    name: string;
    email: string;
    profile_pic?: string;
    class_id?: number;
    status?: string;
  }