"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Background() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.className = "absolute rounded-full bg-primary/40";
      p.style.left = Math.random() * 100 + "%";
      p.style.width = (Math.random() * 3 + 2) + "px";
      p.style.height = p.style.width;
      p.style.animation = `floatParticle ${Math.random() * 12 + 12}s linear infinite`;
      p.style.animationDelay = (Math.random() * 10) + "s";
      p.style.opacity = (Math.random() * 0.4 + 0.2).toString();
      p.style.boxShadow = "0 0 6px rgba(99, 102, 241, 0.6)";
      container.appendChild(p);
    }
  }, []);

  return (
    <>
      {/* Animated Orbs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-35"
          style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)", top: "-15%", left: "-15%" }}
          animate={{ x: [0, 40, -30, 20], y: [0, -30, 40, 20], scale: [1, 1.1, 0.95, 1.05] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-35"
          style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)", bottom: "-10%", right: "-10%" }}
          animate={{ x: [0, -30, 40, -20], y: [0, 40, -30, 20], scale: [1, 0.95, 1.1, 1.05] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 8 }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-35"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.6), transparent 70%)", top: "50%", left: "50%" }}
          animate={{ x: [0, 20, -40, 30], y: [0, -40, 20, -10], scale: [1, 1.05, 0.9, 1.1] }}
          transition={{ duration: 28, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 15 }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Floating Particles */}
      <div ref={particlesRef} className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" />
    </>
  );
}
