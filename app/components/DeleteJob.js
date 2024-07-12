import React from 'react';

const DeleteJob = ({ jobId, onClose, onJobDeleted }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost/delete_job.php?id=${jobId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        alert('Job deleted successfully');
        onJobDeleted();
        onClose();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-lg">
        <button className="text-white float-right" onClick={onClose}>
          X
        </button>
        <div className="text-white">
          <p>Are you sure you want to delete this job?</p>
          <button onClick={handleDelete} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
          <button onClick={onClose} className="mt-4 ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteJob;
