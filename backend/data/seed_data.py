"""
MEDVAULT AI - Seed Data Engine
Realistic medical records, verifiable evidence snippets, chronological events,
and longitudinal lab analytics for demo patient Sarah Jenkins.
"""

INITIAL_PATIENT = {
    "id": "p-sarah-jenkins-01",
    "mrn": "MV-89241",
    "first_name": "Sarah",
    "last_name": "Jenkins",
    "date_of_birth": "1978-04-14",
    "age": 48,
    "gender": "Female",
    "blood_group": "A+",
    "phone": "+1 (555) 234-5678",
    "email": "sarah.jenkins@example.com",
    "address": "742 Evergreen Terrace, Springfield, MA",
    "emergency_contact": {
        "name": "David Jenkins",
        "relationship": "Spouse",
        "phone": "+1 (555) 987-6543"
    },
    "allergies": [
        {"allergen": "Penicillin", "reaction": "Urticaria / Hives", "severity": "Moderate"},
        {"allergen": "Sulfa Drugs", "reaction": "Maculopapular rash", "severity": "Mild"}
    ],
    "chronic_conditions": [
        {"condition": "Essential Hypertension", "diagnosed_date": "2025-11-18", "status": "Active / Medicated"},
        {"condition": "Dyslipidemia (Hypercholesterolemia)", "diagnosed_date": "2024-01-12", "status": "Active / Medicated"},
        {"condition": "Mild Osteoarthritis (Right Knee)", "diagnosed_date": "2026-01-22", "status": "Stable"}
    ],
    "preferred_language": "en"
}

INITIAL_DOCTOR = {
    "id": "doc-robert-chen-01",
    "name": "Dr. Robert Chen, MD",
    "specialty": "Internal Medicine & Cardiology",
    "license_number": "MD-449102-MA",
    "hospital": "Beacon Primary Care Associates / St. Jude Memorial Hospital",
    "email": "dr.chen@beaconhealth.org",
    "phone": "+1 (555) 302-8819",
    "authorized_patients_count": 18
}

