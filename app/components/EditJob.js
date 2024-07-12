import React, { useState, useEffect } from 'react';

const EditJob = ({ jobId, onClose, onJobUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost/read_job.php?id=${jobId}`);
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setSalary(data.salary);
        setImg(data.img);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', jobId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('salary', salary);
    formData.append('img', img);

    try {
      const response = await fetch('http://localhost/update_job.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert('Job updated successfully with ID: ' + data.id);
        onJobUpdated();
        onClose();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Error updating job: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-lg">
        <button className="text-white float-right" onClick={onClose}>
          X
        </button>
        <form onSubmit={handleSubmit} className="p-6 bg-gray-800 text-white rounded-lg">
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Salary</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image URL</label>
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded"
            />
          </div>
          <button type="submit" className="w-full py-2 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded">
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
