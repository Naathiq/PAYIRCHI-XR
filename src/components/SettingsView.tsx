import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  Glasses, 
  Bell, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders, 
  RefreshCw,
  BatteryCharging,
  Wifi
} from 'lucide-react';
import { PlatformSettings } from '../types';

interface SettingsViewProps {
  settings: PlatformSettings;
  onSaveSettings: (newSettings: PlatformSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSaveSettings }) => {
  const [formData, setFormData] = useState<PlatformSettings>({ ...settings });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const headsetFleet = [
    { id: 'HL-01', model: 'Microsoft HoloLens 2', battery: '94%', status: 'Online', user: 'David Kim (WRK-1042)', firmware: 'v24.2-LTS' },
    { id: 'QP-03', model: 'Meta Quest Pro Industrial', battery: '82%', status: 'Online', user: 'Carlos Mendez (WRK-1046)', firmware: 'v68.1' },
    { id: 'ML-05', model: 'Magic Leap 2 Enterprise', battery: '89%', status: 'Online', user: 'Naomi Chen (WRK-1048)', firmware: 'v1.4.1' },
    { id: 'HL-09', model: 'Microsoft HoloLens 2', battery: '100%', status: 'Charging', user: 'Dock Station B', firmware: 'v24.2-LTS' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Platform & Certification Parameters</h3>
            <p className="text-xs text-slate-500">Configure safety thresholds, recertification rules, and AR headset fleet</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Certification & Scoring Rules */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-5">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Safety Evaluation & Certification Rules</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Passing Score Threshold */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700">
                  Minimum Assessment Passing Score
                </label>
                <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {formData.passingScoreThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                step="5"
                value={formData.passingScoreThreshold}
                onChange={(e) => setFormData({ ...formData, passingScoreThreshold: Number(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Workers scoring below this threshold are automatically flagged for instructor-led AR coaching.
              </p>
            </div>

            {/* Certification Validity Months */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Standard Certificate Validity Duration
              </label>
              <select
                value={formData.certValidityMonths}
                onChange={(e) => setFormData({ ...formData, certValidityMonths: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-blue-500"
              >
                <option value={6}>6 Months (High-Risk Chemical/Radiation)</option>
                <option value={12}>12 Months (OSHA Standard Annual)</option>
                <option value={24}>24 Months (General Workplace Safety)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Sets default expiration date when issuing digital twin safety credentials.
              </p>
            </div>

            {/* Expiration Notice Window */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Expiring Certification Alert Window
              </label>
              <select
                value={formData.expiringAlertDays}
                onChange={(e) => setFormData({ ...formData, expiringAlertDays: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-blue-500"
              >
                <option value={15}>15 Days in Advance</option>
                <option value={30}>30 Days in Advance (Recommended)</option>
                <option value={60}>60 Days in Advance</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Triggers visual warning badges and supervisor notifications on the dashboard.
              </p>
            </div>

            {/* Strict Protocol Mode */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="strictMode"
                checked={formData.strictModeProtocol}
                onChange={(e) => setFormData({ ...formData, strictModeProtocol: e.target.checked })}
                className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="strictMode" className="cursor-pointer">
                <span className="text-xs font-semibold text-slate-800 block">
                  Enforce Strict AR Hazard Timing Mode
                </span>
                <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                  Requires workers to identify pinch point hazards within 3.0 seconds during spatial simulation.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* AR Headset Fleet Status (Integrated with platform) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Glasses className="w-4 h-4 text-blue-600" />
              <span>AR Headset Fleet Management</span>
            </h4>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5" />
              Mesh Network Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {headsetFleet.map((device) => (
              <div key={device.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{device.model}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    device.status === 'Online' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {device.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Device Tag: {device.id} · {device.firmware}</span>
                  <span className="flex items-center gap-1 text-slate-700 font-mono">
                    <BatteryCharging className="w-3 h-3 text-emerald-600" />
                    {device.battery}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 pt-0.5 truncate">
                  Current Session: <strong className="text-slate-800">{device.user}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications and Alerts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-3">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Bell className="w-4 h-4 text-blue-600" />
            <span>Automated Notifications & Recertification Dispatch</span>
          </h4>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="autoNotify"
                checked={formData.autoNotification}
                onChange={(e) => setFormData({ ...formData, autoNotification: e.target.checked })}
                className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="autoNotify" className="cursor-pointer">
                <span className="text-xs font-semibold text-slate-800 block">
                  Automatic Email Alerts for Expiring Certifications
                </span>
                <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                  Sends scheduled reminder to workers and department leads 30 days before expiration.
                </span>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="syncCloud"
                checked={formData.arHeadsetSync}
                onChange={(e) => setFormData({ ...formData, arHeadsetSync: e.target.checked })}
                className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="syncCloud" className="cursor-pointer">
                <span className="text-xs font-semibold text-slate-800 block">
                  Real-Time AR Telemetry Telemetry Logging
                </span>
                <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                  Stream spatial eye-tracking and procedure checkpoint timestamps directly to audit trail.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-2">
            {isSaved && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Settings saved successfully!</span>
              </span>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs inline-flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
