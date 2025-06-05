// // src/components/Header.jsx
// import React, { useState, useEffect, useRef } from "react";
// import Wrapper from "../util/Wrapper";
// import Logo from "../assets/logo.svg?react";
// import "./ButtonAnimation.css"; // Import the CSS file
// import Menu from "../assets/menu.svg?react";
// import { Link } from "react-router-dom"; // Import Link

// const Header = () => {
//   // const txt = "md:text-sm lg:text-lg"; // Not used, can remove
//   const linkClasses = "duration-150 hover:font-bold hover:text-white text-gray-50 py-1"; // Added py-1 for better click area
//   const btnClasses = "px-8 py-2 rounded-full font-medium cursor-follow-btn"; // Renamed for clarity

//   const [isOpen, setIsOpen] = useState(false);
//   const loginTextRef = useRef(null);
//   const signupTextRef = useRef(null);
//   const loginBtnRef = useRef(null);
//   const signupBtnRef = useRef(null);

//   // Your existing useEffect for button animation remains the same
//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       const loginBtn = loginBtnRef.current;
//       const signupBtn = signupBtnRef.current;
//       const loginText = loginTextRef.current;
//       const signupText = signupTextRef.current;

//       if (loginBtn && loginText) {
//         const loginRect = loginBtn.getBoundingClientRect();
//         const loginCenterX = loginRect.left + loginRect.width / 2;
//         const loginCenterY = loginRect.top + loginRect.height / 2;
//         const hoverDistance = 80;
//         const distX = event.clientX - loginCenterX;
//         const distY = event.clientY - loginCenterY;
//         const distance = Math.sqrt(distX * distX + distY * distY);
//         if (distance < hoverDistance) {
//           const maxMove = 25;
//           const moveX = (distX / hoverDistance) * maxMove;
//           const moveY = (distY / hoverDistance) * maxMove;
//           loginText.style.transform = `translate(${moveX}px, ${moveY}px)`;
//         } else {
//           loginText.style.transform = "translate(0, 0)";
//         }
//       }

//       if (signupBtn && signupText) {
//         const signupRect = signupBtn.getBoundingClientRect();
//         const signupCenterX = signupRect.left + signupRect.width / 2;
//         const signupCenterY = signupRect.top + signupRect.height / 2;
//         const hoverDistance = 80;
//         const distX = event.clientX - signupCenterX;
//         const distY = event.clientY - signupCenterY;
//         const distance = Math.sqrt(distX * distX + distY * distY);
//         if (distance < hoverDistance) {
//           const maxMove = 30;
//           const moveX = (distX / hoverDistance) * maxMove;
//           const moveY = (distY / hoverDistance) * maxMove;
//           signupText.style.transform = `translate(${moveX}px, ${moveY}px)`;
//         } else {
//           signupText.style.transform = "translate(0, 0)";
//         }
//       }
//     };
//     document.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   const menuHandler = () => { // Removed 'e' as it's not used
//     setIsOpen((prev) => !prev);
//   };

//   // Function to close the menu when a link is clicked (for mobile)
//   const handleLinkClick = () => {
//     if (isOpen) {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <>
//       <Wrapper className="flex items-center justify-between w-full pt-6 pb-4 sm:pt-8 sm:pb-6"> {/* Adjusted padding */}
//         <Link to="/" className="flex items-center" onClick={handleLinkClick}>
//           <Logo className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
//           <h1 className="ml-2 tracking-tighter text-white text-[4vw] sm:text-[3vw] md:text-3xl"> {/* Added ml-2 */}
//             INFOTRECK'25
//           </h1>
//         </Link>

//         <Menu
//           className="w-8 h-8 text-white cursor-pointer lg:hidden" // Added text-white
//           onClick={menuHandler}
//         />

