import { 
  Worker, 
  TrainingModule, 
  AssessmentRecord, 
  Certificate, 
  ActivityItem, 
  PlatformSettings,
  Department 
} from '../types';

export const DEPARTMENTS: Department[] = [
  'Heavy Machinery',
  'Chemical Processing',
  'Electrical Safety',
  'High Altitude & Rigging',
  'Warehouse Logistics',
  'Welding & Fabrication',
];

export const INITIAL_MODULES: TrainingModule[] = [
  {
    id: 'MOD-101',
    title: 'AR Hazard Recognition & Spatial Scan',
    category: 'Foundational Safety',
    durationMinutes: 25,
    arScenarioType: 'Spatial LiDAR Pass-Through',
    enrolledCount: 42,
    completedCount: 184,
    avgScore: 91,
    difficulty: 'Foundation',
    description: 'Interactive pass-through AR simulation requiring trainees to identify 15 real-time industrial hazards, pinch points, and blocked emergency egresses.',
    keyLearningObjectives: [
      'Identify unmarked trip & fall hazards within 3 seconds',
      'Verify emergency exit pathways and eyewash station clearance',
      'Detect missing machine guarding on active conveyors'
    ],
    requiredCertification: 'General Industrial Safety Level 1',
  },
  {
    id: 'MOD-102',
    title: 'Lockout / Tagout (LOTO) AR Simulation',
    category: 'Isolation Protocols',
    durationMinutes: 35,
    arScenarioType: 'Interactive 3D Equipment Twin',
    enrolledCount: 28,
    completedCount: 142,
    avgScore: 86,
    difficulty: 'Intermediate',
    description: 'Full procedural zero-energy verification. Trainees apply virtual padlocks, bleed pneumatic lines, and test residual voltage on high-pressure equipment.',
    keyLearningObjectives: [
      'Locate and de-energize primary hydraulic and electric manifolds',
      'Execute 6-step zero-energy dissipation check',
      'Apply standardized OSHA tags with verified lock cylinders'
    ],
    requiredCertification: 'OSHA LOTO Specialist AR',
  },
  {
    id: 'MOD-103',
    title: 'High-Altitude Fall Protection & Rigging',
    category: 'Heights & Elevated Work',
    durationMinutes: 40,
    arScenarioType: 'Elevated Virtual Platform',
    enrolledCount: 19,
    completedCount: 98,
    avgScore: 89,
    difficulty: 'Advanced',
    description: 'Simulates 25-meter elevation scaffold tasks. Workers must inspect harnesses, calculate fall clearance margins, and secure 100% tie-off anchors.',
    keyLearningObjectives: [
      'Conduct 5-point harness webbing and D-ring wear inspection',
      'Calculate shock-absorbing lanyard elongation margins',
      'Lock dual carabiner anchorage prior to foot repositioning'
    ],
    requiredCertification: 'Certified Rigging & High Fall Specialist',
  },
  {
    id: 'MOD-104',
    title: 'Chemical Spill Containment & Neutralization',
    category: 'Hazardous Materials',
    durationMinutes: 30,
    arScenarioType: 'Dynamic Fluid Spill Simulation',
    enrolledCount: 22,
    completedCount: 116,
    avgScore: 84,
    difficulty: 'Intermediate',
    description: 'Dynamic spill event featuring corrosive acid vapor. Requires immediate SDS lookup, virtual boom deployment, and chemical neutralizer dispersal.',
    keyLearningObjectives: [
      'Interpret GHS hazard pictograms under pressure',
      'Deploy absorbent dykes to prevent sewer drainage',
      'Operate emergency eyewash within the 10-second threshold'
    ],
    requiredCertification: 'HazMat First Responder Level 2',
  },
  {
    id: 'MOD-105',
    title: 'Arc Flash & High-Voltage Isolation',
    category: 'Electrical Safety',
    durationMinutes: 45,
    arScenarioType: 'Precision Switchgear Spatial Twin',
    enrolledCount: 16,
    completedCount: 76,
    avgScore: 92,
    difficulty: 'Advanced',
    description: 'Realistic 480V/4160V switchgear simulation. Focuses on NFPA 70E boundary boundaries, calorie-rated face shields, and insulated stick operations.',
    keyLearningObjectives: [
      'Establish prohibited and restricted flash boundary zones',
      'Verify Cat IV 1000V rated insulated gloves and face shield seal',
      'Perform live-dead-live meter verification on bus bars'
    ],
    requiredCertification: 'NFPA 70E Arc Flash Certified',
  },
  {
    id: 'MOD-106',
    title: 'Forklift & Autonomous Rover Blind-Spot Detection',
    category: 'Mobile Equipment',
    durationMinutes: 20,
    arScenarioType: '360° Industrial Field-of-View',
    enrolledCount: 31,
    completedCount: 165,
    avgScore: 88,
    difficulty: 'Foundation',
    description: 'AR simulation demonstrating vehicle blind zones, pedestrian horn protocols, and stopping distance physics across wet or oily concrete floors.',
    keyLearningObjectives: [
      'Recognize forklift mast blind angles at intersections',
      'Enforce the 3-meter pedestrian safety bubble rule',
      'Execute horn signaling before traversing doorway thresholds'
    ],
    requiredCertification: 'Industrial Fleet Safety Standard',
  },
  {
    id: 'MOD-107',
    title: 'Confined Space Entry & Atmospheric Testing',
    category: 'Confined Spaces',
    durationMinutes: 40,
    arScenarioType: 'Subterranean Chamber Immersion',
    enrolledCount: 14,
    completedCount: 82,
    avgScore: 85,
    difficulty: 'Advanced',
    description: 'Subterranean vessel entry with simulated multi-gas detector calibration, continuous ventilation, and retrieval tripod setup.',
    keyLearningObjectives: [
      'Calibrate 4-gas monitor (O2, LEL, CO, H2S)',
      'Establish continuous forced-air mechanical ventilation',
      'Maintain non-entry rescue winch connection at all times'
    ],
    requiredCertification: 'Confined Space Authorized Entrant',
  },
  {
    id: 'MOD-108',
    title: 'Industrial Hot Work & Oxy-Fuel Safety',
    category: 'Welding & Cutting',
    durationMinutes: 30,
    arScenarioType: 'Thermal & Spark Trajectory Model',
    enrolledCount: 20,
    completedCount: 104,
    avgScore: 90,
    difficulty: 'Intermediate',
    description: '3D spark projection modeling for cutting and welding operations. Covers 35-foot fire protection radius, spark curtains, and fire watch protocols.',
    keyLearningObjectives: [
      'Establish 35-foot combustible-free radius with wetting down',
      'Verify flashback arrestors on oxygen and fuel cylinders',
      'Maintain designated 60-minute post-weld fire watch'
    ],
    requiredCertification: 'OSHA Hot Work & Fire Watch Operator',
  }
];

