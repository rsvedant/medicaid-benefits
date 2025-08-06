"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AgenticSearchDiagram } from '@/components/agentic-search-diagram';

const App = () => {
  const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer">
      <path d="M10 2h4" />
      <path d="M12 14v-4" />
      <path d="M4 13a8 8 0 1 0 16 0A8 8 0 1 0 4 13" />
    </svg>
  );

  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );

  const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check">
      <path d="M20 13c0 5-3.5 7.5-8 7.5s-8-2.5-8-7.5c0-1 0-3 0-5 0-1.3 1.6-3 8-3s8 1.7 8 3c0 2 0 4 0 5"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );

  const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14,2 14,8 20,8"/>
      <path d="M16,13 8,13"/>
      <path d="M16,17 8,17"/>
      <path d="M10,9 8,9"/>
    </svg>
  );

  const DemoVideoPlayer = () => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      // Set playback speed to 1.5x when component mounts
      if (videoRef.current) {
        videoRef.current.playbackRate = 1.5;
      }

      // Intersection Observer to autoplay when video comes into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && videoRef.current && !isPlaying) {
              videoRef.current.play();
            }
          });
        },
        { threshold: 0.5 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, []); // Remove isPlaying dependency to avoid conflicts

    const togglePlayPause = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    };

    return (
      <div ref={containerRef} className="relative w-full">
        <video
          ref={videoRef}
          className="w-full rounded-lg cursor-pointer"
          muted
          playsInline
          onClick={togglePlayPause}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          style={{ aspectRatio: '16/9' }}
        >
          <source src="/sfbenefitscheck-demo-noaudio.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  const router = useRouter();
  const videoSectionRef = React.useRef<HTMLDivElement>(null);

  const scrollToVideo = () => {
    videoSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };
  
  // Enhanced Framer Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    },
  };

  return (
    <div className="min-h-screen bg-white font-[Inter] text-gray-900 antialiased overflow-x-hidden">
      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100"
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <motion.div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Benefits Check</span>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/chat')}
            className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Get Started
          </motion.button>
        </nav>
      </motion.header>

      {/* Hero Section - Completely Redesigned */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20"
          />
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-40 right-20 w-32 h-32 bg-purple-100 rounded-full opacity-20"
          />
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-40 left-20 w-24 h-24 bg-green-100 rounded-full opacity-20"
          />
        </div>

        <motion.div
          className="container mx-auto px-6 text-center relative z-10"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div variants={item} className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Benefits | Eligibility, Amplified
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-8" 
            variants={item}
          >
            Your Benefits{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Journey
            </span>
            <br />
            Starts Here
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed" 
            variants={item}
          >
            AI-powered eligibility screening for Medicaid and SNAP benefits. 
            <span className="text-gray-900 font-semibold"> Get accurate answers in minutes</span>, 
            not hours.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16" variants={item}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/chat')}
              className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg shadow-xl hover:bg-gray-800 transition-all duration-300"
            >
              Check My Eligibility
              <span className="ml-2">→</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToVideo}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold text-lg hover:border-gray-400 transition-colors"
            >
              See How It Works
            </motion.button>
          </motion.div>

          <motion.p className="text-sm text-gray-500" variants={item}>
            No credit card required. Get started in less than 60 seconds.
          </motion.p>

          {/* Demo Video */}
          <motion.div 
            ref={videoSectionRef}
            className="mt-16 relative max-w-4xl mx-auto"
            variants={item}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
              <div className="text-left">
                <p className="text-gray-500 mb-2">Example question:</p>
                <p className="text-lg font-medium text-gray-900 mb-4">
                  "Am I eligible for Medicaid with a household income of $2,000/month?"
                </p>
                <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                  <DemoVideoPlayer />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-b border-gray-100">
        <motion.div
          className="container mx-auto px-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.div className="text-center mb-12" variants={item}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Trusted Process
            </h2>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8" variants={container}>
            <motion.div className="text-center" variants={item}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-sm text-gray-600">AI finds relevant regulations</p>
            </motion.div>
            <motion.div className="text-center" variants={item}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldIcon />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verified Sources</h3>
              <p className="text-sm text-gray-600">Government documents only</p>
            </motion.div>
            <motion.div className="text-center" variants={item}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentIcon />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real Citations</h3>
              <p className="text-sm text-gray-600">Check sources yourself</p>
            </motion.div>
            <motion.div className="text-center" variants={item}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LockIcon />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-sm text-gray-600">Your data stays secure</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 bg-gray-50">
        <motion.div
          className="container mx-auto px-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.div className="text-center mb-16" variants={item}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From federal guidelines to local regulations - comprehensive analysis across all levels of government.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto" variants={container}>
            <motion.div variants={item}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Federal Level</h3>
              <div className="space-y-4">
                {[
                  'Medicaid & CHIP Guidelines',
                  'SNAP Eligibility Rules', 
                  'Federal Poverty Level Standards',
                  'Immigration Status Requirements'
                ].map((itemText, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckIcon className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{itemText}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">State & Local</h3>
              <div className="space-y-4">
                {[
                  'California State Programs',
                  'County-Specific Requirements',
                  'Local Assistance Programs',
                  'Municipal Support Services'
                ].map((itemText, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckIcon className="text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{itemText}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="text-center mt-12" variants={item}>
            <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>California</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>San Francisco</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Daily Updates</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Agentic Search Section - Enhanced */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto px-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.div className="text-center mb-16" variants={item}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Agentic Search
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be amazed by the benefits of combined web and advanced RAG search workflows.
            </p>
          </motion.div>
          <motion.div variants={item}>
            <AgenticSearchDiagram />
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <motion.div
          className="container mx-auto px-6 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-6" variants={item}>
            Ready for answers?
          </motion.h2>
          <motion.p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-300" variants={item}>
            Save time and make smarter decisions about your benefits eligibility today.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8" variants={item}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/chat')}
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg shadow-xl hover:bg-gray-100 transition-colors"
            >
              Check My Eligibility
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:border-white/50 transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-gray-900 text-white py-12">
        <motion.div
          className="container mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-xl">Benefits Check</span>
            </div>
            <div className="flex space-x-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Benefits Check. All rights reserved.</p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default App;
