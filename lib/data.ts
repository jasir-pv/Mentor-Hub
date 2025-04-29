// data.ts
export interface Student {
    id: number;
    reg_no: string;
    name: string;
    email: string;
    profile_pic: string;
    class_name: string;
    teacher_name: string;
    teacher_email: string;
    teacher_pic: string;
    status: 'Joined' | 'Pending' | 'Left';
  }
  
  export const dummyStudents: Student[] = [
    {
      id: 1,
      reg_no: "12001",
      name: "Jasir Ahsan Pv",
      email: "jasirahsanpv40@gmail.com",
      profile_pic: "/student-avt.jpg",
      class_name: "AlB8R24",
      teacher_name: "Sarah Johnson",
      teacher_email: "sarah.johnson@example.com",
      teacher_pic: "/teacher-avt.jpg",
      status: "Joined"
    },
    {
      id: 2,
      reg_no: "12002",
      name: "Emma Watson",
      email: "emma.watson@example.com",
      profile_pic: "/student-avt.jpg",
      class_name: "AlB8R24",
      teacher_name: "Michael Brown",
      teacher_email: "michael.brown@example.com",
      teacher_pic: "/teacher-avt.jpg",
      status: "Pending"
    },
    {
      id: 3,
      reg_no: "12003",
      name: "John Smith",
      email: "john.smith@example.com",
      profile_pic: "/student-avt.jpg",
      class_name: "AlB8R25",
      teacher_name: "Lisa Williams",
      teacher_email: "lisa.williams@example.com",
      teacher_pic: "/teacher-avt.jpg",
      status: "Joined"
    },
    {
      id: 4,
      reg_no: "12004",
      name: "Sophia Garcia",
      email: "sophia.garcia@example.com",
      profile_pic: "/student-avt.jpg",
      class_name: "AlB8R25",
      teacher_name: "David Miller",
      teacher_email: "david.miller@example.com",
      teacher_pic: "/teacher-avt.jpg",
      status: "Left"
    },
    {
      id: 5,
      reg_no: "12005",
      name: "Daniel Lee",
      email: "daniel.lee@example.com",
      profile_pic: "/student-avt.jpg",
      class_name: "AlB8R26",
      teacher_name: "Jennifer Davis",
      teacher_email: "jennifer.davis@example.com",
      teacher_pic: "/teacher-avt.jpg",
      status: "Joined"
    },
    {
      id: 6,
      reg_no: "12006",
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      profile_pic: "/student-avt.jpg",
      class_name: "AlB8R26",
      teacher_name: "Robert Wilson",
      teacher_email: "robert.wilson@example.com",
      teacher_pic: "/teacher-avt.jpg",
      status: "Pending"
    },
    {
      id: 7,
      reg_no: "12007",
      name: "William Taylor",
      email: "william.taylor@example.com",
      profile_pic: "/student-avt.jpg",
      class_name: "AlB8R27",
      teacher_name: "Patricia Anderson",
      teacher_email: "patricia.anderson@example.com",
      teacher_pic: "/teacher-avt.jpg",
      status: "Joined"
    },
    {
      id: 8,
      reg_no: "12008",
      name: "Ava Hernandez",
      email: "ava.hernandez@example.com",
      profile_pic: "/student-avt.jpg",
      class_name: "AlB8R27",
      teacher_name: "James Thomas",
      teacher_email: "james.thomas@example.com",
      teacher_pic: "/teacher-avt.jpg",
      status: "Left"
    },
    {
      id: 9,
      reg_no: "12009",
      name: "Ethan Moore",
      email: "ethan.moore@example.com",
      profile_pic: "/student-avt.jpg",
      class_name: "AlB8R28",
      teacher_name: "Elizabeth White",
      teacher_email: "elizabeth.white@example.com",
      teacher_pic: "/teacher-avt.jpg",
      status: "Joined"
    },
    {
      id: 10,
      reg_no: "12010",
      name: "Mia Clark",
      email: "mia.clark@example.com",
      profile_pic: "/student-avt.jpg",
      class_name: "AlB8R28",
      teacher_name: "Charles Lewis",
      teacher_email: "charles.lewis@example.com",
      teacher_pic: "/teacher-avt.jpg",
      status: "Pending"
    }
  ];