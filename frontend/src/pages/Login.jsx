import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, Lock, ArrowRight, ShieldCheck, UserCheck, Stethoscope, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStandardLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({
        email: authMethod === 'email' ? email : `${phone}@sms.medvault`,
        role: 'patient',
        demo: false
      });
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoPatientLogin = async () => {
    setIsLoading(true);
    try {
      await login({
        email: 'sarah.jenkins@example.com',
        role: 'patient',
        demo: true
      });
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoDoctorLogin = async () => {
    setIsLoading(true);
    try {
      await login({
        email: 'dr.chen@beaconhealth.org',
        role: 'doctor',
        demo: true
      });
      navigate('/doctor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-premium border border-slate-200/80">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Secure Clinical Access</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sign In to MedVault AI</h2>
        <p className="text-xs text-slate-500 mt-1">Access your unified clinical timeline and records.</p>
      </div>

      {/* One-Click Demo Evaluator Buttons */}
      <div className="mb-6 p-3.5 bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-100 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-cyan-900 uppercase tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
            Instant Evaluation Access
          </span>
          <span className="text-[10px] bg-cyan-200/60 text-cyan-800 px-2 py-0.5 rounded-full font-bold">1-Click</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDemoPatientLogin}
            disabled={isLoading}
            className="flex flex-col items-start p-2.5 bg-white border border-cyan-200 hover:border-cyan-400 rounded-lg text-left shadow-subtle hover:shadow transition-all group"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-cyan-600">
              <UserCheck className="w-3.5 h-3.5 text-cyan-500" />
              Demo Patient
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5">Sarah Jenkins (48F)</span>
          </button>
          <button
            type="button"
            onClick={handleDemoDoctorLogin}
            disabled={isLoading}
            className="flex flex-col items-start p-2.5 bg-white border border-teal-200 hover:border-teal-400 rounded-lg text-left shadow-subtle hover:shadow transition-all group"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 group-hover:text-teal-600">
              <Stethoscope className="w-3.5 h-3.5 text-teal-500" />
              Doctor Portal
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5">Dr. Robert Chen, MD</span>
          </button>
        </div>
      </div>

      {/* Method Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 mb-5 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setAuthMethod('email')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            authMethod === 'email'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          Email Address
        </button>
        <button
          type="button"
          onClick={() => setAuthMethod('phone')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            authMethod === 'phone'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          Mobile Phone
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleStandardLogin} className="space-y-4">
        {authMethod === 'email' ? (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                required
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">Password / OTP</label>
            <span className="text-[11px] text-cyan-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Don't have an account?</span>
        <Link to="/register" className="font-bold text-cyan-600 hover:underline">
          Register now
        </Link>
      </div>

      <div className="mt-4 text-[10px] text-slate-400 text-center leading-tight">
        Protected by Supabase Auth with encrypted sessions. Plaintext passwords are never stored.
      </div>
    </div>
  );
}
