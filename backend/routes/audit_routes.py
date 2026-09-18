"""
MEDVAULT AI - Audit Routes
Provides access to chronological security and HIPAA compliance logs.
"""

from flask import Blueprint, jsonify
from backend.services.audit_service import AuditService

audit_bp = Blueprint("audit", __name__, url_prefix="/api/audit-logs")

@audit_bp.route("", methods=["GET"])
def get_audit_logs():
    logs = AuditService.get_logs(limit=50)
    return jsonify({
        "status": "success",
        "count": len(logs),
        "logs": logs
    })
