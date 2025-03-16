import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { bg, upload_area } from "../images/exporter";

const Add = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Store selected image in state
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!bio || !image) {
      return setError("Please enter a bio and select an image.");
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("image", image);

      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const { data } = await axios.post(`${backendUrl}/api/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        alert("Entry added successfully!");
        setBio("");
        setImage(null);
        navigate("/show"); // Redirect to the list page
      } else {
        setError(data.message || "Failed to add entry.");
      }
    } catch (err) {
      console.error("Error submitting entry:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <form
        className="flex items-center justify-center min-h-screen"
        onSubmit={submitHandler}
      >
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl ">
          <div className="flex items-center mb-8 gap-4 text-gray-500">
            <label htmlFor="img" className="cursor-pointer">
              <img
                className="w-20 h-20 object-cover rounded-full border border-gray-300"
                src={image ? URL.createObjectURL(image) : upload_area}
                alt="Selected"
              />
            </label>
            <input
              type="file"
              id="img"
              className="hidden"
              onChange={handleImageChange}
            />
            <p>Upload Image</p>
          </div>

          <div>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              className="w-full border p-2 rounded"
              placeholder="Write Something related to this picture or about us..."
              rows={5}
              required
            />
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 px-8 mt-5 py-2 text-white rounded-full cursor-pointer"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Add;
