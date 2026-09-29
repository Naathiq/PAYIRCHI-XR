import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  AlertCircle, 
  Glasses, 
  CheckCircle2, 
  PlusCircle, 
  Search, 
  Filter,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  SlidersHorizontal,
  X,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import { TrainingModule, Worker } from '../types';
import { DEPARTMENTS } from '../data/mockData';

interface TrainingModulesViewProps {
  modules: TrainingModule[];
  workers: Worker[];
  onOpenAssignModal: (worker?: Worker, module?: TrainingModule) => void;
  onSelectWorker: (worker: Worker) => void;
}

export interface WorkerModuleStatus {
  worker: Worker;
  status: 'Completed' | 'In Progress' | 'Needs Retest' | 'Not Enrolled';
  progress: number;
  score: number | null;
  mistakesCount: number;
  durationMinutes: number | null;
  completedDate: string | null;
  hazardSpeed: string;
  notes: string;
}

export const TrainingModulesView: React.FC<TrainingModulesViewProps> = ({
  modules,
  workers,
  onOpenAssignModal,
  onSelectWorker
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  
  // Active module selected for detailed worker monitoring
  const [monitoredModule, setMonitoredModule] = useState<TrainingModule | null>(null);
  const [workerSearch, setWorkerSearch] = useState('');
  const [workerStatusFilter, setWorkerStatusFilter] = useState<string>('All');
  const [workerDeptFilter, setWorkerDeptFilter] = useState<string>('All');
  const [showOnlyEnrolled, setShowOnlyEnrolled] = useState(true);

  // Workers needing additional training across the facility
  const workersNeedingAttention = workers.filter(
    w => w.certificationStatus === 'Needs Retest' || (w.assessmentScore > 0 && w.assessmentScore < 75)
  );

  const categories = ['All', ...Array.from(new Set(modules.map(m => m.category)))];

  const filteredModules = modules.filter(m => {
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch = !search || 
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.arScenarioType.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate worker performance data for a given module
  const getWorkerPerformanceForModule = (module: TrainingModule): WorkerModuleStatus[] => {
    return workers.map(worker => {
      // Check if completed
      const completedRecord = worker.completedModules.find(cm => cm.moduleId === module.id);
      if (completedRecord) {
        return {
          worker,
          status: 'Completed',
          progress: 100,
          score: completedRecord.score,
          mistakesCount: completedRecord.mistakesCount,
          durationMinutes: completedRecord.durationMinutes,
          completedDate: completedRecord.completedDate,
          hazardSpeed: completedRecord.score >= 95 ? '1.2s avg' : '1.5s avg',
          notes: completedRecord.mistakesCount === 0 
            ? 'Zero protocol errors recorded in AR' 
            : `${completedRecord.mistakesCount} minor procedural hesitation(s)`
        };
      }

      // Check if actively assigned or current module
      const isAssigned = worker.assignedTraining.includes(module.id) || worker.currentModule === module.title;
      if (isAssigned) {
        if (worker.certificationStatus === 'Needs Retest' && worker.currentModule === module.title) {
          return {
            worker,
            status: 'Needs Retest',
            progress: worker.progress,
            score: worker.assessmentScore,
            mistakesCount: 3,
            durationMinutes: module.durationMinutes,
            completedDate: null,
            hazardSpeed: '2.9s avg (lagging)',
            notes: worker.areasForImprovement[0] || 'Protocol failure during emergency hazard scan'
          };
        }

        return {
          worker,
          status: worker.progress > 0 ? 'In Progress' : 'In Progress',
          progress: worker.currentModule === module.title ? worker.progress : 15,
          score: worker.assessmentScore > 0 ? worker.assessmentScore : null,
          mistakesCount: worker.assessmentScore < 80 && worker.assessmentScore > 0 ? 2 : 0,
          durationMinutes: Math.round(module.durationMinutes * 0.6),
          completedDate: null,
          hazardSpeed: '1.6s avg',
          notes: 'Active headset simulation in progress'
        };
      }

      // Not enrolled
      return {
        worker,
        status: 'Not Enrolled',
        progress: 0,
        score: null,
        mistakesCount: 0,
        durationMinutes: null,
        completedDate: null,
        hazardSpeed: '—',
        notes: 'Module not yet assigned'
      };
    });
  };

  // Performance data for currently monitored module
  const currentModuleWorkers = useMemo(() => {
    if (!monitoredModule) return [];
    const all = getWorkerPerformanceForModule(monitoredModule);
    return all.filter(item => {
      // Filter out not enrolled if showOnlyEnrolled is true
      if (showOnlyEnrolled && item.status === 'Not Enrolled') return false;

      // Status filter
      if (workerStatusFilter !== 'All' && item.status !== workerStatusFilter) return false;

      // Department filter
      if (workerDeptFilter !== 'All' && item.worker.department !== workerDeptFilter) return false;

      // Worker search
      if (workerSearch) {
        const q = workerSearch.toLowerCase();
        const matchesName = item.worker.name.toLowerCase().includes(q);
        const matchesId = item.worker.id.toLowerCase().includes(q);
        const matchesDept = item.worker.department.toLowerCase().includes(q);
        const matchesRole = item.worker.role.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesDept && !matchesRole) return false;
      }

      return true;
    });
  }, [monitoredModule, workers, showOnlyEnrolled, workerStatusFilter, workerDeptFilter, workerSearch]);

  // Aggregate stats for the currently monitored module
  const moduleAggregates = useMemo(() => {
    if (!monitoredModule) return null;
    const all = getWorkerPerformanceForModule(monitoredModule);
    const enrolled = all.filter(i => i.status !== 'Not Enrolled');
    const completed = enrolled.filter(i => i.status === 'Completed');
    const inProgress = enrolled.filter(i => i.status === 'In Progress');
    const needsRetest = enrolled.filter(i => i.status === 'Needs Retest');
    const scores = completed.map(i => i.score).filter((s): s is number => s !== null);
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : monitoredModule.avgScore;

    return {
      totalEnrolled: enrolled.length,
      completedCount: completed.length,
      inProgressCount: inProgress.length,
      needsRetestCount: needsRetest.length,
      avgScore,
      passRate: completed.length > 0 ? Math.round((completed.filter(c => (c.score || 0) >= 80).length / completed.length) * 100) : 100
    };
  }, [monitoredModule, workers]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search module title, scenario type, or keywords..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
        />
      </div>

      {/* Workers Requiring Additional Training */}
      {workersNeedingAttention.length > 0 && (
        <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-rose-900">
                  Workers Requiring Additional Training & Coaching ({workersNeedingAttention.length})
                </h3>
                <p className="text-xs text-rose-700 mt-0.5">
                  Workers who scored below the 80% passing threshold in AR simulations or committed procedural safety violations
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {workersNeedingAttention.map((worker) => (
              <div 
                key={worker.id}
                className="bg-white border border-rose-200/90 rounded-lg p-3.5 flex flex-col justify-between hover:border-rose-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span 
                      onClick={() => onSelectWorker(worker)}
                      className="text-sm font-semibold text-slate-900 hover:text-blue-600 cursor-pointer"
                    >
                      {worker.name}
                    </span>
                    <span className="font-mono text-xs font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded tabular-nums">
                      {worker.assessmentScore}% Score
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {worker.department} · {worker.role}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onSelectWorker(worker)}
                    className="text-slate-600 hover:text-slate-900 font-medium"
                  >
                    View History
                  </button>
                  <button
                    onClick={() => onOpenAssignModal(worker)}
                    className="px-2.5 py-1 font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded transition-colors"
                  >
                    Reassign AR Coaching
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module Category Filters & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => onOpenAssignModal()}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs inline-flex items-center gap-1.5 transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Assign Module</span>
        </button>
      </div>

      {/* Modules Catalog Grid with Direct "Monitor Worker Performance" Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredModules.map((module) => {
          const completionPercentage = Math.round(
            (module.completedCount / (module.completedCount + module.enrolledCount)) * 100
          );

          // Get count of workers enrolled or completed in this module from workers state
          const performanceRecords = getWorkerPerformanceForModule(module);
          const activeWorkersCount = performanceRecords.filter(r => r.status !== 'Not Enrolled').length;
          const retestCount = performanceRecords.filter(r => r.status === 'Needs Retest').length;

          return (
            <div 
              key={module.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Module Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {module.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-2">
                      {module.title}
                    </h4>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      module.difficulty === 'Foundation'
                        ? 'bg-slate-100 text-slate-700'
                        : module.difficulty === 'Intermediate'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-purple-50 text-purple-700'
                    }`}>
                      {module.difficulty}
                    </span>
                    {retestCount > 0 && (
                      <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        {retestCount} flagged
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {module.description}
                </p>

                {/* AR Scenario Metadata */}
                <div className="mt-4 p-2.5 bg-slate-50 border border-slate-100 rounded-lg flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium text-slate-800">
                    <Glasses className="w-3.5 h-3.5 text-blue-600" />
                    {module.arScenarioType}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {module.durationMinutes} min simulation
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Avg Score: {module.avgScore}%
                  </span>
                </div>

                {/* Learning Objectives */}
                <div className="mt-3.5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Key AR Competencies Evaluated:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {module.keyLearningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Progress & Bottom Actions */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500 font-medium">Facility Completion</span>
                  <span className="font-mono text-slate-900 font-semibold tabular-nums">
                    {module.completedCount} completed · {module.enrolledCount} enrolled
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3.5">
                  <div 
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-50">
                  <span className="text-xs text-slate-500">
                    Badge: <strong className="text-slate-700">{module.requiredCertification}</strong>
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {/* Dedicated Button to Monitor Worker Performance */}
                    <button
                      onClick={() => setMonitoredModule(module)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-300 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                      title="Open performance dashboard for each worker in this module"
                    >
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span>Monitor Workers ({activeWorkersCount})</span>
                    </button>

                    <button
                      onClick={() => onOpenAssignModal(undefined, module)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors inline-flex items-center gap-1"
                    >
                      <span>Assign</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Worker Performance Monitor Modal / Slide-out */}
      {monitoredModule && moduleAggregates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
          <div 
            className="bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col my-auto overflow-hidden animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                      {monitoredModule.id} · {monitoredModule.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {monitoredModule.durationMinutes} min simulation
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {monitoredModule.title} — Worker Performance Monitor
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time AR simulation evaluations, hazard spot times, and competency tracking
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAssignModal(undefined, monitoredModule)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Assign Worker</span>
                </button>
                <button
                  onClick={() => setMonitoredModule(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar for this Module */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50/80 border-b border-slate-200 text-xs">
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[11px] font-medium">Workers Monitored</span>
                <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                  {moduleAggregates.totalEnrolled} active
                </span>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[11px] font-medium">Fully Completed</span>
                <span className="text-lg font-bold text-emerald-600 font-mono tabular-nums">
                  {moduleAggregates.completedCount} passed
                </span>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[11px] font-medium">Average Module Score</span>
                <span className="text-lg font-bold text-blue-600 font-mono tabular-nums">
                  {moduleAggregates.avgScore}%
                </span>
              </div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[11px] font-medium">Retraining Required</span>
                <span className="text-lg font-bold text-rose-600 font-mono tabular-nums">
                  {moduleAggregates.needsRetestCount} workers
                </span>
              </div>
            </div>

            {/* Internal Filter & Search Bar */}
            <div className="p-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={workerSearch}
                  onChange={(e) => setWorkerSearch(e.target.value)}
                  placeholder="Filter workers in this module by name or ID..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={workerStatusFilter}
                  onChange={(e) => setWorkerStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Needs Retest">Needs Retest</option>
                </select>

                <select
                  value={workerDeptFilter}
                  onChange={(e) => setWorkerDeptFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-blue-500"
                >
                  <option value="All">All Departments</option>
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <label className="flex items-center gap-1.5 text-slate-600 text-[11px] cursor-pointer pl-1">
                  <input
                    type="checkbox"
                    checked={showOnlyEnrolled}
                    onChange={(e) => setShowOnlyEnrolled(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span>Enrolled only</span>
                </label>
              </div>
            </div>

            {/* Workers Table for this Module */}
            <div className="flex-1 overflow-y-auto">
              {currentModuleWorkers.length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">No Workers Match Filters</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Try clearing the filters or unchecking "Enrolled only" to assign new workers.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50/90 sticky top-0 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-4">Worker & Role</th>
                      <th className="py-2.5 px-4">Department</th>
                      <th className="py-2.5 px-4">Progress in Module</th>
                      <th className="py-2.5 px-4 text-center">AR Assessment Score</th>
                      <th className="py-2.5 px-4">Evaluation Telemetry</th>
                      <th className="py-2.5 px-4 text-right pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentModuleWorkers.map((item) => {
                      const w = item.worker;
                      return (
                        <tr 
                          key={w.id}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          {/* Worker & Role */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px] flex items-center justify-center shrink-0 border border-slate-200">
                                {w.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <span 
                                  onClick={() => {
                                    setMonitoredModule(null);
                                    onSelectWorker(w);
                                  }}
                                  className="font-semibold text-slate-900 hover:text-blue-600 cursor-pointer block leading-tight"
                                >
                                  {w.name}
                                </span>
                                <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                                  {w.id} · {w.role}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Department */}
                          <td className="py-3 px-4 text-slate-600">
                            {w.department}
                          </td>

                          {/* Progress in Module */}
                          <td className="py-3 px-4 min-w-[130px]">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className={`font-semibold ${
                                  item.status === 'Completed' 
                                    ? 'text-emerald-700' 
                                    : item.status === 'Needs Retest' 
                                    ? 'text-rose-700' 
                                    : 'text-blue-700'
                                }`}>
                                  {item.status}
                                </span>
                                <span className="font-mono tabular-nums text-slate-600">
                                  {item.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    item.status === 'Completed' 
                                      ? 'bg-emerald-500' 
                                      : item.status === 'Needs Retest' 
                                      ? 'bg-rose-500' 
                                      : 'bg-blue-600'
                                  }`}
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Assessment Score */}
                          <td className="py-3 px-4 text-center">
                            {item.score !== null ? (
                              <span className={`inline-block font-mono text-xs font-bold px-2 py-0.5 rounded tabular-nums ${
                                item.score >= 80 
                                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
                                  : 'text-rose-700 bg-rose-50 border border-rose-200'
                              }`}>
                                {item.score}%
                              </span>
                            ) : (
                              <span className="text-slate-400 text-xs italic">
                                Pending
                              </span>
                            )}
                          </td>

                          {/* Evaluation Telemetry & Feedback */}
                          <td className="py-3 px-4 text-slate-600 max-w-xs">
                            <div className="space-y-0.5">
                              <span className="font-mono text-[11px] text-slate-800 block">
                                Speed: {item.hazardSpeed} · {item.mistakesCount === 0 ? '0 mistakes' : `${item.mistakesCount} mistake(s)`}
                              </span>
                              <p className="text-[11px] text-slate-500 truncate" title={item.notes}>
                                {item.notes}
                              </p>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right pr-4">
                            <div className="flex items-center justify-end gap-1.5">
                              {item.status === 'Needs Retest' ? (
                                <button
                                  onClick={() => {
                                    setMonitoredModule(null);
                                    onOpenAssignModal(w, monitoredModule);
                                  }}
                                  className="px-2 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded transition-colors"
                                >
                                  Reassign AR Coach
                                </button>
                              ) : item.status === 'Not Enrolled' ? (
                                <button
                                  onClick={() => {
                                    setMonitoredModule(null);
                                    onOpenAssignModal(w, monitoredModule);
                                  }}
                                  className="px-2 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                                >
                                  Enroll Worker
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setMonitoredModule(null);
                                    onSelectWorker(w);
                                  }}
                                  className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded transition-colors"
                                >
                                  View Worker
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Showing <strong className="text-slate-800 font-mono">{currentModuleWorkers.length}</strong> worker records for {monitoredModule.title}
              </span>
              <button
                onClick={() => setMonitoredModule(null)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Close Monitor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
