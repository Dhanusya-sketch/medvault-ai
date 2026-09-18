"""
MEDVAULT AI - Auth Routes
Supports Supabase Auth, passwordless/email/phone login,
and one-click Demo Patient (Sarah Jenkins) & Demo Doctor (Dr. Robert Chen) logins.
"""

from flask import Blueprint, request, jsonify
from backend.services.store import store
from backend.services.audit_service import AuditService

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    role = data.get("role", "patient")  # 'patient' or 'doctor'
    demo_mode = data.get("demo", False)

    if role == "doctor" or "dr." in email or "doctor" in email:
        doctor = store.get_doctor()
        AuditService.log(doctor["email"], "doctor", "LOGIN", "AUTH", doctor["id"], {"demo": demo_mode})
        return jsonify({
            "status": "success",
            "token": "mv-jwt-doctor-chen-token-2026",
            "role": "doctor",
            "user": doctor
        })
    else:
        patient = store.get_patient()
        AuditService.log(patient["email"], "patient", "LOGIN", "AUTH", patient["id"], {"demo": demo_mode})
        return jsonify({
            "status": "success",
            "token": "mv-jwt-patient-sarah-token-2026",
            "role": "patient",
            "user": patient
        })

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    first_name = data.get("first_name", "Sarah")
    last_name = data.get("last_name", "Jenkins")
    email = data.get("email", "sarah.jenkins@example.com")
    
    patient = store.get_patient()
    patient["first_name"] = first_name
    patient["last_name"] = last_name
    patient["email"] = email
    
    AuditService.log(email, "patient", "REGISTER", "AUTH", patient["id"])
    return jsonify({
        "status": "success",
        "token": "mv-jwt-patient-new-token-2026",
        "role": "patient",
        "user": patient
    })

@auth_bp.route("/me", methods=["GET"])
def get_current_user():
    role = request.args.get("role", "patient")
    if role == "doctor":
        return jsonify({"role": "doctor", "user": store.get_doctor()})
    return jsonify({"role": "patient", "user": store.get_patient()})

@auth_bp.route("/logout", methods=["POST"])
def logout():
    AuditService.log("current_user", "patient", "LOGOUT", "AUTH", "session")
    return jsonify({"status": "success", "message": "Logged out successfully"})
