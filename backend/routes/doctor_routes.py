"""
MEDVAULT AI - Doctor Portal Routes
Clinician-authorized dashboard, patient list, and clinical record deep dive.
"""

from flask import Blueprint, jsonify
from backend.services.store import store
from backend.services.audit_service import AuditService

doctor_bp = Blueprint("doctor", __name__, url_prefix="/api/doctor")

@doctor_bp.route("/overview", methods=["GET"])
def get_doctor_overview():
    doctor = store.get_doctor()
    patient = store.get_patient()
    docs = store.get_documents()
    reminders = store.get_reminders(status="upcoming")

    return jsonify({
        "status": "success",
        "doctor": doctor,
        "metrics": {
            "total_assigned_patients": 18,
            "active_review_cases": 4,
            "pending_follow_ups": len(reminders),
            "critical_flags_count": 1
        },
        "recent_patient": {
            "id": patient["id"],
            "name": f"{patient['first_name']} {patient['last_name']}",
            "mrn": patient["mrn"],
            "age": patient["age"],
            "gender": patient["gender"],
            "chronic_conditions": [c["condition"] for c in patient["chronic_conditions"]],
            "latest_document": docs[0]["file_name"] if docs else "None",
            "latest_document_date": docs[0]["document_date"] if docs else "N/A"
        }
    })

@doctor_bp.route("/patients", methods=["GET"])
def get_authorized_patients():
    patient = store.get_patient()
    docs = store.get_documents()

    # Pre-configured authorized patient directory
    patients_list = [
        {
            "id": patient["id"],
            "name": f"{patient['first_name']} {patient['last_name']}",
            "mrn": patient["mrn"],
            "age": patient["age"],
            "gender": patient["gender"],
            "blood_group": patient["blood_group"],
            "primary_diagnosis": "Accelerated Hypertension & Dyslipidemia",
            "last_visit": "2026-09-10",
            "document_count": len(docs),
            "status": "Stable / Review Due Soon",
            "risk_tier": "Moderate"
        },
        {
            "id": "p-arthur-pendleton-02",
            "name": "Arthur Pendleton",
            "mrn": "MV-44109",
            "age": 62,
            "gender": "Male",
            "blood_group": "O+",
            "primary_diagnosis": "Type 2 Diabetes Mellitus with Neuropathy",
            "last_visit": "2026-08-28",
            "document_count": 8,
            "status": "Stable",
            "risk_tier": "Moderate"
        },
        {
            "id": "p-maria-gonzalez-03",
            "name": "Maria Gonzalez",
            "mrn": "MV-90112",
            "age": 39,
            "gender": "Female",
            "blood_group": "B+",
            "primary_diagnosis": "Post-Op ACL Reconstruction Rehabilitation",
            "last_visit": "2026-09-02",
            "document_count": 4,
            "status": "Rehabilitation Phase II",
            "risk_tier": "Low"
        }
    ]

    return jsonify({
        "status": "success",
        "count": len(patients_list),
        "patients": patients_list
    })

@doctor_bp.route("/patients/<patient_id>", methods=["GET"])
def get_patient_details(patient_id):
    patient = store.get_patient()
    docs = store.get_documents()
    events = store.get_events()
    labs = store.get_lab_results()
    meds = store.get_medications()
    reminders = store.get_reminders()

    AuditService.log(
        user_id="dr.chen@beaconhealth.org",
        user_role="doctor",
        action="DOCTOR_PATIENT_ACCESS",
        resource_type="PATIENT_RECORD",
        resource_id=patient_id,
        details={"view": "Full Clinical Dossier"}
    )

    return jsonify({
        "status": "success",
        "patient": patient,
        "clinical_summary": {
            "attending_physician": "Dr. Robert Chen, MD",
            "chief_conditions": patient["chronic_conditions"],
            "recent_vital_bp": "124/78 mmHg (Normalized)",
            "recent_lipid": "Total Cholesterol: 210 mg/dL",
            "adherence_score": "94%",
            "clinical_notes": "Patient adheres well to daily Amlodipine 5mg and Atorvastatin 20mg. Follow-up consultation scheduled with Dr. Rostova on 02 Oct 2026."
        },
        "documents": docs,
        "recent_events": events[:6],
        "active_medications": meds,
        "upcoming_reminders": [r for r in reminders if r["status"] == "upcoming"]
    })