//         {/* Desktop Menu */}
//         <div className="items-center hidden gap-6 text-white lg:flex">
//           <Link to="/" className={linkClasses}>HOME</Link>
//           <Link to="/events" className={linkClasses}>EVENTS</Link> {/* Assuming you want an Events link */}
//           <Link to="/team" className={linkClasses}>TEAM</Link>
//           <Link to="/about" className={linkClasses}>ABOUT</Link>
//           <Link to="/contact" className={linkClasses}>CONTACT</Link>
//           <Link to="/login" className="block" ref={loginBtnRef}> {/* Wrap Link around button logic */}
//             <button className={`${btnClasses} bg-white text-dark`}>
//               <span ref={loginTextRef} className="relative z-10 text-container"> {/* Ensure text is above */}
//                 LOGIN
//               </span>
//               <div className="btn-hover-area"></div>
//             </button>
//           </Link>
//           <Link to="/signup" className="block" ref={signupBtnRef}> {/* Wrap Link around button logic */}
//             <button className={`${btnClasses} border border-white text-white`}> {/* Added text-white for consistency */}
//               <span ref={signupTextRef} className="relative z-10 text-container">
//                 SIGNUP
//               </span>
//               <div className="btn-hover-area"></div>
//             </button>
//           </Link>
//         </div>
//       </Wrapper>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="absolute z-50 flex flex-col items-center w-full gap-3 px-6 py-6 mx-auto mt-2 text-lg transform -translate-x-1/2 lg:hidden left-1/2 bg-neutral-800/80 backdrop-blur-lg rounded-xl sm:w-auto sm:max-w-xs">
//           {/* Using w-full on mobile to stretch, with padding */}
//           <Link to="/" className={linkClasses} onClick={handleLinkClick}>HOME</Link>
//           <div className="w-full h-[0.4px] bg-gray-700" />
//           <Link to="/events" className={linkClasses} onClick={handleLinkClick}>EVENTS</Link>
//           <div className="w-full h-[0.4px] bg-gray-700" />
//           <Link to="/team" className={linkClasses} onClick={handleLinkClick}>TEAM</Link>
//           <div className="w-full h-[0.4px] bg-gray-700" />
//           <Link to="/about" className={linkClasses} onClick={handleLinkClick}>ABOUT</Link>
//           <div className="w-full h-[0.4px] bg-gray-700" />
//           <Link to="/contact" className={linkClasses} onClick={handleLinkClick}>CONTACT</Link>
//           <div className="w-full h-[0.4px] bg-gray-700" />

//           <Link to="/login" className="w-full mt-2" onClick={handleLinkClick}>
//             <button className={`${btnClasses} bg-white text-dark w-full`}> {/* Button is full width */}
//               <span ref={loginTextRef} className="relative z-10 text-container"> {/* Re-apply refs if needed here too, but careful with multiple refs for same logical element */}
//                 LOGIN
//               </span>
//                {/* Hover area might not work as well on mobile, consider simpler style */}
//             </button>
//           </Link>
//           <Link to="/signup" className="w-full mt-1" onClick={handleLinkClick}>
//             <button className={`${btnClasses} border border-white text-white w-full`}>
//               <span ref={signupTextRef} className="relative z-10 text-container">
//                 SIGNUP
//               </span>
//             </button>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;

// src/components/Header.jsx
// import React, { useState, useEffect, useRef } from "react";
// import Wrapper from "../util/Wrapper";
// import Logo from "../assets/logo.svg?react";
// import "./ButtonAnimation.css"; // Import the CSS file
// import Menu from "../assets/menu.svg?react";
// import { Link } from "react-router-dom"; // Import Link

// const Header = () => {
//   // const txt = "md:text-sm lg:text-lg"; // Not used, can remove
//   const linkClasses =
//     "duration-150 hover:font-bold hover:text-white text-gray-50 py-1"; // Added py-1 for better click area
//   const btnClasses = "px-8 py-2 rounded-full font-medium cursor-follow-btn"; // Renamed for clarity

//   const [isOpen, setIsOpen] = useState(false);
//   const loginTextRef = useRef(null);
//   const signupTextRef = useRef(null);
//   const loginBtnRef = useRef(null);
//   const signupBtnRef = useRef(null);

//   // Your existing useEffect for button animation remains the same
//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       const loginBtn = loginBtnRef.current;
//       const signupBtn = signupBtnRef.current;
//       const loginText = loginTextRef.current;
//       const signupText = signupTextRef.current;

//       if (loginBtn && loginText) {
//         const loginRect = loginBtn.getBoundingClientRect();
//         const loginCenterX = loginRect.left + loginRect.width / 2;
//         const loginCenterY = loginRect.top + loginRect.height / 2;
//         const hoverDistance = 80;
//         const distX = event.clientX - loginCenterX;
//         const distY = event.clientY - loginCenterY;
//         const distance = Math.sqrt(distX * distX + distY * distY);
//         if (distance < hoverDistance) {
//           const maxMove = 25;
//           const moveX = (distX / hoverDistance) * maxMove;
//           const moveY = (distY / hoverDistance) * maxMove;
//           loginText.style.transform = `translate(${moveX}px, ${moveY}px)`;
//         } else {
//           loginText.style.transform = "translate(0, 0)";
//         }
//       }

