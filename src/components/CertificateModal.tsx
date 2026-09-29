import React from 'react';
import { X, Award, Printer, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { Certificate } from '../types';
import { WillCodeForCoffeeLogo, DigiLockerLogo } from './CertificateLogos';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Actions */}
        <div className="no-print p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-xl">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Official Credential Verification Record</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-md inline-flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-md transition-colors"
              aria-label="Close certificate"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas / Card (Printable) */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-slate-100/60 flex flex-col items-center">
          {/* Certificate Outer Border Frame */}
          <div className="w-full max-w-2xl bg-white border-2 border-slate-800 p-1.5 rounded-xl shadow-lg relative">
            <div className="border border-amber-600/30 p-1 rounded-lg">
              <div className="border-2 border-double border-slate-800 p-6 sm:p-8 rounded-md relative bg-radial from-slate-50/70 via-white to-slate-50/40">

                {/* Symmetrical Top Header: Centered Co-Issuing Brands & Title */}
                <div className="text-center pb-6 border-b border-slate-200">
                  {/* Co-Branding Crests */}
                  <div className="flex items-center justify-center gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div className="flex items-center gap-2">
                      <WillCodeForCoffeeLogo size={58} className="w-12 h-12 drop-shadow-2xs" />
                    </div>
                  </div>

                  {/* Organization & Title Hierarchy */}
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-500 font-bold block">
                    PAYIRCHI XR INDUSTRIAL SAFETY & SIMULATION BUREAU
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 tracking-tight">
                    Certificate of Competency
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 font-sans max-w-lg mx-auto">
                    Issued in accordance with OSHA Standard 1910 & XR-Simulation Safety Guidelines
                  </p>
                </div>

                {/* Recipient Details (Centered & Dignified) */}
                <div className="text-center py-6">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold block">
                    This is to certify that
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-blue-900 mt-1.5 tracking-tight">
                    {certificate.workerName}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    Employee ID: <span className="font-mono font-semibold text-slate-800">{certificate.workerId}</span> · Department: {certificate.department}
                  </p>

                  <div className="my-5 py-3.5 px-5 bg-slate-50/80 border border-slate-200 rounded-lg max-w-md mx-auto shadow-2xs">
                    <span className="text-[11px] text-slate-500 block uppercase font-medium">Has successfully demonstrated mastery in</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 block mt-0.5">
                      {certificate.certificateName}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Assessment Score: {certificate.assessmentScore}% in AR/XR Real-Time Simulation
                    </span>
                  </div>
                </div>

                {/* Metadata Grid (Balanced 4 Columns) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3.5 border-y border-slate-200 text-xs text-center">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Certificate #</span>
                    <span className="font-mono font-bold text-slate-800">{certificate.certificateNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Issue Date</span>
                    <span className="font-semibold text-slate-800">{certificate.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Valid Until</span>
                    <span className="font-semibold text-slate-800">{certificate.expiryDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-medium">Verification</span>
                    <span className="text-emerald-700 font-bold uppercase inline-flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      DigiLocker Verified
                    </span>
                  </div>
                </div>

                {/* Footer with Balanced 3-Column Alignment: QR Code, DigiLocker, Signature */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
                  {/* Left: QR Verification */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 border border-slate-200 rounded-lg bg-white shadow-2xs shrink-0">
                      <QrCode className="w-9 h-9 text-slate-700" />
                    </div>
                    <div className="text-[10px] text-slate-400 text-left">
                      <span className="block font-medium text-slate-600">Scan to verify credential</span>
                      <span className="font-mono text-[9px]">SHA-256 Verified Twin</span>
                    </div>
                  </div>

                  {/* Center: DigiLocker Badge */}
                  <div className="flex items-center justify-center shrink-0 bg-white border border-slate-200/90 rounded-lg px-3 py-1.5 shadow-2xs">
                    <DigiLockerLogo height={36} className="h-9 w-auto" />
                  </div>

                  {/* Right: Signature */}
                  <div className="text-center sm:text-right">
                    <div className="font-serif italic text-base text-slate-800 border-b border-slate-300 pb-1 px-4 inline-block sm:block">
                      Sarah Jenkins, CSHO
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium block mt-1">
                      Certified Safety & Training Director
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="no-print p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
