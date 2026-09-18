"""
MEDVAULT AI - Profile Routes
Retrieves and updates patient demographic and clinical profile information.
"""

from flask import Blueprint, request, jsonify
from backend.services.store import store

profile_bp = Blueprint("profile", __name__, url_prefix="/api/profile")

@profile_bp.route("", methods=["GET"])
def get_profile():
    patient = store.get_patient()
    return jsonify({
        "status": "success",
        "patient": patient
    })

@profile_bp.route("", methods=["PATCH"])
def update_profile():
    data = request.get_json() or {}
    updated = store.update_patient(data)
    return jsonify({
        "status": "success",
        "message": "Profile updated successfully",
        "patient": updated
    })