INITIAL_DOCUMENTS = [
    {
        "id": "doc-001",
        "patient_id": "p-sarah-jenkins-01",
        "file_name": "Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf",
        "original_file_name": "Blood_Report_Sept2026.pdf",
        "document_type": "Lab Report",
        "document_date": "2026-09-10",
        "facility_name": "MetroHealth Diagnostic Labs - Central Clinical Pathology",
        "attending_physician": "Dr. Aris Thorne, MD",
        "file_size_bytes": 428000,
        "page_count": 2,
        "language": "en",
        "processing_status": "processed",
        "ocr_applied": False,
        "ai_summary": "Comprehensive outpatient fasting lipid and metabolic panel. Total Cholesterol is documented at 210 mg/dL (elevated) and LDL at 134 mg/dL. Fasting blood glucose is 108 mg/dL indicating mild impairment. Serum creatinine is 0.88 mg/dL with eGFR > 90 mL/min/1.73m², reflecting preserved renal function. Liver enzymes AST (22 U/L) and ALT (26 U/L) remain within normal physiological limits.",
        "documented_facts": [
            "Total Cholesterol: 210 mg/dL (Reference < 200 mg/dL - High)",
            "LDL Cholesterol: 134 mg/dL (Reference < 100 mg/dL - High)",
            "HDL Cholesterol: 48 mg/dL (Reference > 50 mg/dL - Borderline)",
            "Triglycerides: 160 mg/dL (Reference < 150 mg/dL - Borderline High)",
            "Fasting Blood Glucose: 108 mg/dL (Reference 70-99 mg/dL - Impaired Fasting Glucose)",
            "Serum Creatinine: 0.88 mg/dL (Reference 0.50-1.10 mg/dL - Normal)",
            "eGFR: > 90 mL/min/1.73m² (Normal)",
            "Hemoglobin: 13.6 g/dL (Reference 12.0-15.5 g/dL - Normal)"
        ],
        "ai_interpretations": [
            "Patient's lipid profile continues to show mild elevation despite current statin therapy; dietary adherence and statin dosage titration should be evaluated by prescribing physician.",
            "Elevated fasting glucose of 108 mg/dL warrants lifestyle review and follow-up glycated hemoglobin (HbA1c) monitoring.",
            "Renal and hepatic markers show no evidence of statin-induced or hypertensive organ compromise."
        ],
        "follow_up_instructions": "Review lipid panel with primary care or cardiologist within 3 weeks. Retest fasting lipid and HbA1c in 6 months.",
        "pages": [
            {
                "page_number": 1,
                "text": "METROHEALTH DIAGNOSTIC LABS\nSpecimen ID: LAB-2026-90214 | Collection Date: 2026-09-10 07:30 AM\nPatient: Sarah Jenkins | DOB: 1978-04-14 | Sex: F | MRN: MV-89241\nOrdering Physician: Dr. Robert Chen, MD\n\nLIPID PANEL (FASTING: 12 HOURS)\nTotal Cholesterol: 210 mg/dL  [Ref: < 200 mg/dL]  *FLAG: HIGH*\nTriglycerides: 160 mg/dL  [Ref: < 150 mg/dL]  *FLAG: BORDERLINE*\nHDL Cholesterol: 48 mg/dL  [Ref: > 50 mg/dL]  *FLAG: LOW*\nLDL Cholesterol (calculated): 134 mg/dL  [Ref: < 100 mg/dL]  *FLAG: HIGH*\nChol / HDL Ratio: 4.38  [Ref: < 4.5]\nNon-HDL Cholesterol: 162 mg/dL  [Ref: < 130 mg/dL]\n\nCOMPREHENSIVE METABOLIC PANEL\nGlucose, Fasting: 108 mg/dL  [Ref: 70 - 99 mg/dL]  *FLAG: HIGH*\nBlood Urea Nitrogen (BUN): 14 mg/dL  [Ref: 7 - 20 mg/dL]\nCreatinine, Serum: 0.88 mg/dL  [Ref: 0.50 - 1.10 mg/dL]\neGFR (CKD-EPI): > 90 mL/min/1.73m²  [Ref: > 60]\nSodium: 139 mEq/L  [Ref: 136 - 145 mEq/L]\nPotassium: 4.2 mEq/L  [Ref: 3.5 - 5.1 mEq/L]\nChloride: 102 mEq/L  [Ref: 98 - 107 mEq/L]\nCarbon Dioxide: 24 mEq/L  [Ref: 22 - 29 mEq/L]\nCalcium: 9.4 mg/dL  [Ref: 8.6 - 10.2 mg/dL]"
            },
            {
                "page_number": 2,
                "text": "METROHEALTH DIAGNOSTIC LABS - Page 2 of 2\nPatient: Sarah Jenkins | MRN: MV-89241 | Date: 2026-09-10\n\nHEPATIC FUNCTION PANEL\nTotal Protein: 7.1 g/dL  [Ref: 6.3 - 8.2 g/dL]\nAlbumin: 4.3 g/dL  [Ref: 3.5 - 5.0 g/dL]\nTotal Bilirubin: 0.7 mg/dL  [Ref: 0.2 - 1.2 mg/dL]\nAlkaline Phosphatase: 64 U/L  [Ref: 44 - 121 U/L]\nAST (SGOT): 22 U/L  [Ref: 10 - 35 U/L]\nALT (SGPT): 26 U/L  [Ref: 9 - 46 U/L]\n\nHEMATOLOGY CBC (AUTOMATED)\nWhite Blood Cells (WBC): 6.8 K/uL  [Ref: 4.5 - 11.0 K/uL]\nRed Blood Cells (RBC): 4.42 M/uL  [Ref: 3.90 - 5.20 M/uL]\nHemoglobin: 13.6 g/dL  [Ref: 12.0 - 15.5 g/dL]\nHematocrit: 40.5%  [Ref: 35.0 - 45.0%]\nPlatelet Count: 245 K/uL  [Ref: 150 - 450 K/uL]\n\nPathologist Comments:\nSpecimen integrity verified without hemolysis. Moderate dyslipidemia with borderline elevated triglycerides and LDL. Fasting hyperglycemia noted. Clinical correlation with dietary records and lipid lowering medication is recommended."
            }
        ]
    },
    {
        "id": "doc-002",
        "patient_id": "p-sarah-jenkins-01",
        "file_name": "Cardiology_Inpatient_Discharge_Summary_Nov2025.pdf",
        "original_file_name": "Discharge_Summary_Nov2025.pdf",
        "document_type": "Discharge Summary",
        "document_date": "2025-11-18",
        "facility_name": "St. Jude Memorial Hospital - Acute Cardiovascular Care Unit",
        "attending_physician": "Dr. Elena Rostova, MD, FACC",
        "file_size_bytes": 785000,
        "page_count": 4,
        "language": "en",
        "processing_status": "processed",
        "ocr_applied": False,
        "ai_summary": "Inpatient discharge summary following a 48-hour observation for accelerated essential hypertension. Patient presented to the Emergency Department with a blood pressure of 168/102 mmHg, occipital headache, and exertional palpitations. 12-lead ECG confirmed normal sinus rhythm without acute ST-T wave changes. Serial troponin-I tests were negative (< 0.01 ng/mL). Patient was successfully stabilized on oral Amlodipine 5mg daily, with discharge blood pressure responding down to 126/80 mmHg. Discharge instructions mandate outpatient cardiology follow-up on October 02, 2026 (or 6 months milestone) and daily home BP charting.",
        "documented_facts": [
            "Admission Diagnosis: Accelerated Essential Hypertension with Symptomatic Palpitations",
            "Admission Blood Pressure: 168/102 mmHg, Pulse: 94 bpm",
            "Discharge Blood Pressure: 126/80 mmHg, Pulse: 72 bpm",
            "Serial Cardiac Troponin I: < 0.01 ng/mL (Normal, rules out acute coronary syndrome)",
            "12-Lead ECG: Normal sinus rhythm at 74 bpm, normal PR (152 ms) and QTc (418 ms), no ST elevations or T-wave inversions",
            "Prescribed Medication: Amlodipine 5mg PO daily every morning",
            "Dietary Protocol: Sodium restriction (< 2000 mg/day) and Mediterranean DASH guidelines",
            "Follow-up Date: Cardiology outpatient clinic on 02 October 2026"
        ],
        "ai_interpretations": [
            "Hypertensive crisis was effectively averted without target organ ischemia.",
            "Favorable hemodynamic response to calcium channel blocker monotherapy (Amlodipine).",
            "Strict adherence to low-sodium nutrition and home blood pressure monitoring is critical to prevent recurrence."
        ],
        "follow_up_instructions": "Return for review at outpatient cardiology clinic on 02 October 2026. Schedule repeat lipid evaluation in 6 months. Maintain home blood pressure log twice daily.",
        "pages": [
            {
                "page_number": 1,
                "text": "ST. JUDE MEMORIAL HOSPITAL\nACUTE CARDIOVASCULAR CARE UNIT | DISCHARGE SUMMARY\nPatient: Sarah Jenkins | Age: 47 | Sex: F | MRN: MV-89241\nAdmission Date: 2025-11-16 | Discharge Date: 2025-11-18\nAttending Physician: Dr. Elena Rostova, MD, FACC (Cardiovascular Medicine)\n\nREASON FOR ADMISSION:\nThe patient presented to the emergency department on November 16, 2025 complaining of throbbing occipital headaches of 12 hours duration accompanied by sudden exertional palpitations and lightheadedness. Initial vital signs in ED: Blood Pressure 168/102 mmHg, Heart Rate 94 bpm, Respiratory Rate 16/min, SpO2 98% on room air, Temperature 98.4 F.\n\nHISTORY OF PRESENT ILLNESS:\nPatient has a known history of borderline dyslipidemia managed with lifestyle modifications. She reported increased occupational stress and high sodium dietary intake over preceding weeks. Denied chest pressure, radiating arm pain, dyspnea at rest, or syncope."
            },
            {
                "page_number": 2,
                "text": "ST. JUDE MEMORIAL HOSPITAL - Discharge Summary (Cont.)\nPatient: Sarah Jenkins | MRN: MV-89241\n\nDIAGNOSTIC WORKUP:\n1. 12-Lead Electrocardiogram (ECG): Normal sinus rhythm, rate 74 bpm. Normal axis, normal intervals. No evidence of ST-segment elevation or depression. No pathological Q waves.\n2. Cardiac Biomarkers: High-sensitivity Troponin-I: 0h: < 0.01 ng/mL, 3h: < 0.01 ng/mL (Negative for acute myocardial necrosis).\n3. Chest Radiography (AP): Heart size normal, cardiothoracic ratio 0.46. Clear pulmonary vascular markings, no acute infiltrates or pleural effusions.\n4. Basic Metabolic Panel: K 4.1 mEq/L, Na 140 mEq/L, Creatinine 0.84 mg/dL. Renal profile uncompromised."
            },
            {
                "page_number": 3,
                "text": "ST. JUDE MEMORIAL HOSPITAL - Discharge Summary (Cont.)\nPatient: Sarah Jenkins | MRN: MV-89241\n\nHOSPITAL COURSE & THERAPY:\nPatient was admitted to telemetry. Initiated on oral Amlodipine 5mg once daily in the morning. Blood pressure progressively stabilized over 36 hours. Day 2 telemetry confirmed stable sinus rhythm without ectopic beats. Headache resolved completely.\nVitals at discharge: BP 126/80 mmHg, HR 72 bpm, regular.\n\nDISCHARGE MEDICATIONS:\n1. Amlodipine besylate 5 mg oral tablet - Take 1 tablet by mouth every morning for blood pressure control. (Quantity: 30 tablets, 5 refills).\n2. Resume daily multivitamin and Omega-3 fish oil 1000mg.\n\nALLERGIES RECORDED: Penicillin (Hives), Sulfa Drugs."
            },
            {
                "page_number": 4,
                "text": "ST. JUDE MEMORIAL HOSPITAL - Discharge Summary (Cont.)\nPatient: Sarah Jenkins | MRN: MV-89241\n\nDISCHARGE INSTRUCTIONS & FOLLOW-UP MANDATE:\n1. Blood Pressure Monitoring: Record home blood pressure morning and evening. Bring log to next visit.\n2. Dietary Guidance: Sodium restriction strictly under 2,000 mg daily (DASH dietary guidelines).\n3. CLINICAL FOLLOW-UP: Return for review on 02 October 2026 at the St. Jude Cardiology Specialty Clinic with Dr. Elena Rostova.\n4. Repeat lipid panel testing in 6 months.\n5. Warning signs: Seek immediate emergency medical care if experiencing chest pressure, shortness of breath, sudden severe headache, or numbness.\n\nSigned: Elena Rostova, MD, FACC (Cardiovascular Medicine)\nDate: November 18, 2025"
            }
        ]
    },
    {
        "id": "doc-003",
        "patient_id": "p-sarah-jenkins-01",
        "file_name": "Outpatient_Prescription_Cardiology_Mar2026.pdf",
        "original_file_name": "Prescription_Mar2026.pdf",
        "document_type": "Prescription",
        "document_date": "2026-03-15",
        "facility_name": "Heart & Vascular Specialty Clinic",
        "attending_physician": "Dr. Elena Rostova, MD",
        "file_size_bytes": 195000,
        "page_count": 1,
        "language": "en",
        "processing_status": "processed",
        "ocr_applied": False,
        "ai_summary": "Outpatient cardiovascular prescription following 4-month post-discharge review. Blood pressure well controlled at 124/78 mmHg. Fasting lipid evaluation identified persistent hypercholesterolemia. Physician added Atorvastatin 20mg daily at bedtime and renewed Amlodipine 5mg daily. Ordered repeat lipid panel in 6 months.",
        "documented_facts": [
            "Medication: Atorvastatin Calcium 20 mg oral tablet",
            "Directions: Take 1 tablet PO daily at bedtime for hypercholesterolemia",
            "Medication: Amlodipine Besylate 5 mg oral tablet",
            "Directions: Take 1 tablet PO every morning for blood pressure control",
            "Quantity: 90 days supply with 3 refills each",
            "Follow-up instruction: Order repeat fasting lipid panel in 6 months (September 2026)"
        ],
        "ai_interpretations": [
            "Dual-agent therapy targeting both blood pressure (calcium channel blocker) and cardiovascular atherogenic risk (statin).",
            "Medication adherence should be verified against prospective follow-up lipid panels."
        ],
        "follow_up_instructions": "Repeat fasting lipid panel in 6 months. Maintain home BP monitoring.",
        "pages": [
            {
                "page_number": 1,
                "text": "HEART & VASCULAR SPECIALTY CLINIC\n100 Health Sciences Way, Suite 400 | Tel: (555) 789-0144\nRx Date: 2026-03-15 | Patient: Sarah Jenkins | DOB: 1978-04-14 | MRN: MV-89241\n\nPRESCRIPTION ORDER:\n\n1. Rx: ATORVASTATIN CALCIUM 20 MG TABLET\n   Sig: Take 1 tablet by mouth daily at bedtime.\n   Indication: Hyperlipidemia / Atherosclerotic cardiovascular prophylaxis.\n   Dispense: 90 tablets | Refills: 3\n\n2. Rx: AMLODIPINE BESYLATE 5 MG TABLET\n   Sig: Take 1 tablet by mouth every morning.\n   Indication: Essential Hypertension.\n   Dispense: 90 tablets | Refills: 3\n\nClinical Notes:\nBlood pressure is stable at 124/78 mmHg. Instructed patient on potential statin-related myalgia symptoms. Follow-up after 14 days if adverse effects emerge. Routine lipid panel repeat due in 6 months (September 2026).\n\nPhysician Signature: Dr. Elena Rostova, MD (DEA: BR9044129)"
            }
        ]
    },
    {
        "id": "doc-004",
        "patient_id": "p-sarah-jenkins-01",
        "file_name": "Right_Knee_MRI_Diagnostic_Report_Jan2026.pdf",
        "original_file_name": "Knee_MRI_Jan2026.pdf",
        "document_type": "Imaging Report",
        "document_date": "2026-01-22",
        "facility_name": "Apex Advanced Imaging Center - Department of Musculoskeletal Radiology",
        "attending_physician": "Dr. Marcus Vance, MD (Radiology)",
        "file_size_bytes": 610000,
        "page_count": 3,
        "language": "en",
        "processing_status": "processed",
        "ocr_applied": False,
        "ai_summary": "High-resolution 3.0T MRI of the right knee performed for chronic joint line tenderness and mechanical popping. Findings show a grade II intrameniscal signal alteration within the posterior horn of the medial meniscus without frank articular surface disruption. Mild joint effusion and trace suprapatellar bursitis are present. Cruciate ligaments (ACL/PCL) and collateral ligaments are intact with no acute tear. Conservative physical therapy recommended.",
        "documented_facts": [
            "Procedure: MRI Right Knee without intravenous contrast (3.0 Tesla)",
            "Medial Meniscus: Grade II horizontal intrameniscal degenerative signal in posterior horn; no displaced tear fragment",
            "Lateral Meniscus: Intact normal morphology",
            "Anterior Cruciate Ligament (ACL): Intact with normal signal intensity",
            "Posterior Cruciate Ligament (PCL): Intact without tear",
            "Joint Effusion: Small to moderate physiologic joint effusion noted",
            "Articular Cartilage: Mild thinning along the medial femoral condyle, consistent with early tricompartmental osteoarthritis",
            "Impression: Grade II degenerative meniscal alteration without mechanical tear; early mild osteoarthritis"
        ],
        "ai_interpretations": [
            "Right knee symptoms are primarily degenerative rather than acute traumatic injury.",
            "Surgical intervention is currently not indicated; conservative quad-strengthening physical therapy and low-impact activity are appropriate."
        ],
        "follow_up_instructions": "Consult orthopedic specialist or physical therapist for conservative rehabilitation course. Follow-up in 8-12 weeks if symptoms worsen.",
        "pages": [
            {
                "page_number": 1,
                "text": "APEX ADVANCED IMAGING CENTER\nDEPARTMENT OF MUSCULOSKELETAL RADIOLOGY\nPatient: Sarah Jenkins | Age: 47 | Sex: F | MRN: MV-89241\nExam Date: 2026-01-22 | Ordering Physician: Dr. Robert Chen, MD\nStudy: MRI RIGHT KNEE WITHOUT INTRAVENOUS CONTRAST\n\nCLINICAL INDICATION:\nRight knee medial joint line pain for 4 months, aggravated by descending stairs. Mechanical clicking noted. Evaluate for internal derangement or meniscal tear.\n\nTECHNIQUE:\nMultiplanar, multisequence MRI of the right knee obtained on a 3.0T Siemens scanner including sagittal, coronal, and axial proton density, T1-weighted, and fat-suppressed T2-weighted sequences."
            },
            {
                "page_number": 2,
                "text": "APEX ADVANCED IMAGING CENTER - MRI Right Knee (Page 2)\nPatient: Sarah Jenkins | MRN: MV-89241\n\nFINDINGS:\n- MENISCI: The medial meniscus demonstrates increased linear signal on proton density and T2-weighted images within the posterior horn, terminating short of the superior and inferior articular surfaces (Grade II signal). No frank surface-breaking tear or displaced bucket-handle fragment. Lateral meniscus demonstrates normal contour and low signal throughout.\n- LIGAMENTS & TENDONS: Anterior and posterior cruciate ligaments are completely intact with preserved fibrillar architecture. Medial collateral ligament (MCL) and lateral collateral ligament complex are normal without sprain or tear. Quadriceps and patellar tendons are unremarkable.\n- CARTILAGE & BONE: Mild focal chondral thinning over the medial femoral condyle. Patellofemoral articular cartilage is preserved. Subchondral bone marrow displays no acute edema, contusion, or osteochondral lesion."
            },
            {
                "page_number": 3,
                "text": "APEX ADVANCED IMAGING CENTER - MRI Right Knee (Page 3)\nPatient: Sarah Jenkins | MRN: MV-89241\n\n- JOINT SPACE: Small joint effusion in the suprapatellar recess. Trace fluid in the gastrocnemius-semimembranosus bursa without defined Baker's cyst.\n\nIMPRESSION:\n1. Grade II degenerative signal alteration in the posterior horn of the medial meniscus, non-displaced and without frank articular tear.\n2. Mild tricompartmental osteoarthritis, most pronounced at the medial weight-bearing compartment.\n3. Mild physiologic joint effusion.\n\nRecommendation: Conservative rehabilitation program with physical therapy. Review symptoms if locked knee or worsening effusion occurs.\n\nRadiologist: Marcus Vance, MD (Board Certified Diagnostic Radiologist)\nDate: 2026-01-22"
            }
        ]
    },
    {
        "id": "doc-005",
        "patient_id": "p-sarah-jenkins-01",
        "file_name": "Internal_Medicine_Annual_Consultation_Jan2024.pdf",
        "original_file_name": "Consultation_Jan2024.pdf",
        "document_type": "Consultation Note",
        "document_date": "2024-01-12",
        "facility_name": "Beacon Primary Care Associates",
        "attending_physician": "Dr. Robert Chen, MD",
        "file_size_bytes": 340000,
        "page_count": 2,
        "language": "en",
        "processing_status": "processed",
        "ocr_applied": False,
        "ai_summary": "Comprehensive baseline preventive medicine consultation. Patient reported mild morning stiffness in right knee and intermittent fatigue. Blood pressure was documented at 138/86 mmHg (prehypertension). Baseline laboratory evaluation ordered. Nutritional counseling provided for borderline cholesterol.",
        "documented_facts": [
            "Chief Complaint: Annual physical exam, intermittent knee stiffness",
            "Blood Pressure: 138/86 mmHg (Pre-hypertensive range)",
            "Heart Rate: 70 bpm, regular",
            "Body Mass Index (BMI): 25.8 kg/m²",
            "Total Cholesterol: 224 mg/dL (Documented baseline from outside records)",
            "Assessment: Mild borderline hypertension, early degenerative joint symptoms, hypercholesterolemia",
            "Plan: Nutritional counseling, daily walking program, baseline laboratory evaluation"
        ],
        "ai_interpretations": [
            "Earliest documented presentation of cardiovascular risk factors (elevated blood pressure and baseline cholesterol).",
            "Represents foundational historical point before pharmacological treatment was initiated."
        ],
        "follow_up_instructions": "Return for annual wellness visit in 12 months or earlier if blood pressure elevates.",
        "pages": [
            {
                "page_number": 1,
                "text": "BEACON PRIMARY CARE ASSOCIATES\n55 Commonwealth Avenue, Boston, MA\nANNUAL PREVENTIVE WELLNESS VISIT\nDate: 2024-01-12 | Patient: Sarah Jenkins | Age: 45 | MRN: MV-89241\nPhysician: Dr. Robert Chen, MD\n\nSUBJECTIVE:\nPatient presents for routine preventive checkup. Reports feeling reasonably well overall. Notes occasional stiffness in right knee after long walks. Denies chest pain, shortness of breath, dizziness, or gastrointestinal complaints. Sleep is 6-7 hours nightly.\n\nOBJECTIVE:\nVital Signs: BP 138/86 mmHg, HR 70 regular, RR 14, Temp 98.6 F, Weight 156 lbs, Height 5'5\", BMI 25.8 kg/m².\nCardiovascular: Normal S1/S2, regular rate and rhythm, no murmurs, rubs, or gallops.\nRespiratory: Lungs clear to auscultation bilaterally.\nMusculoskeletal: Right knee with mild crepitus on passive flexion, no acute warmth or erythema. Full active range of motion."
            },
            {
                "page_number": 2,
                "text": "BEACON PRIMARY CARE ASSOCIATES - Page 2\nPatient: Sarah Jenkins | MRN: MV-89241 | Date: 2024-01-12\n\nASSESSMENT:\n1. Prehypertension (BP 138/86 mmHg).\n2. Dyslipidemia by history (Total Cholesterol was 224 mg/dL on outside clinic screening).\n3. Mild early right knee osteoarthritic symptoms.\n\nPLAN:\n1. Lifestyle management: 30 minutes daily aerobic walking, DASH dietary reduction of processed foods.\n2. Order baseline complete metabolic and lipid profile.\n3. Over-the-counter Glucosamine or topical NSAID for knee discomfort as needed.\n4. Follow-up in 12 months for annual wellness, or sooner if home BP exceeds 140/90.\n\nProvider Signature: Robert Chen, MD"
            }
        ]
    }
]

