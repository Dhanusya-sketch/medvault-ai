import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Calendar, HeartPulse, 
  ShieldAlert, ShieldCheck, Check, Edit2, Save, X 
} from 'lucide-react';
import { api } from '../services/api';
import { useNotifications } from '../context/NotificationContext';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { showToast } = useNotifications();

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const p = await api.getProfile();
        setProfile(p);
        setFormData({
          phone: p.phone || '',
          email: p.email || '',
          address: p.address || '742 Evergreen Terrace, Springfield, MA',
          preferred_language: p.preferred_language || 'en'
        });
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const updated = await api.updateProfile(formData);
    setProfile(updated);
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 space-y-4">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-72 bg-white rounded-2xl border border-slate-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-0.5">
            <User className="w-3.5 h-3.5" />
            <span>Patient Dossier</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Patient Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage demographics, emergency contacts, and active chronic conditions.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
            isEditing
              ? 'bg-slate-200 text-slate-700'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4 text-cyan-600" />}
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-subtle space-y-6">
        {/* Banner with Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md shadow-cyan-500/20">
            {profile.first_name[0]}{profile.last_name[0]}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900">
                {profile.first_name} {profile.last_name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800">
                MRN: {profile.mrn}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
              <span>{profile.gender}</span>
              <span>•</span>
              <span>{profile.age} years old</span>
              <span>•</span>
              <span>DOB: {profile.date_of_birth}</span>
              <span>•</span>
              <span className="font-bold text-rose-600">Blood Group: {profile.blood_group}</span>
            </p>
          </div>
        </div>

        {/* Demographics & Contact */}
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Home Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px] mb-0.5">Email</span>
              <span className="font-bold text-slate-800">{profile.email}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px] mb-0.5">Phone</span>
              <span className="font-bold text-slate-800">{profile.phone}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px] mb-0.5">Emergency Contact</span>
              <span className="font-bold text-slate-800">
                {profile.emergency_contact?.name} ({profile.emergency_contact?.phone})
              </span>
            </div>
          </div>
        )}

        {/* Allergies Section */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Documented Allergies
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(profile.allergies || []).map((a, i) => (
              <div key={i} className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-rose-900 block">{a.allergen}</span>
                  <span className="text-[11px] text-rose-700">Reaction: {a.reaction}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-200 text-rose-900">
                  {a.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <HeartPulse className="w-4 h-4 text-cyan-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Active Chronic Conditions
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(profile.chronic_conditions || []).map((c, i) => (
              <div key={i} className="p-3 rounded-xl bg-cyan-50/60 border border-cyan-200 text-xs">
                <span className="font-bold text-cyan-950 block">{c.condition}</span>
                <span className="text-[11px] text-slate-500 block mt-1">Diagnosed: {c.diagnosed_date}</span>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-cyan-800 border border-cyan-200">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
