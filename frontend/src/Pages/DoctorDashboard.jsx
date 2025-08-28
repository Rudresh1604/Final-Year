import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

const DoctorDashboard = () => {
  return (
    <div class="flex flex-col items-center px-5 bg-white border border-gray-300 rounded-2xl">
      <h1 class="text-gray-700 text-2xl my-2 font-semibold">
        All Appointments
      </h1>
      <div class="overflow-x-auto max-w-full  w-full my-3 lg:my-8">
        <table class=" rounded-lg w-full">
          <thead>
            <tr class="bg-gray-100 border-b border-gray-300">
              <th class=" px-2 py-2 text-left">Patient name</th>
              <th class=" px-2 py-2 text-left">Date & Time</th>
              <th class=" px-2 py-2 text-left">Status</th>
              <th class=" px-2 py-2 text-left">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b border-gray-300">
              <td class=" px-3 py-2 font-medium text-gray-900 flex items-center gap-2">
                <img
                  className="rounded-full w-8 h-8 ml-1.5"
                  src="https://cdn.pixabay.com/photo/2023/02/12/13/16/dog-7785066_1280.jpg"
                  alt="doctor profile"
                />
                <div className="flex flex-col">
                  <p className=" text-gray-600">Sachin </p>
                  <p className=" text-gray-600">Choudhary </p>
                </div>
              </td>
              <td class=" px-2 py-2">Black</td>
              <td class=" px-2 py-2">Accessories</td>
              <td class=" px-2 py-2">
                <a href="#" class="font-medium text-blue-600 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDashboard;
