import React from "react";

const ActionSection = ({status}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
      {status === "Scheduled" && (
        <>
          <button className="w-full py-2 border border-gray-300 rounded-lg  hover:bg-gray-50">
            Reschedule
          </button>
          <button className=" w-full py-2 bg-red-500 text-white rounded-lg hover:opacity-90">
            Cancel Appointment
          </button>
        </>
      )}
    </div>
  );
};

export default ActionSection;
