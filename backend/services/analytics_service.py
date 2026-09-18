"""
MEDVAULT AI - Longitudinal Analytics Service
Calculates document distribution metrics and structures time-series lab trends
for Recharts visualizations with evidence linking.
"""

from collections import Counter
from backend.services.store import store

class AnalyticsService:

    @staticmethod
    def get_analytics_summary():
        docs = store.get_documents()
        events = store.get_events()
        labs = store.get_lab_results()
        reminders = store.get_reminders(status="upcoming")

        # 1. Document Type Distribution
        type_counts = Counter([d.get("document_type", "Other") for d in docs])
        distribution_colors = {
            "Lab Report": "#0ea5e9",
            "Discharge Summary": "#ef4444",
            "Prescription": "#8b5cf6",
            "Imaging Report": "#f59e0b",
            "Consultation Note": "#10b981",
            "Other": "#64748b"
        }
        document_distribution = [
            {"name": k, "value": v, "color": distribution_colors.get(k, "#64748b")}
            for k, v in type_counts.items()
        ]

        # 2. Documents Over Time (By Year)
        year_counts = Counter([d.get("document_date", "2026")[:4] for d in docs])
        documents_by_year = [
            {"year": str(y), "count": count}
            for y, count in sorted(year_counts.items())
        ]

        # 3. Longitudinal Medical Parameter Trends
        # Group lab results by parameter
        parameters = ["Total Cholesterol", "LDL Cholesterol", "Fasting Blood Glucose", "Systolic BP", "Hemoglobin"]
        parameter_trends = {}

        for p in parameters:
            matched = [l for l in labs if l.get("parameter", "").lower() == p.lower()]
            matched.sort(key=lambda x: x.get("test_date", ""))
            parameter_trends[p] = matched

        return {
            "overview": {
                "total_documents": len(docs),
                "total_medical_events": len(events),
                "upcoming_reminders": len(reminders),
                "active_medications": len(store.get_medications()),
                "next_follow_up": reminders[0]["due_date"] if reminders else "None scheduled",
                "next_follow_up_title": reminders[0]["title"] if reminders else "All caught up"
            },
            "document_distribution": document_distribution,
            "documents_by_year": documents_by_year,
            "parameter_trends": parameter_trends
        }
