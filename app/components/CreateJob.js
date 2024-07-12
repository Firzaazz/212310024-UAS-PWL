import React, { useState } from 'react';

const CreateJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('salary', salary);
    formData.append('img', img);

    try {
      const response = await fetch('http://localhost/create_job.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert('Job created successfully with ID: ' + data.id);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Error creating job: ' + error.message);
    }
  };

  return (
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
        Create Job
      </button>
    </form>
  );
};

export default CreateJob;
