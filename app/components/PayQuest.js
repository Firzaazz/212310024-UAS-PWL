import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const PayQuest = ({ onClose }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost/fetch_jobs.php')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Jobs:", data); // Tambahkan log untuk verifikasi data

        // Filter jobs with valid img
        const filteredJobs = data.filter(job => job.img !== '' && job.img !== 'uploads/');
        setJobs(filteredJobs);
      })
      .catch((error) => console.error('Error fetching job data:', error));
  }, []);

  const handlePay = async (job) => {
    try {
      const payload = {
        id: job.id,
        productName: job.title,
        price: job.salary,
        quantity: 1,
      };

      const encryptedPayload = CryptoJS.AES.encrypt(JSON.stringify(payload), process.env.NEXT_PUBLIC_ENCRYPTION_KEY).toString();
      console.log("Encrypted Payload:", encryptedPayload); // Log payload terenkripsi

      const response = await fetch('http://localhost:3000/api/tokenizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ data: encryptedPayload }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const requestData = await response.json();
      window.snap.pay(requestData.token);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg max-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#76ABAE]">Your Quest</h2>
        <button onClick={onClose} className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded">
          X
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-4 mb-4 rounded-lg shadow-lg text-[#76ABAE]">
            <img alt="card img" src={`../images/${job.img}`} className="rounded-t mb-4" />
            <h2 className="font-semibold text-2xl mb-2">{job.title}</h2>
            <p className="text-md font-medium mb-2">{job.description}</p>
            <p className="text-lg font-bold mb-4">Rp{job.salary.toLocaleString()}</p>
            <button onClick={() => handlePay(job)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Pay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayQuest;
