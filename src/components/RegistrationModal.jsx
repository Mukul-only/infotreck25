// src/components/RegistrationModal.jsx
import React, { useState, useEffect, useRef } from "react";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const participationStatements = [
  "I am willing to participate in this event.",
  "I understand that my participation is voluntary.",
  "I will adhere to the event's code of conduct and guidelines.",
  "I acknowledge that the event organizers may capture photos or videos during the event for promotional purposes.",
  "I confirm that the information I provide for registration is accurate.",
];

const RegistrationModal = ({ isOpen, onClose, event }) => {
  const [hasAgreedToStatements, setHasAgreedToStatements] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");

  const registerButtonRef = useRef(null); // Still here as per your provided code
  const isTeamEvent = event?.playerMode === "team based";

  // useEffect for button hover effect (as per your provided code)
  useEffect(() => {
    const button = registerButtonRef.current;
    if (!button) return;
    const handleMouseMove = (e) => {
      if (button.disabled) return;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      button.style.setProperty("--x", `${x}px`);
      button.style.setProperty("--y", `${y}px`);
    };
    button.addEventListener("mousemove", handleMouseMove);
    return () => button.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen, hasAgreedToStatements]);

  // useEffect to reset form state when modal opens or event changes
  useEffect(() => {
    if (isOpen) {
      setHasAgreedToStatements(false);
      setTeamName("");
      setTeamMembers("");
    }
  }, [isOpen, event]);

  if (!isOpen || !event) {
    return null;
  }

  const handleRegister = (e) => {
    console.log("handleRegister FUNCTION CALLED!");
    e.preventDefault();
    if (!hasAgreedToStatements) {
      alert("Please agree to the participation statements to register.");
      return;
    }

    let registrationMessage = ""; // Variable to hold the message

    if (isTeamEvent) {
      if (!teamName.trim()) {
        alert("Please enter a team name.");
        return;
      }
      const membersArray = teamMembers
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean);
      if (!teamMembers.trim() || membersArray.length === 0) {
        alert(
          "Please enter at least one team member's name (or your name if playing solo in a team event, if allowed)."
        );
        return;
      }
      console.log(`Registering team "${teamName}" for event: ${event.title}`);
      console.log("Team Members:", membersArray.join(", "));
      registrationMessage = `Team "${teamName}" successfully registered for ${event.title}!`; // Set message
    } else {
      console.log(`Registering for event: ${event.title}`);
      registrationMessage = `Successfully registered for ${event.title}!`; // Set message
    }

    // Show the alert BEFORE calling onClose
    alert(registrationMessage);

    console.log("Agreed to participation statements:", hasAgreedToStatements);
    onClose(); // Now close the modal
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[6000] bg-black/60 flex items-center justify-center p-4 sm:p-6 md:p-8 transition-opacity duration-300 ease-in-out" // Added more padding for larger screens
      onClick={handleOverlayClick}
    >
      {/* Modal Content Box */}
      <div
        className="bg-neutral-800 border border-neutral-700 shadow-2xl rounded-xl w-full max-w-md 
                   transform transition-all duration-300 ease-in-out 
                   flex flex-col max-h-[90vh]" // Limit height and enable flex column
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header (Not scrollable, fixed at top of modal content) */}
        <div className="flex items-center justify-between flex-shrink-0 p-5 border-b sm:p-6 border-neutral-700">
          {" "}
          {/* Added padding and border */}
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Register for Event
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 transition-colors rounded-full hover:text-white hover:bg-neutral-700" // Slightly larger tap target
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable Form Area */}
        <form
          id="registrationForm"
          onSubmit={handleRegister}
          className="flex-grow p-5 space-y-6 overflow-y-auto sm:p-6" // Add overflow-y-auto here and space-y for consistent spacing
        >
          <div>
            {" "}
            {/* Wrapped in div for consistent spacing by space-y */}
            <p className="mb-1 text-sm text-gray-300">
              You are registering for:
            </p>
            <p className="p-3 text-lg font-medium text-white rounded-md sm:text-xl bg-neutral-700">
              {event.title} ({event.playerMode})
            </p>
          </div>

          {isTeamEvent && (
            <>
              <div>
                {" "}
                {/* Wrapped in div for consistent spacing by space-y */}
                <label
                  htmlFor="teamName"
                  className="block mb-1.5 text-sm font-medium text-gray-200"
                >
                  Team Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-white placeholder-gray-400 border rounded-md bg-neutral-700 border-neutral-600 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your team's name"
                />
              </div>
              <div>
                {" "}
                {/* Wrapped in div for consistent spacing by space-y */}
                <label
                  htmlFor="teamMembers"
                  className="block mb-1.5 text-sm font-medium text-gray-200"
                >
                  Team Members <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="teamMembers"
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-white placeholder-gray-400 border rounded-md bg-neutral-700 border-neutral-600 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your Name, Member 2, Member 3 (comma-separated)"
                />
                <p className="mt-1.5 text-xs text-gray-400">
                  Enter names separated by commas. Include your name.
                </p>
              </div>
            </>
          )}

          <div>
            {" "}
            {/* Wrapped in div for consistent spacing by space-y */}
            <p className="mb-2 text-sm font-medium text-gray-200">
              Please review and agree to the following:
            </p>
            <ul className="pl-1 space-y-1.5 list-disc list-inside text-sm text-gray-300 max-h-48 overflow-y-auto bg-neutral-700/30 p-3 rounded-md border border-neutral-600/50">
              {" "}
              {/* Scroll for long list of statements */}
              {participationStatements.map((statement, index) => (
                <li key={index}>{statement}</li>
              ))}
            </ul>
          </div>

          <div>
            {" "}
            {/* Wrapped in div for consistent spacing by space-y */}
            <label
              htmlFor="agreeStatements"
              className="flex items-center p-2 -m-2 transition-colors rounded-md cursor-pointer hover:bg-neutral-700/50" // Larger clickable area
            >
              <input
                type="checkbox"
                id="agreeStatements"
                checked={hasAgreedToStatements}
                onChange={(e) => setHasAgreedToStatements(e.target.checked)}
                className="w-5 h-5 text-indigo-500 rounded cursor-pointer form-checkbox bg-neutral-700 border-neutral-600 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
              />
              <span className="ml-3 text-sm text-gray-200">
                I agree to all the above statements.
              </span>
            </label>
          </div>
        </form>

        {/* Modal Footer (Not scrollable, fixed at bottom of modal content) */}
        <div className="flex-shrink-0 p-5 border-t sm:p-6 border-neutral-700">
          {" "}
          {/* Added padding and border */}
          <button
            ref={registerButtonRef}
            type="submit" // This button is outside the form now, so we need to link it or move it back
            form="registrationForm" // Link to form by id if button is outside
            disabled={
              !hasAgreedToStatements ||
              (isTeamEvent && (!teamName.trim() || !teamMembers.trim()))
            }
            className="w-full px-4 py-3 text-base font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-700 disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
          >
            Register for this event
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
