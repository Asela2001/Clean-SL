import { Link } from "react-router";
import { format } from "date-fns";
import { IoLocationOutline, IoTrashOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { BsCalendar2Date } from "react-icons/bs";
import { WiTime7 } from "react-icons/wi";
import axios from "axios";
import toast from "react-hot-toast";
import JobView from "../Pages/JobView";

const Card = ({job}) => {
  const formattedDate = format(new Date(job.scheduledDate), "MMM dd, yyyy");
  const formattedTime = job.startTime.replace(/:00$/, "");

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(
        `http://localhost:5001/api/jobs/${job._id}`
      );
      console.log("Job deleted successfully");
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job");
    }
  };
  return (
    <Link
      to={`/jobs/${job._id}`}
      className="block bg-gradient-to-r from-[#62cff3] to-[#ffffffc3] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6"
    >
      <div className="p-6">
        {/* Job Title and Service Type */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">{job.name}</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.ServiceType === "Plumbing"
                ? "bg-blue-100 text-blue-800"
                : job.ServiceType === "Gardning"
                ? "bg-green-100 text-green-800"
                : job.ServiceType === "House"
                ? "bg-purple-100 text-purple-800"
                : job.ServiceType === "Office"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {job.serviceType}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        {/* Location and Time */}
        <div className="flex items-center text-gray-500 mb-2">
          <IoLocationOutline className="size-5 mr-2" />
          <span>{job.nearestCity}</span>
        </div>

        {/* Date and Time */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center text-gray-700">
            <BsCalendar2Date className="size-4 mr-2" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <WiTime7 className="size-5 mr-2" />
            <span>
              {formattedTime} ({job.duration} mins)
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center p-4 gap-6 bg-gray-200 rounded-b-lg">
        <button
          onClick={handleDelete}
          className="flex items-center justify-center p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
        >
          <IoTrashOutline className="text-red-600 h-10 w-5" />
        </button>
        <button
          onClick={<JobView />}
          className="flex items-center justify-center p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
        >
          <CiEdit className="text-blue-700 h-10 w-5" />
        </button>
      </div>
    </Link>
  );
};

export default Card;
