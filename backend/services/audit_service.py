"""
MEDVAULT AI - HIPAA Audit Service
Tracks all access, mutation, AI analysis, and evidence lookups.
"""

from backend.services.store import store

class AuditService:

    @staticmethod
    def log(user_id, user_role, action, resource_type, resource_id, details=None):
        return store.log_audit(user_id, user_role, action, resource_type, resource_id, details)

    @staticmethod
    def get_logs(limit=50):
        return store.get_audit_logs(limit)
