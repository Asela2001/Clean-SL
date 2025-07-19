import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router";

const JobView = () => {
  const { id } = useParams();
  const Navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/jobs/${id}`
        );
        setJob(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Failed to fetch job.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);



  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5001/api/jobs/${id}`);
      console.log("Job deleted successfully");
      toast.success("Job deleted successfully");
      Navigate("/");
    } catch (error) {
      console.error("Failed to delete job", error);
      toast.error("Failed to delete job");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (
      !job.name.trim() ||
      !job.nearestCity.trim()
    ) {
      toast.error("Name and description cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await axios.put(`http://localhost:5001/api/jobs/${id}`, job);
      toast.success("Job updated successfully");
      Navigate("/");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black animate-ping">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center p-4  bg-gray-100 shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <button className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
            <TiArrowBackOutline className="text-2xl" />
            Home
          </button>
        </Link>
        <button
          className="flex items-center gap-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
          onClick={handleDelete}
        >
          <IoCloseSharp />
          Cancel
        </button>
      </div>
      <div>
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
          <div>
            <label className="block text-sm font-bold text-black  mb-2">
              Coustomer Name
            </label>
            <input
              type="text"
              value={job.name}
              placeholder="coustomer name"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              onChange={(e) => setJob({ ...job, name: e.target.value })}
            />
            <label className="block text-sm font-bold text-black  mb-2">
              Servise Description
            </label>
            <textarea
              value={job.description}
              placeholder="description"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows="4"
              onChange={(e) => setJob({ ...job, description: e.target.value })}
            />
            <label className="block text-sm font-bold text-black  mb-2">
              Servise Type
            </label>
            <select
              value={job.serviceType}
              onChange={(e) => setJob({ ...job, serviceType: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="Plumbing">Plumbing</option>
              <option value="Gardening">Gardening</option>
              <option value="House">House Cleaning</option>
              <option value="Office">Office Cleaning</option>
              <option value="Other">Other</option>
            </select>
            <label className="block text-sm font-bold text-black  mb-2">
              Location
            </label>
            <input
              type="text"
              value={job.nearestCity}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              onChange={(e) => setJob({ ...job, nearestCity: e.target.value })}
            />

            <label className="block text-sm font-bold text-black  mb-2">
              Scedule Date
            </label>
            <input
              type="date"
              value={job.scheduledDate?.split("T")[0] || ""}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              onChange={(e) =>
                setJob({ ...job, scheduledDate: e.target.value })
              }
            />
            <label className="block text-sm font-bold text-black  mb-2">
              Time
            </label>
            <input
              type="time"
              value={job.startTime || ""}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              onChange={(e) => setJob({ ...job, startTime: e.target.value })}
              step="300"
            />
            <label className="block text-sm font-bold text-black  mb-2">
              Duration
            </label>
            <input
              type="number"
              name="duration"
              value={job.duration}
              onChange={(e) => setJob({ ...job, duration: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              min="30"
              step="30"
              placeholder="Enter duration in minutes"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 w-[25%] bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
            >
              {saving ? "Saving ..." : "Update Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobView;
