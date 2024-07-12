import React, { useState, useEffect } from 'react';
import UserActionButton from './Navbar/UserActionButton';
import CreateJob from './CreateJob';
import PayQuest from './PayQuest';

const Header = () => {
  const [someState, setSomeState] = useState(null);
  const [showCreateJobPopup, setShowCreateJobPopup] = useState(false); // State untuk mengendalikan popup CreateJob
  const [showPayQuestPopup, setShowPayQuestPopup] = useState(false); // State untuk mengendalikan popup PayQuest

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('some-api-endpoint');
        const data = await response.json();
        setSomeState(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Invoke the async function inside useEffect
  }, []); // Empty dependency array ensures it runs once on mount

  const toggleCreateJobPopup = () => {
    setShowCreateJobPopup(!showCreateJobPopup);
  };

  const togglePayQuestPopup = () => {
    setShowPayQuestPopup(!showPayQuestPopup);
  };

  return (
    <header className="flex justify-between items-center py-6 px-8 bg-gray-900 text-white">
      <div className="flex items-center">
        <span className="text-xl font-bold">WORKGUILDHUB</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="text-orange-500 hover:text-orange-700 font-bold py-2 px-4 rounded"
          onClick={toggleCreateJobPopup}
        >
          Create Quest
        </button>
        <button
          className="text-orange-500 hover:text-orange-700 font-bold py-2 px-4 rounded"
          onClick={togglePayQuestPopup}
        >
          Pay Quest
        </button>
        <UserActionButton />
      </div>

      {showCreateJobPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg max-h-screen overflow-y-auto">
            <button className="text-white float-right" onClick={toggleCreateJobPopup}>
              X
            </button>
            <CreateJob />
          </div>
        </div>
      )}

      {showPayQuestPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg max-h-screen overflow-y-auto">
            <PayQuest onClose={togglePayQuestPopup} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
