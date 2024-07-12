import React, { useState, useEffect } from 'react';
import { authUserSession } from '@/app/libs/auth-libs'; // Pastikan alias '@' sudah di-set di next.config.js

const UserActionButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const userData = await authUserSession();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user session:', error);
      }
    };

    fetchUserSession();
  }, []); // useEffect with empty dependency array runs once after initial render

  const actionLabel = user ? "Sign Out" : "Sign In";
  const actionURL = user ? "/api/auth/signout" : "/api/auth/signin";

  const handleButtonClick = () => {
    if (user) {
      // Implement sign out logic
      console.log('Signing out...');
      setUser(null); // Clear user state or perform any other necessary actions
    } else {
      // Implement sign in logic with GitHub OAuth
      console.log('Redirecting to GitHub login...');
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
      const scope = 'read:user';

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
      window.location.href = authUrl;
    }
  };

  return (
    <button
      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleButtonClick}
    >
      {actionLabel}
    </button>
  );
};

export default UserActionButton;