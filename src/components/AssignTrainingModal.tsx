import React, { useState } from 'react';
import { X, BookOpen, Users, Calendar, CheckSquare, Target } from 'lucide-react';
import { Worker, TrainingModule, Department } from '../types';
import { DEPARTMENTS } from '../data/mockData';

interface AssignTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  workers: Worker[];
  modules: TrainingModule[];
  initialWorker?: Worker | null;
  onAssign: (params: {
    targetType: 'individual' | 'department';
    workerId?: string;
    department?: Department;
    moduleId: string;
    dueDate: string;
  }) => void;
}

export const AssignTrainingModal: React.FC<AssignTrainingModalProps> = ({
  isOpen,
  onClose,
  workers,
  modules,
  initialWorker,
  onAssign
}) => {
  if (!isOpen) return null;

  const [targetType, setTargetType] = useState<'individual' | 'department'>(
    initialWorker ? 'individual' : 'individual'
  );
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>(
    initialWorker ? initialWorker.id : workers[0]?.id || ''
  );
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(
    DEPARTMENTS[0]
  );
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    modules[0]?.id || ''
  );
  const [dueDate, setDueDate] = useState<string>('2026-10-15');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModuleId) return;

    onAssign({
      targetType,
      workerId: targetType === 'individual' ? selectedWorkerId : undefined,
      department: targetType === 'department' ? selectedDepartment : undefined,
      moduleId: selectedModuleId,
      dueDate
    });

    onClose();
  };

  const selectedModule = modules.find(m => m.id === selectedModuleId);
  const targetWorker = workers.find(w => w.id === selectedWorkerId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-lg overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Assign AR Training</h3>
              <p className="text-xs text-slate-500">Deploy safety module to headset headsets and worker queues</p>
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
          {/* Target Mode Selector (Tabs) */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
              Assignment Target
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setTargetType('individual')}
                className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                  targetType === 'individual'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Individual Worker
              </button>
              <button
                type="button"
                onClick={() => setTargetType('department')}
                className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                  targetType === 'department'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Entire Department
              </button>
            </div>
          </div>

          {/* Individual Worker Selector */}
          {targetType === 'individual' ? (
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Select Worker
              </label>
              <select
                value={selectedWorkerId}
                onChange={(e) => setSelectedWorkerId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {workers.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.id}) — {w.department}
                  </option>
                ))}
              </select>
              {targetWorker && (
                <p className="text-xs text-slate-500 mt-1">
                  Current Headset: <span className="font-medium text-slate-700">{targetWorker.assignedHeadset}</span> · Role: {targetWorker.role}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Select Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value as Department)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept} ({workers.filter(w => w.department === dept).length} workers)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Module Selector */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Select AR Safety Module
            </label>
            <select
              value={selectedModuleId}
              onChange={(e) => setSelectedModuleId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} ({m.durationMinutes} min AR · {m.difficulty})
                </option>
              ))}
            </select>
            {selectedModule && (
              <div className="mt-2 p-2.5 bg-blue-50/50 border border-blue-100 rounded-lg text-xs text-slate-600">
                <span className="font-semibold text-blue-900 block mb-0.5">{selectedModule.title}</span>
                <p className="line-clamp-2">{selectedModule.description}</p>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-blue-700 font-medium">
                  <span>Scenario: {selectedModule.arScenarioType}</span>
                  <span>·</span>
                  <span>Pass Req: 80%</span>
                </div>
              </div>
            )}
          </div>

          {/* Target Due Date */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Required Completion Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Footer Buttons */}
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
              Assign Training
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
