-- ==========================================================
-- MEDVAULT AI - Seed Data (Realistic Demo Clinical Dataset)
-- Patient: Sarah Jenkins (Female, 48 years old, MRN: MV-89241)
-- ==========================================================

-- Insert Patient
INSERT INTO patients (
    id, mrn, first_name, last_name, date_of_birth, gender, blood_group, phone, email,
    emergency_contact_name, emergency_contact_phone, allergies, chronic_conditions, preferred_language
) VALUES (
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'MV-89241',
    'Sarah',
    'Jenkins',
    '1978-04-14',
    'Female',
    'A+',
    '+1 (555) 234-5678',
    'sarah.jenkins@example.com',
    'David Jenkins (Spouse)',
    '+1 (555) 987-6543',
    ARRAY['Penicillin (Hives)', 'Sulfa Drugs'],
    ARRAY['Hypertension', 'Dyslipidemia', 'Mild Osteoarthritis (Right Knee)'],
    'en'
) ON CONFLICT (mrn) DO NOTHING;

-- Documents
INSERT INTO documents (
    id, patient_id, file_name, original_file_name, storage_path, file_type, file_size_bytes,
    page_count, document_type, document_date, facility_name, attending_physician, language,
    processing_status, ocr_applied, ai_summary
) VALUES 
(
    'd001-blood-test',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Comprehensive_Metabolic_Lipid_Panel_Sept2026.pdf',
    'Blood_Report_Sept2026.pdf',
    'documents/d001-blood-test.pdf',
    'application/pdf',
    428000,
    2,
    'Lab Report',
    '2026-09-10',
    'MetroHealth Diagnostic Labs',
    'Dr. Aris Thorne, MD (Pathology)',
    'en',
    'processed',
    false,
    'Fasting lipid panel demonstrates elevated Total Cholesterol (210 mg/dL) and LDL (134 mg/dL). Fasting blood glucose is 108 mg/dL indicating impaired fasting glucose. Renal and hepatic markers are within normal physiological reference ranges.'
),
(
    'd002-discharge-summary',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Cardiology_Discharge_Summary_Nov2025.pdf',
    'Discharge_Summary_Nov2025.pdf',
    'documents/d002-discharge-summary.pdf',
    'application/pdf',
    785000,
    4,
    'Discharge Summary',
    '2025-11-18',
    'St. Jude Memorial Hospital - Cardiology Dept',
    'Dr. Elena Rostova, MD (Cardiology)',
    'en',
    'processed',
    false,
    'Patient admitted with accelerated essential hypertension (BP 168/102 mmHg) and exertional palpitations. Successfully stabilized with oral Amlodipine 5mg and dietary DASH protocol. ECG confirmed normal sinus rhythm with no acute ischemic signs. Discharged with strict follow-up instructions.'
),
(
    'd003-prescription-march2026',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Outpatient_Prescription_Cardiology_Mar2026.pdf',
    'Prescription_Mar2026.pdf',
    'documents/d003-prescription-march2026.pdf',
    'application/pdf',
    195000,
    1,
    'Prescription',
    '2026-03-15',
    'Heart & Vascular Specialty Clinic',
    'Dr. Elena Rostova, MD',
    'en',
    'processed',
    false,
    'Prescription for Atorvastatin 20mg daily at bedtime for hyperlipidemia and Amlodipine 5mg morning dose for blood pressure regulation. Instructed to repeat lipid panel in 6 months.'
),
(
    'd004-knee-mri',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Right_Knee_MRI_Report_Jan2026.pdf',
    'Knee_MRI_Jan2026.pdf',
    'documents/d004-knee-mri.pdf',
    'application/pdf',
    610000,
    3,
    'Imaging Report',
    '2026-01-22',
    'Apex Advanced Imaging Center',
    'Dr. Marcus Vance, MD (Radiology)',
    'en',
    'processed',
    false,
    'MRI of the right knee reveals grade II degenerative changes of the medial meniscus posterior horn without displaced fragment. Mild joint effusion noted. Cruciate and collateral ligaments intact.'
),
(
    'd005-annual-consultation',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Internal_Medicine_Consultation_Note_Jan2024.pdf',
    'Consultation_Jan2024.pdf',
    'documents/d005-annual-consultation.pdf',
    'application/pdf',
    340000,
    2,
    'Consultation Note',
    '2024-01-12',
    'Beacon Primary Care Associates',
    'Dr. Robert Chen, MD',
    'en',
    'processed',
    false,
    'Routine annual physical examination. Patient reported mild morning stiffness in right knee and occasional afternoon fatigue. Baseline blood tests ordered. Blood pressure recorded at 138/86 mmHg.'
);