INITIAL_EVIDENCE = [
    {
        "id": "ev-001",
        "document_id": "doc-001",
        "document_name": "Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf",
        "page_number": 1,
        "extracted_finding": "Total Cholesterol was reported as 210 mg/dL (High flag).",
        "snippet_text": "Total Cholesterol: 210 mg/dL  [Ref: < 200 mg/dL]  *FLAG: HIGH*",
        "confidence_score": 0.99,
        "bounding_box": {"x1": 80, "y1": 220, "x2": 450, "y2": 240},
        "highlight_color": "#ef4444"
    },
    {
        "id": "ev-002",
        "document_id": "doc-001",
        "document_name": "Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf",
        "page_number": 1,
        "extracted_finding": "Fasting Blood Glucose was measured at 108 mg/dL (Elevated).",
        "snippet_text": "Glucose, Fasting: 108 mg/dL  [Ref: 70 - 99 mg/dL]  *FLAG: HIGH*",
        "confidence_score": 0.98,
        "bounding_box": {"x1": 80, "y1": 380, "x2": 480, "y2": 400},
        "highlight_color": "#f59e0b"
    },
    {
        "id": "ev-003",
        "document_id": "doc-001",
        "document_name": "Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf",
        "page_number": 2,
        "extracted_finding": "Hemoglobin documented at 13.6 g/dL within normal reference range.",
        "snippet_text": "Hemoglobin: 13.6 g/dL  [Ref: 12.0 - 15.5 g/dL]",
        "confidence_score": 0.99,
        "bounding_box": {"x1": 80, "y1": 290, "x2": 420, "y2": 310},
        "highlight_color": "#10b981"
    },
    {
        "id": "ev-004",
        "document_id": "doc-002",
        "document_name": "Cardiology_Inpatient_Discharge_Summary_Nov2025.pdf",
        "page_number": 1,
        "extracted_finding": "Emergency admission blood pressure was 168/102 mmHg with palpitations.",
        "snippet_text": "Initial vital signs in ED: Blood Pressure 168/102 mmHg, Heart Rate 94 bpm, Respiratory Rate 16/min, SpO2 98% on room air",
        "confidence_score": 0.99,
        "bounding_box": {"x1": 80, "y1": 260, "x2": 520, "y2": 290},
        "highlight_color": "#ef4444"
    },
    {
        "id": "ev-005",
        "document_id": "doc-002",
        "document_name": "Cardiology_Inpatient_Discharge_Summary_Nov2025.pdf",
        "page_number": 4,
        "extracted_finding": "Mandated cardiology follow-up date is 02 October 2026.",
        "snippet_text": "3. CLINICAL FOLLOW-UP: Return for review on 02 October 2026 at the St. Jude Cardiology Specialty Clinic with Dr. Elena Rostova.",
        "confidence_score": 0.99,
        "bounding_box": {"x1": 80, "y1": 310, "x2": 540, "y2": 340},
        "highlight_color": "#0ea5e9"
    },
    {
        "id": "ev-006",
        "document_id": "doc-003",
        "document_name": "Outpatient_Prescription_Cardiology_Mar2026.pdf",
        "page_number": 1,
        "extracted_finding": "Prescribed Atorvastatin Calcium 20 mg daily at bedtime for hyperlipidemia.",
        "snippet_text": "1. Rx: ATORVASTATIN CALCIUM 20 MG TABLET\n   Sig: Take 1 tablet by mouth daily at bedtime.\n   Indication: Hyperlipidemia / Atherosclerotic cardiovascular prophylaxis.",
        "confidence_score": 0.98,
        "bounding_box": {"x1": 80, "y1": 180, "x2": 500, "y2": 240},
        "highlight_color": "#0ea5e9"
    },
    {
        "id": "ev-007",
        "document_id": "doc-004",
        "document_name": "Right_Knee_MRI_Diagnostic_Report_Jan2026.pdf",
        "page_number": 3,
        "extracted_finding": "MRI diagnosed Grade II degenerative change of the medial meniscus posterior horn without frank tear.",
        "snippet_text": "1. Grade II degenerative signal alteration in the posterior horn of the medial meniscus, non-displaced and without frank articular tear.",
        "confidence_score": 0.97,
        "bounding_box": {"x1": 80, "y1": 140, "x2": 530, "y2": 180},
        "highlight_color": "#f59e0b"
    },
    {
        "id": "ev-008",
        "document_id": "doc-005",
        "document_name": "Internal_Medicine_Annual_Consultation_Jan2024.pdf",
        "page_number": 1,
        "extracted_finding": "Baseline prehypertension blood pressure was recorded at 138/86 mmHg in Jan 2024.",
        "snippet_text": "Vital Signs: BP 138/86 mmHg, HR 70 regular, RR 14, Temp 98.6 F, Weight 156 lbs, Height 5'5\", BMI 25.8 kg/m².",
        "confidence_score": 0.98,
        "bounding_box": {"x1": 80, "y1": 280, "x2": 510, "y2": 310},
        "highlight_color": "#6366f1"
    }
]

