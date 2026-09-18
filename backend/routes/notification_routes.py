"""
MEDVAULT AI - Notification Routes
Retrieves notification feeds and marks items as read.
"""

from flask import Blueprint, jsonify
from backend.services.notification_service import NotificationService

notification_bp = Blueprint("notifications", __name__, url_prefix="/api/notifications")

@notification_bp.route("", methods=["GET"])
def get_notifications():
    notifications = NotificationService.get_notifications()
    unread_count = sum(1 for n in notifications if not n.get("is_read"))
    return jsonify({
        "status": "success",
        "unread_count": unread_count,
        "notifications": notifications
    })

@notification_bp.route("/<notif_id>/read", methods=["PATCH"])
def mark_read(notif_id):
    updated = NotificationService.mark_read(notif_id)
    if not updated:
        return jsonify({"status": "error", "message": "Notification not found"}), 404
    return jsonify({
        "status": "success",
        "notification": updated
    })

@notification_bp.route("/read-all", methods=["POST"])
def mark_all_read():
    all_notifs = NotificationService.mark_all_read()
    return jsonify({
        "status": "success",
        "notifications": all_notifs
    })
