import axios from "axios";
import { PencilIcon, Save, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const PatientViewCard = ({ patient, accessedBy, setPatientDetails }) => {
  const [patientData, setPatientData] = useState(null);
  const [backupData, setBackupData] = useState(null);
  const [isEditEnable, setEditEnable] = useState(false);

  useEffect(() => {
    setPatientData(patient);
  }, []);
  const changeHandler = (value, updateKey) => {
    setPatientData((prev) => {
      const newObj = { ...prev };
      const keys = updateKey.split(".");
      let obj = newObj;

      keys.slice(0, -1).forEach((key) => {
        obj[key] = { ...obj[key] };
        obj = obj[key];
      });

      obj[keys[keys.length - 1]] = value;
      return newObj;
    });
  };

  const handleSave = async () => {
    setPatientDetails(patientData);

    try {
      if (patient === patientData || !patient?._id) {
        toast.info("No changes to update!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        return;
      }
      const res = await axios.put(
        `${API_BASE_URL}/api/patients/${patient?._id}`,
        patientData
      );
      console.log(res);
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });

      setEditEnable(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  const handleCancel = async () => {
    setPatientData(backupData);
    setEditEnable(false);
    toast.info("Changes discarded.", {
      position: "top-right",
      autoClose: 2500,
      theme: "colored",
    });
  };
  if (!patientData) return null;
  return (
    <div
      className="flex flex-col py-3 px-4 mt-2 mb-4 rounded-lg shadow bg-white border
     border-gray-200"
    >
      <div className="flex flex-row justify-between py-2 px-2">
        <h1 className="text-2xl max-sm:text-lg font-semibold">My Profile </h1>
        <div className="flex flex-row gap-4 items-center">
          {!isEditEnable ? (
            <button
              onClick={() => {
                setBackupData(patientData);
                setEditEnable(true);
              }}
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 hover:bg-blue-200 
                   rounded-full cursor-pointer transition"
            >
              <PencilIcon className="w-6 h-6 text-blue-500" />
              <span className="text-blue-700 font-medium">Edit</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-3 py-1 bg-green-100 hover:bg-green-300 
                     rounded-full cursor-pointer transition"
              >
                <Save className="w-6 h-6 text-green-500" />
                <span className="text-green-700 font-medium">Save</span>
              </button>

              {/* CANCEL BUTTON */}
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-3 py-1 bg-red-100 hover:bg-red-300 
                     rounded-full cursor-pointer transition"
              >
                <XCircle className="w-6 h-6 text-red-500" />
                <span className="text-red-700 font-medium">Cancel</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 mx-4 p-3 gap-2 my-3">
        <div
          className="flex flex-col bg-gray-100 text-lg border rounded-lg py-2 px-8
         border-gray-300 font-sans justify-center gap-4"
        >
          <div className="w-full flex justify-center">
            <img
              className="h-24 w-28 max-sm:h-16 max-sm:w-16 border-4 border-blue-500 rounded-full"
              src={
                patient?.profilePicture ||
                "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczc3LW1ja2luc2V5LTc2MTEtcG9tXzMuanBn.jpg"
              }
              alt=""
              srcSet=""
            />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="">Name :</h1>
            {isEditEnable ? (
              <input
                className="w-[70%] h-5 p-4 border rounded-lg border-blue-300 
             focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => changeHandler(e.target.value, "name")}
                value={patientData?.name || ""}
              />
            ) : (
              <h1>{patientData?.name}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1>Age :</h1>
            {isEditEnable ? (
              <input
                className="w-[70%] h-5 p-4 border rounded-lg border-blue-300 
             focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                  changeHandler(e.target.value, "age");
                }}
                value={patientData?.age}
              ></input>
            ) : (
              <h1>{patientData?.age}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1>Email :</h1>
            {isEditEnable ? (
              <input
                className="w-[70%] h-5 p-4 border rounded-lg border-blue-300 
             focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                  changeHandler(e.target.value, "email");
                }}
                value={patientData?.email}
              ></input>
            ) : (
              <h1>{patientData?.email}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1>Gender :</h1>
            {isEditEnable ? (
              <select
                className="w-auto py-1 px-2 border rounded-lg border-blue-300
             focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                onChange={(e) => changeHandler(e.target.value, "gender")}
                value={patientData?.gender || ""}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <h1>{patientData?.gender}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1>Phone No :</h1>
            {isEditEnable ? (
              <input
                className="w-[70%] h-5 p-4 border rounded-lg border-blue-300 
             focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => changeHandler(e.target.value, "phone")}
                type="number"
                value={patientData?.phone || ""}
              />
            ) : (
              <h1>{patientData?.phone}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1>Blood Group :</h1>
            {isEditEnable ? (
              <select
                className="w-auto py-1 px-2 border rounded-lg border-blue-300
             focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                onChange={(e) => changeHandler(e.target.value, "bloodGroup")}
                value={patientData?.bloodGroup || ""}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>

                <option value="A+">A+ve</option>
                <option value="A-">A-ve</option>
                <option value="B+">B+ve</option>
                <option value="B-">B-ve</option>
                <option value="AB-">AB-ve</option>
                <option value="AB+">AB+ve</option>
                <option value="O+">O+ve</option>
                <option value="O-">O-ve</option>
              </select>
            ) : (
              <h1>{patientData?.bloodGroup}</h1>
            )}
          </div>
        </div>
        <div
          className="flex flex-col bg-gray-100 text-lg border rounded-lg border-gray-300 py-2 
        px-4 font-sans justify-center max-sm:mt-2  gap-4"
        >
          <h1 className="text-xl font-semibold">Address </h1>
          <div className="flex items-center gap-2">
            <h1>Street :</h1>
            {isEditEnable ? (
              <input
                className="w-[70%] h-5 p-4 border rounded-lg border-blue-300 
             focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                  changeHandler(e.target.value, "address.street");
                }}
                value={patientData?.address?.street}
              ></input>
            ) : (
              <h1>{patientData?.address?.street}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1>City :</h1>
            {isEditEnable ? (
              <input
                className="w-[70%] h-5 p-4 border rounded-lg border-blue-300 
             focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                  changeHandler(e.target.value, "address.city");
                }}
                value={patientData?.address?.city}
              ></input>
            ) : (
              <h1>{patientData?.address?.city}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1>State :</h1>
            {isEditEnable ? (
              <input
                className="w-[70%] h-5 p-4 border rounded-lg border-blue-300 
             focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                  changeHandler(e.target.value, "address.state");
                }}
                value={patientData?.address?.state}
              ></input>
            ) : (
              <h1>{patientData?.address?.state}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1>Pincode :</h1>
            {isEditEnable ? (
              <input
                className="w-[70%] h-5 p-4 border rounded-lg border-blue-300 
             focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                  changeHandler(e.target.value, "address.pincode");
                }}
                type="number"
                value={patientData?.address?.pincode}
              ></input>
            ) : (
              <h1>{patientData?.address?.pincode}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h1>Country :</h1>
            {isEditEnable ? (
              <input
                className="w-[70%] h-5 p-4 border rounded-lg border-blue-300 
             focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => {
                  changeHandler(e.target.value, "address.pincode");
                }}
                type="text"
                value={patientData?.address?.country}
              ></input>
            ) : (
              <h1>{patientData?.address?.country}</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientViewCard;
