"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Orbitron, Rajdhani } from 'next/font/google';

// --- FONTS ---
const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['500', '600', '700'] });

// --- MOCK DATA ---

// 1. Mock User State
const MOCK_USER = {
  username: "INITIATE_001",
  isLoggedIn: true, // Toggle this to test locked state
  score: 1200
};

// 2. Leaderboard Data
const LEADERBOARD = [
  { rank: 1, user: "CYBER_NINJA", time: "02:14", score: 5000 },
  { rank: 2, user: "NULL_PTR", time: "02:45", score: 4800 },
  { rank: 3, user: "HASH_MASTER", time: "03:10", score: 4500 },
  { rank: 4, user: "V0ID_WALKER", time: "03:22", score: 4200 },
  { rank: 5, user: "RECURSION", time: "04:01", score: 3900 },
];

// 3. The Challenges (20 Words)
// Types: Base64, Reverse, Binary-ish visuals
type Challenge = {
  id: number;
  hash: string;
  original: string;
  hint: string;
  solved: boolean;
};

const INITIAL_CHALLENGES: Challenge[] = [
  { id: 1, hash: "U1lTVEVN", original: "SYSTEM", hint: "Base64", solved: false },
  { id: 2, hash: "TmV4dEpT", original: "NEXTJS", hint: "Base64", solved: false },
  { id: 3, hash: "Q1JZUFRP", original: "CRYPTO", hint: "Base64", solved: false },
  { id: 4, hash: "U0VSVkVS", original: "SERVER", hint: "Base64", solved: false },
  { id: 5, hash: "REVCVUc=", original: "DEBUG", hint: "Base64", solved: false },
  { id: 6, hash: "V0VCMw==", original: "WEB3", hint: "Base64", solved: false },
  { id: 7, hash: "QkxPQ0s=", original: "BLOCK", hint: "Base64", solved: false },
  { id: 8, hash: "Q0hBSU4=", original: "CHAIN", hint: "Base64", solved: false },
  { id: 9, hash: "VE9LRU4=", original: "TOKEN", hint: "Base64", solved: false },
  { id: 10, hash: "REVQTE9Z", original: "DEPLOY", hint: "Base64", solved: false },
  { id: 11, hash: "TElOVVg=", original: "LINUX", hint: "Base64", solved: false },
  { id: 12, hash: "UkVBQ1Q=", original: "REACT", hint: "Base64", solved: false },
  { id: 13, hash: "R2l0SHVi", original: "GITHUB", hint: "Base64", solved: false },
  { id: 14, hash: "VmVyY2Vs", original: "VERCEL", hint: "Base64", solved: false },
  { id: 15, hash: "UHl0aG9u", original: "PYTHON", hint: "Base64", solved: false },
  { id: 16, hash: "U29sYW5h", original: "SOLANA", hint: "Base64", solved: false },
  { id: 17, hash: "Q29kZXI=", original: "CODER", hint: "Base64", solved: false },
  { id: 18, hash: "VGFpbHdpbmQ=", original: "TAILWIND", hint: "Base64", solved: false },
  { id: 19, hash: "VHlwZVNjcmlwdA==", original: "TYPESCRIPT", hint: "Base64", solved: false },
  { id: 20, hash: "TUxTQQ==", original: "MLSA", hint: "Base64", solved: false },
];

