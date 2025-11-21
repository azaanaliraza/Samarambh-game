"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Orbitron, Rajdhani } from 'next/font/google';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// --- FONTS CONFIGURATION ---
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['500', '700'] });

export default function GamingZoneHome() {
  return (
    <motion.div 
      className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* --- 1. HEADER --- */}
      <header className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 border-b border-white/10 backdrop-blur-md fixed top-0 w-full z-40 bg-black/60">
        {/* Left: MLSA Logo */}
        <div className="flex items-center gap-4">
          <Link href="/home">
            <div className="relative w-10 h-10 md:w-14 md:h-14 cursor-pointer">
              <Image 
                src="/mlsa.jpg" 
                alt="MLSA Logo" 
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <span className={`${orbitron.className} hidden md:block text-xl font-bold tracking-wider text-blue-500`}>
            MLSA <span className="text-white">GAMING</span>
          </span>
        </div>

        {/* Right: Login System */}
        <div>
          <SignedIn>
            <div className="flex items-center gap-3 px-4 py-2 bg-blue-900/20 border border-blue-500/30 rounded-full">
              <UserButton afterSignOutUrl="/"/>
              <span className={`${orbitron.className} text-blue-400 text-xs tracking-widest hidden md:block`}>
                OPERATOR
              </span>
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/home">
              <button className={`
                relative px-6 py-2 group overflow-hidden rounded-lg
                bg-transparent border border-blue-500/40 hover:border-blue-400 
                transition-all duration-300 ease-out
                ${orbitron.className}
              `}>
                <span className="absolute inset-0 w-full h-full bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-blue-300 group-hover:text-white font-bold tracking-widest uppercase text-xs md:text-sm">
                  Login_System
                </span>
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </header>

      {/* --- 2. HERO SECTION --- */}
      <section className="pt-32 pb-10 px-6 md:px-16 max-w-7xl mx-auto min-h-[60vh] flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-900/10 text-blue-400 text-xs tracking-[0.2em] mb-2"
          >
            INITIATE SEQUENCE
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className={`${orbitron.className} text-4xl md:text-6xl lg:text-7xl font-black leading-tight`}
          >
            MLSA MIET PRESENTS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse">
              GAMING ZONE
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className={`${rajdhani.className} text-gray-400 text-lg md:text-xl max-w-lg mx-auto md:mx-0 leading-relaxed`}
          >
            Welcome to the digital frontier. Prove your worth in our collection of algorithmic challenges and cryptographic puzzles.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex-1 relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(37,99,235,0.15)] group"
        >
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
           <Image 
             src="/bgg.png" 
             alt="Gaming Zone Hero" 
             fill
             className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
           />
        </motion.div>
      </section>

      {/* --- 3. GAME LIBRARY GRID --- */}
      <section className="px-6 md:px-16 pb-24 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-gray-800 flex-1"></div>
          <h2 className={`${orbitron.className} text-2xl text-gray-300`}>AVAILABLE CHALLENGES</h2>
          <div className="h-px bg-gray-800 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. HASHING GAME (Active) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            <div className="relative h-56 w-full bg-gray-900 overflow-hidden">
               <Image 
                 src="/hashing-game-thumb.jpg" 
                 alt="Hashing Game Thumbnail"
                 fill
                 className="object-cover group-hover:scale-110 transition-transform duration-500 z-0 opacity-60 group-hover:opacity-80"
               />
               <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-0"></div>
               <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className={`${orbitron.className} text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-500`}>
                    #HASH
                  </span>
               </div>
            </div>

            <div className="p-6 space-y-4 relative z-20 bg-[#0a0a0a]">
              <div className="flex justify-between items-start">
                <h3 className={`${orbitron.className} text-xl font-bold text-white group-hover:text-blue-400 transition-colors`}>
                  Hashing Game
                </h3>
                <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30 font-mono">
                  ONLINE
                </span>
              </div>
              <p className={`${rajdhani.className} text-gray-400 font-medium text-sm line-clamp-2`}>
                The signal is corrupted. Decrypt the messages and match the hash values to breach the firewall.
              </p>
              <Link href="/hashing-game" className="block w-full pt-2">
                <button className={`
                  w-full py-3 rounded bg-blue-600 hover:bg-blue-500 
                  text-white font-bold tracking-widest uppercase
                  transform group-hover:-translate-y-1 transition-all duration-300 
                  shadow-lg shadow-blue-900/50
                  ${orbitron.className}
                `}>
                  Play Now
                </button>
              </Link>
            </div>
          </motion.div>

          {/* 2. COMING SOON: Network Defense */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/5 opacity-75 hover:opacity-100 transition-opacity"
          >
            <div className="relative h-56 w-full bg-gray-900 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-orange-900/10 z-0"></div>
               <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className={`${orbitron.className} text-5xl font-black text-white/5`}>
                    DEFENSE
                  </span>
               </div>
            </div>

            <div className="p-6 space-y-4 relative z-20 bg-[#0a0a0a]">
              <div className="flex justify-between items-start">
                <h3 className={`${orbitron.className} text-xl font-bold text-gray-500`}>
                  Net-Defense Sim
                </h3>
                <span className="text-xs px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-mono">
                  SOON
                </span>
              </div>
              <p className={`${rajdhani.className} text-gray-500 font-medium text-sm line-clamp-2`}>
                Manage server loads and deflect DDoS attacks in this real-time strategy simulation.
              </p>
              <button disabled className={`
                w-full py-3 rounded bg-white/5 text-gray-500 
                font-bold tracking-widest uppercase cursor-not-allowed
                ${orbitron.className}
              `}>
                Coming Soon
              </button>
            </div>
          </motion.div>

          {/* 3. COMING SOON: Quantum Cipher */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/5 opacity-75 hover:opacity-100 transition-opacity"
          >
            <div className="relative h-56 w-full bg-gray-900 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10 z-0"></div>
               <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className={`${orbitron.className} text-5xl font-black text-white/5`}>
                    QUANTUM
                  </span>
               </div>
            </div>

            <div className="p-6 space-y-4 relative z-20 bg-[#0a0a0a]">
              <div className="flex justify-between items-start">
                <h3 className={`${orbitron.className} text-xl font-bold text-gray-500`}>
                  Quantum Breaker
                </h3>
                <span className="text-xs px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-mono">
                  SOON
                </span>
              </div>
              <p className={`${rajdhani.className} text-gray-500 font-medium text-sm line-clamp-2`}>
                Solve multi-dimensional logic puzzles to stabilize the quantum core before meltdown.
              </p>
              <button disabled className={`
                w-full py-3 rounded bg-white/5 text-gray-500 
                font-bold tracking-widest uppercase cursor-not-allowed
                ${orbitron.className}
              `}>
                Coming Soon
              </button>
            </div>
          </motion.div>
          
        </div>
      </section>
    </motion.div>
  );
}