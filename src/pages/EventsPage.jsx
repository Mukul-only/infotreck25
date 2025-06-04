// src/pages/EventsPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import Header from "../components/Header";
import Wrapper from "../util/Wrapper";
import EventCard from "../components/EventCard";
import { events as allEventsData } from "../data/eventsData";
import All from "../assets/all.svg?react";
import Ball from "../assets/ball.svg?react";
import Laptop from "../assets/laptop.svg?react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import StarrySky from "../components/StarrySky";

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (!document.body.classList.contains("cosmic-body-active")) {
      // Replace if you use a different theme class
      document.body.style.backgroundColor = "#111827"; // Example: Tailwind's gray-900. Use your theme's background.
      document.body.style.overflow = "auto";
    }
    return () => {};
  }, []);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") {
      return allEventsData;
    }
    return allEventsData.filter((event) => event.eventType === activeFilter);
  }, [activeFilter]);

  // FilterButton Component - No animation applied directly here, its container will be animated
  const FilterButton = ({
    filterType,
    label,
    icon,
    currentFilter,
    setFilter,
  }) => (
    <button
      onClick={() => setFilter(filterType)}
      className={`px-4 py-2 sm:px-8 sm:py-2 rounded-full gap-2 text-xs sm:text-base font-medium flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer border border-bdr
        ${
          currentFilter === filterType
            ? "bg-white text-gray-900 shadow-md"
            : "text-txt hover:bg-neutral-700 hover:text-white" // Added default text and hover
        }`}
    >
      {icon}
      {label}
    </button>
  );

  // --- Animation Variants ---

  // Parent container for all animated sections on the page
  const pageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Delay between each direct child (sections)
      },
    },
  };

  // Variants for individual sections or text blocks
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Variants for the container of filter buttons (to stagger individual buttons)
  const filterButtonsGroupVariants = {
    hidden: {}, // It will be shown by its parent (pageContainerVariants)
    visible: {
      transition: {
        staggerChildren: 0.1, // Delay between each filter button
      },
    },
  };

  const individualFilterButtonVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  // Variants for the grid of cards (to stagger individual cards)
  const cardGridVariants = {
    hidden: { opacity: 1 }, // Container itself can be visible, children will stagger
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07, // Delay between each card
      },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }, // For AnimatePresence
  };

  // Variants for individual cards
  const cardItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      // For AnimatePresence when filtering
      opacity: 0,
      scale: 0.85,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <div className="relative">
      <StarrySky />
      <div className="absolute inset-0 min-h-screen overflow-y-auto text-white bg-black/30">
        <Header /> {/* Assuming Header is static or has its own animation */}
        <Wrapper>
          <motion.div // This is the main container that will stagger its direct children
            className="py-12 md:py-16"
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Section 1: Title and Description */}
            <motion.div
              variants={sectionVariants}
              className="mb-8 text-center md:mb-12"
            >
              <h1 className="mb-3 text-4xl font-bold sm:text-5xl">EVENTS</h1>
              <p className="max-w-2xl mx-auto text-sm leading-snug text-txt sm:text-base">
                Welcome to INFOTRECK'2025, presented by the ACM Club. Browse
                through a range of technical and non-technical events and
                register to be part of the excitement. Pick your interests, join
                the action, and showcase your skills!
              </p>
            </motion.div>

            {/* Section 2: Filter Buttons - Grouped for staggering */}
            <motion.div
              variants={filterButtonsGroupVariants} // This will apply stagger to its children
              className="flex flex-wrap justify-start gap-2 mb-2 "
            >
              {/* Each filter button is now a motion component */}
              <motion.div variants={individualFilterButtonVariants}>
                <FilterButton
                  filterType="all"
                  label="All"
                  icon={<All className="w-4 h-4 sm:w-6 sm:h-6" />}
                  currentFilter={activeFilter}
                  setFilter={setActiveFilter}
                />
              </motion.div>
              <motion.div variants={individualFilterButtonVariants}>
                <FilterButton
                  filterType="technical"
                  label="Technical"
                  icon={<Laptop className="w-4 h-4 sm:w-6 sm:h-6" />}
                  currentFilter={activeFilter}
                  setFilter={setActiveFilter}
                />
              </motion.div>
              <motion.div variants={individualFilterButtonVariants}>
                <FilterButton
                  filterType="non-tech"
                  label="Non-Tech"
                  icon={<Ball className="w-4 h-4 sm:w-6 sm:h-6" />}
                  currentFilter={activeFilter}
                  setFilter={setActiveFilter}
                />
              </motion.div>
            </motion.div>

            {/* Section 3: "(click on the events for details)" text */}
            <motion.p
              variants={sectionVariants}
              className="mb-8 text-xs text-txt sm:text-sm md:mb-10"
            >
              (click on the events for details)
            </motion.p>

            {/* Section 4: Event Cards Grid */}
            <AnimatePresence mode="wait">
              {" "}
              {/* Handles enter/exit of the grid when filter changes */}
              <motion.div
                key={activeFilter} // Crucial for AnimatePresence to detect a new grid
                variants={cardGridVariants} // Applies stagger to card items
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4"
              >
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <motion.div
                      key={event.id} // Crucial for AnimatePresence and React list rendering
                      variants={cardItemVariants}
                      // No initial/animate here, parent (cardGridVariants) handles stagger
                      // AnimatePresence handles exit
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))
                ) : (
                  <motion.p
                    key="no-events-message" // Key for AnimatePresence
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 text-center text-gray-400 col-span-full" // Added col-span and padding
                  >
                    No events found for this filter.
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Wrapper>
      </div>
    </div>
  );
};

export default EventsPage;
