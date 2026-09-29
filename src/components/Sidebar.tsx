import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  Award, 
  BarChart3, 
  Settings,
  Shield,
  X
} from 'lucide-react';

export type NavigationTab = 
  | 'Dashboard'
  | 'Workers'
  | 'Training Modules'
  | 'Assessments'
  | 'Certifications'
  | 'Reports'
  | 'Settings';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpen: boolean;
  onClose: () => void;
  workerCount: number;
  expiringCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onClose,
  workerCount,
  expiringCount
}) => {
  const menuItems: { id: NavigationTab; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Workers', label: 'Workers', icon: Users, badge: workerCount },
    { id: 'Training Modules', label: 'Training Modules', icon: BookOpen },
    { id: 'Assessments', label: 'Assessments', icon: ClipboardCheck },
    { id: 'Certifications', label: 'Certifications', icon: Award, badge: expiringCount > 0 ? `${expiringCount} soon` : undefined },
    { id: 'Reports', label: 'Reports', icon: BarChart3 },
    { id: 'Settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 tracking-tight text-base block leading-tight">
                PAYIRCHI <span className="text-blue-600 font-bold">XR</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-normal block leading-none mt-0.5">
                Industrial Safety Portal
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-mono tabular-nums ${
                      isActive
                        ? 'bg-blue-200/60 text-blue-800 font-semibold'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Profile Section (Required) */}
        <div className="p-3.5 border-t border-slate-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center shrink-0 border border-blue-200">
              M
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate leading-tight">
                Maya
              </p>
              <p className="text-xs text-slate-500 truncate leading-tight mt-0.5">
                Head of Safety & Training
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
