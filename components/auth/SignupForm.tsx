"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SignupFormProps {
  onSubmit: (data: { firstName: string; lastName: string; email: string; password: string }) => void;
  onToggleMode: () => void;
  onSocialLogin: (provider: string) => void;
}

export default function SignupForm({ onSubmit, onToggleMode, onSocialLogin }: SignupFormProps) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [agreed, setAgreed] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!validateEmail(form.email)) newErrors.email = "Please enter a valid email address";
    if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!agreed) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(form);
    }, 2000);
  };

  const updateField = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const InputField = ({ id, label, type = "text", icon, value, error, showToggle, toggleState, onToggle }: any) => (
    <div className="mb-5">
      <div className={`relative h-[52px] rounded-xl border transition-all duration-300 flex items-center overflow-hidden ${
        error ? "border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.08)]" : "border-white/[0.08] focus-within:border-indigo-500 focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
      }`}>
        <svg className={`absolute left-4 w-5 h-5 transition-colors ${error ? "text-red-500" : "text-slate-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
        <input
          type={type}
          value={value}
          onChange={(e) => updateField(id, e.target.value)}
          placeholder=" "
          className="w-full h-full pl-12 pr-12 bg-transparent text-slate-100 text-sm outline-none"
        />
        <label className={`absolute left-12 transition-all duration-300 pointer-events-none bg-[#161628] px-1.5 rounded ${
          value ? "top-0 -translate-y-1/2 scale-[0.82] text-indigo-400 font-medium" : "top-1/2 -translate-y-1/2 text-slate-500"
        } ${error ? "text-red-500!" : ""}`}>
          {label}
        </label>
        {showToggle && (
          <button type="button" onClick={onToggle} className="absolute right-3 p-1.5 text-slate-500 hover:text-slate-200 transition-colors rounded-lg hover:bg-white/5">
            {toggleState ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </motion.p>
      )}
    </div>
  );

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Name Row */}
      <div className="grid grid-cols-2 gap-3">
        <InputField
          id="firstName"
          label="First Name"
          icon={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
          value={form.firstName}
          error={errors.firstName}
        />
        <InputField
          id="lastName"
          label="Last Name"
          icon={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
          value={form.lastName}
          error={errors.lastName}
        />
      </div>

      <InputField
        id="email"
        label="Email address"
        type="email"
        icon={<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>}
        value={form.email}
        error={errors.email}
      />

      <InputField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        icon={<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>}
        value={form.password}
        error={errors.password}
        showToggle
        toggleState={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
      />

      <InputField
        id="confirmPassword"
        label="Confirm Password"
        type={showConfirm ? "text" : "password"}
        icon={<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>}
        value={form.confirmPassword}
        error={errors.confirmPassword}
        showToggle
        toggleState={showConfirm}
        onToggle={() => setShowConfirm(!showConfirm)}
      />

      {/* Terms */}
      <div className="mb-6">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => { setAgreed(e.target.checked); setErrors((p) => ({ ...p, terms: undefined })); }}
            className="w-[18px] h-[18px] mt-0.5 rounded-md border-2 border-white/[0.08] bg-transparent checked:bg-gradient-to-br checked:from-indigo-500 checked:to-purple-500 checked:border-none appearance-none relative cursor-pointer transition-all checked:after:content-[''] checked:after:absolute checked:after:top-[2px] checked:after:left-[6px] checked:after:w-[4px] checked:after:h-[8px] checked:after:border-white checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45"
          />
          <span className="text-[13px] text-slate-400 leading-relaxed">
            I agree to the <a href="#" className="text-indigo-400 hover:underline">Terms</a> and <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>
          </span>
        </label>
        {errors.terms && <p className="text-red-500 text-xs mt-1 ml-1">{errors.terms}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-semibold relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-70"
      >
        <span className={`transition-opacity ${loading ? "opacity-0" : "opacity-100"}`}>Create Account</span>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-7">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <span className="text-[11px] text-slate-500 font-medium uppercase tracking-[1.5px]">Or continue with</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* Social */}
      <div className="flex gap-3 mb-6">
        <button type="button" onClick={() => onSocialLogin("google")} className="flex-1 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl flex items-center justify-center gap-2.5 text-slate-400 text-sm font-medium hover:bg-white/[0.06] hover:border-indigo-500/30 hover:text-slate-100 hover:-translate-y-0.5 transition-all">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google
        </button>
        <button type="button" onClick={() => onSocialLogin("github")} className="flex-1 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl flex items-center justify-center gap-2.5 text-slate-400 text-sm font-medium hover:bg-white/[0.06] hover:border-indigo-500/30 hover:text-slate-100 hover:-translate-y-0.5 transition-all">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          GitHub
        </button>
      </div>

      {/* Toggle */}
      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <button type="button" onClick={onToggleMode} className="text-indigo-400 font-semibold hover:underline cursor-pointer bg-transparent border-none">
          Sign in
        </button>
      </p>
    </motion.form>
  );
}
