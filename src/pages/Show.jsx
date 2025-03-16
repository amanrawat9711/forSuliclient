import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bg } from "../images/exporter";

const Show = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [clickedId, setClickedId] = useState(null); // Track clicked card

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/get-entries`);
        setEntries(response.data?.entries || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleCardClick = (id) => {
    setClickedId(id); // Set clicked card to show loading
    navigate(`/showimg/${id}`);
  };

  if (loading) return <p className="text-blue-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
        <div
            className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
            style={{ backgroundImage: `url(${bg})` }}
          >

          </div>
    <div className="p-4">
      {entries.length === 0 ? (
        <p className="text-gray-500">No entries found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className={`bg-white p-4 shadow-md rounded-lg min-h-[200px] cursor-pointer transition duration-200 ${
                clickedId === entry._id ? "opacity-100 pointer-events-none" : "hover:shadow-lg"
              }`}
              onClick={() => handleCardClick(entry._id)}
            >
              {entry.image && (
                <img
                  src={entry.image}
                  alt="Entry"
                  className="w-full h-40 object-cover rounded-md"
                  loading="lazy"
                />
              )}
              <p className="text-lg font-medium mt-2 text-pink-600 truncate">{entry.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Show;
