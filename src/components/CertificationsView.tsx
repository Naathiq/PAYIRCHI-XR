import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  RefreshCw,
  Building2
} from 'lucide-react';
import { Certificate, Worker } from '../types';

interface CertificationsViewProps {
  certificates: Certificate[];
  workers: Worker[];
  onSelectCertificate: (cert: Certificate) => void;
  onSelectWorker: (worker: Worker) => void;
  onRenewCertificate: (cert: Certificate) => void;
  onExportCSV: (certs: Certificate[]) => void;
}

export const CertificationsView: React.FC<CertificationsViewProps> = ({
  certificates,
  workers,
  onSelectCertificate,
  onSelectWorker,
  onRenewCertificate,
  onExportCSV
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [deptFilter, setDeptFilter] = useState<string>('All');

  const departments = ['All', ...Array.from(new Set(certificates.map(c => c.department)))];

  const filteredCerts = useMemo(() => {
    return certificates.filter((cert) => {
      const q = search.toLowerCase();
      const matchesSearch = 
        !q ||
        cert.workerName.toLowerCase().includes(q) ||
        cert.workerId.toLowerCase().includes(q) ||
        cert.certificateName.toLowerCase().includes(q) ||
        cert.certificateNumber.toLowerCase().includes(q) ||
        cert.department.toLowerCase().includes(q) ||
        cert.verificationStatus.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || cert.verificationStatus === statusFilter;
      const matchesDept = deptFilter === 'All' || cert.department === deptFilter;

      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [certificates, search, statusFilter, deptFilter]);

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by worker name, ID, certificate title, or department..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
        />
      </div>

      {/* Certification Table (Explicitly requested format: Worker Name, Certificate Name, Training Completion Date, Assessment Score, Certificate Issue Date, Expiry Date, Verification Status) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Worker Name</th>
                <th className="py-3 px-4">Certificate Name</th>
                <th className="py-3 px-4">Training Completion Date</th>
                <th className="py-3 px-4 text-center">Assessment Score</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredCerts.map((cert) => {
                const matchedWorker = workers.find(w => w.id === cert.workerId);
                return (
                  <tr 
                    key={cert.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Worker Name */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div 
                        onClick={() => matchedWorker && onSelectWorker(matchedWorker)}
                        className="cursor-pointer group"
                      >
                        <span className="font-semibold text-slate-900 group-hover:text-blue-700 block leading-tight">
                          {cert.workerName}
                        </span>
                        <span className="text-xs text-slate-400 font-mono block mt-0.5">
                          {cert.workerId} · {cert.department}
                        </span>
                      </div>
                    </td>

                    {/* Certificate Name */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-900 block leading-tight">
                        {cert.certificateName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                        #{cert.certificateNumber}
                      </span>
                    </td>

                    {/* Training Completion Date */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">
                      {cert.trainingCompletionDate}
                    </td>

                    {/* Assessment Score */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded tabular-nums">
                        {cert.assessmentScore}%
                      </span>
                    </td>

                    {/* Certificate Issue Date */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">
                      {cert.issueDate}
                    </td>

                    {/* Expiry Date */}
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <span className={cert.verificationStatus === 'Expiring Soon' ? 'text-amber-700 font-bold' : 'text-slate-600'}>
                        {cert.expiryDate}
                      </span>
                    </td>

                    {/* Verification Status (Clear status labels: Completed, In Progress, Not Started, Expiring Soon) */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        cert.verificationStatus === 'Verified'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : cert.verificationStatus === 'Expiring Soon'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {cert.verificationStatus === 'Verified' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {cert.verificationStatus === 'Expiring Soon' && <Clock className="w-3 h-3 text-amber-600" />}
                        <span>{cert.verificationStatus}</span>
                      </span>
                    </td>

                    {/* Action button to view details / cert (Explicitly requested: 'View Certificate') */}
                    <td className="py-3.5 px-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectCertificate(cert)}
                          className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md inline-flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View Certificate</span>
                        </button>
                        {cert.verificationStatus === 'Expiring Soon' && (
                          <button
                            onClick={() => onRenewCertificate(cert)}
                            className="px-2 py-1 text-xs font-medium text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors"
                            title="Renew certification validity for 12 months"
                          >
                            Renew
                          </button>
                        )}
                      </div>
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
