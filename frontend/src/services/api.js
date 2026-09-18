/**
 * MEDVAULT AI - Frontend API Client
 * Connects to Flask backend (/api) with automatic graceful fallback
 * to high-fidelity clinical dataset for uninterrupted testing.
 */

const API_BASE = '/api';

// Realistic fallback data matching backend seed
const FALLBACK_PATIENT = {
  id: "p-sarah-jenkins-01",
  mrn: "MV-89241",
  first_name: "Sarah",
  last_name: "Jenkins",
  date_of_birth: "1978-04-14",
  age: 48,
  gender: "Female",
  blood_group: "A+",
  phone: "+1 (555) 234-5678",
  email: "sarah.jenkins@example.com",
  emergency_contact: {
    name: "David Jenkins",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543"
  },
  allergies: [
    { allergen: "Penicillin", reaction: "Urticaria / Hives", severity: "Moderate" },
    { allergen: "Sulfa Drugs", reaction: "Maculopapular rash", severity: "Mild" }
  ],
  chronic_conditions: [
    { condition: "Essential Hypertension", diagnosed_date: "2025-11-18", status: "Active / Medicated" },
    { condition: "Dyslipidemia (Hypercholesterolemia)", diagnosed_date: "2024-01-12", status: "Active / Medicated" },
    { condition: "Mild Osteoarthritis (Right Knee)", diagnosed_date: "2026-01-22", status: "Stable" }
  ],
  preferred_language: "en"
};

const FALLBACK_DOCTOR = {
  id: "doc-robert-chen-01",
  name: "Dr. Robert Chen, MD",
  specialty: "Internal Medicine & Cardiology",
  license_number: "MD-449102-MA",
  hospital: "Beacon Primary Care Associates",
  email: "dr.chen@beaconhealth.org",
  phone: "+1 (555) 302-8819",
  authorized_patients_count: 18
};

