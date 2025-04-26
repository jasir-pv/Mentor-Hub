import RoundChart from "@/components/Chart";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Stats from "@/components/Stats";
import StudentDetails from "@/components/StudentDetails";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
   <div>
      <Stats />
      {/* <StudentDetails /> */}
      <RoundChart />
   </div>
  );
}
