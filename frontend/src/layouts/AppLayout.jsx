import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import { ChevronRight, Home } from 'lucide-react';

export default function AppLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Generate breadcrumb items
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden text-slate-900">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <TopNav onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)} />

        {/* Scrollable Page Content Container */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-5">
          {/* Top Medical Disclaimer Banner */}
          <MedicalDisclaimer />

          {/* Breadcrumbs */}
          {pathnames.length > 0 && (
            <nav className="flex items-center gap-1.5 text-xs text-slate-500">
              <Link to="/dashboard" className="flex items-center gap-1 hover:text-cyan-600 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const formattedName = name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ');

                return (
                  <React.Fragment key={name}>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    {isLast ? (
                      <span className="font-semibold text-slate-800">{formattedName}</span>
                    ) : (
                      <Link to={routeTo} className="hover:text-cyan-600 transition-colors">
                        {formattedName}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}

          {/* Page Route Outlet */}
          <div className="pb-12 animate-in fade-in duration-200">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