export const INITIAL_WORKERS: Worker[] = [
  {
    id: 'WRK-1042',
    name: 'Naathiq Hussain',
    email: 'naathiq.hussain@apex-industrial.com',
    department: 'Heavy Machinery',
    role: 'Lead CNC & Press Operator',
    assignedTraining: ['MOD-102', 'MOD-106'],
    currentModule: 'Lockout / Tagout (LOTO) AR Simulation',
    progress: 100,
    assessmentScore: 94,
    certificationStatus: 'Completed',
    hireDate: '2023-04-12',
    assignedHeadset: 'HoloLens 2 #04',
    competencyScore: 96,
    areasForImprovement: ['Minor hesitation on secondary bleed valve check (improved by 12% in retest)'],
    completedModules: [
      {
        moduleId: 'MOD-101',
        moduleName: 'AR Hazard Recognition & Spatial Scan',
        completedDate: '2026-08-14',
        score: 98,
        durationMinutes: 22,
        simulationType: 'Spatial LiDAR Pass-Through',
        mistakesCount: 0
      },
      {
        moduleId: 'MOD-102',
        moduleName: 'Lockout / Tagout (LOTO) AR Simulation',
        completedDate: '2026-09-10',
        score: 94,
        durationMinutes: 32,
        simulationType: 'Interactive 3D Equipment Twin',
        mistakesCount: 1
      }
    ],
    certificates: [
      {
        id: 'CERT-801',
        certificateNumber: 'CERT-2026-09-801',
        workerId: 'WRK-1042',
        workerName: 'Naathiq Hussain',
        department: 'Heavy Machinery',
        certificateName: 'OSHA LOTO Specialist AR',
        trainingCompletionDate: '2026-09-10',
        assessmentScore: 94,
        issueDate: '2026-09-11',
        expiryDate: '2027-09-11',
        verificationStatus: 'Verified',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Sarah Jenkins, CSHO'
      }
    ]
  },
  {
    id: 'WRK-1043',
    name: 'Narender',
    email: 'narender@apex-industrial.com',
    department: 'Chemical Processing',
    role: 'Senior Process Chemical Technician',
    assignedTraining: ['MOD-104', 'MOD-107'],
    currentModule: 'Chemical Spill Containment & Neutralization',
    progress: 100,
    assessmentScore: 96,
    certificationStatus: 'Completed',
    hireDate: '2022-11-05',
    assignedHeadset: 'Magic Leap 2 #11',
    competencyScore: 98,
    areasForImprovement: ['Keep eyewash valve unlocked during simulated evacuation route'],
    completedModules: [
      {
        moduleId: 'MOD-101',
        moduleName: 'AR Hazard Recognition & Spatial Scan',
        completedDate: '2026-07-20',
        score: 100,
        durationMinutes: 20,
        simulationType: 'Spatial LiDAR Pass-Through',
        mistakesCount: 0
      },
      {
        moduleId: 'MOD-104',
        moduleName: 'Chemical Spill Containment & Neutralization',
        completedDate: '2026-09-02',
        score: 96,
        durationMinutes: 28,
        simulationType: 'Dynamic Fluid Spill Simulation',
        mistakesCount: 0
      }
    ],
    certificates: [
      {
        id: 'CERT-802',
        certificateNumber: 'CERT-2026-09-802',
        workerId: 'WRK-1043',
        workerName: 'Narender',
        department: 'Chemical Processing',
        certificateName: 'HazMat First Responder Level 2',
        trainingCompletionDate: '2026-09-02',
        assessmentScore: 96,
        issueDate: '2026-09-03',
        expiryDate: '2027-09-03',
        verificationStatus: 'Verified',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Sarah Jenkins, CSHO'
      }
    ]
  },
  {
    id: 'WRK-1044',
    name: 'Harish Yesuraj',
    email: 'harish.yesuraj@apex-industrial.com',
    department: 'High Altitude & Rigging',
    role: 'Tower Crane & Structural Rigger',
    assignedTraining: ['MOD-103'],
    currentModule: 'High-Altitude Fall Protection & Rigging',
    progress: 75,
    assessmentScore: 82,
    certificationStatus: 'Expiring Soon',
    hireDate: '2023-01-18',
    assignedHeadset: 'Quest Pro #07',
    competencyScore: 84,
    areasForImprovement: ['Anchor point verification angle slightly exceeding 15 degrees', 'Ensure dual lanyard transition is completed before unhooking'],
    completedModules: [
      {
        moduleId: 'MOD-101',
        moduleName: 'AR Hazard Recognition & Spatial Scan',
        completedDate: '2025-10-15',
        score: 88,
        durationMinutes: 26,
        simulationType: 'Spatial LiDAR Pass-Through',
        mistakesCount: 1
      }
    ],
    certificates: [
      {
        id: 'CERT-704',
        certificateNumber: 'CERT-2025-10-704',
        workerId: 'WRK-1044',
        workerName: 'Harish Yesuraj',
        department: 'High Altitude & Rigging',
        certificateName: 'Certified Rigging & High Fall Specialist',
        trainingCompletionDate: '2025-10-18',
        assessmentScore: 84,
        issueDate: '2025-10-20',
        expiryDate: '2026-10-20', // Expiring in 22 days!
        verificationStatus: 'Expiring Soon',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Thomas Ray, Rigging Director'
      }
    ]
  },
  {
    id: 'WRK-1045',
    name: 'Siva',
    email: 'siva@apex-industrial.com',
    department: 'Electrical Safety',
    role: 'Substation Electrical Specialist',
    assignedTraining: ['MOD-105', 'MOD-102'],
    currentModule: 'Arc Flash & High-Voltage Isolation',
    progress: 90,
    assessmentScore: 92,
    certificationStatus: 'In Progress',
    hireDate: '2024-02-01',
    assignedHeadset: 'HoloLens 2 #09',
    competencyScore: 91,
    areasForImprovement: ['Gloves air-test inspection ritual must precede face shield deployment'],
    completedModules: [
      {
        moduleId: 'MOD-101',
        moduleName: 'AR Hazard Recognition & Spatial Scan',
        completedDate: '2026-06-12',
        score: 95,
        durationMinutes: 24,
        simulationType: 'Spatial LiDAR Pass-Through',
        mistakesCount: 0
      }
    ],
    certificates: []
  },
  {
    id: 'WRK-1046',
    name: 'Rishika',
    email: 'rishika@apex-industrial.com',
    department: 'Warehouse Logistics',
    role: 'Heavy Forklift & High-Bay Driver',
    assignedTraining: ['MOD-106'],
    currentModule: 'Forklift & Autonomous Rover Blind-Spot Detection',
    progress: 100,
    assessmentScore: 91,
    certificationStatus: 'Completed',
    hireDate: '2023-08-19',
    assignedHeadset: 'Quest Pro #03',
    competencyScore: 93,
    areasForImprovement: ['Maintain horn cadence when reversing around aisle blind corners'],
    completedModules: [
      {
        moduleId: 'MOD-106',
        moduleName: 'Forklift & Autonomous Rover Blind-Spot Detection',
        completedDate: '2026-08-28',
        score: 91,
        durationMinutes: 19,
        simulationType: '360° Industrial Field-of-View',
        mistakesCount: 1
      }
    ],
    certificates: [
      {
        id: 'CERT-805',
        certificateNumber: 'CERT-2026-08-805',
        workerId: 'WRK-1046',
        workerName: 'Rishika',
        department: 'Warehouse Logistics',
        certificateName: 'Industrial Fleet Safety Standard',
        trainingCompletionDate: '2026-08-28',
        assessmentScore: 91,
        issueDate: '2026-08-29',
        expiryDate: '2027-08-29',
        verificationStatus: 'Verified',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Sarah Jenkins, CSHO'
      }
    ]
  },
  {
    id: 'WRK-1047',
    name: 'Mahiba Jency',
    email: 'mahiba.jency@apex-industrial.com',
    department: 'Welding & Fabrication',
    role: 'Structural Welder & Boiler Fabricator',
    assignedTraining: ['MOD-108', 'MOD-107'],
    currentModule: 'Industrial Hot Work & Oxy-Fuel Safety',
    progress: 60,
    assessmentScore: 68,
    certificationStatus: 'Needs Retest',
    hireDate: '2024-05-10',
    assignedHeadset: 'HoloLens 2 #12',
    competencyScore: 68,
    areasForImprovement: [
      'Failed fire watch 35-foot perimeter clearance in AR step 3',
      'Did not check oxygen regulator diaphragm leak in time',
      'Requires instructor-led AR coaching session'
    ],
    completedModules: [
      {
        moduleId: 'MOD-101',
        moduleName: 'AR Hazard Recognition & Spatial Scan',
        completedDate: '2026-05-20',
        score: 82,
        durationMinutes: 28,
        simulationType: 'Spatial LiDAR Pass-Through',
        mistakesCount: 3
      }
    ],
    certificates: []
  },
  {
    id: 'WRK-1048',
    name: 'Nivetha',
    email: 'nivetha@apex-industrial.com',
    department: 'Chemical Processing',
    role: 'Environmental Safety Analyst',
    assignedTraining: ['MOD-104', 'MOD-107'],
    currentModule: 'Confined Space Entry & Atmospheric Testing',
    progress: 100,
    assessmentScore: 97,
    certificationStatus: 'Completed',
    hireDate: '2022-03-14',
    assignedHeadset: 'Magic Leap 2 #05',
    competencyScore: 99,
    areasForImprovement: ['None noted; exemplary sensor calibration speed'],
    completedModules: [
      {
        moduleId: 'MOD-104',
        moduleName: 'Chemical Spill Containment & Neutralization',
        completedDate: '2026-06-15',
        score: 98,
        durationMinutes: 26,
        simulationType: 'Dynamic Fluid Spill Simulation',
        mistakesCount: 0
      },
      {
        moduleId: 'MOD-107',
        moduleName: 'Confined Space Entry & Atmospheric Testing',
        completedDate: '2026-09-18',
        score: 97,
        durationMinutes: 38,
        simulationType: 'Subterranean Chamber Immersion',
        mistakesCount: 0
      }
    ],
    certificates: [
      {
        id: 'CERT-806',
        certificateNumber: 'CERT-2026-09-806',
        workerId: 'WRK-1048',
        workerName: 'Nivetha',
        department: 'Chemical Processing',
        certificateName: 'Confined Space Authorized Entrant',
        trainingCompletionDate: '2026-09-18',
        assessmentScore: 97,
        issueDate: '2026-09-19',
        expiryDate: '2027-09-19',
        verificationStatus: 'Verified',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Sarah Jenkins, CSHO'
      }
    ]
  },
  {
    id: 'WRK-1049',
    name: 'James O’Connor',
    email: 'james.oconnor@apex-industrial.com',
    department: 'Heavy Machinery',
    role: 'Hydraulic Press Maintenance Tech',
    assignedTraining: ['MOD-102'],
    currentModule: 'Lockout / Tagout (LOTO) AR Simulation',
    progress: 80,
    assessmentScore: 87,
    certificationStatus: 'Expiring Soon',
    hireDate: '2023-09-01',
    assignedHeadset: 'HoloLens 2 #02',
    competencyScore: 86,
    areasForImprovement: ['Verify zero-energy pressure gauge tap before removing master lock'],
    completedModules: [
      {
        moduleId: 'MOD-101',
        moduleName: 'AR Hazard Recognition & Spatial Scan',
        completedDate: '2025-10-28',
        score: 90,
        durationMinutes: 24,
        simulationType: 'Spatial LiDAR Pass-Through',
        mistakesCount: 1
      }
    ],
    certificates: [
      {
        id: 'CERT-712',
        certificateNumber: 'CERT-2025-10-712',
        workerId: 'WRK-1049',
        workerName: 'James O’Connor',
        department: 'Heavy Machinery',
        certificateName: 'OSHA LOTO Specialist AR',
        trainingCompletionDate: '2025-10-25',
        assessmentScore: 87,
        issueDate: '2025-10-26',
        expiryDate: '2026-10-26', // Expiring in 28 days!
        verificationStatus: 'Expiring Soon',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Sarah Jenkins, CSHO'
      }
    ]
  },
  {
    id: 'WRK-1050',
    name: 'Fatima Al-Hassan',
    email: 'fatima.alhassan@apex-industrial.com',
    department: 'Electrical Safety',
    role: 'Electrical Maintenance Inspector',
    assignedTraining: ['MOD-105'],
    currentModule: 'Arc Flash & High-Voltage Isolation',
    progress: 100,
    assessmentScore: 98,
    certificationStatus: 'Completed',
    hireDate: '2021-07-22',
    assignedHeadset: 'HoloLens 2 #15',
    competencyScore: 98,
    areasForImprovement: ['Consistent performance across all spatial AR electrical challenges'],
    completedModules: [
      {
        moduleId: 'MOD-105',
        moduleName: 'Arc Flash & High-Voltage Isolation',
        completedDate: '2026-09-22',
        score: 98,
        durationMinutes: 41,
        simulationType: 'Precision Switchgear Spatial Twin',
        mistakesCount: 0
      }
    ],
    certificates: [
      {
        id: 'CERT-807',
        certificateNumber: 'CERT-2026-09-807',
        workerId: 'WRK-1050',
        workerName: 'Fatima Al-Hassan',
        department: 'Electrical Safety',
        certificateName: 'NFPA 70E Arc Flash Certified',
        trainingCompletionDate: '2026-09-22',
        assessmentScore: 98,
        issueDate: '2026-09-23',
        expiryDate: '2027-09-23',
        verificationStatus: 'Verified',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Sarah Jenkins, CSHO'
      }
    ]
  },
  {
    id: 'WRK-1051',
    name: 'Lucas Silva',
    email: 'lucas.silva@apex-industrial.com',
    department: 'High Altitude & Rigging',
    role: 'Scaffold Erector & Safety Anchor Tech',
    assignedTraining: ['MOD-103'],
    currentModule: 'High-Altitude Fall Protection & Rigging',
    progress: 40,
    assessmentScore: 71,
    certificationStatus: 'In Progress',
    hireDate: '2024-06-15',
    assignedHeadset: 'Quest Pro #02',
    competencyScore: 74,
    areasForImprovement: ['Anchor point load calculations need review', 'Slow response during simulated scaffold sway event'],
    completedModules: [],
    certificates: []
  },
  {
    id: 'WRK-1052',
    name: 'Zoe Washington',
    email: 'zoe.washington@apex-industrial.com',
    department: 'Warehouse Logistics',
    role: 'Logistics Supervisor & Inventory Safety Lead',
    assignedTraining: ['MOD-106', 'MOD-101'],
    currentModule: 'Forklift & Autonomous Rover Blind-Spot Detection',
    progress: 100,
    assessmentScore: 93,
    certificationStatus: 'Completed',
    hireDate: '2022-09-30',
    assignedHeadset: 'Quest Pro #05',
    competencyScore: 95,
    areasForImprovement: ['Maintain standard mirror check timing before picking pallets above 4 meters'],
    completedModules: [
      {
        moduleId: 'MOD-101',
        moduleName: 'AR Hazard Recognition & Spatial Scan',
        completedDate: '2026-08-10',
        score: 96,
        durationMinutes: 21,
        simulationType: 'Spatial LiDAR Pass-Through',
        mistakesCount: 0
      },
      {
        moduleId: 'MOD-106',
        moduleName: 'Forklift & Autonomous Rover Blind-Spot Detection',
        completedDate: '2026-09-14',
        score: 93,
        durationMinutes: 18,
        simulationType: '360° Industrial Field-of-View',
        mistakesCount: 0
      }
    ],
    certificates: [
      {
        id: 'CERT-808',
        certificateNumber: 'CERT-2026-09-808',
        workerId: 'WRK-1052',
        workerName: 'Zoe Washington',
        department: 'Warehouse Logistics',
        certificateName: 'Industrial Fleet Safety Standard',
        trainingCompletionDate: '2026-09-14',
        assessmentScore: 93,
        issueDate: '2026-09-15',
        expiryDate: '2027-09-15',
        verificationStatus: 'Verified',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Sarah Jenkins, CSHO'
      }
    ]
  },
  {
    id: 'WRK-1053',
    name: 'Hiroshi Tanaka',
    email: 'hiroshi.tanaka@apex-industrial.com',
    department: 'Welding & Fabrication',
    role: 'TIG Specialist & Pipe Fitter',
    assignedTraining: ['MOD-108'],
    currentModule: 'Industrial Hot Work & Oxy-Fuel Safety',
    progress: 100,
    assessmentScore: 95,
    certificationStatus: 'Completed',
    hireDate: '2023-03-21',
    assignedHeadset: 'HoloLens 2 #10',
    competencyScore: 96,
    areasForImprovement: ['Inspect secondary ground clamp contact resistance before arc strike'],
    completedModules: [
      {
        moduleId: 'MOD-108',
        moduleName: 'Industrial Hot Work & Oxy-Fuel Safety',
        completedDate: '2026-09-08',
        score: 95,
        durationMinutes: 29,
        simulationType: 'Thermal & Spark Trajectory Model',
        mistakesCount: 0
      }
    ],
    certificates: [
      {
        id: 'CERT-809',
        certificateNumber: 'CERT-2026-09-809',
        workerId: 'WRK-1053',
        workerName: 'Hiroshi Tanaka',
        department: 'Welding & Fabrication',
        certificateName: 'OSHA Hot Work & Fire Watch Operator',
        trainingCompletionDate: '2026-09-08',
        assessmentScore: 95,
        issueDate: '2026-09-09',
        expiryDate: '2027-09-09',
        verificationStatus: 'Verified',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Sarah Jenkins, CSHO'
      }
    ]
  },
  {
    id: 'WRK-1054',
    name: 'Kavita Rao',
    email: 'kavita.rao@apex-industrial.com',
    department: 'Chemical Processing',
    role: 'Reagent Quality Technician',
    assignedTraining: ['MOD-104'],
    currentModule: 'Chemical Spill Containment & Neutralization',
    progress: 25,
    assessmentScore: 0,
    certificationStatus: 'In Progress',
    hireDate: '2024-08-01',
    assignedHeadset: 'Magic Leap 2 #03',
    competencyScore: 80,
    areasForImprovement: ['Scheduled for AR hands-on module session tomorrow'],
    completedModules: [],
    certificates: []
  },
  {
    id: 'WRK-1055',
    name: 'Brian Becker',
    email: 'brian.becker@apex-industrial.com',
    department: 'Heavy Machinery',
    role: 'Industrial Millwright Apprentice',
    assignedTraining: ['MOD-101', 'MOD-102'],
    currentModule: 'AR Hazard Recognition & Spatial Scan',
    progress: 50,
    assessmentScore: 65,
    certificationStatus: 'Needs Retest',
    hireDate: '2024-07-10',
    assignedHeadset: 'HoloLens 2 #08',
    competencyScore: 64,
    areasForImprovement: ['Missed 3 out of 10 pinch hazards on spinning lathe model', 'Needs 1-on-1 AR simulation coach'],
    completedModules: [],
    certificates: []
  },
  {
    id: 'WRK-1056',
    name: 'Mateo Rossi',
    email: 'mateo.rossi@apex-industrial.com',
    department: 'Electrical Safety',
    role: 'Panel Wiring & Circuit Tester',
    assignedTraining: ['MOD-105'],
    currentModule: 'Arc Flash & High-Voltage Isolation',
    progress: 100,
    assessmentScore: 89,
    certificationStatus: 'Expiring Soon',
    hireDate: '2023-05-14',
    assignedHeadset: 'HoloLens 2 #06',
    competencyScore: 88,
    areasForImprovement: ['Ensure secondary safety observer stays outside boundary arc perimeter'],
    completedModules: [
      {
        moduleId: 'MOD-105',
        moduleName: 'Arc Flash & High-Voltage Isolation',
        completedDate: '2025-10-12',
        score: 89,
        durationMinutes: 44,
        simulationType: 'Precision Switchgear Spatial Twin',
        mistakesCount: 1
      }
    ],
    certificates: [
      {
        id: 'CERT-718',
        certificateNumber: 'CERT-2025-10-718',
        workerId: 'WRK-1056',
        workerName: 'Mateo Rossi',
        department: 'Electrical Safety',
        certificateName: 'NFPA 70E Arc Flash Certified',
        trainingCompletionDate: '2025-10-12',
        assessmentScore: 89,
        issueDate: '2025-10-14',
        expiryDate: '2026-10-14', // Expiring in 16 days!
        verificationStatus: 'Expiring Soon',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Sarah Jenkins, CSHO'
      }
    ]
  },
  {
    id: 'WRK-1057',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@apex-industrial.com',
    department: 'High Altitude & Rigging',
    role: 'Industrial Steeplejack & Lineman',
    assignedTraining: ['MOD-103', 'MOD-101'],
    currentModule: 'High-Altitude Fall Protection & Rigging',
    progress: 100,
    assessmentScore: 97,
    certificationStatus: 'Completed',
    hireDate: '2022-08-11',
    assignedHeadset: 'Quest Pro #09',
    competencyScore: 98,
    areasForImprovement: ['Exemplary anchorage speed in stormy wind simulation'],
    completedModules: [
      {
        moduleId: 'MOD-103',
        moduleName: 'High-Altitude Fall Protection & Rigging',
        completedDate: '2026-09-17',
        score: 97,
        durationMinutes: 38,
        simulationType: 'Elevated Virtual Platform',
        mistakesCount: 0
      }
    ],
    certificates: [
      {
        id: 'CERT-810',
        certificateNumber: 'CERT-2026-09-810',
        workerId: 'WRK-1057',
        workerName: 'Ananya Sharma',
        department: 'High Altitude & Rigging',
        certificateName: 'Certified Rigging & High Fall Specialist',
        trainingCompletionDate: '2026-09-17',
        assessmentScore: 97,
        issueDate: '2026-09-18',
        expiryDate: '2027-09-18',
        verificationStatus: 'Verified',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Thomas Ray, Rigging Director'
      }
    ]
  },
  {
    id: 'WRK-1058',
    name: 'Derrick Vance',
    email: 'derrick.vance@apex-industrial.com',
    department: 'Warehouse Logistics',
    role: 'Order Selector & Reach Truck Operator',
    assignedTraining: ['MOD-106'],
    currentModule: 'Forklift & Autonomous Rover Blind-Spot Detection',
    progress: 0,
    assessmentScore: 0,
    certificationStatus: 'Not Started',
    hireDate: '2024-09-15',
    assignedHeadset: 'Unassigned',
    competencyScore: 70,
    areasForImprovement: ['New hire orientation pending headset assignment'],
    completedModules: [],
    certificates: []
  },
  {
    id: 'WRK-1059',
    name: 'Grace Hopper-Lee',
    email: 'grace.hl@apex-industrial.com',
    department: 'Welding & Fabrication',
    role: 'Robotic Welding Arm Programmer',
    assignedTraining: ['MOD-108', 'MOD-102'],
    currentModule: 'Industrial Hot Work & Oxy-Fuel Safety',
    progress: 100,
    assessmentScore: 92,
    certificationStatus: 'Completed',
    hireDate: '2023-01-10',
    assignedHeadset: 'HoloLens 2 #07',
    competencyScore: 93,
    areasForImprovement: ['Calibrate thermal zone alarm sensitivity'],
    completedModules: [
      {
        moduleId: 'MOD-108',
        moduleName: 'Industrial Hot Work & Oxy-Fuel Safety',
        completedDate: '2026-08-30',
        score: 92,
        durationMinutes: 30,
        simulationType: 'Thermal & Spark Trajectory Model',
        mistakesCount: 1
      }
    ],
    certificates: [
      {
        id: 'CERT-811',
        certificateNumber: 'CERT-2026-08-811',
        workerId: 'WRK-1059',
        workerName: 'Grace Hopper-Lee',
        department: 'Welding & Fabrication',
        certificateName: 'OSHA Hot Work & Fire Watch Operator',
        trainingCompletionDate: '2026-08-30',
        assessmentScore: 92,
        issueDate: '2026-08-31',
        expiryDate: '2027-08-31',
        verificationStatus: 'Verified',
        issuingAuthority: 'Apex Safety Council & AR Training Bureau',
        trainerName: 'Sarah Jenkins, CSHO'
      }
    ]
  },
  {
    id: 'WRK-1060',
    name: 'Samuel Thorne',
    email: 'samuel.thorne@apex-industrial.com',
    department: 'Heavy Machinery',
    role: 'Stamping Press Operator',
    assignedTraining: ['MOD-102'],
    currentModule: 'Lockout / Tagout (LOTO) AR Simulation',
    progress: 45,
    assessmentScore: 72,
    certificationStatus: 'In Progress',
    hireDate: '2024-03-25',
    assignedHeadset: 'HoloLens 2 #13',
    competencyScore: 78,
    areasForImprovement: ['Practice zero-pressure bleed down valve sequence'],
    completedModules: [],
    certificates: []
  }
];

