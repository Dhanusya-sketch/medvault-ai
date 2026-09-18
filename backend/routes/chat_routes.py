"""
MEDVAULT AI - AI Chatbot Routes
Strictly grounded medical record intelligence assistant with multilingual support and citations.
"""

from flask import Blueprint, request, jsonify
from backend.services.ai_service import AIService
from backend.services.store import store
from backend.services.audit_service import AuditService

chat_bp = Blueprint("chat", __name__, url_prefix="/api/chat")

@chat_bp.route("", methods=["POST"])
def chat():
    data = request.get_json() or {}
    query = data.get("query", "").strip()
    language = data.get("language", "en")  # 'en', 'ta', 'hi'

    if not query:
        return jsonify({"status": "error", "message": "Query cannot be empty"}), 400

    patient = store.get_patient()
    documents = store.get_documents()
    evidence = store.get_all_evidence()

    result = AIService.answer_chat_query(query, patient, documents, evidence, language=language)

    AuditService.log(
        user_id=patient.get("email", "sarah.jenkins@example.com"),
        user_role="patient",
        action="CHAT_QUERY",
        resource_type="AI_CHAT",
        resource_id=f"query-{len(query)}",
        details={"query": query, "language": language, "citations": len(result.get("citations", []))}
    )

    return jsonify({
        "status": "success",
        "query": query,
        "language": language,
        "answer": result["answer"],
        "citations": result["citations"],
        "disclaimer": result["disclaimer"]
    })
