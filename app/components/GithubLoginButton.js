import React from 'react';
import { getServerSession } from 'next-auth';
// import nextAuth from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]';
// import {authUserSession} from "@/libs/auth-libs"

const GithubLoginButton = async () => {
  const user = await authUserSession ()
  console.log(user)
  return (
    <button
      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleGithubLogin}
    >
      Login with GitHub
    </button>
  );
};

export default GithubLoginButton;