//       if (signupBtn && signupText) {
//         const signupRect = signupBtn.getBoundingClientRect();
//         const signupCenterX = signupRect.left + signupRect.width / 2;
//         const signupCenterY = signupRect.top + signupRect.height / 2;
//         const hoverDistance = 80;
//         const distX = event.clientX - signupCenterX;
//         const distY = event.clientY - signupCenterY;
//         const distance = Math.sqrt(distX * distX + distY * distY);
//         if (distance < hoverDistance) {
//           const maxMove = 30;
//           const moveX = (distX / hoverDistance) * maxMove;
//           const moveY = (distY / hoverDistance) * maxMove;
//           signupText.style.transform = `translate(${moveX}px, ${moveY}px)`;
//         } else {
//           signupText.style.transform = "translate(0, 0)";
//         }
//       }
//     };
//     document.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   const menuHandler = () => {
//     // Removed 'e' as it's not used
//     setIsOpen((prev) => !prev);
//   };

//   // Function to close the menu when a link is clicked (for mobile)
//   const handleLinkClick = () => {
//     if (isOpen) {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <>
//       <Wrapper className="relative flex items-center justify-between w-full pt-6 pb-4 sm:pt-8 sm:pb-6">
//         {" "}
//         {/* Adjusted padding */}
//         <Link to="/" className="flex items-center" onClick={handleLinkClick}>
//           <Logo className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
//           <h1 className="ml-2 tracking-tighter text-white text-[4vw] sm:text-[3vw] md:text-3xl">
//             {" "}
//             {/* Added ml-2 */}
//             INFOTRECK'25
//           </h1>
//         </Link>
//         <Menu
//           className="w-8 h-8 text-white cursor-pointer lg:hidden" // Added text-white
//           onClick={menuHandler}
//         />
//         {/* Desktop Menu */}
//         <div className="items-center hidden gap-6 text-white lg:flex">
//           <Link to="/" className={linkClasses}>
//             HOME
//           </Link>
//           <Link to="/events" className={linkClasses}>
//             EVENTS
//           </Link>{" "}
//           {/* Assuming you want an Events link */}
//           <Link to="/team" className={linkClasses}>
//             TEAM
//           </Link>
//           <Link to="/about" className={linkClasses}>
//             ABOUT
//           </Link>
//           <Link to="/contact" className={linkClasses}>
//             CONTACT
//           </Link>
//           <Link to="/login" className="block" ref={loginBtnRef}>
//             {" "}
//             {/* Wrap Link around button logic */}
//             <button className={`${btnClasses} bg-white text-dark`}>
//               <span ref={loginTextRef} className="relative z-10 text-container">
//                 {" "}
//                 {/* Ensure text is above */}
//                 LOGIN
//               </span>
//               <div className="btn-hover-area"></div>
//             </button>
//           </Link>
//           <Link to="/signup" className="block" ref={signupBtnRef}>
//             {" "}
//             {/* Wrap Link around button logic */}
//             <button className={`${btnClasses} border border-white text-white`}>
//               {" "}
//               {/* Added text-white for consistency */}
//               <span
//                 ref={signupTextRef}
//                 className="relative z-10 text-container"
//               >
//                 SIGNUP
//               </span>
//               <div className="btn-hover-area"></div>
//             </button>
//           </Link>
//         </div>
//         {isOpen && (
//           <div className="absolute z-50 flex flex-col items-center gap-3 px-6 py-6 text-lg transform -translate-x-1/2 border w-9/10 top-full lg:hidden left-1/2 bg-background border-bdr rounded-xl ">
//             {/* Using w-full on mobile to stretch, with padding */}
//             <Link to="/" className={linkClasses} onClick={handleLinkClick}>
//               HOME
//             </Link>
//             <div className="w-full h-[0.4px] bg-bdr" />
//             <Link
//               to="/events"
//               className={linkClasses}
//               onClick={handleLinkClick}
//             >
//               EVENTS
//             </Link>
//             <div className="w-full h-[0.4px] bg-bdr" />
//             <Link to="/team" className={linkClasses} onClick={handleLinkClick}>
//               TEAM
//             </Link>
//             <div className="w-full h-[0.4px] bg-bdr" />
//             <Link to="/about" className={linkClasses} onClick={handleLinkClick}>
//               ABOUT
//             </Link>
//             <div className="w-full h-[0.4px] bg-bdr" />
//             <Link
//               to="/contact"
//               className={linkClasses}
//               onClick={handleLinkClick}
//             >
//               CONTACT
//             </Link>
//             <div className="w-full h-[0.4px] bg-bdr" />

