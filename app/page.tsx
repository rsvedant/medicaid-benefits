"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  const [typedText, setTypedText] = useState('');
  const message = 'Your Path to Mental Peace Starts Here';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + message[index]);
      index++;
      if (index === message.length - 1) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const sentence = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const word = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800 font-sans antialiased">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
        className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-md border-b"
      >
        <nav className="container mx-auto flex items-center justify-between p-4">
          <motion.a href="#" className="flex items-center space-x-2 font-semibold text-xl" variants={item}>
            <span>Benefits Check</span>
          </motion.a>
          <motion.div className="flex items-center space-x-4" variants={container} initial="hidden" animate="show">
            <motion.a
              href="/auth/sign-in"
              className="text-sm font-medium text-gray-800 border border-gray-800 rounded-md px-4 py-2 hover:bg-gray-100 transition"
              variants={item}
            >
              Login
            </motion.a>
            <motion.a
              href="/auth/sign-up"
              className="text-sm font-medium bg-black text-white rounded-md px-4 py-2 hover:bg-gray-900 transition"
              variants={item}
            >
              Sign Up
            </motion.a>
          </motion.div>
        </nav>
      </motion.header>

      <section className="relative flex min-h-screen items-center justify-center pt-24 pb-12 px-4 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.h1 className="text-5xl font-extrabold text-gray-900 leading-tight h-30" variants={item}>
            {typedText}<span className="animate-pulse">|</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-2xl text-gray-600 italic"
            variants={sentence}
            initial="hidden"
            animate="show"
          >
            Effortlessly check your eligibility for{" "}
            <motion.span
              variants={word}
              className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 animate-pulse"
            >
              Medicaid{" "}
            </motion.span>{" "}and{" "}
            <motion.span
              variants={word}
              className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-400 animate-pulse"
            >
              SNAP{" "}
            </motion.span>{" "}
            benefits — private, secure, and fast.
          </motion.p>
          {/* <motion.div className="mt-8" variants={item}>
            <button className="bg-black text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition transform hover:scale-105">
              Check My Eligibility
            </button>
          </motion.div> */}
        </motion.div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {[{
            title: 'Effortless Eligibility Check',
            icon: CheckIcon,
            desc: 'Simple guided questionnaire with no jargon.'
          }, {
            title: 'Secure & Confidential',
            icon: LockIcon,
            desc: 'Military-grade encryption and strict data policies.'
          }, {
            title: 'Time-Saving',
            icon: ClockIcon,
            desc: 'Skip long forms and get results instantly.'
          }].map(({ title, icon: Icon, desc }, i) => (
            <motion.div key={i} variants={item} className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-full">
                <Icon />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-600 mt-2">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-12 text-center">
        <motion.h2 className="text-3xl font-bold mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>Get Started in 3 Easy Steps</motion.h2>
        <motion.div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 mt-8 px-4" initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}>
          {["Answer Questions", "Get Instant Results", "Find Resources"].map((step, i) => (
            <motion.div key={i} variants={item} className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold mb-4 mx-auto">{i + 1}</div>
              <h3 className="font-semibold text-gray-900">{step}</h3>
              <p className="text-sm text-gray-600 mt-2">{step === 'Answer Questions' ? 'Tell us about you.' : step === 'Get Instant Results' ? 'See if you’re eligible immediately.' : 'Get links to apply and resources near you.'}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-black text-white text-center py-20">
        <motion.h2 className="text-3xl md:text-4xl font-bold" initial="hidden" whileInView="show" viewport={{ once: true }} variants={item}>Ready to get started?</motion.h2>
        <motion.p className="mt-4 text-lg max-w-xl mx-auto" variants={item}>
          Take the first step toward peace of mind today.
        </motion.p>
        <motion.div className="mt-6" variants={item}>
          <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition transform hover:scale-105">
            Begin My Eligibility Check
          </button>
        </motion.div>
      </section>

      <footer className="bg-gray-900 text-white py-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Benefits Check. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
