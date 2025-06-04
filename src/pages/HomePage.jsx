// src/pages/HomePage.jsx
import React, { useEffect } from "react"; // Import useEffect
import Header from "../components/Header";
import Body from "../components/Body";
import CosmicScene from "../components/CosmicScene";
// Ensure CosmicScene.scss is imported by CosmicScene.jsx so the styles are available

function HomePage() {
  useEffect(() => {
    // Add class to body when HomePage mounts
    document.body.classList.add("cosmic-body-active");

    // Cleanup function to remove class when HomePage unmounts
    return () => {
      document.body.classList.remove("cosmic-body-active");
      // Optionally reset any specific body styles if needed, e.g., document.body.style.overflow = '';
      // but removing the class should be sufficient if CSS is well-scoped.
    };
  }, []); // Empty dependency array: runs once on mount, cleans up on unmount

  return (
    // The outer div of HomePage itself doesn't need special background if body handles it
    <div className="relative flex min-h-screen">
      {" "}
      {/* min-h-screen helps layout */}
      <div className="absolute top-0 left-0 z-[5000] w-screen h-screen flex flex-col bg-black/10">
        <Header />
        <Body />
      </div>
      <div className="cosmic-container">
        {" "}
        {/* This container holds the CosmicScene */}
        <CosmicScene />
      </div>
    </div>
  );
}

export default HomePage;
