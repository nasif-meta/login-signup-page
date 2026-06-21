"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OTPFormProps {
  email: string;
  onVerify: () => void;
  onBack: () => void;
}

export default function OTPForm({ email, onVerify, onBack }: OTPFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerify();
    }, 2000);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(60);
    setOtp(["", "", "", "", "", """]);
    inputsRef.current[0]?.focus();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-slate-100 mb-2">Verify your email</h3>
        <p className="text-sm text-slate-400">
          We sent a 6-digit code to <span className="text-indigo-400">{email}</span>
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        {otp.map((digit, i) => (
          <motion.input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-12 h-14 text-center text-xl font-semibold bg-white/[0.04] border border-white/[0.08] rounded-xl text-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
            whileFocus={{ scale: 1.05 }}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={loading || otp.some((d) => !d)}
        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-semibold relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={`transition-opacity ${loading ? "opacity-0" : "opacity-100"}`}>
          Verify Code
        </span>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </button>

      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleResend}
          disabled={timer > 0}
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors disabled:text-slate-600 disabled:cursor-not-allowed"
        >
          {timer > 0 ? `Resend in ${timer}s` : "Resend code"}
        </button>
      </div>
    </motion.form>
  );
}
