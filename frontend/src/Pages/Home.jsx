import toast from "react-hot-toast";
import Card from "../Components/Card";
import ImageSlider from "../Components/ImageSlider";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5001/api/jobs");
        setJob(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <ImageSlider />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center">Loading...</div>}
        <div className="block font-bold text-2xl py-4">Latest Servises</div>
        {job.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {job.map((job) => (
              <div>
                <Card key={job._id} job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
