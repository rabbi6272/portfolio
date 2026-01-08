import React, { useState, useEffect, useCallback } from "react";

const Typewriter = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // Reset on text change
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
          onComplete();
        }
      }, 50); // Typing speed in ms
      return () => clearInterval(intervalId);
    }
  }, [text, onComplete]);

  return (
    <p className="text-lg md:text-xl text-space-light/90 font-sans min-h-14">
      {displayedText}
    </p>
  );
};

export const LoadingScreen = ({ onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [lineIsVisible, setLineIsVisible] = useState(true);

  const lines = [
    "Systems initializing...",
    "Neural networks booting...",
    "Portfolio loading...",
    "Preparing to amaze you...",
  ];

  const handleTypingComplete = useCallback(() => {
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (isTyping) return; // Wait for typing to finish

    const isLastLine = currentLineIndex === lines.length - 1;
    const readTime = isLastLine ? 2000 : 1500;
    const fadeDuration = 500;

    // After reading, start fading out the current line
    const fadeOutTimer = setTimeout(() => {
      setLineIsVisible(false);
    }, readTime);

    // After the fade-out animation completes, advance to the next state
    const nextLineTimer = setTimeout(() => {
      if (isLastLine) {
        setFadeOut(true); // Trigger fade-out for the whole screen
      } else {
        setCurrentLineIndex((prev) => prev + 1);
        setLineIsVisible(true); // Make the next line visible
        setIsTyping(true); // Start typing the next line
      }
    }, readTime + fadeDuration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(nextLineTimer);
    };
  }, [isTyping, currentLineIndex, lines.length]);

  useEffect(() => {
    // Handles the final fade-out and completion call.
    if (fadeOut) {
      const timer = setTimeout(onComplete, 1000); // Wait for fade-out animation
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onComplete]);

  const handleSkip = () => {
    setFadeOut(true);
  };

  return (
    <div
      className={`fixed inset-0 bg-space-dark z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute top-5 right-5">
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-sm font-bold text-space-light/70 bg-space-blue/50 border border-slate-700 rounded-md hover:bg-space-blue hover:text-white transition-colors"
          aria-label="Skip intro"
        >
          Skip Intro
        </button>
      </div>

      <div className="text-center mb-12 animate-pulse">
        <h1
          className="text-5xl md:text-7xl font-heading text-accent-cyan"
          style={{ textShadow: "0 0 15px rgba(34, 211, 238, 0.7)" }}
        >
          TEAM ARUN
        </h1>
        <p className="text-xl md:text-2xl font-sans text-space-light/80 tracking-widest mt-2">
          Launch Countdown Log
        </p>
      </div>

      <div className="w-full max-w-3xl p-6 bg-space-blue/30 backdrop-blur-sm border border-slate-700/60 rounded-lg shadow-2xl min-h-40 flex items-center">
        <div
          className={`w-full transition-opacity duration-500 ${
            lineIsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Typewriter
            text={lines[currentLineIndex]}
            onComplete={handleTypingComplete}
          />
        </div>
      </div>
    </div>
  );
};
