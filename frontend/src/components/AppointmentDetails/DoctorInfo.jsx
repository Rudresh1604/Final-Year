const DoctorInfo = ({ doctor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">
        Doctor Information
      </h3>

      <p className="text-gray-600"><strong>Name:</strong> {doctor?.name}</p>
      <p className="text-gray-600">
        <strong>Specialization:</strong> {doctor?.specialization}
      </p>
      <p className="text-gray-600"><strong>Phone:</strong> {doctor?.phone}</p>
    </div>
  );
};

export default DoctorInfo;