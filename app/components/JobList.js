import React, { useEffect, useRef, useState } from 'react';

const JobList = () => {
  const scrollContainerRef = useRef(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        scrollContainer.scrollBy({ left: event.deltaY, behavior: 'smooth' });
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel);

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, [scrollContainerRef]);

  useEffect(() => {
    fetch('http://localhost/fetch_jobs.php')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching job data:', error));
  }, []);

  return (
    <div id="jobs" className="bg-gray-100 py-12">
      <section data-aos="zoom-in-down">
        <div className="my-4 py-4">
          <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">Job Catalog</h2>
          <div className="flex justify-center">
            <div className="w-24 border-b-4 border-blue-900"></div>
          </div>
          <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">
            Bayar Pekerjaan Mu
          </h2>
        </div>

        <div className="px-12" data-aos="fade-down" data-aos-delay="600">
          <div ref={scrollContainerRef} className="flex overflow-x-scroll space-x-5 py-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white transition-all ease-in-out duration-400 overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group min-w-[300px]">
                <div className="m-2 text-justify text-sm">
                  <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={`../images/${job.img}`} />
                  <h2 className="font-semibold my-4 text-2xl text-center">{job.title}</h2>
                  <p className="text-md font-medium">{job.description}</p>
                  <p className="text-lg font-bold text-center mt-4">Rp{job.salary.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobList;
