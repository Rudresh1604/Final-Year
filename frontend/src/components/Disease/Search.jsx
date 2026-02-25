import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const SearchDisease = ({ setDiseaseList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!searchQuery) {
      setDiseaseList([]);
      return;
    }
    const fetchDiseases = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/disease?search=${searchQuery}`,
        );

        if (res.data.success) {
          setDiseaseList(res.data.diseases);
        } else {
          toast.error("Failed to search diseases. Please try again later.", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error("Error searching diseases. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        console.error("Search error:", error);
      }
    };
    fetchDiseases();
  }, [searchQuery]);
  return (
    <div className="flex max-sm:flex-col flex-row items-center justify-between">
      <label className="mb-2 block text-xl text-gray-700">
        Manage Patient Diseases
      </label>
      <div className="flex items-center w-[60%] max-sm:w-full rounded-lg border p-1 border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
        <Search />
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Disease"
          value={searchQuery}
          className="w-full p-1 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchDisease;