INITIAL_MEDICAL_EVENTS = [
    {
        "id": "evt-001",
        "date": "2024-01-12",
        "year": "2024",
        "month": "Jan",
        "title": "Annual Preventive Wellness Exam",
        "category": "consultation",
        "event_type": "consultation",
        "description": "Routine health checkup documenting prehypertension (138/86 mmHg) and early knee crepitus.",
        "severity": "normal",
        "document_id": "doc-005",
        "document_name": "Consultation_Jan2024.pdf",
        "page_number": 1,
        "evidence_id": "ev-008"
    },
    {
        "id": "evt-002",
        "date": "2024-01-15",
        "year": "2024",
        "month": "Jan",
        "title": "Baseline Fasting Lipid Screening",
        "category": "lab_test",
        "event_type": "lab_test",
        "description": "Total Cholesterol evaluated at 224 mg/dL. Primary care recommended dietary modifications.",
        "severity": "attention",
        "document_id": "doc-005",
        "document_name": "Consultation_Jan2024.pdf",
        "page_number": 2,
        "evidence_id": "ev-008"
    },
    {
        "id": "evt-003",
        "date": "2024-06-20",
        "year": "2024",
        "month": "Jun",
        "title": "Nutrition & DASH Protocol Check-in",
        "category": "consultation",
        "event_type": "consultation",
        "description": "Nurse practitioner telephone review of low-sodium nutritional plan and weight goals.",
        "severity": "normal",
        "document_id": "doc-005",
        "document_name": "Consultation_Jan2024.pdf",
        "page_number": 2,
        "evidence_id": "ev-008"
    },
    {
        "id": "evt-004",
        "date": "2024-11-04",
        "year": "2024",
        "month": "Nov",
        "title": "Interim Blood Pressure Evaluation",
        "category": "consultation",
        "event_type": "consultation",
        "description": "Office blood pressure check: 134/84 mmHg. Non-pharmacological lifestyle therapy continued.",
        "severity": "normal",
        "document_id": "doc-005",
        "document_name": "Consultation_Jan2024.pdf",
        "page_number": 2,
        "evidence_id": "ev-008"
    },
    {
        "id": "evt-005",
        "date": "2025-04-10",
        "year": "2025",
        "month": "Apr",
        "title": "Routine Wellness Blood Panel",
        "category": "lab_test",
        "event_type": "lab_test",
        "description": "Fasting glucose measured at 99 mg/dL. Total cholesterol was 218 mg/dL.",
        "severity": "attention",
        "document_id": "doc-001",
        "document_name": "Blood_Report_Sept2026.pdf",
        "page_number": 1,
        "evidence_id": "ev-001"
    },
    {
        "id": "evt-006",
        "date": "2025-11-16",
        "year": "2025",
        "month": "Nov",
        "title": "Emergency Hospital Admission: Hypertensive Urgency",
        "category": "hospitalization",
        "event_type": "discharge",
        "description": "Admitted to St. Jude Memorial with blood pressure 168/102 mmHg, severe occipital headache, and palpitations.",
        "severity": "critical",
        "document_id": "doc-002",
        "document_name": "Discharge_Summary_Nov2025.pdf",
        "page_number": 1,
        "evidence_id": "ev-004"
    },
    {
        "id": "evt-007",
        "date": "2025-11-17",
        "year": "2025",
        "month": "Nov",
        "title": "Diagnostic 12-Lead Electrocardiogram (ECG)",
        "category": "procedure",
        "event_type": "procedure",
        "description": "Normal sinus rhythm at 74 bpm. Serial Troponin-I tests negative (< 0.01 ng/mL). Acute ischemia excluded.",
        "severity": "normal",
        "document_id": "doc-002",
        "document_name": "Discharge_Summary_Nov2025.pdf",
        "page_number": 2,
        "evidence_id": "ev-004"
    },
    {
        "id": "evt-008",
        "date": "2025-11-18",
        "year": "2025",
        "month": "Nov",
        "title": "Hospital Discharge & Amlodipine Prescription",
        "category": "prescription",
        "event_type": "prescription",
        "description": "Patient stabilized on Amlodipine 5mg PO daily. Discharge blood pressure normalized to 126/80 mmHg.",
        "severity": "normal",
        "document_id": "doc-002",
        "document_name": "Discharge_Summary_Nov2025.pdf",
        "page_number": 3,
        "evidence_id": "ev-004"
    },
    {
        "id": "evt-009",
        "date": "2026-01-14",
        "year": "2026",
        "month": "Jan",
        "title": "Orthopedic Knee Examination",
        "category": "consultation",
        "event_type": "consultation",
        "description": "Complaints of worsening medial right knee pain during stair climbing. Knee MRI ordered.",
        "severity": "attention",
        "document_id": "doc-004",
        "document_name": "Knee_MRI_Jan2026.pdf",
        "page_number": 1,
        "evidence_id": "ev-007"
    },
    {
        "id": "evt-010",
        "date": "2026-01-22",
        "year": "2026",
        "month": "Jan",
        "title": "High-Resolution 3.0T MRI Right Knee",
        "category": "imaging",
        "event_type": "imaging",
        "description": "MRI confirmed Grade II degenerative medial meniscal tear without mechanical displacement and mild effusion.",
        "severity": "attention",
        "document_id": "doc-004",
        "document_name": "Knee_MRI_Jan2026.pdf",
        "page_number": 3,
        "evidence_id": "ev-007"
    },
    {
        "id": "evt-011",
        "date": "2026-02-05",
        "year": "2026",
        "month": "Feb",
        "title": "Physical Therapy Rehabilitation Initiation",
        "category": "procedure",
        "event_type": "procedure",
        "description": "Started twice-weekly closed kinetic chain quadriceps and hamstring strengthening therapy.",
        "severity": "normal",
        "document_id": "doc-004",
        "document_name": "Knee_MRI_Jan2026.pdf",
        "page_number": 3,
        "evidence_id": "ev-007"
    },
    {
        "id": "evt-012",
        "date": "2026-03-15",
        "year": "2026",
        "month": "Mar",
        "title": "Cardiology Follow-up & Atorvastatin Initiation",
        "category": "prescription",
        "event_type": "prescription",
        "description": "BP controlled at 124/78 mmHg. Started Atorvastatin 20mg nightly for elevated cardiovascular risk.",
        "severity": "normal",
        "document_id": "doc-003",
        "document_name": "Prescription_Mar2026.pdf",
        "page_number": 1,
        "evidence_id": "ev-006"
    },
    {
        "id": "evt-013",
        "date": "2026-05-18",
        "year": "2026",
        "month": "May",
        "title": "Physical Therapy Milestone Assessment",
        "category": "consultation",
        "event_type": "consultation",
        "description": "Reported 70% reduction in right knee pain. Knee extension strength improved to 5/5.",
        "severity": "normal",
        "document_id": "doc-004",
        "document_name": "Knee_MRI_Jan2026.pdf",
        "page_number": 3,
        "evidence_id": "ev-007"
    },
    {
        "id": "evt-014",
        "date": "2026-09-10",
        "year": "2026",
        "month": "Sep",
        "title": "Comprehensive Lipid & Metabolic Lab Panel",
        "category": "lab_test",
        "event_type": "lab_test",
        "description": "Total Cholesterol 210 mg/dL, LDL 134 mg/dL, Fasting Glucose 108 mg/dL. Renal & liver panels normal.",
        "severity": "attention",
        "document_id": "doc-001",
        "document_name": "Blood_Report_Sept2026.pdf",
        "page_number": 1,
        "evidence_id": "ev-001"
    },
    {
        "id": "evt-015",
        "date": "2026-10-02",
        "year": "2026",
        "month": "Oct",
        "title": "Scheduled Cardiology Outpatient Review",
        "category": "consultation",
        "event_type": "consultation",
        "description": "Upcoming specialist consultation with Dr. Elena Rostova to review lipid panel and BP control.",
        "severity": "normal",
        "document_id": "doc-002",
        "document_name": "Discharge_Summary_Nov2025.pdf",
        "page_number": 4,
        "evidence_id": "ev-005"
    }
]