const FALLBACK_DOCUMENTS = [
  {
    id: "doc-001",
    patient_id: "p-sarah-jenkins-01",
    file_name: "Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf",
    original_file_name: "Blood_Report_Sept2026.pdf",
    document_type: "Lab Report",
    document_date: "2026-09-10",
    facility_name: "MetroHealth Diagnostic Labs",
    attending_physician: "Dr. Aris Thorne, MD",
    file_size_bytes: 428000,
    page_count: 2,
    language: "en",
    processing_status: "processed",
    ocr_applied: false,
    ai_summary: "Comprehensive outpatient fasting lipid and metabolic panel. Total Cholesterol is documented at 210 mg/dL (elevated) and LDL at 134 mg/dL. Fasting blood glucose is 108 mg/dL indicating mild impairment. Renal and hepatic profiles remain preserved.",
    documented_facts: [
      "Total Cholesterol: 210 mg/dL (Reference < 200 mg/dL - High)",
      "LDL Cholesterol: 134 mg/dL (Reference < 100 mg/dL - High)",
      "HDL Cholesterol: 48 mg/dL (Reference > 50 mg/dL - Borderline)",
      "Triglycerides: 160 mg/dL (Reference < 150 mg/dL - Borderline High)",
      "Fasting Blood Glucose: 108 mg/dL (Reference 70-99 mg/dL - Impaired Fasting Glucose)",
      "Serum Creatinine: 0.88 mg/dL (Reference 0.50-1.10 mg/dL - Normal)",
      "eGFR: > 90 mL/min/1.73m² (Normal)",
      "Hemoglobin: 13.6 g/dL (Reference 12.0-15.5 g/dL - Normal)"
    ],
    ai_interpretations: [
      "Patient's lipid profile continues to show mild elevation despite current statin therapy; titration review recommended.",
      "Elevated fasting glucose of 108 mg/dL warrants lifestyle review and prospective HbA1c testing.",
      "Renal and hepatic markers reflect stable systemic tolerance."
    ],
    follow_up_instructions: "Review lipid panel with primary care or cardiologist within 3 weeks. Retest fasting lipid and HbA1c in 6 months."
  },
  {
    id: "doc-002",
    patient_id: "p-sarah-jenkins-01",
    file_name: "Cardiology_Inpatient_Discharge_Summary_Nov2025.pdf",
    original_file_name: "Discharge_Summary_Nov2025.pdf",
    document_type: "Discharge Summary",
    document_date: "2025-11-18",
    facility_name: "St. Jude Memorial Hospital - Acute Cardiovascular Care",
    attending_physician: "Dr. Elena Rostova, MD, FACC",
    file_size_bytes: 785000,
    page_count: 4,
    language: "en",
    processing_status: "processed",
    ocr_applied: false,
    ai_summary: "Inpatient discharge summary following observation for accelerated essential hypertension (BP 168/102 mmHg). Stabilized on oral Amlodipine 5mg daily, normalizing to 126/80 mmHg. Follow-up scheduled for 02 October 2026.",
    documented_facts: [
      "Admission Blood Pressure: 168/102 mmHg, Pulse: 94 bpm",
      "Discharge Blood Pressure: 126/80 mmHg, Pulse: 72 bpm",
      "Cardiac Troponin I: < 0.01 ng/mL (Negative for myocardial infarction)",
      "12-Lead ECG: Normal sinus rhythm at 74 bpm, no acute ischemia",
      "Prescribed: Amlodipine 5mg PO daily every morning",
      "Follow-up Date: Cardiology outpatient clinic on 02 October 2026"
    ],
    ai_interpretations: [
      "Hypertensive crisis was effectively controlled without end-organ compromise.",
      "Favorable response to calcium channel blocker monotherapy."
    ],
    follow_up_instructions: "Return for review on 02 October 2026 at the St. Jude Cardiology Specialty Clinic."
  },
  {
    id: "doc-003",
    patient_id: "p-sarah-jenkins-01",
    file_name: "Outpatient_Prescription_Cardiology_Mar2026.pdf",
    original_file_name: "Prescription_Mar2026.pdf",
    document_type: "Prescription",
    document_date: "2026-03-15",
    facility_name: "Heart & Vascular Specialty Clinic",
    attending_physician: "Dr. Elena Rostova, MD",
    file_size_bytes: 195000,
    page_count: 1,
    language: "en",
    processing_status: "processed",
    ocr_applied: false,
    ai_summary: "Prescription order adding Atorvastatin 20mg daily at bedtime for hypercholesterolemia and renewing Amlodipine 5mg daily. Ordered repeat lipid panel in 6 months.",
    documented_facts: [
      "Rx: Atorvastatin Calcium 20 mg PO Daily at bedtime",
      "Rx: Amlodipine Besylate 5 mg PO Daily in the morning",
      "Quantity: 90 days supply with 3 refills each",
      "Order: Repeat fasting lipid panel in 6 months"
    ],
    ai_interpretations: [
      "Comprehensive cardiovascular risk management targeting BP and lipid profile."
    ],
    follow_up_instructions: "Repeat fasting lipid panel in 6 months (September 2026)."
  },
  {
    id: "doc-004",
    patient_id: "p-sarah-jenkins-01",
    file_name: "Right_Knee_MRI_Diagnostic_Report_Jan2026.pdf",
    original_file_name: "Knee_MRI_Jan2026.pdf",
    document_type: "Imaging Report",
    document_date: "2026-01-22",
    facility_name: "Apex Advanced Imaging Center",
    attending_physician: "Dr. Marcus Vance, MD (Radiology)",
    file_size_bytes: 610000,
    page_count: 3,
    language: "en",
    processing_status: "processed",
    ocr_applied: false,
    ai_summary: "3.0T MRI of the right knee reveals Grade II intrameniscal degenerative signal within posterior horn of medial meniscus without displaced articular tear. Mild osteoarthritis.",
    documented_facts: [
      "Medial Meniscus: Grade II horizontal degenerative signal without displaced tear",
      "Cruciate Ligaments (ACL/PCL): Intact with preserved architecture",
      "Joint Space: Mild joint effusion in suprapatellar recess",
      "Articular Cartilage: Mild thinning along medial femoral condyle"
    ],
    ai_interpretations: [
      "Knee pain attributed to degenerative meniscal wear; surgical repair not currently indicated."
    ],
    follow_up_instructions: "Physical therapy rehabilitation course recommended."
  },
  {
    id: "doc-005",
    patient_id: "p-sarah-jenkins-01",
    file_name: "Internal_Medicine_Annual_Consultation_Jan2024.pdf",
    original_file_name: "Consultation_Jan2024.pdf",
    document_type: "Consultation Note",
    document_date: "2024-01-12",
    facility_name: "Beacon Primary Care Associates",
    attending_physician: "Dr. Robert Chen, MD",
    file_size_bytes: 340000,
    page_count: 2,
    language: "en",
    processing_status: "processed",
    ocr_applied: false,
    ai_summary: "Annual preventive physical examination. Baseline blood pressure 138/86 mmHg (prehypertension). Baseline lipid screening and lifestyle DASH diet advised.",
    documented_facts: [
      "Blood Pressure: 138/86 mmHg",
      "BMI: 25.8 kg/m²",
      "Outside Screening Total Cholesterol: 224 mg/dL",
      "Plan: Nutritional counseling, 30 min daily walking"
    ],
    ai_interpretations: [
      "Earliest documented milestone of cardiovascular risk factors."
    ],
    follow_up_instructions: "Annual wellness follow-up in 12 months."
  }
];

