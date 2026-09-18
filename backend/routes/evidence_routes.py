"""
MEDVAULT AI - Evidence Routes
Provides verifiable original document text, page reference, and AI interpretation links.
"""

from flask import Blueprint, request, jsonify
from backend.services.store import store
from backend.services.audit_service import AuditService

evidence_bp = Blueprint("evidence", __name__, url_prefix="/api/evidence")

@evidence_bp.route("", methods=["GET"])
def get_all_evidence():
    evidence_list = store.get_all_evidence()
    return jsonify({
        "status": "success",
        "count": len(evidence_list),
        "evidence": evidence_list
    })

@evidence_bp.route("/<evidence_id>", methods=["GET"])
def get_evidence(evidence_id):
    ev = store.get_evidence_by_id(evidence_id)
    if not ev:
        return jsonify({"status": "error", "message": "Evidence not found"}), 404

    AuditService.log("current_user", "patient", "VIEW_EVIDENCE", "EVIDENCE", evidence_id, {
        "finding": ev.get("extracted_finding")
    })
    return jsonify({
        "status": "success",
        "evidence": ev
    })
