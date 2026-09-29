import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Download, 
  BookOpen, 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronRight,
  ExternalLink,
  Users
} from 'lucide-react';
import { Worker, Department, CertificationStatus } from '../types';
import { DEPARTMENTS } from '../data/mockData';

interface WorkersViewProps {
  workers: Worker[];
  onSelectWorker: (worker: Worker) => void;
  onOpenAssignModal: (worker?: Worker) => void;
  onOpenAddWorkerModal: () => void;
  onExportCSV: (filteredWorkers: Worker[]) => void;
  initialSearchQuery?: string;
}

export const WorkersView: React.FC<WorkersViewProps> = ({
  workers,
  onSelectWorker,
  onOpenAssignModal,
  onOpenAddWorkerModal,
  onExportCSV,
  initialSearchQuery = ''
}) => {
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedTrainingStatus, setSelectedTrainingStatus] = useState<string>('All');
  const [selectedCertStatus, setSelectedCertStatus] = useState<string>('All');

  // Filter logic
  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      // Search query filter (matches name, ID, role, department, current module)
      const q = search.toLowerCase();
      const matchesSearch = 
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.role.toLowerCase().includes(q) ||
        w.department.toLowerCase().includes(q) ||
        w.currentModule.toLowerCase().includes(q);

      // Department filter
      const matchesDept = selectedDept === 'All' || w.department === selectedDept;

      // Training Status filter
      let matchesTraining = true;
      if (selectedTrainingStatus === 'Completed') {
        matchesTraining = w.progress === 100;
      } else if (selectedTrainingStatus === 'In Progress') {
        matchesTraining = w.progress > 0 && w.progress < 100;
      } else if (selectedTrainingStatus === 'Not Started') {
        matchesTraining = w.progress === 0;
      }

      // Certification Status filter
      const matchesCert = selectedCertStatus === 'All' || w.certificationStatus === selectedCertStatus;

      return matchesSearch && matchesDept && matchesTraining && matchesCert;
    });
  }, [workers, search, selectedDept, selectedTrainingStatus, selectedCertStatus]);

  const resetFilters = () => {
    setSearch('');
    setSelectedDept('All');
    setSelectedTrainingStatus('All');
    setSelectedCertStatus('All');
  };

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by worker name, ID (e.g. WRK-1042), department, or training module..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
        />
      </div>

      {/* Worker Management Table (Explicitly requested) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        {filteredWorkers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-slate-800">No Workers Match Current Filters</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search criteria or resetting filters to see the worker roster.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4 sm:px-6">Worker Name & ID</th>
                  <th className="py-3 px-4">Department / Industry</th>
                  <th className="py-3 px-4">Assigned AR Training</th>
                  <th className="py-3 px-4">Training Progress</th>
                  <th className="py-3 px-4 text-center">Assessment Score</th>
                  <th className="py-3 px-4">Certification Status</th>
                  <th className="py-3 px-4 text-right pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredWorkers.map((worker) => (
                  <tr 
                    key={worker.id}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                    onClick={() => onSelectWorker(worker)}
                  >
                    {/* Worker Name and ID */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 group-hover:text-blue-700 block leading-tight">
                            {worker.name}
                          </span>
                          <span className="font-mono text-xs text-slate-400 block mt-0.5">
                            {worker.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Department or Industry */}
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{worker.department}</span>
                      </span>
                    </td>

                    {/* Assigned Training */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="text-xs text-slate-800 font-medium truncate block" title={worker.currentModule}>
                        {worker.currentModule}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {worker.assignedTraining.length} module(s) assigned
                      </span>
                    </td>

                    {/* Training Progress */}
                    <td className="py-3.5 px-4 min-w-[130px]">
                      <div className="flex items-center gap-2 transition-transform duration-200 ease-out hover:scale-105 origin-left cursor-default">
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden shadow-2xs">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              worker.progress === 100 
                                ? 'bg-emerald-500' 
                                : worker.progress > 0 
                                ? 'bg-blue-600' 
                                : 'bg-slate-300'
                            }`}
                            style={{ width: `${worker.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-slate-600 tabular-nums w-8 text-right font-medium">
                          {worker.progress}%
                        </span>
                      </div>
                    </td>

                    {/* Assessment Score */}
                    <td className="py-3.5 px-4 text-center">
                      {worker.assessmentScore > 0 ? (
                        <span className={`inline-block font-mono text-xs font-bold px-2 py-0.5 rounded tabular-nums transition-transform duration-200 ease-out hover:scale-115 hover:shadow-xs cursor-default ${
                          worker.assessmentScore >= 80
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                            : 'text-rose-700 bg-rose-50 border border-rose-200'
                        }`}>
                          {worker.assessmentScore}%
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Pending</span>
                      )}
                    </td>

                    {/* Certification Status (Color-coded status badge with high contrast) */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-transform duration-200 ease-out hover:scale-105 hover:shadow-xs cursor-default ${
                        worker.certificationStatus === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : worker.certificationStatus === 'In Progress'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : worker.certificationStatus === 'Expiring Soon'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : worker.certificationStatus === 'Needs Retest'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {worker.certificationStatus === 'Completed' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {worker.certificationStatus === 'Expiring Soon' && <Clock className="w-3 h-3 text-amber-600" />}
                        {worker.certificationStatus === 'Needs Retest' && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                        <span>{worker.certificationStatus}</span>
                      </span>
                    </td>

                    {/* Action button to view details (Explicitly requested) */}
                    <td className="py-3.5 px-4 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectWorker(worker)}
                          className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onOpenAssignModal(worker)}
                          className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                          title="Assign Training"
                        >
                          Assign
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
