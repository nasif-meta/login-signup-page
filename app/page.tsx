"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "@/components/auth/Background";
import ThemeToggle from "@/components/auth/ThemeToggle";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import OTPForm from "@/components/auth/OTPForm";
import { ThemeProvider } from "@/hooks/useTheme";

type AuthMode = "login" | "signup" | "otp";

function AuthContent() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [otpEmail, setOtpEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleLogin = (email: string, password: string) => {
    setOtpEmail(email);
    setMode("otp");
  };

  const handleSignup = (data: { firstName: string; lastName: string; email: string; password: string }) => {
    setOtpEmail(data.email);
    setMode("otp");
  };

  const handleOTPVerify = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      if (mode === "otp") setMode("login");
    }, 3000);
  };

  const handleSocialLogin = (provider: string) => {
    console.log("Social login:", provider);
  };

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / rect.height) * -4;
    const rotateY = (x / rect.width) * 4;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0f]" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <Background />
      <ThemeToggle />

      {/* Success Overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[#0a0a0f]/92 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative w-[90px] h-[90px] rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-[40px] shadow-[0_8px_40px_rgba(34,197,94,0.35)]"
            >
              <div className="absolute inset-[-8px] rounded-full border-2 border-green-500/20 animate-[ping_1.5s_ease-out_infinite]" />
              ✓
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-100 font-['Space_Grotesk']">
              {mode === "otp" ? "Welcome Back!" : "Account Created!"}
            </h2>
            <p className="text-sm text-slate-400">
              {mode === "otp" ? "Redirecting to your dashboard..." : "Welcome to the community..."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-[420px] p-5" style={{ perspective: 1200 }}>
        <div
          ref={cardRef}
          className="relative bg-[#161628]/85 border border-white/[0.08] rounded-[28px] p-11 backdrop-blur-[40px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-transform duration-100 ease-out"
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />

          {/* Corner glows */}
          <div className="absolute -top-10 -left-10 w-[120px] h-[120px] rounded-full bg-indigo-500/25 blur-[50px] pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-[120px] h-[120px] rounded-full bg-purple-500/25 blur-[50px] pointer-events-none" />

          {/* Brand Header */}
          <div className="text-center mb-8 relative z-[2]">
            <motion.div
              className="w-[68px] h-[68px] mx-auto mb-[18px] rounded-[18px] bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[30px] font-bold font-['Space_Grotesk'] relative overflow-hidden shadow-[0_8px_32px_rgba(99,102,241,0.35),inset_0_0_0_1px_rgba(255,255,255,0.1)]"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_3.5s_infinite]" />
              N
            </motion.div>
            <h1 className="text-2xl font-bold text-slate-100 mb-1.5 tracking-tight font-['Space_Grotesk']">Nasif Bin Borhan</h1>
            <p className="text-sm text-slate-400 mb-3">
              {mode === "login" ? "Sign in to your account" : mode === "signup" ? "Create your account" : "Verify your email"}
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-[7px] bg-indigo-500/5 border border-indigo-500/15 rounded-full text-[11px] text-indigo-400 font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              CSE Final Year • UI/UX & Frontend Developer
            </div>
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {mode === "login" && (
              <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <LoginForm
                  onSubmit={handleLogin}
                  onToggleMode={() => setMode("signup")}
                  onSocialLogin={handleSocialLogin}
                />
              </motion.div>
            )}
            {mode === "signup" && (
              <motion.div key="signup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <SignupForm
                  onSubmit={handleSignup}
                  onToggleMode={() => setMode("login")}
                  onSocialLogin={handleSocialLogin}
                />
              </motion.div>
            )}
            {mode === "otp" && (
              <motion.div key="otp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <OTPForm
                  email={otpEmail}
                  onVerify={handleOTPVerify}
                  onBack={() => setMode("login")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <ThemeProvider>
      <AuthContent />
    </ThemeProvider>
  );
}
