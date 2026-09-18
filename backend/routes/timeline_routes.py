"""
MEDVAULT AI - Timeline Routes
Retrieves chronological patient events and React Flow relationship graph data.
"""

from flask import Blueprint, request, jsonify
from backend.services.timeline_service import TimelineService
from backend.services.store import store
from backend.services.audit_service import AuditService

timeline_bp = Blueprint("timeline", __name__, url_prefix="/api/timeline")

@timeline_bp.route("", methods=["GET"])
def get_timeline():
    category = request.args.get("category")
    year = request.args.get("year")
    search = request.args.get("search")
    data = TimelineService.get_timeline(category=category, year=year, search=search)
    return jsonify({
        "status": "success",
        "data": data
    })

@timeline_bp.route("/<event_id>", methods=["GET"])
def get_event_details(event_id):
    evt = store.get_event_by_id(event_id)
    if not evt:
        return jsonify({"status": "error", "message": "Event not found"}), 404
    
    AuditService.log("current_user", "patient", "VIEW_TIMELINE_EVENT", "EVENT", event_id)
    return jsonify({
        "status": "success",
        "event": evt
    })

@timeline_bp.route("/graph", methods=["GET"])
def get_relationship_graph():
    graph_data = TimelineService.get_relationship_graph()
    return jsonify({
        "status": "success",
        "graph": graph_data
    })
