import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./shared/HeroSection";
import CategoryCarousel from "./shared/CategoryCarousel";
import LatestJob from "./shared/LatestJob";
import Footer from "./shared/Footer";
import usePortalStore from "@/store/portalStore";
import NavbarAlternative from "./shared/NavbarAlternative";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = usePortalStore();
  const navigate=useNavigate()

  useEffect(()=>{
    if(user?.role==="recruiter"){
      navigate('/admin/companies')
    }
  })

  return (
    <div>
      {user?(<Navbar />):(<NavbarAlternative/>)}
      
      <HeroSection />

      {user ? (
        <>
          <CategoryCarousel />
          <LatestJob />
        </>
      ) : (
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            🔍 Welcome to <span className="text-purple-600">JobSeek</span> –
            Your Gateway to Career Success
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            JobSeek is a modern job-hunting platform designed to bridge the gap
            between ambitious job seekers and forward-thinking employers.
            Whether you're a fresh graduate stepping into the workforce or a
            seasoned professional looking for your next big opportunity, JobSeek
            helps you discover, apply, and land your dream job with ease.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                🚀 For Job Seekers:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  Explore thousands of opportunities across various industries
                </li>
                <li>Filter jobs by role, location, experience, and salary</li>
                <li>Apply directly and track your applications in real-time</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">🏢 For Recruiters:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Post job openings effortlessly</li>
                <li>Manage applications from your personalized dashboard</li>
                <li>
                  Find the right talent through smart filtering and candidate
                  insights
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
