import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import DocumentUpload from './pages/DocumentUpload';
import DocumentProcessing from './pages/DocumentProcessing';
import DocumentDetails from './pages/DocumentDetails';
import Timeline from './pages/Timeline';
import TimelineEventDetails from './pages/TimelineEventDetails';
import EvidenceViewer from './pages/EvidenceViewer';
import Analytics from './pages/Analytics';
import AIChat from './pages/AIChat';
import Reminders from './pages/Reminders';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorPatientList from './pages/DoctorPatientList';
import DoctorPatientView from './pages/DoctorPatientView';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              {/* Public Authentication Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Authenticated Persistent Layout Routes */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/documents/upload" element={<DocumentUpload />} />
                <Route path="/documents/:id/processing" element={<DocumentProcessing />} />
                <Route path="/documents/:id" element={<DocumentDetails />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/timeline/:id" element={<TimelineEventDetails />} />
                <Route path="/evidence/:id" element={<EvidenceViewer />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/chat" element={<AIChat />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

                {/* Doctor Portal Routes */}
                <Route path="/doctor" element={<DoctorDashboard />} />
                <Route path="/doctor/patients" element={<DoctorPatientList />} />
                <Route path="/doctor/patients/:id" element={<DoctorPatientView />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
