"""
MEDVAULT AI - In-Memory State Store with Supabase Dual-Mode Support
Provides thread-safe access to patient clinical records, documents,
timeline events, evidence items, reminders, notifications, and audit logs.
"""

import copy
import threading
from datetime import datetime, timezone
from backend.data.seed_data import (
    INITIAL_PATIENT,
    INITIAL_DOCTOR,
    INITIAL_DOCUMENTS,
    INITIAL_EVIDENCE,
    INITIAL_MEDICAL_EVENTS,
    INITIAL_EVENT_RELATIONSHIPS,
    INITIAL_LAB_RESULTS,
    INITIAL_MEDICATIONS,
    INITIAL_REMINDERS,
    INITIAL_NOTIFICATIONS,
    INITIAL_AUDIT_LOGS
)

class DataStore:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(DataStore, cls).__new__(cls)
                cls._instance._init_data()
            return cls._instance

    def _init_data(self):
        self.patient = copy.deepcopy(INITIAL_PATIENT)
        self.doctor = copy.deepcopy(INITIAL_DOCTOR)
        self.documents = copy.deepcopy(INITIAL_DOCUMENTS)
        self.evidence = copy.deepcopy(INITIAL_EVIDENCE)
        self.medical_events = copy.deepcopy(INITIAL_MEDICAL_EVENTS)
        self.event_relationships = copy.deepcopy(INITIAL_EVENT_RELATIONSHIPS)
        self.lab_results = copy.deepcopy(INITIAL_LAB_RESULTS)
        self.medications = copy.deepcopy(INITIAL_MEDICATIONS)
        self.reminders = copy.deepcopy(INITIAL_REMINDERS)
        self.notifications = copy.deepcopy(INITIAL_NOTIFICATIONS)
        self.audit_logs = copy.deepcopy(INITIAL_AUDIT_LOGS)

    # ---------------- PATIENT & PROFILE ----------------
    def get_patient(self):
        return self.patient

    def update_patient(self, updates):
        for k, v in updates.items():
            if k in self.patient and k not in ("id", "mrn"):
                self.patient[k] = v
        self.log_audit("sarah.jenkins@example.com", "patient", "UPDATE_PROFILE", "PATIENT", self.patient["id"], updates)
        return self.patient

    def get_doctor(self):
        return self.doctor

    # ---------------- DOCUMENTS ----------------
    def get_documents(self, doc_type=None, search=None):
        docs = self.documents
        if doc_type and doc_type != 'all':
            docs = [d for d in docs if d.get("document_type", "").lower() == doc_type.lower()]
        if search:
            s = search.lower()
            docs = [d for d in docs if s in d.get("file_name", "").lower() 
                    or s in d.get("original_file_name", "").lower() 
                    or s in d.get("facility_name", "").lower()
                    or s in d.get("ai_summary", "").lower()]
        return docs

    def get_document_by_id(self, doc_id):
        for d in self.documents:
            if d["id"] == doc_id:
                return d
        return None

    def add_document(self, doc_data):
        self.documents.insert(0, doc_data)
        self.log_audit("sarah.jenkins@example.com", "patient", "UPLOAD_DOCUMENT", "DOCUMENT", doc_data["id"], {
            "file_name": doc_data["file_name"],
            "type": doc_data.get("document_type", "Unknown")
        })
        return doc_data

    def update_document(self, doc_id, updates):
        for d in self.documents:
            if d["id"] == doc_id:
                d.update(updates)
                return d
        return None

    # ---------------- EVIDENCE ----------------
    def get_evidence_by_id(self, ev_id):
        for e in self.evidence:
            if e["id"] == ev_id:
                # Attach document details for convenience
                doc = self.get_document_by_id(e["document_id"])
                ev_copy = copy.deepcopy(e)
                if doc:
                    ev_copy["document"] = doc
                return ev_copy
        return None

    def get_all_evidence(self):
        return self.evidence

    def add_evidence(self, ev_item):
        self.evidence.append(ev_item)
        return ev_item

    # ---------------- TIMELINE & EVENTS ----------------
    def get_events(self, category=None, year=None, search=None):
        events = sorted(self.medical_events, key=lambda x: x.get("date", ""), reverse=True)
        if category and category != 'all':
            events = [e for e in events if e.get("category", "").lower() == category.lower()]
        if year and year != 'all':
            events = [e for e in events if str(e.get("year", "")) == str(year)]
        if search:
            s = search.lower()
            events = [e for e in events if s in e.get("title", "").lower() 
                      or s in e.get("description", "").lower() 
                      or s in e.get("document_name", "").lower()]
        return events

    def get_event_by_id(self, event_id):
        for e in self.medical_events:
            if e["id"] == event_id:
                evt_copy = copy.deepcopy(e)
                if "evidence_id" in evt_copy and evt_copy["evidence_id"]:
                    evt_copy["evidence"] = self.get_evidence_by_id(evt_copy["evidence_id"])
                if "document_id" in evt_copy and evt_copy["document_id"]:
                    evt_copy["document"] = self.get_document_by_id(evt_copy["document_id"])
                return evt_copy
        return None

    def add_event(self, event_data):
        self.medical_events.append(event_data)
        return event_data

    def get_relationships(self):
        return self.event_relationships

    # ---------------- LAB RESULTS ----------------
    def get_lab_results(self, parameter=None):
        if parameter:
            return [l for l in self.lab_results if l.get("parameter", "").lower() == parameter.lower()]
        return self.lab_results

    def add_lab_result(self, lab_item):
        self.lab_results.append(lab_item)
        return lab_item

    # ---------------- MEDICATIONS ----------------
    def get_medications(self):
        return self.medications

    # ---------------- REMINDERS ----------------
    def get_reminders(self, status=None):
        if status and status != 'all':
            return [r for r in self.reminders if r.get("status", "").lower() == status.lower()]
        return self.reminders

    def add_reminder(self, reminder_data):
        self.reminders.insert(0, reminder_data)
        self.log_audit("system", "system", "CREATE_REMINDER", "REMINDER", reminder_data["id"], {
            "title": reminder_data.get("title"),
            "due_date": reminder_data.get("due_date")
        })
        # Also create a notification
        notif_id = f"notif-rem-{int(datetime.now().timestamp())}"
        self.add_notification({
            "id": notif_id,
            "title": f"Reminder Scheduled: {reminder_data.get('title')}",
            "message": f"Due on {reminder_data.get('due_date')}. Automated reminder set.",
            "type": "REMINDER",
            "priority": "normal",
            "is_read": False,
            "link_route": "/reminders",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        return reminder_data

    def update_reminder_status(self, rem_id, new_status):
        for r in self.reminders:
            if r["id"] == rem_id:
                r["status"] = new_status
                if new_status == "completed":
                    r["completed_at"] = datetime.now(timezone.utc).isoformat()
                return r
        return None

    # ---------------- NOTIFICATIONS ----------------
    def get_notifications(self):
        return self.notifications

    def add_notification(self, notif_data):
        self.notifications.insert(0, notif_data)
        return notif_data

    def mark_notification_read(self, notif_id):
        for n in self.notifications:
            if n["id"] == notif_id:
                n["is_read"] = True
                return n
        return None

    def mark_all_notifications_read(self):
        for n in self.notifications:
            n["is_read"] = True
        return self.notifications

    # ---------------- AUDIT LOGS ----------------
    def log_audit(self, user_id, user_role, action, resource_type, resource_id, details=None):
        entry = {
            "id": f"aud-{len(self.audit_logs) + 1:04d}",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "user_id": user_id,
            "user_role": user_role,
            "action": action,
            "resource_type": resource_type,
            "resource_id": resource_id,
            "details": details or {}
        }
        self.audit_logs.insert(0, entry)
        return entry

    def get_audit_logs(self, limit=50):
        return self.audit_logs[:limit]

store = DataStore()
