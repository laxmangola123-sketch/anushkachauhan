"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";

export default function FloatingVideo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const teaserVideo = "https://player.vimeo.com/external/498425114.sd.mp4?s=d0016eef2deca3c1d916cc69970868f0cb6471d4&profile_id=165&oauth2_token_id=57447761"; // Artisan weaving
  const fullVideo = "https://player.vimeo.com/external/435674703.sd.mp4?s=7f60714777d11ce39cfccb5f00e9cf494519965a&profile_id=165&oauth2_token_id=57447761"; // Zari work embroidery

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Teaser Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
      >
        <div className="relative group">
          {/* Main Bubble */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold/60 shadow-2xl relative flex items-center justify-center bg-[#f5ebd9] cursor-pointer group-hover:border-gold transition-colors duration-500"
            aria-label="Play Atelier Film"
          >
            {/* Loop Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-[0.7] group-hover:scale-110 transition-transform duration-700"
            >
              <source src={teaserVideo} type="video/mp4" />
            </video>

            {/* Hover overlay with play icon */}
            <div className="absolute inset-0 bg-[#f5ebd9]/30 flex items-center justify-center group-hover:bg-[#f5ebd9]/50 transition-colors duration-500">
              <Play size={18} className="text-gold fill-gold/20" />
            </div>

            {/* Decorative Gold Spin Ring */}
            <div className="absolute inset-0 border border-transparent border-t-gold/30 rounded-full group-hover:animate-spin" style={{ animationDuration: '4s' }} />
          </button>

          {/* Close bubble button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="absolute -top-1.5 -left-1.5 bg-[#f5ebd9] border border-gold/30 hover:border-gold text-gold p-1 rounded-full shadow-lg transition-all duration-300"
            aria-label="Close video preview"
          >
            <X size={10} />
          </button>
        </div>

        {/* Small Caption below bubble */}
        <span className="text-[8px] uppercase tracking-[0.25em] text-gold mt-2 bg-[#f5ebd9]/90 px-2 py-0.5 border border-gold/15 rounded-sm pointer-events-none">
          Atelier Film
        </span>
      </motion.div>

      {/* Full-screen Video Player Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#f5ebd9]/98 z-[100] flex items-center justify-center p-6 md:p-12"
          >
            {/* Modal Container */}
            <div className="relative w-full max-w-5xl aspect-video border border-[#c5a880]/30 shadow-2xl bg-black overflow-hidden flex items-center justify-center">
              {/* Main Full Story Video */}
              <video
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover filter brightness-[0.85]"
              >
                <source src={fullVideo} type="video/mp4" />
              </video>

              {/* Gold border frame overlay */}
              <div className="absolute inset-4 border border-[#c5a880]/15 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-10 text-cream/70 hover:text-gold transition-colors duration-300 flex items-center gap-2 text-xs uppercase tracking-widest bg-[#f5ebd9]/60 backdrop-blur-md px-3 py-1.5 border border-gold/15"
              >
                Close <X size={14} />
              </button>

              {/* Audio Controls */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-6 right-6 z-10 text-cream/70 hover:text-gold transition-colors duration-300 flex items-center gap-2 text-xs uppercase tracking-widest bg-[#f5ebd9]/60 backdrop-blur-md px-3 py-1.5 border border-gold/15"
              >
                {isMuted ? (
                  <>
                    Unmute <VolumeX size={14} />
                  </>
                ) : (
                  <>
                    Mute <Volume2 size={14} />
                  </>
                )}
              </button>

              {/* Video Title Overlay */}
              <div className="absolute bottom-6 left-6 z-10 text-left bg-[#f5ebd9]/60 backdrop-blur-md p-4 border border-gold/15 max-w-sm hidden sm:block">
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-light block mb-1">
                  Atelier Film
                </span>
                <h4 className="font-editorial text-lg text-cream uppercase tracking-wide mb-1">
                  The Gold Weave of Banaras
                </h4>
                <p className="text-[10px] text-cream/60 leading-relaxed font-light">
                  A behind-the-scenes look at our master weavers creating pure zari brocade thread by thread.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
