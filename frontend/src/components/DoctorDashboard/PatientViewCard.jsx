import { MapPin, PhoneCallIcon } from "lucide-react";
import React from "react";

const PatientViewCard = ({ patient }) => {
  console.log(patient);

  return (
    <div className="px-4 py-2 border cursor-pointer shadow-lg border-gray-200 flex rounded-lg justify-between items-center">
      <div className="flex items-center w-auto justify-between md:justify-normal gap-3">
        {patient?.profilePic ? (
          <img
            src={patient.profilePic}
            className="w-15 h-15 max-sm:w-9 max-sm:h-9  rounded-full"
          ></img>
        ) : (
          <div className="p-4 bg-green-300 rounded-full text-white text-2xl font-bold">
            {patient?.name[0]}{" "}
          </div>
        )}
        <div className="flex flex-col ">
          <h1 className="max-sm:text-lg text-xl font-medium">
            Dr. {patient?.name}{" "}
          </h1>
          {/* <p className="max-sm:text-sm">
            Experience : {patient?.experience} Yrs
          </p>
          <p> Specialization : {patient?.specialization} </p> */}
        </div>
      </div>
      <div className="max-sm:hidden flex flex-col gap-2">
        <h1 className="flex gap-2 text-sm md:text-xl max-sm:text-lg">
          <PhoneCallIcon className="w-auto text-blue-500 h-auto" />{" "}
          {patient?.phone}{" "}
        </h1>
        <h1 className="flex gap-2">
          <MapPin className="w-auto text-yellow-500 h-auto" />{" "}
          {patient?.address?.city}{" "}
        </h1>
      </div>
    </div>
  );
};

export default PatientViewCard;
