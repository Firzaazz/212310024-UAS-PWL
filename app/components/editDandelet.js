import React, { useState, useEffect } from 'react';
import EditJob from './EditJob';
import DeleteJob from './DeleteJob';

const editDandelet = () => {
  const [jobs, setJobs] = useState([]);
  const [editJobId, setEditJobId] = useState(null);
  const [deleteJobId, setDeleteJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost/read_jobs.php');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobUpdated = () => {
    // Refetch jobs after update
    fetchJobs();
  };

  const handleJobDeleted = () => {
    // Refetch jobs after delete
    fetchJobs();
  };

  return (
    <div>
      <h2>Job Catalog</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="flex justify-between items-center py-2 px-4 bg-gray-800 text-white mb-2 rounded-lg">
            <div>
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p>{job.description}</p>
              <p>{job.salary}</p>
              <img src={job.img} alt={job.title} className="w-20 h-20 object-cover mt-2" />
            </div>
            <div className="flex">
              <button
                onClick={() => setEditJobId(job.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteJobId(job.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editJobId && (
        <EditJob jobId={editJobId} onClose={() => setEditJobId(null)} onJobUpdated={handleJobUpdated} />
      )}

      {deleteJobId && (
        <DeleteJob jobId={deleteJobId} onClose={() => setDeleteJobId(null)} onJobDeleted={handleJobDeleted} />
      )}
    </div>
  );
};

export default editDandelet;