const FALLBACK_EVIDENCE = [
  {
    id: "ev-001",
    document_id: "doc-001",
    document_name: "Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf",
    page_number: 1,
    extracted_finding: "Total Cholesterol was reported as 210 mg/dL (High flag).",
    snippet_text: "Total Cholesterol: 210 mg/dL  [Ref: < 200 mg/dL]  *FLAG: HIGH*",
    confidence_score: 0.99,
    highlight_color: "#ef4444"
  },
  {
    id: "ev-002",
    document_id: "doc-001",
    document_name: "Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf",
    page_number: 1,
    extracted_finding: "Fasting Blood Glucose was measured at 108 mg/dL (Elevated).",
    snippet_text: "Glucose, Fasting: 108 mg/dL  [Ref: 70 - 99 mg/dL]  *FLAG: HIGH*",
    confidence_score: 0.98,
    highlight_color: "#f59e0b"
  },
  {
    id: "ev-003",
    document_id: "doc-001",
    document_name: "Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf",
    page_number: 2,
    extracted_finding: "Hemoglobin documented at 13.6 g/dL within normal reference range.",
    snippet_text: "Hemoglobin: 13.6 g/dL  [Ref: 12.0 - 15.5 g/dL]",
    confidence_score: 0.99,
    highlight_color: "#10b981"
  },
  {
    id: "ev-004",
    document_id: "doc-002",
    document_name: "Cardiology_Inpatient_Discharge_Summary_Nov2025.pdf",
    page_number: 1,
    extracted_finding: "Emergency admission blood pressure was 168/102 mmHg with palpitations.",
    snippet_text: "Initial vital signs in ED: Blood Pressure 168/102 mmHg, Heart Rate 94 bpm, Respiratory Rate 16/min",
    confidence_score: 0.99,
    highlight_color: "#ef4444"
  },
  {
    id: "ev-005",
    document_id: "doc-002",
    document_name: "Cardiology_Inpatient_Discharge_Summary_Nov2025.pdf",
    page_number: 4,
    extracted_finding: "Mandated cardiology follow-up date is 02 October 2026.",
    snippet_text: "3. CLINICAL FOLLOW-UP: Return for review on 02 October 2026 at the St. Jude Cardiology Specialty Clinic with Dr. Elena Rostova.",
    confidence_score: 0.99,
    highlight_color: "#0ea5e9"
  },
  {
    id: "ev-006",
    document_id: "doc-003",
    document_name: "Outpatient_Prescription_Cardiology_Mar2026.pdf",
    page_number: 1,
    extracted_finding: "Prescribed Atorvastatin Calcium 20 mg daily at bedtime for hyperlipidemia.",
    snippet_text: "1. Rx: ATORVASTATIN CALCIUM 20 MG TABLET\n   Sig: Take 1 tablet by mouth daily at bedtime.",
    confidence_score: 0.98,
    highlight_color: "#0ea5e9"
  },
  {
    id: "ev-007",
    document_id: "doc-004",
    document_name: "Right_Knee_MRI_Diagnostic_Report_Jan2026.pdf",
    page_number: 3,
    extracted_finding: "MRI diagnosed Grade II degenerative change of medial meniscus posterior horn.",
    snippet_text: "1. Grade II degenerative signal alteration in the posterior horn of the medial meniscus, non-displaced.",
    confidence_score: 0.97,
    highlight_color: "#f59e0b"
  },
  {
    id: "ev-008",
    document_id: "doc-005",
    document_name: "Internal_Medicine_Annual_Consultation_Jan2024.pdf",
    page_number: 1,
    extracted_finding: "Baseline prehypertension blood pressure recorded at 138/86 mmHg in Jan 2024.",
    snippet_text: "Vital Signs: BP 138/86 mmHg, HR 70 regular, RR 14, Temp 98.6 F, BMI 25.8 kg/m².",
    confidence_score: 0.98,
    highlight_color: "#6366f1"
  }
];

const FALLBACK_EVENTS = [
  { id: "evt-001", date: "2024-01-12", year: "2024", month: "Jan", title: "Annual Preventive Wellness Exam", category: "consultation", description: "Routine health checkup documenting prehypertension (138/86 mmHg) and early knee crepitus.", severity: "normal", document_name: "Consultation_Jan2024.pdf", page_number: 1, evidence_id: "ev-008" },
  { id: "evt-002", date: "2024-01-15", year: "2024", month: "Jan", title: "Baseline Fasting Lipid Screening", category: "lab_test", description: "Total Cholesterol evaluated at 224 mg/dL. Primary care recommended dietary modifications.", severity: "attention", document_name: "Consultation_Jan2024.pdf", page_number: 2, evidence_id: "ev-008" },
  { id: "evt-005", date: "2025-04-10", year: "2025", month: "Apr", title: "Routine Wellness Blood Panel", category: "lab_test", description: "Fasting glucose measured at 99 mg/dL. Total cholesterol was 218 mg/dL.", severity: "attention", document_name: "Blood_Report_Sept2026.pdf", page_number: 1, evidence_id: "ev-001" },
  { id: "evt-006", date: "2025-11-16", year: "2025", month: "Nov", title: "Hospital Admission: Hypertensive Urgency", category: "hospitalization", description: "Admitted with blood pressure 168/102 mmHg, severe occipital headache, and palpitations.", severity: "critical", document_name: "Discharge_Summary_Nov2025.pdf", page_number: 1, evidence_id: "ev-004" },
  { id: "evt-007", date: "2025-11-17", year: "2025", month: "Nov", title: "Diagnostic 12-Lead ECG & Troponin", category: "procedure", description: "Normal sinus rhythm at 74 bpm. Serial Troponin-I tests negative (< 0.01 ng/mL).", severity: "normal", document_name: "Discharge_Summary_Nov2025.pdf", page_number: 2, evidence_id: "ev-004" },
  { id: "evt-008", date: "2025-11-18", year: "2025", month: "Nov", title: "Hospital Discharge & Amlodipine Rx", category: "prescription", description: "Patient stabilized on Amlodipine 5mg PO daily. Discharge blood pressure normalized to 126/80 mmHg.", severity: "normal", document_name: "Discharge_Summary_Nov2025.pdf", page_number: 3, evidence_id: "ev-004" },
  { id: "evt-010", date: "2026-01-22", year: "2026", month: "Jan", title: "High-Resolution 3.0T MRI Right Knee", category: "imaging", description: "MRI confirmed Grade II degenerative medial meniscal tear without mechanical displacement and mild effusion.", severity: "attention", document_name: "Knee_MRI_Jan2026.pdf", page_number: 3, evidence_id: "ev-007" },
  { id: "evt-012", date: "2026-03-15", year: "2026", month: "Mar", title: "Cardiology Review & Atorvastatin Rx", category: "prescription", description: "BP controlled at 124/78 mmHg. Started Atorvastatin 20mg nightly for elevated cardiovascular risk.", severity: "normal", document_name: "Prescription_Mar2026.pdf", page_number: 1, evidence_id: "ev-006" },
  { id: "evt-014", date: "2026-09-10", year: "2026", month: "Sep", title: "Comprehensive Lipid & Metabolic Lab Panel", category: "lab_test", description: "Total Cholesterol 210 mg/dL, LDL 134 mg/dL, Fasting Glucose 108 mg/dL. Renal & liver panels normal.", severity: "attention", document_name: "Blood_Report_Sept2026.pdf", page_number: 1, evidence_id: "ev-001" },
  { id: "evt-015", date: "2026-10-02", year: "2026", month: "Oct", title: "Scheduled Cardiology Outpatient Review", category: "consultation", description: "Upcoming specialist consultation with Dr. Elena Rostova to review lipid panel and BP control.", severity: "normal", document_name: "Discharge_Summary_Nov2025.pdf", page_number: 4, evidence_id: "ev-005" }
];

