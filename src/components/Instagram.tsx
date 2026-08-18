"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

const InstaIcon = ({ size = 24, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface InstaPost {
  id: string;
  imageUrl: string;
  likes: string;
  comments: string;
  gridClass: string;
}

export default function Instagram() {
  const posts: InstaPost[] = [
    {
      id: "post-1",
      imageUrl: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=600&auto=format&fit=crop",
      likes: "1.2k",
      comments: "84",
      gridClass: "row-span-2 col-span-2 md:col-span-2",
    },
    {
      id: "post-2",
      imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
      likes: "852",
      comments: "43",
      gridClass: "row-span-1 col-span-1",
    },
    {
      id: "post-3",
      imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
      likes: "941",
      comments: "39",
      gridClass: "row-span-1 col-span-1",
    },
    {
      id: "post-4",
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
      likes: "2.3k",
      comments: "156",
      gridClass: "row-span-1 col-span-2 md:col-span-2",
    },
    {
      id: "post-5",
      imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop",
      likes: "1.1k",
      comments: "52",
      gridClass: "row-span-2 col-span-2 md:col-span-1",
    },
    {
      id: "post-6",
      imageUrl: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop",
      likes: "612",
      comments: "28",
      gridClass: "row-span-1 col-span-2 md:col-span-1",
    },
  ];

  return (
    <section
      id="instagram"
      className="bg-[#f5ebd9] py-24 md:py-36 px-6 md:px-12 border-b border-[#cca09d]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.45em] text-gold font-light mb-4 block">
            Digital Atelier
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl text-cream tracking-wider uppercase mb-4">
            #AnushkaChauhanCouture
          </h2>
          <p className="text-cream/50 text-[10px] uppercase tracking-[0.3em] font-light">
            Follow our journey on Instagram.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] sm:auto-rows-[220px]">
          {posts.map((post) => (
            <motion.a
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              key={post.id}
              href="https://www.instagram.com/anushkachauhanlabel?igsh=dmZuNGU2bml0eWNq"
              target="_blank"
              rel="noopener noreferrer"
              className={`${post.gridClass} group relative overflow-hidden border border-[#cca09d]/10`}
            >
              {/* Image */}
              <img
                src={post.imageUrl}
                alt="Instagram luxury post"
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-90 group-hover:brightness-50"
              />

              {/* Instagram details hover overlay */}
              <div className="absolute inset-0 bg-[#f5ebd9]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center z-10">
                <InstaIcon size={24} className="text-gold mb-3 transform scale-90 group-hover:scale-100 transition-transform duration-500" />
                
                <div className="flex space-x-6 text-cream text-xs uppercase tracking-widest font-light">
                  <span className="flex items-center gap-1.5">
                    <Heart size={14} className="text-gold" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle size={14} className="text-gold" />
                    {post.comments}
                  </span>
                </div>
              </div>

              {/* Gold borders on hover */}
              <div className="absolute inset-3 border border-[#cca09d]/0 group-hover:border-[#cca09d]/20 transition-all duration-[1s] pointer-events-none z-20" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