export default function HashingGamePage() {
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "success" | "error">("idle");

  // Derived state
  const selectedChallenge = challenges.find(c => c.id === selectedId);
  const solvedCount = challenges.filter(c => c.solved).length;
  const totalCount = challenges.length;

  // Handlers
  const handleSelect = (id: number) => {
    const challenge = challenges.find(c => c.id === id);
    if (challenge && !challenge.solved) {
      setSelectedId(id);
      setInputValue("");
      setFeedback("idle");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge) return;

    if (inputValue.trim().toUpperCase() === selectedChallenge.original.toUpperCase()) {
      // Success Logic
      setFeedback("success");
      setTimeout(() => {
        setChallenges(prev => prev.map(c => 
          c.id === selectedId ? { ...c, solved: true } : c
        ));
        setSelectedId(null); // Close modal/input
        setFeedback("idle");
      }, 1000);
    } else {
      // Error Logic
      setFeedback("error");
      setTimeout(() => setFeedback("idle"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col">
      
      {/* --- HEADER (Consistent with Home) --- */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md z-50 sticky top-0">
        <div className="flex items-center gap-4">
            <Link href="/">
              <div className="relative w-10 h-10 md:w-12 md:h-12 cursor-pointer">
                <Image src="/mlsa.jpg" alt="MLSA Logo" fill className="object-contain"/>
              </div>
            </Link>
            <span className={`${orbitron.className} hidden md:block text-xl font-bold tracking-wider text-blue-500`}>
              MLSA <span className="text-white">DECRYPT</span>
            </span>
        </div>

        {/* USER AUTH SECTION */}
        <div className="flex items-center gap-4">
           {MOCK_USER.isLoggedIn ? (
             <div className="flex items-center gap-3 px-4 py-2 bg-blue-900/20 border border-blue-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`${orbitron.className} text-blue-400 text-sm tracking-widest`}>
                  {MOCK_USER.username}
                </span>
             </div>
           ) : (
             <button className={`${orbitron.className} text-red-500`}>ACCESS DENIED</button>
           )}
        </div>
      </header>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* LEFT SIDEBAR: LEADERBOARD */}
        <aside className="w-full md:w-1/4 lg:w-1/5 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-black">
           <h2 className={`${orbitron.className} text-xl text-yellow-500 mb-6 flex items-center gap-2`}>
             <span className="text-2xl">🏆</span> HALL OF FAME
           </h2>
           
           <div className="space-y-4">
             {LEADERBOARD.map((entry) => (
               <div key={entry.rank} className="bg-white/5 p-3 rounded border border-white/10 flex items-center justify-between group hover:border-yellow-500/50 transition-colors">
                 <div className="flex items-center gap-3">
                   <span className={`${orbitron.className} text-2xl font-bold text-gray-600 group-hover:text-yellow-500`}>
                     #{entry.rank}
                   </span>
                   <div>
                     <p className={`${rajdhani.className} font-bold text-white leading-tight`}>{entry.user}</p>
                     <p className="text-xs text-gray-500 font-mono">SCORE: {entry.score}</p>
                   </div>
                 </div>
                 <span className="text-xs font-mono text-green-400">{entry.time}</span>
               </div>
             ))}
             
             {/* Current User Rank Stub */}
             <div className="mt-8 pt-4 border-t border-white/10">
               <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Your Rank</p>
               <div className="bg-blue-900/20 p-3 rounded border border-blue-500/50 flex items-center justify-between">
                  <span className={`${orbitron.className} text-blue-400`}>#42</span>
                  <span className={`${rajdhani.className} text-white`}>{MOCK_USER.username}</span>
               </div>
             </div>
           </div>
        </aside>

        {/* RIGHT AREA: GAME GRID */}
        <section className="flex-1 relative p-6 md:p-10 overflow-y-auto">
          
          {/* Game Status Bar */}
          <div className="flex justify-between items-end mb-8">
             <div>
               <h1 className={`${orbitron.className} text-3xl md:text-4xl font-bold text-white mb-2`}>
                 HASHING GRID
               </h1>
               <p className={`${rajdhani.className} text-gray-400`}>
                 Select a corrupted data block and restore the original value.
               </p>
             </div>
             <div className="text-right">
               <p className={`${orbitron.className} text-2xl text-blue-500`}>
                 {solvedCount} / {totalCount}
               </p>
               <p className="text-xs text-gray-500 uppercase tracking-widest">Decrypted</p>
             </div>
          </div>

          {/* The Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {challenges.map((challenge) => (
              <motion.button
                key={challenge.id}
                onClick={() => handleSelect(challenge.id)}
                disabled={challenge.solved || !MOCK_USER.isLoggedIn}
                whileHover={!challenge.solved ? { scale: 1.05 } : {}}
                whileTap={!challenge.solved ? { scale: 0.95 } : {}}
                className={`
                  relative h-24 rounded-lg border-2 flex flex-col items-center justify-center p-2 overflow-hidden transition-all duration-300
                  ${challenge.solved 
                    ? "bg-green-900/20 border-green-500/50 cursor-default" 
                    : "bg-gray-900/40 border-gray-700 hover:border-blue-500 hover:bg-blue-900/10 cursor-pointer"
                  }
                `}
              >
                {/* Status Indicator */}
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${challenge.solved ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500'}`}></div>

                {/* Text Content */}
                <span className={`${rajdhani.className} font-mono text-lg ${challenge.solved ? 'text-green-400' : 'text-gray-300'}`}>
                  {challenge.solved ? challenge.original : challenge.hash}
                </span>
                
                {challenge.solved && (
                  <span className="absolute bottom-1 text-[10px] uppercase tracking-widest text-green-600 font-bold">
                    VERIFIED
                  </span>
                )}
              </motion.button>
            ))}
          </div>

        </section>

        {/* --- INPUT OVERLAY / MODAL --- */}
        {/* Appears when a word is selected */}
        <AnimatePresence>
          {selectedId && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-lg bg-black border border-blue-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                  ✕
                </button>

                <div className="text-center space-y-6">
                  <div>
                    <p className="text-blue-500 text-xs tracking-[0.2em] mb-2">DECRYPTION PROTOCOL</p>
                    <h2 className={`${orbitron.className} text-3xl text-white`}>
                      {selectedChallenge?.hash}
                    </h2>
                    <p className="text-gray-500 text-sm mt-2 font-mono">Encoding: {selectedChallenge?.hint}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="text" 
                      autoFocus
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter decrypted value..."
                      className="w-full bg-gray-900/50 border border-gray-600 focus:border-blue-500 text-center text-xl py-3 rounded-lg text-white outline-none font-mono transition-colors"
                    />
                    
                    <button 
                      type="submit"
                      className={`
                        w-full py-3 rounded-lg font-bold tracking-widest uppercase transition-all
                        ${feedback === 'success' ? 'bg-green-600 text-white' : 
                          feedback === 'error' ? 'bg-red-600 text-white' : 
                          'bg-blue-600 hover:bg-blue-500 text-white'}
                      `}
                    >
                      {feedback === 'success' ? 'ACCESS GRANTED' : 
                       feedback === 'error' ? 'INVALID HASH' : 
                       'UNLOCK BLOCK'}
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}