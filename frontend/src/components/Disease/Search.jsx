import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const SearchDisease = ({ setDiseaseList, openAddModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const fetchDiseases = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/disease?search=${searchQuery}`,
      );

      if (res.data.success) {
        setDiseaseList(res.data.diseases);
        setNoResult(res.data.diseases.length === 0);
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

  useEffect(() => {
    if (!searchQuery) {
      setDiseaseList([]);
      setNoResult(false);
      return;
    }

    const handler = setTimeout(() => {
      if (searchQuery.length > 2) {
        fetchDiseases();
      }
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  return (
    <div className="flex flex-col gap-2">
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

      {noResult && (
        <button
          onClick={() => openAddModal(searchQuery)}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg w-fit"
        >
          Add "{searchQuery}" as New Disease
        </button>
      )}
    </div>
  );
};

export default SearchDisease;
