'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Imagination is more important than knowledge.", author: "Albert Einstein" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
];

const QuoteUniverse = () => {
  const [activeQuote, setActiveQuote] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextQuote = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 3000);
    return () => clearTimeout(timer);
  }, [activeQuote]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden cursor-pointer" onClick={nextQuote}>
      <StarField />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeQuote}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <QuoteDisplay quote={quotes[activeQuote]} />
        </motion.div>
      </AnimatePresence>
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Click anywhere to explore the next quote
      </motion.div>
    </div>
  );
};

const StarField = () => {
  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
  }));

  return (
    <div className="absolute inset-0">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const QuoteDisplay = ({ quote }) => {
  return (
    <div className="relative flex flex-col items-center justify-center text-white p-8 max-w-3xl">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-purple-900 opacity-10 filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 leading-tight z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <TextGenerateEffect duration={2} words={`"${quote.text}"`} />
      </motion.div>
      <motion.p
        className="text-xl md:text-2xl italic text-gray-300 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        - {quote.author}
      </motion.p>
    </div>
  );
};

export default function Home() {
  return <QuoteUniverse />;
}