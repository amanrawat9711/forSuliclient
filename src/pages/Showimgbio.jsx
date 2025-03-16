import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { bg } from "../images/exporter";

const Showimgbio = () => {
  const { id } = useParams(); // Get the ID from URL
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false); // State to track delete operation

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/get-entry/${id}`);
        setEntry(response.data.entry); // ✅ Ensure we set only the `entry` object
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err?.response?.data?.message || err?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    setDeleting(true);
    try {
      await axios.post(`${backendUrl}/api/delete-entry/${id}`);
      alert("Entry deleted successfully!");
      navigate("/show"); // Redirect back to the listing page
    } catch (err) {
      console.error("Delete error:", err);
      alert(err?.response?.data?.message || "Failed to delete entry");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-blue-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!entry) return <p className="text-gray-500">No entry found</p>;

  return (
    <>
        <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
                    style={{ backgroundImage: `url(${bg})` }}
                  >
        
                  </div>
    <div className="mt-10 p-4 flex flex-col sm:flex-row gap-4">
      {/* Image Section */}
      {entry.image && (
        <div className="flex flex-col items-center">
          <img
            className="w-full sm:max-w-100 rounded-lg object-cover"
            src={entry.image}
            alt="Entry"
            style={{ backgroundColor: "#5f6FFF" }}
          />
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="mt-4 px-4 py-2 cursor-pointer bg-pink-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      {/* Bio Section */}
      <div className="flex-1 rounded-lg p-6 bg-white border border-gray-500">
        <h2 className="text-xl font-semibold text-pink-600">Short Message</h2>
        <p className="mt-2 text-md text-pink-600 break-words">{entry.bio}</p>
      </div>
    </div>
    </>
  );
};

export default Showimgbio;
