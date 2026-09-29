import React, { useState, useMemo, useEffect } from 'react';
import { 
  Worker, 
  TrainingModule, 
  AssessmentRecord, 
  Certificate, 
  ActivityItem, 
  PlatformSettings,
  Department
} from './types';
import { 
  INITIAL_WORKERS, 
  INITIAL_MODULES, 
  INITIAL_ASSESSMENTS, 
  INITIAL_ACTIVITIES, 
  INITIAL_SETTINGS 
} from './data/mockData';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastContainer, ToastMessage } from './components/Toast';
import { DashboardView } from './components/DashboardView';
import { WorkersView } from './components/WorkersView';
import { WorkerDetailModal } from './components/WorkerDetailModal';
import { TrainingModulesView } from './components/TrainingModulesView';
import { AssessmentsView } from './components/AssessmentsView';
import { CertificationsView } from './components/CertificationsView';
import { CertificateModal } from './components/CertificateModal';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { AssignTrainingModal } from './components/AssignTrainingModal';
import { AddWorkerModal } from './components/AddWorkerModal';

export default function App() {
  // Navigation & UI state
  const [currentTab, setCurrentTab] = useState<NavigationTab>('Dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Primary Data State
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [modules, setModules] = useState<TrainingModule[]>(INITIAL_MODULES);
  const [assessments, setAssessments] = useState<AssessmentRecord[]>(INITIAL_ASSESSMENTS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [settings, setSettings] = useState<PlatformSettings>(INITIAL_SETTINGS);

  // Modals state
  const [selectedWorkerForDetail, setSelectedWorkerForDetail] = useState<Worker | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [assignModalData, setAssignModalData] = useState<{
    isOpen: boolean;
    initialWorker?: Worker | null;
    initialModule?: TrainingModule | null;
  }>({ isOpen: false });
  const [isAddWorkerModalOpen, setIsAddWorkerModalOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Derived Collections
  const allCertificates = useMemo(() => {
    return workers.flatMap(w => w.certificates);
  }, [workers]);

  const upcomingCerts = useMemo(() => {
    return allCertificates.filter(c => c.verificationStatus === 'Expiring Soon');
  }, [allCertificates]);

  // CSV Export Utility
  const handleExportCSV = (filename: string, rows: Record<string, any>[]) => {
    if (!rows || rows.length === 0) {
      addToast('info', 'No Data to Export', 'There are no records matching your current filter.');
      return;
    }

    const headers = Object.keys(rows[0]);
    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        headers.map(header => {
          const val = row[header] ?? '';
          const escaped = String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        }).join(',')
      )
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('success', 'File Downloaded', `Successfully exported ${rows.length} records to ${filename}`);
  };

  // Helper: Export workers directly
  const handleExportWorkers = (workerList: Worker[]) => {
    const rows = workerList.map(w => ({
      'Worker ID': w.id,
      'Name': w.name,
      'Email': w.email,
      'Department': w.department,
      'Role': w.role,
      'Assigned Module': w.currentModule,
      'Progress (%)': w.progress,
      'Assessment Score (%)': w.assessmentScore,
      'Competency Score (%)': w.competencyScore,
      'Certification Status': w.certificationStatus,
      'Assigned Headset': w.assignedHeadset
    }));
    handleExportCSV(`aegis_workers_roster_${new Date().toISOString().split('T')[0]}.csv`, rows);
  };

  // Helper: Export certs directly
  const handleExportCertificates = (certList: Certificate[]) => {
    const rows = certList.map(c => ({
      'Certificate #': c.certificateNumber,
      'Worker ID': c.workerId,
      'Worker Name': c.workerName,
      'Department': c.department,
      'Certificate Name': c.certificateName,
      'Completed Date': c.trainingCompletionDate,
      'Score (%)': c.assessmentScore,
      'Issue Date': c.issueDate,
      'Expiry Date': c.expiryDate,
      'Verification Status': c.verificationStatus,
      'Trainer': c.trainerName
    }));
    handleExportCSV(`aegis_safety_certifications_${new Date().toISOString().split('T')[0]}.csv`, rows);
  };

  // Handler: Assign Training (Individual or Department)
  const handleAssignTraining = (params: {
    targetType: 'individual' | 'department';
    workerId?: string;
    department?: Department;
    moduleId: string;
    dueDate: string;
  }) => {
    const targetModule = modules.find(m => m.id === params.moduleId);
    if (!targetModule) return;

    if (params.targetType === 'individual' && params.workerId) {
      const targetWorker = workers.find(w => w.id === params.workerId);
      if (!targetWorker) return;

      setWorkers(prev => prev.map(w => {
        if (w.id === params.workerId) {
          const updatedAssigned = Array.from(new Set([...w.assignedTraining, params.moduleId]));
          return {
            ...w,
            assignedTraining: updatedAssigned,
            currentModule: targetModule.title,
            progress: w.currentModule === targetModule.title ? w.progress : 15,
            certificationStatus: w.certificationStatus === 'Completed' ? 'Completed' : 'In Progress'
          };
        }
        return w;
      }));

      // Add to activity log
      const newActivity: ActivityItem = {
        id: `ACT-${Date.now()}`,
        type: 'training_assigned',
        workerName: targetWorker.name,
        workerId: targetWorker.id,
        department: targetWorker.department,
        moduleOrCert: targetModule.title,
        timestamp: 'Just now'
      };
      setActivities(prev => [newActivity, ...prev]);

      addToast(
        'success',
        'Training Assigned',
        `"${targetModule.title}" deployed to ${targetWorker.name}'s headset queue.`
      );
    } else if (params.targetType === 'department' && params.department) {
      const deptWorkers = workers.filter(w => w.department === params.department);
      
      setWorkers(prev => prev.map(w => {
        if (w.department === params.department) {
          const updatedAssigned = Array.from(new Set([...w.assignedTraining, params.moduleId]));
          return {
            ...w,
            assignedTraining: updatedAssigned,
            currentModule: targetModule.title,
            progress: 10,
            certificationStatus: 'In Progress'
          };
        }
        return w;
      }));

      // Update module enrollment count
      setModules(prev => prev.map(m => {
        if (m.id === params.moduleId) {
          return { ...m, enrolledCount: m.enrolledCount + deptWorkers.length };
        }
        return m;
      }));

      addToast(
        'success',
        'Batch Assignment Completed',
        `Assigned "${targetModule.title}" to ${deptWorkers.length} workers in ${params.department}.`
      );
    }
  };

  // Handler: Add New Worker
  const handleAddWorker = (newWorker: Worker) => {
    setWorkers(prev => [newWorker, ...prev]);
    addToast(
      'success',
      'Worker Registered',
      `${newWorker.name} (${newWorker.id}) registered in ${newWorker.department} with headset ${newWorker.assignedHeadset}.`
    );
  };

  // Handler: Renew Certificate
  const handleRenewCertificate = (cert: Certificate) => {
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + (settings.certValidityMonths / 12 || 1));
    const newExpiry = nextYear.toISOString().split('T')[0];

    setWorkers(prev => prev.map(w => {
      if (w.id === cert.workerId) {
        const updatedCerts = w.certificates.map(c => {
          if (c.id === cert.id) {
            return {
              ...c,
              expiryDate: newExpiry,
              verificationStatus: 'Verified' as const
            };
          }
          return c;
        });
        return {
          ...w,
          certificates: updatedCerts,
          certificationStatus: 'Completed'
        };
      }
      return w;
    }));

    // Update open modal if open
    if (selectedWorkerForDetail && selectedWorkerForDetail.id === cert.workerId) {
      setSelectedWorkerForDetail(prev => {
        if (!prev) return null;
        return {
          ...prev,
          certificates: prev.certificates.map(c => 
            c.id === cert.id ? { ...c, expiryDate: newExpiry, verificationStatus: 'Verified' } : c
          ),
          certificationStatus: 'Completed'
        };
      });
    }

    addToast(
      'success',
      'Certificate Renewed',
      `Extended validity of "${cert.certificateName}" for ${cert.workerName} until ${newExpiry}.`
    );
  };

  // Handler: Save Settings
  const handleSaveSettings = (newSettings: PlatformSettings) => {
    setSettings(newSettings);
    addToast('success', 'Settings Updated', 'Platform and certification rules have been applied.');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        workerCount={workers.length}
        expiringCount={upcomingCerts.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Sticky Header */}
        <Header
          currentTab={currentTab}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenAssignModal={() => setAssignModalData({ isOpen: true })}
          onOpenAddWorkerModal={() => setIsAddWorkerModalOpen(true)}
          expiringCount={upcomingCerts.length}
          onViewExpiring={() => setCurrentTab('Certifications')}
        />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'Dashboard' && (
            <DashboardView
              workers={workers}
              modules={modules}
              activities={activities}
              upcomingCerts={upcomingCerts}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectWorker={setSelectedWorkerForDetail}
              onSelectCertificate={setSelectedCertificate}
              onNavigateTab={setCurrentTab}
              onOpenAssignModal={() => setAssignModalData({ isOpen: true })}
            />
          )}

          {currentTab === 'Workers' && (
            <WorkersView
              workers={workers}
              onSelectWorker={setSelectedWorkerForDetail}
              onOpenAssignModal={(w) => setAssignModalData({ isOpen: true, initialWorker: w })}
              onOpenAddWorkerModal={() => setIsAddWorkerModalOpen(true)}
              onExportCSV={handleExportWorkers}
              initialSearchQuery={searchQuery}
            />
          )}

          {currentTab === 'Training Modules' && (
            <TrainingModulesView
              modules={modules}
              workers={workers}
              onOpenAssignModal={(w, m) => setAssignModalData({ isOpen: true, initialWorker: w, initialModule: m })}
              onSelectWorker={setSelectedWorkerForDetail}
            />
          )}

          {currentTab === 'Assessments' && (
            <AssessmentsView
              assessments={assessments}
              workers={workers}
              onSelectWorker={setSelectedWorkerForDetail}
              onExportCSV={(recs) => {
                const rows = recs.map(r => ({
                  'Assessment ID': r.id,
                  'Worker Name': r.workerName,
                  'Worker ID': r.workerId,
                  'Department': r.department,
                  'Module Name': r.moduleName,
                  'Evaluation Date': r.date,
                  'Score (%)': r.score,
                  'Outcome': r.status,
                  'Hazard Reaction Speed': r.arHazardSpottingSpeed,
                  'Mistakes Logged': r.mistakesRecorded,
                  'Protocol Compliance': `${r.protocolCompliance}%`,
                  'Supervisor Notes': r.feedback
                }));
                handleExportCSV(`aegis_ar_assessments_${new Date().toISOString().split('T')[0]}.csv`, rows);
              }}
            />
          )}

          {currentTab === 'Certifications' && (
            <CertificationsView
              certificates={allCertificates}
              workers={workers}
              onSelectCertificate={setSelectedCertificate}
              onSelectWorker={setSelectedWorkerForDetail}
              onRenewCertificate={handleRenewCertificate}
              onExportCSV={handleExportCertificates}
            />
          )}

          {currentTab === 'Reports' && (
            <ReportsView
              workers={workers}
              modules={modules}
              assessments={assessments}
              certificates={allCertificates}
              onSelectWorker={setSelectedWorkerForDetail}
              onExportCSV={handleExportCSV}
            />
          )}

          {currentTab === 'Settings' && (
            <SettingsView
              settings={settings}
              onSaveSettings={handleSaveSettings}
            />
          )}
        </main>
      </div>

      {/* Worker Profile Detail Modal */}
      <WorkerDetailModal
        worker={selectedWorkerForDetail}
        onClose={() => setSelectedWorkerForDetail(null)}
        onViewCertificate={(cert) => {
          setSelectedCertificate(cert);
        }}
        onAssignTrainingToWorker={(w) => {
          setSelectedWorkerForDetail(null);
          setAssignModalData({ isOpen: true, initialWorker: w });
        }}
        onRenewCert={(w, cert) => handleRenewCertificate(cert)}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Assign Training Modal */}
      <AssignTrainingModal
        isOpen={assignModalData.isOpen}
        onClose={() => setAssignModalData({ isOpen: false })}
        workers={workers}
        modules={modules}
        initialWorker={assignModalData.initialWorker}
        onAssign={handleAssignTraining}
      />

      {/* Register New Worker Modal */}
      <AddWorkerModal
        isOpen={isAddWorkerModalOpen}
        onClose={() => setIsAddWorkerModalOpen(false)}
        onAddWorker={handleAddWorker}
        existingCount={workers.length}
      />
    </div>
  );
}
