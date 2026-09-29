import React, { useState } from 'react';
import { X, UserPlus, Shield } from 'lucide-react';
import { Worker, Department } from '../types';
import { DEPARTMENTS } from '../data/mockData';

interface AddWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWorker: (worker: Worker) => void;
  existingCount: number;
}

export const AddWorkerModal: React.FC<AddWorkerModalProps> = ({
  isOpen,
  onClose,
  onAddWorker,
  existingCount
}) => {
  if (!isOpen) return null;

  const newId = `WRK-${1061 + existingCount}`;
  const [name, setName] = useState('');
  const [department, setDepartment] = useState<Department>(DEPARTMENTS[0]);
  const [role, setRole] = useState('');
  const [headset, setHeadset] = useState('HoloLens 2 #16');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const email = `${name.toLowerCase().replace(/\s+/g, '.')}@apex-industrial.com`;

    const newWorker: Worker = {
      id: newId,
      name: name.trim(),
      email,
      department,
      role: role.trim() || 'Safety Trainee',
      assignedTraining: ['MOD-101'],
      currentModule: 'AR Hazard Recognition & Spatial Scan',
      progress: 0,
      assessmentScore: 0,
      certificationStatus: 'Not Started',
      hireDate: new Date().toISOString().split('T')[0],
      assignedHeadset: headset,
      competencyScore: 75,
      areasForImprovement: ['Initial onboarding AR orientation required'],
      completedModules: [],
      certificates: []
    };

    onAddWorker(newWorker);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-md overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Register Worker</h3>
              <p className="text-xs text-slate-500">Add safety trainee to AR training roster</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Liam Gallagher"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value as Department)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Job Title / Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Rigging Technician Apprentice"
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Assigned AR Headset
            </label>
            <select
              value={headset}
              onChange={(e) => setHeadset(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="HoloLens 2 #16">HoloLens 2 #16 (Available)</option>
              <option value="Quest Pro #10">Quest Pro #10 (Available)</option>
              <option value="Magic Leap 2 #08">Magic Leap 2 #08 (Available)</option>
              <option value="Unassigned">Unassigned (Device Pool)</option>
            </select>
          </div>

          <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg text-xs text-slate-600">
            <span className="font-semibold text-blue-900">Auto-Provisioning:</span> New worker will be allocated ID <span className="font-mono font-semibold">{newId}</span> and enrolled into introductory AR Hazard Recognition module.
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              Register Worker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