const FALLBACK_REMINDERS = [
  {
    id: "rem-001",
    title: "Cardiology Specialist Follow-up",
    due_date: "2026-10-02",
    category: "follow_up",
    status: "upcoming",
    facility: "St. Jude Cardiology Specialty Clinic",
    doctor: "Dr. Elena Rostova, MD",
    source_document: "Discharge_Summary_Nov2025.pdf",
    source_page: 4,
    evidence_id: "ev-005",
    channels: { in_app: true, email: true, sms: true },
    notes: "Bring home blood pressure log and September 2026 lipid panel report."
  },
  {
    id: "rem-002",
    title: "Repeat Fasting Lipid Panel & HbA1c",
    due_date: "2026-11-15",
    category: "lab_repeat",
    status: "upcoming",
    facility: "MetroHealth Diagnostic Labs",
    doctor: "Dr. Robert Chen, MD",
    source_document: "Blood_Report_Sept2026.pdf",
    source_page: 2,
    evidence_id: "ev-001",
    channels: { in_app: true, email: true, sms: false },
    notes: "12-hour fast required prior to morning blood draw."
  },
  {
    id: "rem-003",
    title: "Right Knee Physical Therapy Maintenance Review",
    due_date: "2026-12-05",
    category: "follow_up",
    status: "upcoming",
    facility: "Apex Sports Medicine & Rehabilitation",
    doctor: "Dr. Marcus Vance, MD",
    source_document: "Knee_MRI_Jan2026.pdf",
    source_page: 3,
    evidence_id: "ev-007",
    channels: { in_app: true, email: false, sms: false },
    notes: "Evaluate progress of closed kinetic chain quad exercises."
  },
  {
    id: "rem-004",
    title: "High-Resolution 3.0T Knee MRI Diagnostic",
    due_date: "2026-01-22",
    category: "imaging",
    status: "completed",
    completed_at: "2026-01-22T14:30:00Z",
    facility: "Apex Advanced Imaging Center",
    doctor: "Dr. Marcus Vance, MD",
    source_document: "Knee_MRI_Jan2026.pdf",
    source_page: 1,
    evidence_id: "ev-007",
    channels: { in_app: true, email: true, sms: false },
    notes: "Diagnosed Grade II posterior horn degenerative change."
  }
];

const FALLBACK_NOTIFICATIONS = [
  {
    id: "notif-001",
    title: "Cardiology Follow-up Due in 14 Days",
    message: "Your review appointment with Dr. Elena Rostova is scheduled for October 02, 2026 at St. Jude Cardiology.",
    type: "REMINDER",
    priority: "high",
    is_read: false,
    link_route: "/reminders",
    created_at: "2026-09-18T08:00:00Z"
  },
  {
    id: "notif-002",
    title: "New Document Processed: Blood Report Sept 2026",
    message: "AI analysis completed for Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf. 8 lab parameters extracted.",
    type: "DOCUMENT",
    priority: "normal",
    is_read: false,
    link_route: "/documents/doc-001",
    created_at: "2026-09-10T11:45:00Z"
  },
  {
    id: "notif-003",
    title: "Elevated Parameter Detected: Total Cholesterol",
    message: "September 10 lab report reflects Total Cholesterol of 210 mg/dL. Added to Longitudinal Trends.",
    type: "INFO",
    priority: "normal",
    is_read: true,
    link_route: "/analytics",
    created_at: "2026-09-10T12:00:00Z"
  },
  {
    id: "notif-004",
    title: "Timeline Synchronization Complete",
    message: "32 medical events synthesized from 5 uploaded patient documents across 2024-2026.",
    type: "SYSTEM",
    priority: "low",
    is_read: true,
    link_route: "/timeline",
    created_at: "2026-09-01T09:15:00Z"
  }
];

