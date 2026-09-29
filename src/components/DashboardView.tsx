import React from 'react';
import { 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  Award, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';
import { Worker, Certificate, ActivityItem, TrainingModule } from '../types';

interface DashboardViewProps {
  workers: Worker[];
  modules: TrainingModule[];
  activities: ActivityItem[];
  upcomingCerts: Certificate[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectWorker: (worker: Worker) => void;
  onSelectCertificate: (cert: Certificate) => void;
  onNavigateTab: (tab: any) => void;
  onOpenAssignModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  workers,
  modules,
  activities,
  upcomingCerts,
  searchQuery,
  onSearchChange,
  onSelectWorker,
  onSelectCertificate,
  onNavigateTab,
  onOpenAssignModal
}) => {
  // Aggregate Metrics
  const totalWorkers = workers.length;
  const inTrainingCount = workers.filter(w => w.certificationStatus === 'In Progress' || (w.progress > 0 && w.progress < 100)).length;
  const completedCount = workers.filter(w => w.certificationStatus === 'Completed' || w.progress === 100).length;
  const certificatesCount = workers.reduce((acc, w) => acc + w.certificates.length, 0);

  // Overall training completion percentage
  const totalProgressSum = workers.reduce((acc, w) => acc + w.progress, 0);
  const overallCompletionRate = totalWorkers > 0 ? Math.round(totalProgressSum / totalWorkers) : 0;

  // Average competency score
  const totalCompetency = workers.reduce((acc, w) => acc + w.competencyScore, 0);
  const avgCompetencyScore = totalWorkers > 0 ? Math.round(totalCompetency / totalWorkers) : 0;

  // Department completion breakdown
  const departmentBreakdown = Array.from(new Set(workers.map(w => w.department))).map(dept => {
    const deptWorkers = workers.filter(w => w.department === dept);
    const avg = Math.round(deptWorkers.reduce((acc, w) => acc + w.progress, 0) / deptWorkers.length);
    return { department: dept, avg, count: deptWorkers.length };
  });

  return (
    <div className="space-y-6">
      {/* Overall Progress Score */}
      <div 
        style={{ width: '705.4px', height: '166.775px' }}
        className="max-w-full bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Facility Safety Benchmark
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">Passing Bar: 80%</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Overall Progress Score
            </h2>
          </div>

          <div className="flex items-baseline gap-2.5 shrink-0">
            <span className="text-3xl sm:text-4xl font-bold text-blue-600 font-mono tabular-nums">
              {overallCompletionRate}%
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
              {avgCompetencyScore}% Avg Competency
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${overallCompletionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4 Simple Summary Cards (Explicitly requested) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Workers */}
        <div 
          onClick={() => onNavigateTab('Workers')}
          className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Workers</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {totalWorkers}
            </span>
            <span className="text-xs text-slate-500">active roster</span>
          </div>
          <div className="mt-2 flex items-center text-xs text-blue-600 font-medium">
            <span>Manage worker profiles</span>
            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card 2: Workers in Training */}
        <div 
          onClick={() => onNavigateTab('Workers')}
          className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Workers in Training</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {inTrainingCount}
            </span>
            <span className="text-xs text-blue-700 font-medium bg-blue-50 px-1.5 py-0.5 rounded">
              Active sessions
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Across 6 industrial departments
          </div>
        </div>

        {/* Card 3: Completed Training */}
        <div 
          onClick={() => onNavigateTab('Training Modules')}
          className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Completed Training</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {completedCount}
            </span>
            <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
              {Math.round((completedCount / totalWorkers) * 100)}% of workforce
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Passed mandatory AR scenarios
          </div>
        </div>

        {/* Card 4: Certificates Issued */}
        <div 
          onClick={() => onNavigateTab('Certifications')}
          className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Certificates Issued</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {certificatesCount}
            </span>
            <span className="text-xs text-purple-700 font-medium bg-purple-50 px-1.5 py-0.5 rounded">
              Verified
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            OSHA & NFPA compliant credentials
          </div>
        </div>
      </div>

      {/* Training Progress (Explicitly requested) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Facility Training Progress</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Overall Completion:</span>
            <span className="text-base font-bold text-blue-600 font-mono tabular-nums">
              {overallCompletionRate}%
            </span>
          </div>
        </div>

        {/* Simple Progress Bar (Explicitly requested) */}
        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${overallCompletionRate}%` }}
          />
        </div>

        {/* Department mini-progress bars */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-5 pt-4 border-t border-slate-100">
          {departmentBreakdown.map((item) => (
            <div key={item.department} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 truncate font-medium" title={item.department}>
                  {item.department}
                </span>
                <span className="font-mono text-slate-900 font-semibold tabular-nums ml-1">
                  {item.avg}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    item.avg >= 85 ? 'bg-emerald-500' : item.avg >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${item.avg}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: Recent Activity & Upcoming Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity (Explicitly requested) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
            </div>
            <button
              onClick={() => onNavigateTab('Assessments')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
            >
              <span>View all logs</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 flex-1">
            {activities.slice(0, 5).map((act) => {
              const matchedWorker = workers.find(w => w.id === act.workerId);
              return (
                <div 
                  key={act.id}
                  onClick={() => matchedWorker && onSelectWorker(matchedWorker)}
                  className="flex items-start justify-between gap-3 p-3 bg-slate-50/80 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold ${
                      act.type === 'certificate_issued' 
                        ? 'bg-purple-100 text-purple-700'
                        : act.type === 'retest_flagged'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {act.type === 'certificate_issued' ? <Award className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 truncate">
                          {act.workerName}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">({act.workerId})</span>
                      </div>
                      <p className="text-xs text-slate-600 truncate mt-0.5">
                        {act.moduleOrCert}
                      </p>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        {act.timestamp} · {act.department}
                      </span>
                    </div>
                  </div>

                  {act.score !== undefined && (
                    <div className="text-right shrink-0">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded font-mono tabular-nums ${
                        act.score >= 80 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {act.score}%
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-1">
                        {act.score >= 80 ? 'Passed' : 'Needs Retest'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Certifications (Explicitly requested) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900">Upcoming Certifications</h3>
                <span className="bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded-full font-mono tabular-nums">
                  {upcomingCerts.length} Expiring Soon
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('Certifications')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 flex-1">
            {upcomingCerts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                <p className="text-sm font-medium text-slate-800">All Certifications are Up to Date</p>
                <p className="text-xs text-slate-500 mt-1">No credentials expiring in the next 30 days.</p>
              </div>
            ) : (
              upcomingCerts.map((cert) => {
                const matchedWorker = workers.find(w => w.id === cert.workerId);
                return (
                  <div 
                    key={cert.id}
                    className="p-3.5 bg-amber-50/40 border border-amber-200/80 rounded-lg hover:bg-amber-50/80 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span 
                            onClick={() => matchedWorker && onSelectWorker(matchedWorker)}
                            className="text-sm font-semibold text-slate-900 hover:text-blue-600 cursor-pointer"
                          >
                            {cert.workerName}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">({cert.workerId})</span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">
                          {cert.certificateName}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-amber-800 mt-1.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Expires: {cert.expiryDate}</span>
                          </span>
                          <span>·</span>
                          <span className="text-slate-500">{cert.department}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <button
                          onClick={() => onSelectCertificate(cert)}
                          className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 rounded-md shadow-2xs inline-flex items-center gap-1 transition-colors"
                        >
                          <span>View Cert</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                        <button
                          onClick={onOpenAssignModal}
                          className="px-2.5 py-1 text-xs font-medium text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors"
                        >
                          Schedule Recert
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
