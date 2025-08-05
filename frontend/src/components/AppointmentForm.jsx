import React from 'react';

const AppointmentForm = () => {
  return (
    <form className="flex max-w-md flex-col mx-auto gap-4 px-4 py-2">
      <label htmlFor='reason' className="font-bold text-xl text-gray-800">
        Enter the reason for your appointment
      </label>
      <div>
        <textarea
          id="reason"
          placeholder="Enter your reason"
          required
          rows={3}
          className="w-full rounded-lg bg-gray-100 border border-gray-300 px-4 py-2 text-xl text-black focus:outline-none focus:border-blue-600"
        />
      </div>
      <button
        type="submit"
        className="w-full self-end rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;