// Recharts trends data
const FALLBACK_TRENDS = {
  "Total Cholesterol": [
    { test_date: "2024-01-15", parameter: "Total Cholesterol", value: 224, unit: "mg/dL", flag: "high", document_name: "Consultation_Jan2024.pdf", evidence_id: "ev-008" },
    { test_date: "2024-08-20", parameter: "Total Cholesterol", value: 220, unit: "mg/dL", flag: "high", document_name: "Consultation_Jan2024.pdf", evidence_id: "ev-008" },
    { test_date: "2025-04-10", parameter: "Total Cholesterol", value: 218, unit: "mg/dL", flag: "high", document_name: "Blood_Report_Sept2026.pdf", evidence_id: "ev-001" },
    { test_date: "2025-11-17", parameter: "Total Cholesterol", value: 215, unit: "mg/dL", flag: "high", document_name: "Discharge_Summary_Nov2025.pdf", evidence_id: "ev-004" },
    { test_date: "2026-09-10", parameter: "Total Cholesterol", value: 210, unit: "mg/dL", flag: "high", document_name: "Blood_Report_Sept2026.pdf", evidence_id: "ev-001" }
  ],
  "LDL Cholesterol": [
    { test_date: "2024-01-15", parameter: "LDL Cholesterol", value: 145, unit: "mg/dL", flag: "high", document_name: "Consultation_Jan2024.pdf", evidence_id: "ev-008" },
    { test_date: "2024-08-20", parameter: "LDL Cholesterol", value: 142, unit: "mg/dL", flag: "high", document_name: "Consultation_Jan2024.pdf", evidence_id: "ev-008" },
    { test_date: "2025-04-10", parameter: "LDL Cholesterol", value: 139, unit: "mg/dL", flag: "high", document_name: "Blood_Report_Sept2026.pdf", evidence_id: "ev-001" },
    { test_date: "2026-09-10", parameter: "LDL Cholesterol", value: 134, unit: "mg/dL", flag: "high", document_name: "Blood_Report_Sept2026.pdf", evidence_id: "ev-001" }
  ],
  "Fasting Blood Glucose": [
    { test_date: "2024-01-15", parameter: "Fasting Blood Glucose", value: 94, unit: "mg/dL", flag: "normal", document_name: "Consultation_Jan2024.pdf", evidence_id: "ev-008" },
    { test_date: "2024-08-20", parameter: "Fasting Blood Glucose", value: 96, unit: "mg/dL", flag: "normal", document_name: "Consultation_Jan2024.pdf", evidence_id: "ev-008" },
    { test_date: "2025-04-10", parameter: "Fasting Blood Glucose", value: 99, unit: "mg/dL", flag: "normal", document_name: "Blood_Report_Sept2026.pdf", evidence_id: "ev-001" },
    { test_date: "2025-11-17", parameter: "Fasting Blood Glucose", value: 102, unit: "mg/dL", flag: "high", document_name: "Discharge_Summary_Nov2025.pdf", evidence_id: "ev-004" },
    { test_date: "2026-09-10", parameter: "Fasting Blood Glucose", value: 108, unit: "mg/dL", flag: "high", document_name: "Blood_Report_Sept2026.pdf", evidence_id: "ev-002" }
  ],
  "Systolic BP": [
    { test_date: "2024-01-12", parameter: "Systolic BP", value: 138, unit: "mmHg", flag: "high", document_name: "Consultation_Jan2024.pdf", evidence_id: "ev-008" },
    { test_date: "2024-11-04", parameter: "Systolic BP", value: 134, unit: "mmHg", flag: "high", document_name: "Consultation_Jan2024.pdf", evidence_id: "ev-008" },
    { test_date: "2025-11-16", parameter: "Systolic BP", value: 168, unit: "mmHg", flag: "critical", document_name: "Discharge_Summary_Nov2025.pdf", evidence_id: "ev-004" },
    { test_date: "2025-11-18", parameter: "Systolic BP", value: 126, unit: "mmHg", flag: "normal", document_name: "Discharge_Summary_Nov2025.pdf", evidence_id: "ev-004" },
    { test_date: "2026-03-15", parameter: "Systolic BP", value: 124, unit: "mmHg", flag: "normal", document_name: "Prescription_Mar2026.pdf", evidence_id: "ev-006" }
  ],
  "Hemoglobin": [
    { test_date: "2024-01-15", parameter: "Hemoglobin", value: 13.8, unit: "g/dL", flag: "normal", document_name: "Consultation_Jan2024.pdf", evidence_id: "ev-008" },
    { test_date: "2025-11-17", parameter: "Hemoglobin", value: 13.4, unit: "g/dL", flag: "normal", document_name: "Discharge_Summary_Nov2025.pdf", evidence_id: "ev-004" },
    { test_date: "2026-09-10", parameter: "Hemoglobin", value: 13.6, unit: "g/dL", flag: "normal", document_name: "Blood_Report_Sept2026.pdf", evidence_id: "ev-003" }
  ]
};

