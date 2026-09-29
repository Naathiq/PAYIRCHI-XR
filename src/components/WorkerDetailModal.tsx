import React from 'react';
import { 
  X, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Glasses, 
  Calendar, 
  Building2, 
  FileText, 
  PlusCircle, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { Worker, Certificate } from '../types';

interface WorkerDetailModalProps {
  worker: Worker | null;
  onClose: () => void;
  onViewCertificate: (cert: Certificate) => void;
  onAssignTrainingToWorker: (worker: Worker) => void;
  onRenewCert: (worker: Worker, cert: Certificate) => void;
}

export const WorkerDetailModal: React.FC<WorkerDetailModalProps> = ({
  worker,
  onClose,
  onViewCertificate,
  onAssignTrainingToWorker,
  onRenewCert
}) => {
  if (!worker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-3xl max-h-[92vh] flex flex-col my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/70 rounded-t-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
              {worker.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">{worker.name}</h3>
                <span className="text-xs px-2 py-0.5 bg-slate-200/80 text-slate-700 font-mono rounded">
                  {worker.id}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  worker.certificationStatus === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : worker.certificationStatus === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : worker.certificationStatus === 'Expiring Soon'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {worker.certificationStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                <span className="font-medium text-slate-700">{worker.role}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {worker.department}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Glasses className="w-3.5 h-3.5 text-blue-600" />
                  Headset: {worker.assignedHeadset}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            aria-label="Close worker profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar: Competency Score & Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-medium text-slate-500 block">Overall Competency Score</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  {worker.competencyScore}%
                </span>
                <span className={`text-xs font-semibold ${
                  worker.competencyScore >= 90 ? 'text-emerald-700' : worker.competencyScore >= 75 ? 'text-blue-700' : 'text-amber-700'
                }`}>
                  {worker.competencyScore >= 90 ? 'Qualified' : worker.competencyScore >= 75 ? 'Standard' : 'Retest Required'}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-medium text-slate-500 block">Current Training Progress</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  {worker.progress}%
                </span>
                <span className="text-xs text-slate-500 truncate max-w-[120px]" title={worker.currentModule}>
                  {worker.progress === 100 ? 'All Completed' : worker.currentModule.split(' ')[0]}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-medium text-slate-500 block">Active Verified Certs</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-purple-700 font-mono tabular-nums">
                  {worker.certificates.length}
                </span>
                <span className="text-xs text-slate-500">Credentials</span>
              </div>
            </div>
          </div>

          {/* Areas for Improvement (Explicitly requested) */}
          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                Supervisor Notes & Areas for Improvement
              </h4>
            </div>
            {worker.areasForImprovement.length === 0 ? (
              <p className="text-xs text-slate-600">No active flags or protocol violations recorded.</p>
            ) : (
              <ul className="space-y-1.5 text-xs text-amber-950">
                {worker.areasForImprovement.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Training History (Explicitly requested) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>AR Training History & Simulation Results</span>
              </h4>
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                {worker.completedModules.length} Modules Completed
              </span>
            </div>

            {worker.completedModules.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 border border-dashed border-slate-200 rounded-lg">
                <p className="text-xs text-slate-500">No training modules completed yet. Module currently in progress.</p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100">
                {worker.completedModules.map((mod, idx) => (
                  <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                    <div>
                      <h5 className="text-sm font-medium text-slate-900">{mod.moduleName}</h5>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {mod.completedDate}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {mod.durationMinutes} mins in AR
                        </span>
                        <span>·</span>
                        <span className="text-slate-600">{mod.simulationType}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                          {mod.score}%
                        </span>
                        <span className="block text-[10px] text-slate-400">
                          {mod.mistakesCount === 0 ? '0 mistakes' : `${mod.mistakesCount} mistake(s)`}
                        </span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certificates (Explicitly requested) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Earned Safety Certifications</span>
              </h4>
            </div>

            {worker.certificates.length === 0 ? (
              <div className="p-5 text-center bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-xs text-slate-500">
                  No certificates issued yet. Candidate must complete assigned AR module and pass the assessment threshold (80%).
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {worker.certificates.map((cert) => (
                  <div 
                    key={cert.id}
                    className="p-4 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{cert.certificateName}</span>
                        <span className="text-xs text-slate-400 font-mono">#{cert.certificateNumber}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Issued: {cert.issueDate} · Expires: {cert.expiryDate} · Trainer: {cert.trainerName}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {cert.verificationStatus === 'Expiring Soon' && (
                        <button
                          onClick={() => onRenewCert(worker, cert)}
                          className="px-2.5 py-1 text-xs font-medium text-amber-800 bg-amber-100 hover:bg-amber-200 rounded transition-colors"
                        >
                          Renew
                        </button>
                      )}
                      <button
                        onClick={() => onViewCertificate(cert)}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg inline-flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3 rounded-b-xl">
          <div className="text-xs text-slate-500">
            Enrolled since {worker.hireDate}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAssignTrainingToWorker(worker)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs inline-flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Assign New Module</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
