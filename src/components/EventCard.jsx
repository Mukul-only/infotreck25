import React, { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
import Join from "../assets/join.svg?react";
import RegistrationModal from "./RegistrationModal";
import EventDetailsModal from "./EventDetailsModal";

// Make sure your CSS file with the .button-creative-effect styles is imported
// For example, if it's in src/index.css or src/App.css, it's likely already globally available.
// If you use CSS Modules: import styles from './EventCard.module.css';
// And then className={styles['button-creative-effect']}

const EventCard = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const joinButtonRef = useRef(null); // Create a ref for the join button

  // Effect for handling mouse move on the join button
  useEffect(() => {
    const button = joinButtonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      button.style.setProperty("--x", `${x}px`);
      button.style.setProperty("--y", `${y}px`);
    };

    button.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const handleOpenDetailsModal = () => setIsDetailsModalOpen(true);
  const handleCloseDetailsModal = () => setIsDetailsModalOpen(false);

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const details = [event.eventType, event.playerMode, event.subCategory]
    .filter(Boolean)
    .join(" • ");

  const paddingTopPercentage = (300 / 362) * 100;

  const handleMouseEnterCard = () => setShowTooltip(true);
  const handleMouseLeaveCard = () => setShowTooltip(false);
  const handleMouseMoveCard = (e) => {
    setTooltipPosition({ x: e.clientX + 15, y: e.clientY + 10 });
  };

  return (
    <>
      <div
        className="flex flex-col w-full max-w-[362px] rounded-2xl shadow-xl overflow-hidden bg-neutral-800 cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-out mx-auto relative"
        onClick={handleOpenDetailsModal}
        style={{ backgroundColor: "#18181b" }}
        onMouseEnter={handleMouseEnterCard}
        onMouseLeave={handleMouseLeaveCard}
        onMouseMove={handleMouseMoveCard}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingTop: `${paddingTopPercentage}%` }}
        >
          <img
            src={event.image}
            alt={event.title}
            className="absolute top-0 left-0 object-cover w-full h-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x200?text=Event+Image";
              e.target.alt = "Placeholder Image";
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 p-4 sm:p-5"
            style={{
              background:
                "linear-gradient(to top, rgba(11, 11, 15, 0.95) 20%, rgba(11, 11, 15, 0.7) 60%, transparent 100%)",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-grow min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-0.5 truncate">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-300 truncate sm:text-sm">
                  {details}
                </p>
              </div>
              <button
                ref={joinButtonRef} // Assign the ref here
                onClick={handleOpenModal}
                onMouseEnter={(e) => e.stopPropagation()}
                onMouseLeave={(e) => e.stopPropagation()}
                // No need to stopPropagation for mousemove on the button itself for THIS effect
                // as the effect's JS listener is directly on the button.
                // However, if it affects the card's tooltip, you might want to keep it.
                // For now, let's assume we don't need to stopPropagation mousemove for the effect itself.
                // onMouseMove={(e) => e.stopPropagation()}
                className={`
                  button-creative-effect /* Add our new effect class */
                  flex-shrink-0 /* Keep */
                  font-semibold /* Keep */
                  py-2 px-3 sm:px-4 /* Keep for padding */
                  rounded-full /* Keep for shape */
                  text-xs sm:text-sm /* Keep for font size */
                  whitespace-nowrap /* Keep */
                  /* Tailwind's bg-white, text-black, hover:bg-gray-200, active:bg-gray-300 are overridden by .button-creative-effect if it has more specific or later-defined styles for background and color.
                     If you want to keep the original white button and just have the glow, you'd adjust the .button-creative-effect CSS background/color.
                     For the provided effect, a dark button is assumed.
                  */
                `}
              >
                {/* Wrap icon and text in a span for z-index control and targeted text color change */}
                <span className="button-text-glow relative z-[1] flex items-center gap-1.5 sm:gap-2 transition-colors duration-300 ease-in-out">
                  <Join className="w-4 h-4 sm:w-5 sm:h-5" />
                  Join
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showTooltip && (
        <div
          style={{
            position: "fixed",
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            zIndex: 1000,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          Click for event details
        </div>
      )}

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={event}
      />

      {isDetailsModalOpen && (
        <EventDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          event={event}
        />
      )}
    </>
  );
};

export default EventCard;