//             <Link to="/login" className="w-full mt-2" onClick={handleLinkClick}>
//               <button className={`${btnClasses} bg-white text-dark w-full`}>
//                 {" "}
//                 {/* Button is full width */}
//                 <span
//                   ref={loginTextRef}
//                   className="relative z-10 text-container"
//                 >
//                   {" "}
//                   {/* Re-apply refs if needed here too, but careful with multiple refs for same logical element */}
//                   LOGIN
//                 </span>
//                 {/* Hover area might not work as well on mobile, consider simpler style */}
//               </button>
//             </Link>
//             <Link
//               to="/signup"
//               className="w-full mt-1"
//               onClick={handleLinkClick}
//             >
//               <button
//                 className={`${btnClasses} border border-white text-white w-full`}
//               >
//                 <span
//                   ref={signupTextRef}
//                   className="relative z-10 text-container"
//                 >
//                   SIGNUP
//                 </span>
//               </button>
//             </Link>
//           </div>
//         )}
//       </Wrapper>
//     </>
//   );
// };

// export default Header;

// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import Wrapper from "../util/Wrapper";
import Logo from "../assets/logo.svg?react";
import "./ButtonAnimation.css"; // Import the CSS file
import MenuIcon from "../assets/menu.svg?react"; // Renamed for clarity if we use FiMenu below
import { Link } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiInfo,
  FiMail as FiContactMail, // Aliasing for clarity, FiMail is also used for contact
  FiLogIn,
  FiUserPlus,
  FiMenu, // Optional: if you want to replace the SVG menu icon
} from "react-icons/fi";

