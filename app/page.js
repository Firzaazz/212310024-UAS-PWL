"use client";

import Image from "next/image";
import { product } from "./libs/product";
import Checkout from "./components/Checkout";
import { useEffect } from "react";
import Hero from "./components/Hero";
import JobCatalog from "./components/JobCatalog";
import Header from "./components/Header";
import  navbar from "./components/Navbar/index"
import CreateJob from "./components/CreateJob";
import EditJob from "./components/EditJob";
import DeleteJob from "./components/DeleteJob";
import Footer from "./components/Footer";
import JobList from "./components/JobList";



export default function Home() {
  useEffect(() => {
    // Render Midtrans Snap token
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div>
        <navbar/>
        <Header/>
        <div >
          <div >
          <Hero/>
          <JobCatalog/>
          <JobList/>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  );
}
