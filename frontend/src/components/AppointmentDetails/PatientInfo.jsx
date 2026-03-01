const PatientInfo = ({ patient }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">
        Patient Information
      </h3>

      <p className="text-gray-600"><strong>Name:</strong> {patient?.name}</p>
      <p className="text-gray-600"><strong>Email:</strong> {patient?.email}</p>
      <p className="text-gray-600"><strong>Phone:</strong> {patient?.phone}</p>
    </div>
  );
};

export default PatientInfo;