const Header = () => {
  const linkClasses =
    "duration-150 hover:font-bold hover:text-white text-gray-50 py-1 flex items-center gap-2"; // Added flex, items-center, gap-2
  const btnClasses = "px-8 py-2 rounded-full font-medium cursor-follow-btn";

  const [isOpen, setIsOpen] = useState(false);
  const loginTextRef = useRef(null);
  const signupTextRef = useRef(null);
  const loginBtnRef = useRef(null);
  const signupBtnRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const loginBtn = loginBtnRef.current;
      const signupBtn = signupBtnRef.current;
      const loginText = loginTextRef.current;
      const signupText = signupTextRef.current;

      if (loginBtn && loginText) {
        const loginRect = loginBtn.getBoundingClientRect();
        const loginCenterX = loginRect.left + loginRect.width / 2;
        const loginCenterY = loginRect.top + loginRect.height / 2;
        const hoverDistance = 80;
        const distX = event.clientX - loginCenterX;
        const distY = event.clientY - loginCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < hoverDistance) {
          const maxMove = 25;
          const moveX = (distX / hoverDistance) * maxMove;
          const moveY = (distY / hoverDistance) * maxMove;
          loginText.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          loginText.style.transform = "translate(0, 0)";
        }
      }

      if (signupBtn && signupText) {
        const signupRect = signupBtn.getBoundingClientRect();
        const signupCenterX = signupRect.left + signupRect.width / 2;
        const signupCenterY = signupRect.top + signupRect.height / 2;
        const hoverDistance = 80;
        const distX = event.clientX - signupCenterX;
        const distY = event.clientY - signupCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < hoverDistance) {
          const maxMove = 30;
          const moveX = (distX / hoverDistance) * maxMove;
          const moveY = (distY / hoverDistance) * maxMove;
          signupText.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          signupText.style.transform = "translate(0, 0)";
        }
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const menuHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  // For mobile buttons, we create separate refs if we want independent animation
  // or skip animation if it's complex. For now, we'll add icons without new refs
  // for animation on mobile buttons to keep it simpler.
  // const mobileLoginTextRef = useRef(null);
  // const mobileSignupTextRef = useRef(null);

  return (
    <>
      <Wrapper className="relative flex items-center justify-between w-full pt-6 pb-4 sm:pt-8 sm:pb-6">
        <Link to="/" className="flex items-center" onClick={handleLinkClick}>
          <Logo className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          <h1 className="ml-2 tracking-tighter text-white text-[4vw] sm:text-[3vw] md:text-3xl">
            INFOTREK'25
          </h1>
        </Link>

        {/* Using FiMenu for consistency, or keep your MenuIcon SVG */}
        <MenuIcon
          className="w-8 h-8 text-white cursor-pointer lg:hidden" // Added text-white
          onClick={menuHandler}
        />

        {/* Desktop Menu */}
        <div className="items-center hidden gap-6 text-white lg:flex">
          <Link to="/" className={linkClasses}>
            <FiHome className="w-4 h-4" /> HOME
          </Link>
          <Link to="/events" className={linkClasses}>
            <FiCalendar className="w-4 h-4" /> EVENTS
          </Link>
          <Link to="/team" className={linkClasses}>
            <FiUsers className="w-4 h-4" /> TEAM
          </Link>
          <Link to="/about" className={linkClasses}>
            <FiInfo className="w-4 h-4" /> ABOUT
          </Link>
          <Link to="/contact" className={linkClasses}>
            <FiContactMail className="w-4 h-4" /> CONTACT
          </Link>

          <Link to="/login" className="block" ref={loginBtnRef}>
            <button
              className={`${btnClasses} bg-white text-dark flex items-center justify-center gap-2`}
            >
              {/* Added flex, items-center, justify-center, gap-2 */}
              <span
                ref={loginTextRef}
                className="relative z-10 flex items-center justify-center gap-2 text-container"
              >
                <p>LOGIN</p>
                <FiLogIn className="relative z-10 w-4 h-4" />{" "}
              </span>
              {/* Icon next to animated text */}
              <div className="btn-hover-area"></div>
            </button>
          </Link>
          <Link to="/signup" className="block" ref={signupBtnRef}>
            <button
              className={`${btnClasses} border border-white text-white flex items-center justify-center gap-2`}
            >
              {/* Added flex, items-center, justify-center, gap-2 */}
              <span
                ref={signupTextRef}
                className="relative z-10 flex items-center justify-center gap-2 text-container"
              >
                <p>SIGNUP</p>
                <FiUserPlus className="relative z-10 w-4 h-4" />
              </span>
              {/* Icon next to animated text */}
              <div className="btn-hover-area"></div>
            </button>
          </Link>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute z-50 flex flex-col items-stretch gap-3 px-6 py-6 text-lg transform -translate-x-1/2 border w-9/10 top-full lg:hidden left-1/2 bg-background border-bdr rounded-xl ">
            {/* items-stretch makes links full width by default if they are flex children */}
            <Link to="/" className={linkClasses} onClick={handleLinkClick}>
              <FiHome className="w-5 h-5" /> HOME
            </Link>
            <div className="w-full h-[0.4px] bg-bdr" />
            <Link
              to="/events"
              className={linkClasses}
              onClick={handleLinkClick}
            >
              <FiCalendar className="w-5 h-5" /> EVENTS
            </Link>
            <div className="w-full h-[0.4px] bg-bdr" />
            <Link to="/team" className={linkClasses} onClick={handleLinkClick}>
              <FiUsers className="w-5 h-5" /> TEAM
            </Link>
            <div className="w-full h-[0.4px] bg-bdr" />
            <Link to="/about" className={linkClasses} onClick={handleLinkClick}>
              <FiInfo className="w-5 h-5" /> ABOUT
            </Link>
            <div className="w-full h-[0.4px] bg-bdr" />
            <Link
              to="/contact"
              className={linkClasses}
              onClick={handleLinkClick}
            >
              <FiContactMail className="w-5 h-5" /> CONTACT
            </Link>
            <div className="w-full h-[0.4px] bg-bdr" />

            <Link to="/login" className="w-full mt-2" onClick={handleLinkClick}>
              <button
                className={`${btnClasses} bg-white text-dark w-full flex items-center justify-center gap-2`}
              >
                {/* Not applying text animation refs here to avoid conflicts, mobile animation can be complex */}
                <span className="relative z-10">LOGIN</span>
                <FiLogIn className="relative z-10 w-5 h-5" />
              </button>
            </Link>
            <Link
              to="/signup"
              className="w-full mt-1"
              onClick={handleLinkClick}
            >
              <button
                className={`${btnClasses} border border-white text-white w-full flex items-center justify-center gap-2`}
              >
                <span className="relative z-10">SIGNUP</span>
                <FiUserPlus className="relative z-10 w-5 h-5" />
              </button>
            </Link>
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default Header;
