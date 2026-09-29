import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Download, 
  Printer, 
  Filter, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Users, 
  FileText
} from 'lucide-react';
import { Worker, TrainingModule, AssessmentRecord, Certificate, Department } from '../types';
import { DEPARTMENTS } from '../data/mockData';

type ReportType = 
  | 'overall_completion'
  | 'worker_performance'
  | 'assessment_results'
  | 'certification_status'
  | 'retraining_required';

interface ReportsViewProps {
  workers: Worker[];
  modules: TrainingModule[];
  assessments: AssessmentRecord[];
  certificates: Certificate[];
  onSelectWorker: (worker: Worker) => void;
  onExportCSV: (filename: string, rows: Record<string, any>[]) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  workers,
  modules,
  assessments,
  certificates,
  onSelectWorker,
  onExportCSV
}) => {
  const [activeReport, setActiveReport] = useState<ReportType>('overall_completion');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  // Filter workers by dept
  const filteredWorkers = useMemo(() => {
    return selectedDept === 'All' 
      ? workers 
      : workers.filter(w => w.department === selectedDept);
  }, [workers, selectedDept]);

  // Workers needing retraining
  const retrainingWorkers = useMemo(() => {
    return filteredWorkers.filter(
      w => w.certificationStatus === 'Needs Retest' || (w.assessmentScore > 0 && w.assessmentScore < 75)
    );
  }, [filteredWorkers]);

  // Overall completion metrics
  const totalInFilter = filteredWorkers.length;
  const completedInFilter = filteredWorkers.filter(w => w.progress === 100).length;
  const inTrainingInFilter = filteredWorkers.filter(w => w.progress > 0 && w.progress < 100).length;
  const avgProgressInFilter = totalInFilter > 0 
    ? Math.round(filteredWorkers.reduce((acc, w) => acc + w.progress, 0) / totalInFilter) 
    : 0;

  // Handle Export CSV based on current report type
  const handleExportCSV = () => {
    let rows: Record<string, any>[] = [];
    let filename = `aegis-report-${activeReport}-${selectedDept.replace(/\s+/g, '_').toLowerCase()}.csv`;

    if (activeReport === 'overall_completion') {
      rows = filteredWorkers.map(w => ({
        'Worker ID': w.id,
        'Name': w.name,
        'Department': w.department,
        'Role': w.role,
        'Current Module': w.currentModule,
        'Progress (%)': w.progress,
        'Status': w.certificationStatus
      }));
    } else if (activeReport === 'worker_performance') {
      rows = filteredWorkers.map(w => ({
        'Worker ID': w.id,
        'Name': w.name,
        'Department': w.department,
        'Competency Score (%)': w.competencyScore,
        'Latest Assessment Score (%)': w.assessmentScore,
        'Completed Modules Count': w.completedModules.length,
        'Active Certificates': w.certificates.length,
        'Headset': w.assignedHeadset
      }));
    } else if (activeReport === 'assessment_results') {
      const filteredAsm = selectedDept === 'All' 
        ? assessments 
        : assessments.filter(a => a.department === selectedDept);
      rows = filteredAsm.map(a => ({
        'Assessment ID': a.id,
        'Worker Name': a.workerName,
        'Worker ID': a.workerId,
        'Department': a.department,
        'Module': a.moduleName,
        'Date': a.date,
        'Score (%)': a.score,
        'Status': a.status,
        'Reaction Time': a.arHazardSpottingSpeed,
        'Mistakes': a.mistakesRecorded,
        'Compliance (%)': a.protocolCompliance
      }));
    } else if (activeReport === 'certification_status') {
      const filteredCert = selectedDept === 'All'
        ? certificates
        : certificates.filter(c => c.department === selectedDept);
      rows = filteredCert.map(c => ({
        'Certificate Number': c.certificateNumber,
        'Worker Name': c.workerName,
        'Worker ID': c.workerId,
        'Department': c.department,
        'Credential Title': c.certificateName,
        'Completion Date': c.trainingCompletionDate,
        'Score (%)': c.assessmentScore,
        'Issue Date': c.issueDate,
        'Expiry Date': c.expiryDate,
        'Verification Status': c.verificationStatus
      }));
    } else if (activeReport === 'retraining_required') {
      rows = retrainingWorkers.map(w => ({
        'Worker ID': w.id,
        'Name': w.name,
        'Department': w.department,
        'Score (%)': w.assessmentScore,
        'Failed Module': w.currentModule,
        'Supervisor Notes': w.areasForImprovement.join('; ')
      }));
    }

    onExportCSV(filename, rows);
  };

  const handlePrint = () => {
    window.print();
  };

  const reportTabs = [
    { id: 'overall_completion' as const, label: 'Overall Training Completion' },
    { id: 'worker_performance' as const, label: 'Individual Worker Performance' },
    { id: 'assessment_results' as const, label: 'Assessment Results' },
    { id: 'certification_status' as const, label: 'Certification Status' },
    { id: 'retraining_required' as const, label: 'Workers Requiring Retraining' }
  ];

  return (
    <div className="space-y-5">
      {/* Top Header & Export Controls */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Safety Compliance & Audit Reports</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Generate certified compliance transcripts, completion aggregates, and retraining logs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs inline-flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 5 Report Selector Tabs (Explicitly requested) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {reportTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveReport(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                activeReport === tab.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Simple Department Filter */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium">Department Filter:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-800 text-xs focus:outline-hidden focus:border-blue-500"
          >
            <option value="All">All Departments ({workers.length} workers)</option>
            {DEPARTMENTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-5">
        {/* Document Header for Print */}
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                AEGIS AR SAFETY COMPLIANCE SYSTEM
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {reportTabs.find(t => t.id === activeReport)?.label}
              </h2>
            </div>
            <div className="text-right text-xs text-slate-500 font-mono">
              <span>Report Generated: {new Date().toISOString().split('T')[0]}</span>
              <span className="block text-[11px] text-slate-400">Department: {selectedDept}</span>
            </div>
          </div>
        </div>

        {/* Report Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="text-[11px] text-slate-500 uppercase font-medium block">Workers Analyzed</span>
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">{totalInFilter}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="text-[11px] text-slate-500 uppercase font-medium block">Average Completion</span>
            <span className="text-xl font-bold text-blue-600 font-mono tabular-nums">{avgProgressInFilter}%</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="text-[11px] text-slate-500 uppercase font-medium block">Fully Certified</span>
            <span className="text-xl font-bold text-emerald-600 font-mono tabular-nums">{completedInFilter}</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="text-[11px] text-slate-500 uppercase font-medium block">Retest Priority</span>
            <span className="text-xl font-bold text-rose-600 font-mono tabular-nums">{retrainingWorkers.length}</span>
          </div>
        </div>

        {/* Dynamic Report Table Based on Selected Tab */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          {/* Report 1: Overall Training Completion */}
          {activeReport === 'overall_completion' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
                <tr>
                  <th className="py-2.5 px-4">Worker ID & Name</th>
                  <th className="py-2.5 px-4">Department</th>
                  <th className="py-2.5 px-4">Current Module</th>
                  <th className="py-2.5 px-4">Progress</th>
                  <th className="py-2.5 px-4 text-right pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWorkers.map(w => (
                  <tr key={w.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-medium text-slate-900">
                      {w.name} <span className="font-mono text-slate-400">({w.id})</span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{w.department}</td>
                    <td className="py-2.5 px-4 text-slate-800">{w.currentModule}</td>
                    <td className="py-2.5 px-4 font-mono tabular-nums font-semibold">{w.progress}%</td>
                    <td className="py-2.5 px-4 text-right pr-4">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                        w.certificationStatus === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {w.certificationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Report 2: Individual Worker Performance */}
          {activeReport === 'worker_performance' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
                <tr>
                  <th className="py-2.5 px-4">Worker Name</th>
                  <th className="py-2.5 px-4">Department & Role</th>
                  <th className="py-2.5 px-4 text-center">Competency Score</th>
                  <th className="py-2.5 px-4 text-center">Latest AR Score</th>
                  <th className="py-2.5 px-4">Modules Completed</th>
                  <th className="py-2.5 px-4 text-right pr-4">Active Credentials</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWorkers.map(w => (
                  <tr key={w.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-medium text-slate-900">
                      {w.name} <span className="font-mono text-slate-400">({w.id})</span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{w.department} · {w.role}</td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold tabular-nums text-slate-800">
                      {w.competencyScore}%
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold tabular-nums">
                      <span className={w.assessmentScore >= 80 ? 'text-emerald-700' : 'text-rose-700'}>
                        {w.assessmentScore > 0 ? `${w.assessmentScore}%` : 'N/A'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono">{w.completedModules.length} modules</td>
                    <td className="py-2.5 px-4 text-right pr-4 font-mono font-semibold text-purple-700">
                      {w.certificates.length} certs
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Report 3: Assessment Results Summary */}
          {activeReport === 'assessment_results' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
                <tr>
                  <th className="py-2.5 px-4">Worker</th>
                  <th className="py-2.5 px-4">AR Module</th>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4 text-center">Score</th>
                  <th className="py-2.5 px-4">Hazard Spot Speed</th>
                  <th className="py-2.5 px-4 text-right pr-4">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assessments
                  .filter(a => selectedDept === 'All' || a.department === selectedDept)
                  .map(a => (
                    <tr key={a.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-medium text-slate-900">{a.workerName}</td>
                      <td className="py-2.5 px-4 text-slate-700">{a.moduleName}</td>
                      <td className="py-2.5 px-4 font-mono text-slate-500">{a.date}</td>
                      <td className="py-2.5 px-4 text-center font-mono font-bold tabular-nums">
                        {a.score}%
                      </td>
                      <td className="py-2.5 px-4 font-mono">{a.arHazardSpottingSpeed}</td>
                      <td className="py-2.5 px-4 text-right pr-4">
                        <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                          a.status === 'Passed' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* Report 4: Certification Status */}
          {activeReport === 'certification_status' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
                <tr>
                  <th className="py-2.5 px-4">Certificate ID & Credential</th>
                  <th className="py-2.5 px-4">Holder</th>
                  <th className="py-2.5 px-4">Department</th>
                  <th className="py-2.5 px-4">Issue Date</th>
                  <th className="py-2.5 px-4">Expiry Date</th>
                  <th className="py-2.5 px-4 text-right pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {certificates
                  .filter(c => selectedDept === 'All' || c.department === selectedDept)
                  .map(c => (
                    <tr key={c.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-medium text-slate-900">
                        {c.certificateName}
                        <span className="block font-mono text-[10px] text-slate-400">#{c.certificateNumber}</span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-800">{c.workerName}</td>
                      <td className="py-2.5 px-4 text-slate-600">{c.department}</td>
                      <td className="py-2.5 px-4 font-mono text-slate-500">{c.issueDate}</td>
                      <td className="py-2.5 px-4 font-mono text-slate-500">{c.expiryDate}</td>
                      <td className="py-2.5 px-4 text-right pr-4">
                        <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                          c.verificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                        }`}>
                          {c.verificationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* Report 5: Workers Requiring Retraining */}
          {activeReport === 'retraining_required' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
                <tr>
                  <th className="py-2.5 px-4">Worker</th>
                  <th className="py-2.5 px-4">Department</th>
                  <th className="py-2.5 px-4 text-center">Assessment Score</th>
                  <th className="py-2.5 px-4">Specific Area for Improvement</th>
                  <th className="py-2.5 px-4 text-right pr-4">Action Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {retrainingWorkers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No workers currently flagged for retraining in this department filter.
                    </td>
                  </tr>
                ) : (
                  retrainingWorkers.map(w => (
                    <tr key={w.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-medium text-slate-900">
                        {w.name} <span className="font-mono text-slate-400">({w.id})</span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">{w.department}</td>
                      <td className="py-2.5 px-4 text-center font-mono font-bold text-rose-700 tabular-nums">
                        {w.assessmentScore}%
                      </td>
                      <td className="py-2.5 px-4 text-slate-700">
                        {w.areasForImprovement[0] || 'Scheduled for coach review'}
                      </td>
                      <td className="py-2.5 px-4 text-right pr-4">
                        <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded font-semibold text-[11px]">
                          Immediate AR Coaching
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
