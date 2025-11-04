"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationControls, type Variants } from 'framer-motion';
import Image from 'next/image';

/**
 * @info
 * A component to render a single, simple stroke for the 'M'.
 * It has one color and an animation for "drawing" (pathLength).
 * Now accepts a 'delay' prop for staggered, overlapping animation.
 */
function AnimatedStroke({ path, color, controls, delay }: { path: string; color: string; controls: any; delay: number }) {
  const strokeVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { 
        duration: 0.6, // Each stroke still takes 0.6s to draw
        ease: 'easeInOut' as const, 
        delay: delay // This is the new part for overlapping
      }
    },
  };

  return (
    <motion.path
      d={path}
      fill="transparent"
      stroke={color}
      strokeWidth="12" // Kept the thinner stroke
      strokeLinecap="butt" // For rectangle corners
      variants={strokeVariants}
      animate={controls}
      initial="hidden"
    />
  );
}

/**
 * @info
 * A full-screen intro animation featuring a "writing" 'M' logo
 * with 4 strokes, and text, which then fades out with a zoom-in effect.
 */
function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [showText, setShowText] = useState(false);
  const [showMLSALogo, setShowMLSALogo] = useState(false); // New state for MLSA logo

  // Use the exact hex color you requested
  const MColor = "#060757";

  // "Closer" paths
  const path1 = "M 30 80 L 30 20"; // Length 60
  const path2 = "M 30 20 L 50 80"; // Length ~63
  const path3 = "M 50 80 L 70 20"; // Length ~63
  const path4 = "M 70 20 L 70 80"; // Length 60

  // Animation controls for each of the 4 paths
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();
  const controls3 = useAnimationControls();
  const controls4 = useAnimationControls();

  useEffect(() => {
    // Start all M animations
    controls1.start("visible");
    controls2.start("visible");
    controls3.start("visible");
    controls4.start("visible");

    // Show the text after the 'M' has finished drawing
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2300); // 1.7s (last delay) + 0.6s (draw duration) = 2.3s

    // Show the MLSA logo after the main screen fade-in is complete
    const mlsaLogoTimer = setTimeout(() => {
      setShowMLSALogo(true);
    }, 500); // After the initial 0.5s screen fade-in

    return () => {
      clearTimeout(textTimer);
      clearTimeout(mlsaLogoTimer);
    };
  }, [controls1, controls2, controls3, controls4]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      // Added initial and animate for a fade-in effect for the whole screen
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // Quick fade-in for the whole screen
      // Exit animation: fade out and ZOOM IN
      exit={{ opacity: 0, scale: 1.5 }}
      onAnimationComplete={onComplete}
    >
      {/* MLSA Logo - positioned top-left */}
      <AnimatePresence>
        {showMLSALogo && (
          <motion.img
            src="https://www.mlsakiit.com/_next/image?url=/mlsaLogo2.png&w=828&q=75"
            alt="MLSA MIET Logo"
            className="absolute top-4 left-4 h-12 w-auto md:h-16 z-10" // Adjust size as needed
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Container for the SVG to set a max size */}
      <div className="w-full max-w-xs md:max-w-md">
        <motion.svg
          viewBox="0 0 100 100" // Adjusted viewBox for new paths
          className="w-full h-auto overflow-visible"
        >
          {/* Render the 4 animated strokes with staggered delays */}
          <AnimatedStroke path={path1} color={MColor} controls={controls1} delay={0.5} />
          <AnimatedStroke path={path2} color={MColor} controls={controls2} delay={0.9} /> 
          <AnimatedStroke path={path3} color={MColor} controls={controls3} delay={1.3} />
          <AnimatedStroke path={path4} color={MColor} controls={controls4} delay={1.7} />
        </motion.svg>
      </div>

      {/* The "Creepy" text animation - will only appear when showText is true */}
      <AnimatePresence>
        {showText && (
          <motion.h1
            // Using inline style to avoid config file
            className="mt-4 text-2xl md:text-3xl text-white"
            style={{ fontFamily: 'Eater', fontWeight: '200', fontSize: '30px' }} // Inline style for font
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            MLSA Originals
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- NEW STRANGER THINGS LANDING PAGE COMPONENT ---

function StrangerLandingPage() {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const targetWord = "RUN";
  const hashedWord = "UlVO"; // "RUN" in Base64

  const checkAnswer = () => {
    if (guess.toUpperCase() === targetWord) {
      setMessage("SUCCESS: YOU CRACKED THE CODE.");
    } else {
      setMessage("ERROR: INCORRECT. TRY AGAIN.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <motion.div 
      className="text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }} // Fade in after intro fades out
    >
      {/* SECTION 1: HERO (Full screen, background image only)
      */}
      <section 
        className="relative flex flex-col min-h-[75vh] sm:min-h-[85vh] md:min-h-screen text-white p-4 overflow-hidden"
      >
        {/* Background image constrained by responsive width container */}
        <div className="absolute inset-0 z-0 flex justify-center">
          <div className="relative h-full w-[95%] sm:w-[95%] md:w-full">
            <Image
              src="/samarambh-backg.jpg"
              alt="Background"
              sizes="(max-width: 768px) 90vw, (max-width: 1280px) 95vw, 100vw"
              priority
              unoptimized
              fill
              className="object-cover object-[center_30%] scale-110 sm:scale-110 md:scale-105 lg:scale-100 transition-transform duration-500"
            />
          </div>
        </div>
        {/* Semi-transparent overlay for readability */}
        {/* <div className="absolute inset-0 bg-black/40 z-10"></div> */}
        
        {/* Header with MLSA Logo */}
        <header className="relative z-20 w-full p-4">
          <img
            src="https://www.mlsakiit.com/_next/image?url=/mlsaLogo2.png&w=828&q=75"
            alt="MLSA MIET Logo"
            className="h-12 w-auto md:h-16"
          />
        </header>
        
        {/* Hero Content (Flicker Text) - REMOVED FROM HERE */}
        
        {/* Optional: "Scroll Down" arrow to hint at more content */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20">
          <a href="#title-section" className="animate-bounce">
            <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* NEW SECTION 2: TITLE (Moved from Hero)
      */}
      <section 
        id="title-section" // Link target for scroll arrow
        className="relative z-10 flex flex-col items-center justify-center text-center bg-black py-20 md:py-32"
      >
        <h1 
          className="text-3xl sm:text-4xl md:text-6xl text-red-600 flicker-text"
          style={{ fontFamily: 'Bungee, cursive' }}
        >
          MLSA MIET
        </h1>
        <h2 
          className="text-2xl sm:text-3xl md:text-5xl text-white mt-2"
          style={{ fontFamily: 'Bungee, cursive' }}
        >
          PRESENTS
        </h2>
      </section>

      {/* SECTION 3: HASHING GAME (Separate section, black bg)
      */}
      <section 
        id="game-section" // ID for the scroll-down link
        className="relative z-10 flex flex-col items-center justify-center bg-black p-6 sm:p-8 md:p-12 pb-16 sm:pb-20 md:pb-32" // Reduced vertical padding
      >
        <div className="p-4 sm:p-6 md:p-8 bg-black border-2 border-red-900 rounded-lg shadow-2xl shadow-red-900/50 w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          <h3 
            className="text-xl sm:text-2xl md:text-3xl text-red-500 flicker-text text-center"
            style={{ fontFamily: 'Bungee, cursive' }}
          >
            THE HASHING CHALLENGE
          </h3>
          <p className="mt-3 sm:mt-4 text-gray-300 text-center text-sm sm:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
            The signal is corrupted. Decrypt the message to proceed.
          </p>
          
          <div className="my-4 sm:my-6 p-3 sm:p-4 bg-gray-900 border border-gray-700 rounded-md">
            <p className="text-sm text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>ENCRYPTED MESSAGE:</p>
            <p 
              className="text-2xl sm:text-3xl text-green-400"
              style={{ fontFamily: 'monospace' }}
            >
              {hashedWord}
            </p>
          </div>

          <p className="text-gray-400 text-sm sm:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
            Brute-force the original word:
          </p>
          <input 
            type="text"
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
              setMessage(""); // Clear message on new input
            }}
            onKeyPress={handleKeyPress}
            placeholder="TYPE HERE..."
            className="mt-2 w-full px-3 py-2 sm:px-4 sm:py-3 bg-transparent border-b-2 border-red-500 text-white text-base sm:text-xl text-center uppercase placeholder-gray-600 focus:outline-none focus:border-red-400 focus:bg-gray-900/50"
            style={{ fontFamily: 'monospace' }}
          />
          <button
            onClick={checkAnswer}
            className="mt-6 w-full px-4 py-2 sm:px-6 sm:py-3 bg-red-600 text-white text-base sm:text-lg rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-red-700 hover:shadow-red-500/50 focus:outline-none"
            style={{ fontFamily: 'Bungee, cursive' }}
          >
            DECRYPT
          </button>

          {message && (
            <p 
              className={`mt-4 text-lg text-center ${message.startsWith("SUCCESS") ? 'text-green-400' : 'text-red-400'}`}
              style={{ fontFamily: 'monospace' }}
            >
              {message}
            </p>
          )}
        </div>
      </section>
    </motion.div>
  );
}


/**
 * @info
 * This is the main App component.
 * It controls whether the intro or the main site content is visible.
 */
export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Hide the intro after a delay
  useEffect(() => {
    // Total intro time:
    // 0.5s (fade-in)
    // + 1.7s (last delay) + 0.6s (draw time) = 2.3s
    // + 0.7s (text fade-in)
    // + 1.0s (hold time)
    // = 4.5s
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4500); // 4.5 seconds total before triggering the 1s exit animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black">
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={() => {}} />}
      </AnimatePresence>

      {/* This is your main landing page content. */}
      {/* --- MODIFIED SECTION --- */}
      {/* This now renders your Stranger Things landing page! */}
      {!showIntro && (
        <StrangerLandingPage />
      )}
    </div>
  );
}

