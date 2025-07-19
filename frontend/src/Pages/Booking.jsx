import React from 'react'
import Card from '../Components/Card'
import axios from 'axios';
import NavBar from '../Components/NavBar';

const Booking = () => {

  const [job, setJob] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5001/api/jobs");
        setJob(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  return (
    <div className='min-h-screen'>
      <NavBar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center">Loading...</div>}
        <div className="flex justify-between items-center mt-4 mx-4">
          <h1 className="block font-bold text-2xl py-4">Current Booking</h1>
        </div>
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
}

export default Booking