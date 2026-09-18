"""
MEDVAULT AI - Document Routes
Upload, listing, inspection, and pipeline triggering.
"""

import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from backend.config import Config
from backend.services.store import store
from backend.services.document_service import DocumentService
from backend.services.audit_service import AuditService

document_bp = Blueprint("documents", __name__, url_prefix="/api/documents")

@document_bp.route("", methods=["GET"])
def get_documents():
    doc_type = request.args.get("type")
    search = request.args.get("search")
    docs = store.get_documents(doc_type=doc_type, search=search)
    return jsonify({
        "status": "success",
        "count": len(docs),
        "documents": docs
    })

@document_bp.route("/<doc_id>", methods=["GET"])
def get_document(doc_id):
    doc = store.get_document_by_id(doc_id)
    if not doc:
        return jsonify({"status": "error", "message": "Document not found"}), 404
    
    # Attach associated evidence
    all_evidence = store.get_all_evidence()
    doc_evidence = [e for e in all_evidence if e["document_id"] == doc_id]
    doc_copy = dict(doc)
    doc_copy["evidence"] = doc_evidence

    AuditService.log("current_user", "patient", "VIEW_DOCUMENT", "DOCUMENT", doc_id, {"title": doc["file_name"]})
    return jsonify({
        "status": "success",
        "document": doc_copy
    })

@document_bp.route("/upload", methods=["POST"])
def upload_document():
    if "file" not in request.files:
        return jsonify({"status": "error", "message": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"status": "error", "message": "No file selected"}), 400

    filename = secure_filename(file.filename)
    if not filename:
        filename = "medical_record.pdf"

    saved_path = Config.UPLOAD_FOLDER / filename
    file.save(str(saved_path))

    # Process through document pipeline
    doc = DocumentService.process_document(str(saved_path), filename)
    return jsonify({
        "status": "success",
        "message": "Document uploaded and processed successfully",
        "document": doc
    }), 201

@document_bp.route("/<doc_id>/process", methods=["POST"])
def process_existing_document(doc_id):
    doc = store.get_document_by_id(doc_id)
    if not doc:
        return jsonify({"status": "error", "message": "Document not found"}), 404
    
    store.update_document(doc_id, {"processing_status": "processed"})
    return jsonify({
        "status": "success",
        "message": "Processing finished",
        "document": store.get_document_by_id(doc_id)
    })