# React Flow Event Relationships (Clinical Pathways)
INITIAL_EVENT_RELATIONSHIPS = [
    {
        "id": "rel-01",
        "source": "evt-001",
        "target": "evt-002",
        "type": "triggers",
        "label": "Orders Screening Labs",
        "confidence": 0.95
    },
    {
        "id": "rel-02",
        "source": "evt-006",
        "target": "evt-007",
        "type": "triggers",
        "label": "ED Workup & ECG",
        "confidence": 0.99
    },
    {
        "id": "rel-03",
        "source": "evt-007",
        "target": "evt-008",
        "type": "prescribes",
        "label": "Stabilization -> Discharge Rx",
        "confidence": 0.98
    },
    {
        "id": "rel-04",
        "source": "evt-009",
        "target": "evt-010",
        "type": "triggers",
        "label": "Orders 3.0T MRI",
        "confidence": 0.97
    },
    {
        "id": "rel-05",
        "source": "evt-010",
        "target": "evt-011",
        "type": "prescribes",
        "label": "Conservative Therapy",
        "confidence": 0.94
    },
    {
        "id": "rel-06",
        "source": "evt-008",
        "target": "evt-012",
        "type": "follows_up",
        "label": "4-Month Review & Statin Addition",
        "confidence": 0.96
    },
    {
        "id": "rel-07",
        "source": "evt-012",
        "target": "evt-014",
        "type": "triggers",
        "label": "6-Month Monitoring Lipid Panel",
        "confidence": 0.95
    },
    {
        "id": "rel-08",
        "source": "evt-014",
        "target": "evt-015",
        "type": "follows_up",
        "label": "Scheduled Review of Sept Results",
        "confidence": 0.99
    }
]

