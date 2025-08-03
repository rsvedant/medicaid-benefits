"use client";

// App.jsx
import React from 'react';
import { motion } from 'framer-motion';

// This is the main component for the landing page.
// We're using functional components and hooks for modern React practices.
const App = () => {

  // A component to simulate a lucide-react icon to avoid external library imports.
  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );

  const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
  
  const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucude-timer">
      <path d="M10 2h4" />
      <path d="M12 14v-4" />
      <path d="M4 13a8 8 0 1 0 16 0A8 8 0 1 0 4 13" />
    </svg>
  );

  // Framer Motion variants for staggered animations.
  // The 'container' variant is for the parent element.
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // This adds a delay between child animations.
        delayChildren: 0.1,   // This adds a delay before the first child animates.
      },
    },
  };

  // The 'item' variant is for the child elements.
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-100 font-[Inter] text-gray-800 antialiased">
      {/* Header/Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
        className="fixed top-0 z-50 w-full bg-white/70 backdrop-blur-lg shadow-sm"
      >
        <nav className="container mx-auto flex items-center justify-between p-4">
          <motion.a href="#" className="flex items-center space-x-2" variants={item}>
            <span className="font-bold text-xl text-black">Benefits Check</span>
          </motion.a>
          <motion.div className="flex items-center space-x-4" variants={container} initial="hidden" animate="show">
            <motion.a
              href="/auth/sign-in"
              className="text-sm font-medium text-black border border-black rounded-md px-4 py-2 transition-colors hover:bg-gray-200"
              variants={item}
            >
              Login
            </motion.a>
            <motion.a
              href="/auth/sign-up"
              className="text-sm font-medium bg-black text-white rounded-md px-4 py-2 transition-colors hover:bg-gray-800"
              variants={item}
            >
              Sign Up
            </motion.a>
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight" variants={item}>
            Your Path to Financial Security <br className="hidden md:inline"/>Starts Here.
          </motion.h1>
          <motion.p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto" variants={item}>
            Easily and confidentially check your eligibility for Medicaid and SNAP benefits in just a few minutes.
          </motion.p>
          <motion.div className="mt-8 flex justify-center space-x-4" variants={item}>
            <button
              className="inline-flex items-center justify-center rounded-md bg-black px-8 py-3 text-base font-medium text-white shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Check My Eligibility
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-black" variants={item}>Features Designed for You</motion.h2>
          <motion.p className="mt-4 text-gray-500 max-w-xl mx-auto" variants={item}>
            We've built a simple, secure, and intuitive platform to make the process as stress-free as possible.
          </motion.p>

          <motion.div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" variants={container}>
            <motion.div className="bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-sm" variants={item}>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 text-black mb-4">
                <CheckIcon />
              </div>
              <h3 className="text-lg font-semibold text-black">Effortless Eligibility Check</h3>
              <p className="mt-2 text-sm text-gray-600">
                Our guided questionnaire makes it easy to understand if you qualify, without any complicated jargon.
              </p>
            </motion.div>

            <motion.div className="bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-sm" variants={item}>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 text-black mb-4">
                <LockIcon />
              </div>
              <h3 className="text-lg font-semibold text-black">Secure & Confidential</h3>
              <p className="mt-2 text-sm text-gray-600">
                Your personal information is always protected. We use advanced security to keep your data safe.
              </p>
            </motion.div>

            <motion.div className="bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-sm" variants={item}>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 text-black mb-4">
                <ClockIcon />
              </div>
              <h3 className="text-lg font-semibold text-black">Time-Saving</h3>
              <p className="mt-2 text-sm text-gray-600">
                Skip the long forms and phone calls. Get an instant, preliminary result from the comfort of your home.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-100">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-black" variants={item}>How It Works</motion.h2>
          <motion.p className="mt-4 text-gray-600 max-w-xl mx-auto" variants={item}>
            The process is quick, simple, and transparent.
          </motion.p>

          <motion.div className="mt-12 grid gap-8 sm:grid-cols-3" variants={container}>
            <motion.div className="flex flex-col items-center" variants={item}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-black text-white font-bold text-2xl shadow-lg">1</div>
              <h3 className="mt-4 text-xl font-semibold text-black">Answer Questions</h3>
              <p className="mt-2 text-gray-600 text-center">Tell us about your household size and income.</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={item}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-black text-white font-bold text-2xl shadow-lg">2</div>
              <h3 className="mt-4 text-xl font-semibold text-black">Get Instant Results</h3>
              <p className="mt-2 text-gray-600 text-center">Receive a preliminary eligibility result instantly.</p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={item}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-black text-white font-bold text-2xl shadow-lg">3</div>
              <h3 className="mt-4 text-xl font-semibold text-black">Find Resources</h3>
              <p className="mt-2 text-gray-600 text-center">Access resources and links to officially apply for benefits.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-black text-white">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold" variants={item}>Ready to get started?</motion.h2>
          <motion.p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto" variants={item}>
            Take the first step towards a more secure future today.
          </motion.p>
          <motion.div className="mt-8" variants={item}>
            <button className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-black shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              Begin My Eligibility Check
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <motion.div
          className="container mx-auto px-4 text-center text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; {new Date().getFullYear()} Benefits Check. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default App;
