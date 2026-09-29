import React from 'react';
import { Menu, Search, PlusCircle, ArrowUpRight } from 'lucide-react';
import { NavigationTab } from './Sidebar';

interface HeaderProps {
  currentTab: NavigationTab;
  onOpenMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAssignModal: () => void;
  onOpenAddWorkerModal: () => void;
  expiringCount: number;
  onViewExpiring: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
  onOpenAssignModal,
  onOpenAddWorkerModal,
  expiringCount,
  onViewExpiring
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
      {/* Left zone: Mobile toggle & View title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-slate-900 leading-tight">
            {currentTab}
          </h1>
        </div>
      </div>

      {/* Center / Search zone */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search workers, IDs, departments, or safety modules..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Right zone: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {currentTab === 'Workers' && (
          <>
            <button
              onClick={onOpenAddWorkerModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Add Worker</span>
            </button>

            <button
              onClick={onOpenAssignModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <span>Assign Training</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
            </button>
          </>
        )}
      </div>
    </header>
  );
};
