"""
MEDVAULT AI - Analytics Routes
Provides longitudinal laboratory and vital parameter trend series and document statistics.
"""

from flask import Blueprint, jsonify
from backend.services.analytics_service import AnalyticsService

analytics_bp = Blueprint("analytics", __name__, url_prefix="/api/analytics")

@analytics_bp.route("", methods=["GET"])
def get_analytics():
    data = AnalyticsService.get_analytics_summary()
    return jsonify({
        "status": "success",
        "data": data
    })