# Longitudinal Lab Values for Trend Charts (Recharts)
INITIAL_LAB_RESULTS = [
    # Total Cholesterol (mg/dL) [Ref: < 200]
    {"test_date": "2024-01-15", "parameter": "Total Cholesterol", "value": 224, "unit": "mg/dL", "ref_low": 0, "ref_high": 200, "flag": "high", "document_id": "doc-005", "document_name": "Consultation_Jan2024.pdf", "evidence_id": "ev-008"},
    {"test_date": "2024-08-20", "parameter": "Total Cholesterol", "value": 220, "unit": "mg/dL", "ref_low": 0, "ref_high": 200, "flag": "high", "document_id": "doc-005", "document_name": "Consultation_Jan2024.pdf", "evidence_id": "ev-008"},
    {"test_date": "2025-04-10", "parameter": "Total Cholesterol", "value": 218, "unit": "mg/dL", "ref_low": 0, "ref_high": 200, "flag": "high", "document_id": "doc-001", "document_name": "Blood_Report_Sept2026.pdf", "evidence_id": "ev-001"},
    {"test_date": "2025-11-17", "parameter": "Total Cholesterol", "value": 215, "unit": "mg/dL", "ref_low": 0, "ref_high": 200, "flag": "high", "document_id": "doc-002", "document_name": "Discharge_Summary_Nov2025.pdf", "evidence_id": "ev-004"},
    {"test_date": "2026-09-10", "parameter": "Total Cholesterol", "value": 210, "unit": "mg/dL", "ref_low": 0, "ref_high": 200, "flag": "high", "document_id": "doc-001", "document_name": "Blood_Report_Sept2026.pdf", "evidence_id": "ev-001"},

    # LDL Cholesterol (mg/dL) [Ref: < 100]
    {"test_date": "2024-01-15", "parameter": "LDL Cholesterol", "value": 145, "unit": "mg/dL", "ref_low": 0, "ref_high": 100, "flag": "high", "document_id": "doc-005", "document_name": "Consultation_Jan2024.pdf", "evidence_id": "ev-008"},
    {"test_date": "2024-08-20", "parameter": "LDL Cholesterol", "value": 142, "unit": "mg/dL", "ref_low": 0, "ref_high": 100, "flag": "high", "document_id": "doc-005", "document_name": "Consultation_Jan2024.pdf", "evidence_id": "ev-008"},
    {"test_date": "2025-04-10", "parameter": "LDL Cholesterol", "value": 139, "unit": "mg/dL", "ref_low": 0, "ref_high": 100, "flag": "high", "document_id": "doc-001", "document_name": "Blood_Report_Sept2026.pdf", "evidence_id": "ev-001"},
    {"test_date": "2026-09-10", "parameter": "LDL Cholesterol", "value": 134, "unit": "mg/dL", "ref_low": 0, "ref_high": 100, "flag": "high", "document_id": "doc-001", "document_name": "Blood_Report_Sept2026.pdf", "evidence_id": "ev-001"},

    # Fasting Blood Glucose (mg/dL) [Ref: 70 - 99]
    {"test_date": "2024-01-15", "parameter": "Fasting Blood Glucose", "value": 94, "unit": "mg/dL", "ref_low": 70, "ref_high": 99, "flag": "normal", "document_id": "doc-005", "document_name": "Consultation_Jan2024.pdf", "evidence_id": "ev-008"},
    {"test_date": "2024-08-20", "parameter": "Fasting Blood Glucose", "value": 96, "unit": "mg/dL", "ref_low": 70, "ref_high": 99, "flag": "normal", "document_id": "doc-005", "document_name": "Consultation_Jan2024.pdf", "evidence_id": "ev-008"},
    {"test_date": "2025-04-10", "parameter": "Fasting Blood Glucose", "value": 99, "unit": "mg/dL", "ref_low": 70, "ref_high": 99, "flag": "normal", "document_id": "doc-001", "document_name": "Blood_Report_Sept2026.pdf", "evidence_id": "ev-001"},
    {"test_date": "2025-11-17", "parameter": "Fasting Blood Glucose", "value": 102, "unit": "mg/dL", "ref_low": 70, "ref_high": 99, "flag": "high", "document_id": "doc-002", "document_name": "Discharge_Summary_Nov2025.pdf", "evidence_id": "ev-004"},
    {"test_date": "2026-09-10", "parameter": "Fasting Blood Glucose", "value": 108, "unit": "mg/dL", "ref_low": 70, "ref_high": 99, "flag": "high", "document_id": "doc-001", "document_name": "Blood_Report_Sept2026.pdf", "evidence_id": "ev-002"},

    # Systolic Blood Pressure (mmHg) [Ref: < 120]
    {"test_date": "2024-01-12", "parameter": "Systolic BP", "value": 138, "unit": "mmHg", "ref_low": 90, "ref_high": 120, "flag": "high", "document_id": "doc-005", "document_name": "Consultation_Jan2024.pdf", "evidence_id": "ev-008"},
    {"test_date": "2024-11-04", "parameter": "Systolic BP", "value": 134, "unit": "mmHg", "ref_low": 90, "ref_high": 120, "flag": "high", "document_id": "doc-005", "document_name": "Consultation_Jan2024.pdf", "evidence_id": "ev-008"},
    {"test_date": "2025-11-16", "parameter": "Systolic BP", "value": 168, "unit": "mmHg", "ref_low": 90, "ref_high": 120, "flag": "critical", "document_id": "doc-002", "document_name": "Discharge_Summary_Nov2025.pdf", "evidence_id": "ev-004"},
    {"test_date": "2025-11-18", "parameter": "Systolic BP", "value": 126, "unit": "mmHg", "ref_low": 90, "ref_high": 120, "flag": "normal", "document_id": "doc-002", "document_name": "Discharge_Summary_Nov2025.pdf", "evidence_id": "ev-004"},
    {"test_date": "2026-03-15", "parameter": "Systolic BP", "value": 124, "unit": "mmHg", "ref_low": 90, "ref_high": 120, "flag": "normal", "document_id": "doc-003", "document_name": "Prescription_Mar2026.pdf", "evidence_id": "ev-006"},

    # Hemoglobin (g/dL) [Ref: 12.0 - 15.5]
    {"test_date": "2024-01-15", "parameter": "Hemoglobin", "value": 13.8, "unit": "g/dL", "ref_low": 12.0, "ref_high": 15.5, "flag": "normal", "document_id": "doc-005", "document_name": "Consultation_Jan2024.pdf", "evidence_id": "ev-008"},
    {"test_date": "2025-11-17", "parameter": "Hemoglobin", "value": 13.4, "unit": "g/dL", "ref_low": 12.0, "ref_high": 15.5, "flag": "normal", "document_id": "doc-002", "document_name": "Discharge_Summary_Nov2025.pdf", "evidence_id": "ev-004"},
    {"test_date": "2026-09-10", "parameter": "Hemoglobin", "value": 13.6, "unit": "g/dL", "ref_low": 12.0, "ref_high": 15.5, "flag": "normal", "document_id": "doc-001", "document_name": "Blood_Report_Sept2026.pdf", "evidence_id": "ev-003"}
]

