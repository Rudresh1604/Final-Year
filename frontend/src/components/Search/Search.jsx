import { HeartIcon, LocateIcon, MapPin, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Search = ({ isPatientSearch }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const searchHandler = async () => {
    try {
      if (query.length == 0) {
        // toa
        toast("All fields are required to search !");
      }
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/doctors`, {
        params: {
          query: query,
          city: locationFilter,
          specialization: specializationFilter,
        },
      });
      if (res.data?.success) {
        setSearchResult(res.data?.data);
      } else {
        toast("No results found !");
      }
      console.log(res?.data);
    } catch (error) {
      console.log(error);
      toast(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 w-full">
      <div className="flex justify-between gap-2">
        <div className="flex px-2 w-full items-center justify-between gap-1 border rounded-lg outline-blue-500 ">
          <SearchIcon className="text-blue-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 h-auto outline-none"
            placeholder={"Enter name to search"}
          />
        </div>
        <button
          className="p-2 w-[25%] flex items-center gap-2 bg-blue-500 rounded-xl text-white"
          onClick={() => searchHandler()}
        >
          <SearchIcon /> Search
        </button>
      </div>
      <div className="flex mt-3 gap-3 items-center">
        <div className="flex px-2 w-[50%] items-center gap-1 border rounded-lg outline-blue-500 ">
          <MapPin className="text-blue-500" />
          <input
            type="text"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full p-2 h-auto outline-none"
            placeholder={"Enter location to search"}
          />
        </div>
        <div className="flex px-2 w-[50%] items-center gap-1 border rounded-lg outline-blue-500 ">
          <HeartIcon className="text-blue-500" />
          <input
            type="text"
            value={specializationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full p-2 h-auto outline-none"
            placeholder={"Enter specialization to search"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-2 mt-3">
        {searchResult?.map((item, index) => (
          <div key={index}>
            <h1>dkk</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
