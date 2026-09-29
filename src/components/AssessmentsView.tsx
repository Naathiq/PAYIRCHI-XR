import React, { useState, useMemo } from 'react';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Glasses, 
  Eye, 
  ChevronRight,
  TrendingUp,
  Download
} from 'lucide-react';
import { AssessmentRecord, Worker, Department } from '../types';
import { DEPARTMENTS } from '../data/mockData';

interface AssessmentsViewProps {
  assessments: AssessmentRecord[];
  workers: Worker[];
  onSelectWorker: (worker: Worker) => void;
  onExportCSV: (records: AssessmentRecord[]) => void;
}

export const AssessmentsView: React.FC<AssessmentsViewProps> = ({
  assessments,
  workers,
  onSelectWorker,
  onExportCSV
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');

  const filteredAssessments = useMemo(() => {
    return assessments.filter((item) => {
      const q = search.toLowerCase();
      const matchesSearch = 
        !q ||
        item.workerName.toLowerCase().includes(q) ||
        item.workerId.toLowerCase().includes(q) ||
        item.moduleName.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesDept = departmentFilter === 'All' || item.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [assessments, search, statusFilter, departmentFilter]);

  // Assessment Summary Stats
  const totalCount = assessments.length;
  const passedCount = assessments.filter(a => a.status === 'Passed').length;
  const passRate = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;
  const avgScore = totalCount > 0 ? Math.round(assessments.reduce((acc, a) => acc + a.score, 0) / totalCount) : 0;

  return (
    <div className="space-y-5">
      {/* Assessment Metrics Header */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Total AR Assessments</span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1 tabular-nums">
            {totalCount}
          </div>
          <span className="text-xs text-slate-500 mt-0.5 block">Standardized evaluations</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">First-Time Pass Rate</span>
          <div className="text-2xl font-bold text-emerald-600 font-mono mt-1 tabular-nums">
            {passRate}%
          </div>
          <span className="text-xs text-emerald-700 font-medium mt-0.5 block">Above 80% passing bar</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Mean Spatial Score</span>
          <div className="text-2xl font-bold text-blue-600 font-mono mt-1 tabular-nums">
            {avgScore}%
          </div>
          <span className="text-xs text-slate-500 mt-0.5 block">Across all facilities</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Avg Hazard Spot Time</span>
          <div className="text-2xl font-bold text-purple-600 font-mono mt-1 tabular-nums">
            1.6s
          </div>
          <span className="text-xs text-slate-500 mt-0.5 block">AR gaze target latency</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assessment by worker, ID, or safety module..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => onExportCSV(filteredAssessments)}
            className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg inline-flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Assessment Log</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
          <div>
            <label className="text-slate-500 font-medium block mb-1">Filter by Result</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-blue-500"
            >
              <option value="All">All Evaluation Outcomes</option>
              <option value="Passed">Passed (Score ≥ 80%)</option>
              <option value="Needs Retest">Needs Retest (Score &lt; 80%)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-500 font-medium block mb-1">Filter by Department</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-blue-500"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Assessment Records Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Worker & Department</th>
                <th className="py-3 px-4">AR Module Evaluated</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 pr-6">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredAssessments.map((record) => {
                const matchedWorker = workers.find(w => w.id === record.workerId);
                return (
                  <tr 
                    key={record.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 sm:px-6">
                      <div 
                        onClick={() => matchedWorker && onSelectWorker(matchedWorker)}
                        className="cursor-pointer group"
                      >
                        <span className="font-semibold text-slate-900 group-hover:text-blue-700 block leading-tight">
                          {record.workerName}
                        </span>
                        <span className="text-xs text-slate-400 font-mono block mt-0.5">
                          {record.workerId} · {record.department}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-xs font-medium text-slate-800 block">
                        {record.moduleName}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">
                      {record.date}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block font-mono text-xs font-bold px-2 py-0.5 rounded tabular-nums ${
                        record.score >= 80
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                          : 'text-rose-700 bg-rose-50 border border-rose-200'
                      }`}>
                        {record.score}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 pr-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        record.status === 'Passed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {record.status === 'Passed' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                        )}
                        <span>{record.status}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