export const INITIAL_ASSESSMENTS: AssessmentRecord[] = [
  {
    id: 'ASM-301',
    workerId: 'WRK-1050',
    workerName: 'Fatima Al-Hassan',
    department: 'Electrical Safety',
    moduleId: 'MOD-105',
    moduleName: 'Arc Flash & High-Voltage Isolation',
    date: '2026-09-22',
    score: 98,
    status: 'Passed',
    arHazardSpottingSpeed: '1.2s avg',
    mistakesRecorded: 0,
    protocolCompliance: 100,
    feedback: 'Flawless execution of NFPA 70E shock boundaries and PPE verification steps.'
  },
  {
    id: 'ASM-302',
    workerId: 'WRK-1048',
    workerName: 'Nivetha',
    department: 'Chemical Processing',
    moduleId: 'MOD-107',
    moduleName: 'Confined Space Entry & Atmospheric Testing',
    date: '2026-09-18',
    score: 97,
    status: 'Passed',
    arHazardSpottingSpeed: '1.3s avg',
    mistakesRecorded: 0,
    protocolCompliance: 98,
    feedback: 'Accurate gas calibration and forced mechanical ventilation protocol.'
  },
  {
    id: 'ASM-303',
    workerId: 'WRK-1057',
    workerName: 'Ananya Sharma',
    department: 'High Altitude & Rigging',
    moduleId: 'MOD-103',
    moduleName: 'High-Altitude Fall Protection & Rigging',
    date: '2026-09-17',
    score: 97,
    status: 'Passed',
    arHazardSpottingSpeed: '1.4s avg',
    mistakesRecorded: 0,
    protocolCompliance: 99,
    feedback: 'Perfect 100% tie-off compliance in 25-meter elevation simulation.'
  },
  {
    id: 'ASM-304',
    workerId: 'WRK-1052',
    workerName: 'Zoe Washington',
    department: 'Warehouse Logistics',
    moduleId: 'MOD-106',
    moduleName: 'Forklift & Autonomous Rover Blind-Spot Detection',
    date: '2026-09-14',
    score: 93,
    status: 'Passed',
    arHazardSpottingSpeed: '1.6s avg',
    mistakesRecorded: 0,
    protocolCompliance: 95,
    feedback: 'Maintained 3-meter safety bubble; clear horn signaling on corner blind spots.'
  },
  {
    id: 'ASM-305',
    workerId: 'WRK-1042',
    workerName: 'Naathiq Hussain',
    department: 'Heavy Machinery',
    moduleId: 'MOD-102',
    moduleName: 'Lockout / Tagout (LOTO) AR Simulation',
    date: '2026-09-10',
    score: 94,
    status: 'Passed',
    arHazardSpottingSpeed: '1.5s avg',
    mistakesRecorded: 1,
    protocolCompliance: 96,
    feedback: 'Minor 4-second delay on secondary hydraulic bleeder valve, recovered cleanly.'
  },
  {
    id: 'ASM-306',
    workerId: 'WRK-1053',
    workerName: 'Hiroshi Tanaka',
    department: 'Welding & Fabrication',
    moduleId: 'MOD-108',
    moduleName: 'Industrial Hot Work & Oxy-Fuel Safety',
    date: '2026-09-08',
    score: 95,
    status: 'Passed',
    arHazardSpottingSpeed: '1.4s avg',
    mistakesRecorded: 0,
    protocolCompliance: 97,
    feedback: 'Fire watch perimeter strictly maintained and flashback arrestor inspected.'
  },
  {
    id: 'ASM-307',
    workerId: 'WRK-1043',
    workerName: 'Narender',
    department: 'Chemical Processing',
    moduleId: 'MOD-104',
    moduleName: 'Chemical Spill Containment & Neutralization',
    date: '2026-09-02',
    score: 96,
    status: 'Passed',
    arHazardSpottingSpeed: '1.1s avg',
    mistakesRecorded: 0,
    protocolCompliance: 99,
    feedback: 'Rapid deployment of absorbent containment boom in under 45 seconds.'
  },
  {
    id: 'ASM-308',
    workerId: 'WRK-1047',
    workerName: 'Mahiba Jency',
    department: 'Welding & Fabrication',
    moduleId: 'MOD-108',
    moduleName: 'Industrial Hot Work & Oxy-Fuel Safety',
    date: '2026-09-24',
    score: 68,
    status: 'Needs Retest',
    arHazardSpottingSpeed: '2.9s avg',
    mistakesRecorded: 3,
    protocolCompliance: 70,
    feedback: 'Failed fire watch clearance zone; failed regulator check step 3. Retest scheduled.'
  },
  {
    id: 'ASM-309',
    workerId: 'WRK-1055',
    workerName: 'Brian Becker',
    department: 'Heavy Machinery',
    moduleId: 'MOD-101',
    moduleName: 'AR Hazard Recognition & Spatial Scan',
    date: '2026-09-25',
    score: 65,
    status: 'Needs Retest',
    arHazardSpottingSpeed: '3.4s avg',
    mistakesRecorded: 4,
    protocolCompliance: 62,
    feedback: 'Slow reaction time detecting rotating spindle pinch points. Requires guided practice.'
  },
  {
    id: 'ASM-310',
    workerId: 'WRK-1051',
    workerName: 'Lucas Silva',
    department: 'High Altitude & Rigging',
    moduleId: 'MOD-103',
    moduleName: 'High-Altitude Fall Protection & Rigging',
    date: '2026-09-21',
    score: 71,
    status: 'Needs Retest',
    arHazardSpottingSpeed: '2.5s avg',
    mistakesRecorded: 2,
    protocolCompliance: 74,
    feedback: 'Missed visual inspection on auxiliary lanyard stitching. Retest recommended.'
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'ACT-901',
    type: 'certificate_issued',
    workerName: 'Fatima Al-Hassan',
    workerId: 'WRK-1050',
    department: 'Electrical Safety',
    moduleOrCert: 'NFPA 70E Arc Flash Certified',
    score: 98,
    timestamp: '2 hours ago'
  },
  {
    id: 'ACT-902',
    type: 'retest_flagged',
    workerName: 'Brian Becker',
    workerId: 'WRK-1055',
    department: 'Heavy Machinery',
    moduleOrCert: 'AR Hazard Recognition & Spatial Scan',
    score: 65,
    timestamp: '5 hours ago'
  },
  {
    id: 'ACT-903',
    type: 'training_completed',
    workerName: 'Nivetha',
    workerId: 'WRK-1048',
    department: 'Chemical Processing',
    moduleOrCert: 'Confined Space Entry & Atmospheric Testing',
    score: 97,
    timestamp: 'Yesterday at 3:45 PM'
  },
  {
    id: 'ACT-904',
    type: 'training_completed',
    workerName: 'Ananya Sharma',
    workerId: 'WRK-1057',
    department: 'High Altitude & Rigging',
    moduleOrCert: 'High-Altitude Fall Protection & Rigging',
    score: 97,
    timestamp: 'Sep 17, 2026'
  },
  {
    id: 'ACT-905',
    type: 'certificate_issued',
    workerName: 'Zoe Washington',
    workerId: 'WRK-1052',
    department: 'Warehouse Logistics',
    moduleOrCert: 'Industrial Fleet Safety Standard',
    score: 93,
    timestamp: 'Sep 15, 2026'
  },
  {
    id: 'ACT-906',
    type: 'training_assigned',
    workerName: 'Lucas Silva',
    workerId: 'WRK-1051',
    department: 'High Altitude & Rigging',
    moduleOrCert: 'High-Altitude Fall Protection & Rigging',
    timestamp: 'Sep 14, 2026'
  }
];

export const INITIAL_SETTINGS: PlatformSettings = {
  passingScoreThreshold: 80,
  certValidityMonths: 12,
  expiringAlertDays: 30,
  autoNotification: true,
  arHeadsetSync: true,
  strictModeProtocol: true
};
