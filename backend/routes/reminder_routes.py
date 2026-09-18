"""
MEDVAULT AI - Reminder Routes
Lists upcoming/completed reminders, creates follow-up reminders, and toggles status.
"""

from flask import Blueprint, request, jsonify
from backend.services.reminder_service import ReminderService

reminder_bp = Blueprint("reminders", __name__, url_prefix="/api/reminders")

@reminder_bp.route("", methods=["GET"])
def get_reminders():
    status = request.args.get("status")
    reminders = ReminderService.get_reminders(status=status)
    return jsonify({
        "status": "success",
        "count": len(reminders),
        "reminders": reminders
    })

@reminder_bp.route("", methods=["POST"])
def create_reminder():
    data = request.get_json() or {}
    reminder = ReminderService.create_reminder(data)
    return jsonify({
        "status": "success",
        "message": "Reminder created successfully",
        "reminder": reminder
    }), 201

@reminder_bp.route("/<rem_id>", methods=["PATCH"])
def update_reminder_status(rem_id):
    data = request.get_json() or {}
    new_status = data.get("status", "completed")
    updated = ReminderService.mark_status(rem_id, new_status)
    if not updated:
        return jsonify({"status": "error", "message": "Reminder not found"}), 404
    
    return jsonify({
        "status": "success",
        "reminder": updated
    })
