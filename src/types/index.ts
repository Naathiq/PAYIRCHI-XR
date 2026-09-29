export type Department = 
  | 'Heavy Machinery'
  | 'Chemical Processing'
  | 'Electrical Safety'
  | 'High Altitude & Rigging'
  | 'Warehouse Logistics'
  | 'Welding & Fabrication';

export type TrainingStatus = 'Completed' | 'In Progress' | 'Not Started';

export type CertificationStatus = 'Completed' | 'In Progress' | 'Expiring Soon' | 'Needs Retest' | 'Not Started';

export interface Certificate {
  id: string;
  certificateNumber: string;
  workerId: string;
  workerName: string;
  department: Department;
  certificateName: string;
  trainingCompletionDate: string;
  assessmentScore: number;
  issueDate: string;
  expiryDate: string;
  verificationStatus: 'Verified' | 'Expiring Soon' | 'Needs Renewal' | 'In Progress';
  issuingAuthority: string;
  trainerName: string;
}

export interface CompletedModuleRecord {
  moduleId: string;
  moduleName: string;
  completedDate: string;
  score: number;
  durationMinutes: number;
  simulationType: string;
  mistakesCount: number;
}

export interface Worker {
  id: string;
  name: string;
  email: string;
  department: Department;
  role: string;
  assignedTraining: string[];
  currentModule: string;
  progress: number;
  assessmentScore: number;
  certificationStatus: CertificationStatus;
  hireDate: string;
  assignedHeadset: string;
  competencyScore: number;
  areasForImprovement: string[];
  completedModules: CompletedModuleRecord[];
  certificates: Certificate[];
}

export interface TrainingModule {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  arScenarioType: string;
  enrolledCount: number;
  completedCount: number;
  avgScore: number;
  description: string;
  keyLearningObjectives: string[];
  requiredCertification: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
}

export interface AssessmentRecord {
  id: string;
  workerId: string;
  workerName: string;
  department: Department;
  moduleId: string;
  moduleName: string;
  date: string;
  score: number;
  status: 'Passed' | 'Failed' | 'Needs Retest';
  arHazardSpottingSpeed: string;
  mistakesRecorded: number;
  protocolCompliance: number;
  feedback: string;
}

export interface ActivityItem {
  id: string;
  type: 'training_completed' | 'assessment_passed' | 'certificate_issued' | 'training_assigned' | 'retest_flagged';
  workerName: string;
  workerId: string;
  department: Department;
  moduleOrCert: string;
  score?: number;
  timestamp: string;
}

export interface PlatformSettings {
  passingScoreThreshold: number;
  certValidityMonths: number;
  expiringAlertDays: number;
  autoNotification: boolean;
  arHeadsetSync: boolean;
  strictModeProtocol: boolean;
}
