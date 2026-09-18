"""
MEDVAULT AI - Timeline & Clinical Relationship Service
Builds chronological grouped timelines and formats graph nodes and edges
for the interactive React Flow visual graph.
"""

from backend.services.store import store

class TimelineService:

    @staticmethod
    def get_timeline(category=None, year=None, search=None):
        events = store.get_events(category=category, year=year, search=search)
        
        # Group by year for intuitive chronological navigation
        grouped_by_year = {}
        for ev in events:
            y = ev.get("year", "2026")
            if y not in grouped_by_year:
                grouped_by_year[y] = []
            grouped_by_year[y].append(ev)

        return {
            "total_events": len(events),
            "events": events,
            "grouped_by_year": grouped_by_year
        }

    @staticmethod
    def get_relationship_graph():
        """
        Builds React Flow compatible nodes and edges representing
        causal and chronological clinical relationships between events.
        """
        events = store.get_events()
        relationships = store.get_relationships()

        # Map colors and icons by category
        category_styles = {
            "lab_test": {"color": "#0ea5e9", "bg": "#e0f2fe", "border": "#38bdf8", "icon": "TestTube"},
            "prescription": {"color": "#8b5cf6", "bg": "#ede9fe", "border": "#a78bfa", "icon": "Pill"},
            "hospitalization": {"color": "#ef4444", "bg": "#fee2e2", "border": "#f87171", "icon": "Building2"},
            "imaging": {"color": "#f59e0b", "bg": "#fef3c7", "border": "#fbbf24", "icon": "Scan"},
            "consultation": {"color": "#10b981", "bg": "#d1fae5", "border": "#34d399", "icon": "Stethoscope"},
            "procedure": {"color": "#06b6d4", "bg": "#cffafe", "border": "#22d3ee", "icon": "Activity"}
        }

        nodes = []
        # Position nodes in an organized timeline flow layout
        x_start = 80
        y_start = 100
        x_spacing = 260
        y_spacing = 160

        # Select representative pathway events
        key_event_ids = [
            "evt-001", "evt-002", "evt-006", "evt-007", "evt-008",
            "evt-009", "evt-010", "evt-011", "evt-012", "evt-014", "evt-015"
        ]
        
        filtered_events = [e for e in events if e["id"] in key_event_ids]
        filtered_events.sort(key=lambda x: x.get("date", ""))

        cols = 3
        for idx, ev in enumerate(filtered_events):
            cat = ev.get("category", "consultation")
            style = category_styles.get(cat, category_styles["consultation"])
            col = idx % cols
            row = idx // cols

            nodes.append({
                "id": ev["id"],
                "type": "medicalNode",
                "position": {
                    "x": x_start + (col * x_spacing),
                    "y": y_start + (row * y_spacing)
                },
                "data": {
                    "id": ev["id"],
                    "title": ev["title"],
                    "date": ev["date"],
                    "category": cat,
                    "description": ev["description"][:90] + ("..." if len(ev["description"]) > 90 else ""),
                    "severity": ev.get("severity", "normal"),
                    "document_name": ev.get("document_name"),
                    "page_number": ev.get("page_number", 1),
                    "evidence_id": ev.get("evidence_id"),
                    "style": style
                }
            })

        edges = []
        for rel in relationships:
            edges.append({
                "id": rel["id"],
                "source": rel["source"],
                "target": rel["target"],
                "label": rel["label"],
                "animated": True,
                "style": {"stroke": "#64748b", "strokeWidth": 2},
                "labelStyle": {"fill": "#475569", "fontWeight": 600, "fontSize": 11}
            })

        return {
            "nodes": nodes,
            "edges": edges
        }