# Active & Historical Medications
INITIAL_MEDICATIONS = [
    {
        "id": "med-001",
        "name": "Amlodipine Besylate",
        "dosage": "5 mg",
        "frequency": "Once daily every morning",
        "route": "Oral",
        "start_date": "2025-11-18",
        "prescribing_doctor": "Dr. Elena Rostova, MD",
        "indication": "Essential Hypertension",
        "is_active": True,
        "document_name": "Discharge_Summary_Nov2025.pdf",
        "evidence_id": "ev-004"
    },
    {
        "id": "med-002",
        "name": "Atorvastatin Calcium",
        "dosage": "20 mg",
        "frequency": "Once daily at bedtime",
        "route": "Oral",
        "start_date": "2026-03-15",
        "prescribing_doctor": "Dr. Elena Rostova, MD",
        "indication": "Hyperlipidemia / Cardiovascular risk reduction",
        "is_active": True,
        "document_name": "Prescription_Mar2026.pdf",
        "evidence_id": "ev-006"
    },
    {
        "id": "med-003",
        "name": "Omega-3 Fatty Acids (Fish Oil)",
        "dosage": "1000 mg",
        "frequency": "Once daily with meal",
        "route": "Oral",
        "start_date": "2024-01-12",
        "prescribing_doctor": "Dr. Robert Chen, MD",
        "indication": "Triglyceride support / General vascular health",
        "is_active": True,
        "document_name": "Consultation_Jan2024.pdf",
        "evidence_id": "ev-008"
    }
]

