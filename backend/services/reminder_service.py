"""
MEDVAULT AI - Reminder Engine
Handles reminder creation, status updates, automated detection ingestion,
and channel notification preferences.
"""

from datetime import datetime, timezone
import uuid
from backend.services.store import store

class ReminderService:

    @staticmethod
    def get_reminders(status=None):
        return store.get_reminders(status=status)

    @staticmethod
    def create_reminder(data):
        rem_id = f"rem-{uuid.uuid4().hex[:6]}"
        record = {
            "id": rem_id,
            "title": data.get("title", "Medical Follow-up"),
            "due_date": data.get("due_date", datetime.now().strftime("%Y-%m-%d")),
            "category": data.get("category", "follow_up"),
            "status": "upcoming",
            "facility": data.get("facility", "Primary Care Clinic"),
            "doctor": data.get("doctor", "Attending Physician"),
            "source_document": data.get("source_document", "Patient Record"),
            "source_page": data.get("source_page", 1),
            "evidence_id": data.get("evidence_id"),
            "channels": data.get("channels", {"in_app": True, "email": True, "sms": False}),
            "remind_preferences": data.get("remind_preferences", {"seven_day": True, "one_day": True, "due_date": True}),
            "notes": data.get("notes", "")
        }
        return store.add_reminder(record)

    @staticmethod
    def mark_status(reminder_id, status):
        return store.update_reminder_status(reminder_id, status)
