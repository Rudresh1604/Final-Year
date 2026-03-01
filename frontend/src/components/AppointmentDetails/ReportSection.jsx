const ReportSection = ({ report }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 ">
        Report
      </h3>

      {report ? (
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition">
          View Report
        </button>
      ) : (
        <p className="text-gray-500">No report uploaded yet.</p>
      )}
    </div>
  );
};

export default ReportSection;