# Reminders (Upcoming & Completed)
INITIAL_REMINDERS = [
    {
        "id": "rem-001",
        "title": "Cardiology Specialist Follow-up",
        "due_date": "2026-10-02",
        "category": "follow_up",
        "status": "upcoming",
        "facility": "St. Jude Cardiology Specialty Clinic",
        "doctor": "Dr. Elena Rostova, MD",
        "source_document": "Discharge_Summary_Nov2025.pdf",
        "source_page": 4,
        "evidence_id": "ev-005",
        "channels": {"in_app": True, "email": True, "sms": True},
        "remind_preferences": {"seven_day": True, "one_day": True, "due_date": True},
        "notes": "Bring home blood pressure log and September 2026 lipid panel report."
    },
    {
        "id": "rem-002",
        "title": "Repeat Fasting Lipid Panel & HbA1c",
        "due_date": "2026-11-15",
        "category": "lab_repeat",
        "status": "upcoming",
        "facility": "MetroHealth Diagnostic Labs",
        "doctor": "Dr. Robert Chen, MD",
        "source_document": "Blood_Report_Sept2026.pdf",
        "source_page": 2,
        "evidence_id": "ev-001",
        "channels": {"in_app": True, "email": True, "sms": False},
        "remind_preferences": {"seven_day": True, "one_day": True, "due_date": True},
        "notes": "12-hour fast required prior to morning blood draw."
    },
    {
        "id": "rem-003",
        "title": "Right Knee Physical Therapy Maintenance Review",
        "due_date": "2026-12-05",
        "category": "follow_up",
        "status": "upcoming",
        "facility": "Apex Sports Medicine & Rehabilitation",
        "doctor": "Dr. Marcus Vance, MD",
        "source_document": "Knee_MRI_Jan2026.pdf",
        "source_page": 3,
        "evidence_id": "ev-007",
        "channels": {"in_app": True, "email": False, "sms": False},
        "remind_preferences": {"seven_day": True, "one_day": True, "due_date": True},
        "notes": "Evaluate progress of closed kinetic chain quad exercises."
    },
    {
        "id": "rem-004",
        "title": "High-Resolution 3.0T Knee MRI Diagnostic",
        "due_date": "2026-01-22",
        "category": "imaging",
        "status": "completed",
        "completed_at": "2026-01-22T14:30:00Z",
        "facility": "Apex Advanced Imaging Center",
        "doctor": "Dr. Marcus Vance, MD",
        "source_document": "Knee_MRI_Jan2026.pdf",
        "source_page": 1,
        "evidence_id": "ev-007",
        "channels": {"in_app": True, "email": True, "sms": False},
        "notes": "Successfully executed. Diagnosed Grade II posterior horn degenerative change."
    }
]

# Notifications Feed
INITIAL_NOTIFICATIONS = [
    {
        "id": "notif-001",
        "title": "Cardiology Follow-up Due in 14 Days",
        "message": "Your review appointment with Dr. Elena Rostova is scheduled for October 02, 2026 at St. Jude Cardiology.",
        "type": "REMINDER",
        "priority": "high",
        "is_read": False,
        "link_route": "/reminders",
        "created_at": "2026-09-18T08:00:00Z"
    },
    {
        "id": "notif-002",
        "title": "New Document Processed: Blood Report Sept 2026",
        "message": "AI analysis completed for Comprehensive_Lipid_Metabolic_Panel_Sept2026.pdf. 8 lab parameters extracted.",
        "type": "DOCUMENT",
        "priority": "normal",
        "is_read": False,
        "link_route": "/documents/doc-001",
        "created_at": "2026-09-10T11:45:00Z"
    },
    {
        "id": "notif-003",
        "title": "Elevated Parameter Detected: Total Cholesterol",
        "message": "September 10 lab report reflects Total Cholesterol of 210 mg/dL. Added to Longitudinal Trends.",
        "type": "INFO",
        "priority": "normal",
        "is_read": True,
        "link_route": "/analytics",
        "created_at": "2026-09-10T12:00:00Z"
    },
    {
        "id": "notif-004",
        "title": "Timeline Synchronization Complete",
        "message": "32 medical events synthesized from 5 uploaded patient documents across 2024-2026.",
        "type": "SYSTEM",
        "priority": "low",
        "is_read": True,
        "link_route": "/timeline",
        "created_at": "2026-09-01T09:15:00Z"
    }
]

# Audit Logs
INITIAL_AUDIT_LOGS = [
    {
        "id": "aud-001",
        "timestamp": "2026-09-18T10:15:22Z",
        "user_id": "sarah.jenkins@example.com",
        "user_role": "patient",
        "action": "LOGIN",
        "resource_type": "AUTHENTICATION",
        "resource_id": "p-sarah-jenkins-01",
        "details": {"auth_method": "passwordless_otp", "ip": "192.168.1.45", "device": "Chrome Desktop"}
    },
    {
        "id": "aud-002",
        "timestamp": "2026-09-18T10:20:05Z",
        "user_id": "sarah.jenkins@example.com",
        "user_role": "patient",
        "action": "VIEW_EVIDENCE",
        "resource_type": "EVIDENCE",
        "resource_id": "ev-001",
        "details": {"document": "Blood_Report_Sept2026.pdf", "page": 1, "finding": "Total Cholesterol 210 mg/dL"}
    },
    {
        "id": "aud-003",
        "timestamp": "2026-09-18T10:22:18Z",
        "user_id": "sarah.jenkins@example.com",
        "user_role": "patient",
        "action": "CHAT_QUERY",
        "resource_type": "AI_CHAT",
        "resource_id": "session-102",
        "details": {"query": "What was my latest cholesterol result?", "citations_returned": 1}
    },
    {
        "id": "aud-004",
        "timestamp": "2026-09-17T16:40:00Z",
        "user_id": "dr.chen@beaconhealth.org",
        "user_role": "doctor",
        "action": "DOCTOR_PATIENT_ACCESS",
        "resource_type": "PATIENT_RECORD",
        "resource_id": "p-sarah-jenkins-01",
        "details": {"authorized_clinician": "Dr. Robert Chen, MD", "view": "Clinical Summary"}
    }
]
