import React from "react";
import { Calendar, Users, Activity } from "lucide-react";
import Card from "../components/Card/Card";

const HeaderCard = () => {
  return (
    <div className="ml-10">
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        <Card
          number="94"
          description="Total number of scheduled Appointments"
          icon={Calendar}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <Card
          number="120"
          description="Total number of pending Appointments"
          icon={Users}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <Card
          number="76%"
          description="Toal numbers of cancelled Appointments"
          icon={Activity}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
      </div>
    </div>
  );
};

export default HeaderCard;
