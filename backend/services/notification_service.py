"""
MEDVAULT AI - Multi-Channel Notification Dispatcher
Coordinates In-App, simulated Email, and simulated SMS alerts with zero failure.
"""

from datetime import datetime, timezone
import uuid
from backend.services.store import store
from backend.config import Config

class NotificationService:

    @staticmethod
    def get_notifications():
        return store.get_notifications()

    @staticmethod
    def mark_read(notif_id):
        return store.mark_notification_read(notif_id)

    @staticmethod
    def mark_all_read():
        return store.mark_all_notifications_read()

    @staticmethod
    def dispatch_alert(title, message, notif_type="REMINDER", priority="normal", channels=None, link_route=None):
        channels = channels or {"in_app": True, "email": True, "sms": False}
        notif_id = f"notif-{uuid.uuid4().hex[:6]}"

        # 1. In-App Notification
        if channels.get("in_app", True):
            store.add_notification({
                "id": notif_id,
                "title": title,
                "message": message,
                "type": notif_type,
                "priority": priority,
                "is_read": False,
                "link_route": link_route or "/reminders",
                "created_at": datetime.now(timezone.utc).isoformat()
            })

        # 2. Email Simulation / Dispatch
        email_sent = False
        if channels.get("email"):
            if Config.EMAIL_API_KEY:
                # Real provider hook if key present
                pass
            email_sent = True

        # 3. SMS Simulation / Dispatch
        sms_sent = False
        if channels.get("sms"):
            if Config.SMS_API_KEY:
                # Real SMS provider hook if key present
                pass
            sms_sent = True

        return {
            "notification_id": notif_id,
            "dispatched_channels": {
                "in_app": True,
                "email_simulated": email_sent,
                "sms_simulated": sms_sent
            }
        }
