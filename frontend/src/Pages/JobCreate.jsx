import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { TiArrowBackOutline, TiArrowForwardOutline } from "react-icons/ti";

const JobCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serviceType, setServiceType] = useState("Plumbing");
  const [nearestCity, setNearestCity] = useState("");
  const [scheduledDate, setScheduledDate] = useState();
  const [startTime, setStartTime] = useState();
  const [duration, setDuration] = useState(60);

  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.post("http://localhost:5001/api/jobs", {
        name,
        description,
        serviceType,
        nearestCity,
        scheduledDate,
        startTime,
        duration,
      });
      toast.success("Job created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create job");
      console.error("Error creating job:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8 mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mt-4 mx-4">
            <Link
              to="/"
              className="flex gap-2 items-center mb-4 border-collapse text-white bg-blue-400 p-2 rounded hover:bg-blue-500 transition-colors"
            >
              <TiArrowBackOutline className="size-5" />
              Home
            </Link>
            <Link
              to="/job"
              className="flex gap-2 items-center mb-4 *:border-collapse bg-yellow-300 p-2 rounded hover:bg-yellow-400 transition-colors "
            >
              All Booking
              <TiArrowForwardOutline className="size-5" />
            </Link>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-center">
              <h2 className="text-2xl font-bold mb-4">Create New Job</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium mb-1 ">Name</label>
              <input
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={description}
                placeholder="Describe your job"
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <label className="block text-sm font-medium mb-1">
                Service Type
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Gardening">Gardening</option>
                <option value="House">House Cleaning</option>
                <option value="Office">Office Cleaning</option>
                <option value="Other">Other</option>
              </select>
              <label className="block text-sm font-medium mb-1">
                Nearest City
              </label>
              <input
                type="text"
                value={nearestCity}
                placeholder="Enter your nearest city"
                onChange={(e) => setNearestCity(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <label className="block text-sm font-medium mb-1">
                Scheduled Date
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <label className="block text-sm font-medium mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <label className="block text-sm font-medium mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                min="60"
                step="30"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <div className="flex my-4 justify-center">
                <button
                  type="submit"
                  disabled={saving}
                  className="border rounded p-2 bg-green-400 hover:bg-green-600 transition-colors duration-200 text-white w-[25%] flex justify-center items-center disabled:cursor-not-allowed  "
                >
                  {saving ? "Creating ..." : "Create Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCreate;