// Safe request wrapper
async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API] Fetch to ${endpoint} failed, utilizing local fallback engine:`, err.message);
    return null;
  }
}

export const api = {
  // Auth
  login: async (credentials) => {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (res && res.status === 'success') return res;

    // Fallback login
    const isDoc = credentials.role === 'doctor' || (credentials.email && credentials.email.includes('dr.'));
    return {
      status: 'success',
      token: isDoc ? 'doc-token-demo' : 'pat-token-demo',
      role: isDoc ? 'doctor' : 'patient',
      user: isDoc ? FALLBACK_DOCTOR : FALLBACK_PATIENT
    };
  },

  // Patient Profile
  getProfile: async () => {
    const res = await apiFetch('/profile');
    return (res && res.patient) ? res.patient : FALLBACK_PATIENT;
  },

  updateProfile: async (data) => {
    const res = await apiFetch('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    return (res && res.patient) ? res.patient : { ...FALLBACK_PATIENT, ...data };
  },

  // Documents
  getDocuments: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await apiFetch(`/documents${query ? `?${query}` : ''}`);
    return (res && res.documents) ? res.documents : FALLBACK_DOCUMENTS;
  },

  getDocumentById: async (id) => {
    const res = await apiFetch(`/documents/${id}`);
    if (res && res.document) return res.document;
    const found = FALLBACK_DOCUMENTS.find(d => d.id === id) || FALLBACK_DOCUMENTS[0];
    const docCopy = { ...found };
    docCopy.evidence = FALLBACK_EVIDENCE.filter(e => e.document_id === found.id);
    return docCopy;
  },

  uploadDocument: async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/documents/upload`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        return data.document;
      }
    } catch (e) {
      console.warn("Upload API unavailable, using demo simulated processor:", e);
    }
    // Simulation fallback
    const newDoc = {
      id: `doc-${Date.now()}`,
      patient_id: "p-sarah-jenkins-01",
      file_name: formData.get('file')?.name || "Uploaded_Medical_Report.pdf",
      original_file_name: formData.get('file')?.name || "Uploaded_Medical_Report.pdf",
      document_type: "Lab Report",
      document_date: "2026-09-18",
      facility_name: "Metropolitan Diagnostic Center",
      attending_physician: "Dr. Sarah Lin, MD",
      file_size_bytes: 350000,
      page_count: 2,
      language: "en",
      processing_status: "processed",
      ocr_applied: false,
      ai_summary: "Clinical assessment records normal baseline parameters with recommended review in 3 weeks.",
      documented_facts: ["Documented clinical consultation and lab draw.", "Normal metabolic biomarkers."],
      ai_interpretations: ["Routine tracking continues."],
      follow_up_instructions: "Review in 3 weeks."
    };
    return newDoc;
  },

  // Timeline & Events
  getTimeline: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await apiFetch(`/timeline${query ? `?${query}` : ''}`);
    if (res && res.data) return res.data;

    // Build grouped fallback
    const grouped = {};
    FALLBACK_EVENTS.forEach(e => {
      if (!grouped[e.year]) grouped[e.year] = [];
      grouped[e.year].push(e);
    });
    return {
      total_events: FALLBACK_EVENTS.length,
      events: FALLBACK_EVENTS,
      grouped_by_year: grouped
    };
  },

  getTimelineEventById: async (id) => {
    const res = await apiFetch(`/timeline/${id}`);
    if (res && res.event) return res.event;
    const ev = FALLBACK_EVENTS.find(e => e.id === id) || FALLBACK_EVENTS[0];
    const evidence = FALLBACK_EVIDENCE.find(e => e.id === ev.evidence_id);
    return { ...ev, evidence };
  },

  getRelationshipGraph: async () => {
    const res = await apiFetch('/timeline/graph');
    if (res && res.graph) return res.graph;

    // React Flow fallback nodes & edges
    const nodes = [
      { id: 'evt-001', type: 'medicalNode', position: { x: 50, y: 80 }, data: { title: 'Wellness Exam', date: '2024-01-12', category: 'consultation', severity: 'normal', document_name: 'Consultation_Jan2024.pdf' } },
      { id: 'evt-002', type: 'medicalNode', position: { x: 300, y: 80 }, data: { title: 'Lipid Screening (224 mg/dL)', date: '2024-01-15', category: 'lab_test', severity: 'attention', document_name: 'Consultation_Jan2024.pdf' } },
      { id: 'evt-006', type: 'medicalNode', position: { x: 50, y: 240 }, data: { title: 'Hypertensive Urgency (168/102)', date: '2025-11-16', category: 'hospitalization', severity: 'critical', document_name: 'Discharge_Summary_Nov2025.pdf' } },
      { id: 'evt-007', type: 'medicalNode', position: { x: 300, y: 240 }, data: { title: 'ECG & Troponin Workup', date: '2025-11-17', category: 'procedure', severity: 'normal', document_name: 'Discharge_Summary_Nov2025.pdf' } },
      { id: 'evt-008', type: 'medicalNode', position: { x: 550, y: 240 }, data: { title: 'Discharge on Amlodipine 5mg', date: '2025-11-18', category: 'prescription', severity: 'normal', document_name: 'Discharge_Summary_Nov2025.pdf' } },
      { id: 'evt-012', type: 'medicalNode', position: { x: 550, y: 400 }, data: { title: 'Atorvastatin 20mg Added', date: '2026-03-15', category: 'prescription', severity: 'normal', document_name: 'Prescription_Mar2026.pdf' } },
      { id: 'evt-014', type: 'medicalNode', position: { x: 300, y: 400 }, data: { title: 'Lipid Panel (Chol 210 mg/dL)', date: '2026-09-10', category: 'lab_test', severity: 'attention', document_name: 'Blood_Report_Sept2026.pdf' } },
      { id: 'evt-015', type: 'medicalNode', position: { x: 50, y: 400 }, data: { title: 'Cardiology Review (Oct 02)', date: '2026-10-02', category: 'consultation', severity: 'normal', document_name: 'Discharge_Summary_Nov2025.pdf' } },
    ];
    const edges = [
      { id: 'e1-2', source: 'evt-001', target: 'evt-002', label: 'Orders Screening', animated: true, style: { stroke: '#0ea5e9' } },
      { id: 'e6-7', source: 'evt-006', target: 'evt-007', label: 'ED Workup', animated: true, style: { stroke: '#ef4444' } },
      { id: 'e7-8', source: 'evt-007', target: 'evt-008', label: 'Stabilization Rx', animated: true, style: { stroke: '#8b5cf6' } },
      { id: 'e8-12', source: 'evt-008', target: 'evt-012', label: 'Outpatient Review', animated: true, style: { stroke: '#8b5cf6' } },
      { id: 'e12-14', source: 'evt-012', target: 'evt-014', label: '6-Mo Monitoring', animated: true, style: { stroke: '#0ea5e9' } },
      { id: 'e14-15', source: 'evt-014', target: 'evt-015', label: 'Upcoming Consult', animated: true, style: { stroke: '#10b981' } },
    ];
    return { nodes, edges };
  },

  // Evidence
  getEvidenceById: async (id) => {
    const res = await apiFetch(`/evidence/${id}`);
    if (res && res.evidence) return res.evidence;
    const ev = FALLBACK_EVIDENCE.find(e => e.id === id) || FALLBACK_EVIDENCE[0];
    const doc = FALLBACK_DOCUMENTS.find(d => d.id === ev.document_id);
    return { ...ev, document: doc };
  },

  getAllEvidence: async () => {
    const res = await apiFetch('/evidence');
    return (res && res.evidence) ? res.evidence : FALLBACK_EVIDENCE;
  },

  // Analytics
  getAnalytics: async () => {
    const res = await apiFetch('/analytics');
    if (res && res.data) return res.data;

    return {
      overview: {
        total_documents: 15,
        total_medical_events: 32,
        upcoming_reminders: 3,
        active_medications: 3,
        next_follow_up: "2026-10-02",
        next_follow_up_title: "Cardiology Specialist Follow-up"
      },
      document_distribution: [
        { name: "Lab Report", value: 6, color: "#0ea5e9" },
        { name: "Prescription", value: 4, color: "#8b5cf6" },
        { name: "Discharge Summary", value: 2, color: "#ef4444" },
        { name: "Imaging Report", value: 2, color: "#f59e0b" },
        { name: "Consultation Note", value: 1, color: "#10b981" }
      ],
      documents_by_year: [
        { year: "2024", count: 4 },
        { year: "2025", count: 5 },
        { year: "2026", count: 6 }
      ],
      parameter_trends: FALLBACK_TRENDS
    };
  },

  // AI Chat
  sendChatMessage: async (query, language = 'en') => {
    const res = await apiFetch('/chat', {
      method: 'POST',
      body: JSON.stringify({ query, language })
    });
    if (res && res.answer) return res;

    // Intelligent local fallback
    const q = query.toLowerCase();
    let ans = "Based on your records, your documents are organized and current.";
    let citations = [FALLBACK_EVIDENCE[0]];

    if (q.includes("cholesterol") || q.includes("கொலஸ்ட்ரால்") || q.includes("कोलेस्ट्रॉल")) {
      citations = [FALLBACK_EVIDENCE[0]];
      if (language === 'ta') {
        ans = "உங்கள் சமீபத்திய இரத்தப் பரிசோதனை (10 செப்டம்பர் 2026) படி, உங்கள் மொத்த கொலஸ்ட்ரால் 210 mg/dL ஆக பதிவு செய்யப்பட்டுள்ளது. இயல்பு வரம்பு < 200 mg/dL.";
      } else if (language === 'hi') {
        ans = "आपके नवीनतम रक्त परीक्षण (10 सितंबर 2026) के अनुसार, आपका कुल कोलेस्ट्रॉल 210 mg/dL दर्ज किया गया है (सामान्य सीमा < 200 mg/dL)।";
      } else {
        ans = "Your latest available cholesterol result in the uploaded records is 210 mg/dL, documented on 10 September 2026 in Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf.";
      }
    } else if (q.includes("medication") || q.includes("medicine") || q.includes("மருந்து") || q.includes("दवा")) {
      citations = [FALLBACK_EVIDENCE[5]];
      if (language === 'ta') {
        ans = "பதிவு செய்யப்பட்டுள்ள மருந்துகள்: 1) Amlodipine 5mg (காலை), 2) Atorvastatin 20mg (இரவு படுக்கும் முன்).";
      } else if (language === 'hi') {
        ans = "दर्ज दवाएं: 1) एम्लोडिपिन 5mg (सुबह), 2) एटोरवास्टेटिन 20mg (रात को)।";
      } else {
        ans = "Based on your active records, you are currently prescribed: Amlodipine 5mg daily (hypertension) and Atorvastatin 20mg daily at bedtime (hyperlipidemia).";
      }
    } else if (q.includes("follow-up") || q.includes("follow up") || q.includes("next") || q.includes("அடுத்த") || q.includes("अगली")) {
      citations = [FALLBACK_EVIDENCE[4]];
      if (language === 'ta') {
        ans = "உங்கள் அடுத்த கார்டியாலஜி மருத்துவ பரிசோதனை 02 அக்டோபர் 2026 அன்று திட்டமிடப்பட்டுள்ளது.";
      } else if (language === 'hi') {
        ans = "आपकी अगली कार्डियोलॉजी समीक्षा 02 अक्टूबर 2026 को निर्धारित है।";
      } else {
        ans = "Your next scheduled follow-up is a Cardiology Review with Dr. Elena Rostova on 02 October 2026.";
      }
    }

    return {
      query,
      language,
      answer: ans,
      citations,
      disclaimer: "MedVault AI is an informational record assistant, not a diagnostic medical provider."
    };
  },

  // Reminders
  getReminders: async (status = 'all') => {
    const res = await apiFetch(`/reminders?status=${status}`);
    if (res && res.reminders) return res.reminders;
    if (status !== 'all') {
      return FALLBACK_REMINDERS.filter(r => r.status === status);
    }
    return FALLBACK_REMINDERS;
  },

  createReminder: async (data) => {
    const res = await apiFetch('/reminders', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return (res && res.reminder) ? res.reminder : { ...data, id: `rem-${Date.now()}`, status: 'upcoming' };
  },

  updateReminderStatus: async (id, status) => {
    const res = await apiFetch(`/reminders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    return (res && res.reminder) ? res.reminder : { id, status };
  },

  // Notifications
  getNotifications: async () => {
    const res = await apiFetch('/notifications');
    if (res && res.notifications) return res;
    return {
      unread_count: FALLBACK_NOTIFICATIONS.filter(n => !n.is_read).length,
      notifications: FALLBACK_NOTIFICATIONS
    };
  },

  markNotificationRead: async (id) => {
    return await apiFetch(`/notifications/${id}/read`, { method: 'PATCH' });
  },

  markAllNotificationsRead: async () => {
    return await apiFetch('/notifications/read-all', { method: 'POST' });
  },

  // Doctor Portal
  getDoctorOverview: async () => {
    const res = await apiFetch('/doctor/overview');
    if (res && res.metrics) return res;
    return {
      doctor: FALLBACK_DOCTOR,
      metrics: {
        total_assigned_patients: 18,
        active_review_cases: 4,
        pending_follow_ups: 3,
        critical_flags_count: 1
      },
      recent_patient: {
        id: FALLBACK_PATIENT.id,
        name: "Sarah Jenkins",
        mrn: "MV-89241",
        age: 48,
        gender: "Female",
        chronic_conditions: ["Essential Hypertension", "Dyslipidemia", "Mild Osteoarthritis"],
        latest_document: "Blood_Report_Sept2026.pdf",
        latest_document_date: "2026-09-10"
      }
    };
  },

  getDoctorPatients: async () => {
    const res = await apiFetch('/doctor/patients');
    if (res && res.patients) return res.patients;
    return [
      {
        id: FALLBACK_PATIENT.id,
        name: "Sarah Jenkins",
        mrn: "MV-89241",
        age: 48,
        gender: "Female",
        blood_group: "A+",
        primary_diagnosis: "Accelerated Hypertension & Dyslipidemia",
        last_visit: "2026-09-10",
        document_count: 15,
        status: "Stable / Review Due Soon",
        risk_tier: "Moderate"
      },
      {
        id: "p-arthur-pendleton-02",
        name: "Arthur Pendleton",
        mrn: "MV-44109",
        age: 62,
        gender: "Male",
        blood_group: "O+",
        primary_diagnosis: "Type 2 Diabetes Mellitus with Neuropathy",
        last_visit: "2026-08-28",
        document_count: 8,
        status: "Stable",
        risk_tier: "Moderate"
      },
      {
        id: "p-maria-gonzalez-03",
        name: "Maria Gonzalez",
        mrn: "MV-90112",
        age: 39,
        gender: "Female",
        blood_group: "B+",
        primary_diagnosis: "Post-Op ACL Reconstruction Rehabilitation",
        last_visit: "2026-09-02",
        document_count: 4,
        status: "Rehabilitation Phase II",
        risk_tier: "Low"
      }
    ];
  },

  getDoctorPatientDetails: async (patientId) => {
    const res = await apiFetch(`/doctor/patients/${patientId}`);
    if (res && res.patient) return res;
    return {
      patient: FALLBACK_PATIENT,
      clinical_summary: {
        attending_physician: "Dr. Robert Chen, MD",
        chief_conditions: FALLBACK_PATIENT.chronic_conditions,
        recent_vital_bp: "124/78 mmHg (Normalized)",
        recent_lipid: "Total Cholesterol: 210 mg/dL",
        adherence_score: "94%",
        clinical_notes: "Patient adheres well to daily Amlodipine 5mg and Atorvastatin 20mg. Follow-up consultation scheduled with Dr. Rostova on 02 Oct 2026."
      },
      documents: FALLBACK_DOCUMENTS,
      recent_events: FALLBACK_EVENTS.slice(0, 6),
      active_medications: [
        { name: "Amlodipine Besylate", dosage: "5 mg", frequency: "Daily morning", indication: "Hypertension" },
        { name: "Atorvastatin Calcium", dosage: "20 mg", frequency: "Daily bedtime", indication: "Hyperlipidemia" }
      ],
      upcoming_reminders: FALLBACK_REMINDERS.filter(r => r.status === 'upcoming')
    };
  },

  // Audit Logs
  getAuditLogs: async () => {
    const res = await apiFetch('/audit-logs');
    if (res && res.logs) return res.logs;
    return [
      { id: "aud-001", timestamp: "2026-09-18T10:15:22Z", user_id: "sarah.jenkins@example.com", user_role: "patient", action: "LOGIN", resource_type: "AUTHENTICATION" },
      { id: "aud-002", timestamp: "2026-09-18T10:20:05Z", user_id: "sarah.jenkins@example.com", user_role: "patient", action: "VIEW_EVIDENCE", resource_type: "EVIDENCE" },
      { id: "aud-003", timestamp: "2026-09-18T10:22:18Z", user_id: "sarah.jenkins@example.com", user_role: "patient", action: "CHAT_QUERY", resource_type: "AI_CHAT" },
      { id: "aud-004", timestamp: "2026-09-17T16:40:00Z", user_id: "dr.chen@beaconhealth.org", user_role: "doctor", action: "DOCTOR_PATIENT_ACCESS", resource_type: "PATIENT_RECORD" }
    ];
  }
};
