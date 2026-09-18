"""
MEDVAULT AI - Main Flask Application Entrypoint
Medical Document Intelligence & Patient Timeline REST API
Serves both REST APIs and the built React frontend SPA.
"""

import os
import sys
from pathlib import Path

# Add project root to sys.path so imports like `backend.xxx` work cleanly
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from backend.config import Config

# Import Route Blueprints
from backend.routes.auth_routes import auth_bp
from backend.routes.document_routes import document_bp
from backend.routes.timeline_routes import timeline_bp
from backend.routes.evidence_routes import evidence_bp
from backend.routes.analytics_routes import analytics_bp
from backend.routes.chat_routes import chat_bp
from backend.routes.reminder_routes import reminder_bp
from backend.routes.notification_routes import notification_bp
from backend.routes.profile_routes import profile_bp
from backend.routes.doctor_routes import doctor_bp
from backend.routes.audit_routes import audit_bp

def create_app():
    dist_folder = Path(__file__).resolve().parent.parent / "frontend" / "dist"
    app = Flask(__name__, static_folder=str(dist_folder) if dist_folder.exists() else None)
    app.config.from_object(Config)

    # Enable CORS for frontend development
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(document_bp)
    app.register_blueprint(timeline_bp)
    app.register_blueprint(evidence_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(reminder_bp)
    app.register_blueprint(notification_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(doctor_bp)
    app.register_blueprint(audit_bp)

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "MedVault AI Backend",
            "version": "1.0.0",
            "gemini_active": bool(Config.GEMINI_API_KEY),
            "supabase_configured": bool(Config.SUPABASE_URL),
            "demo_mode": True
        })

    # Serve Built React Frontend SPA (if built)
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_frontend(path):
        if path.startswith("api"):
            return jsonify({"status": "error", "message": "API endpoint not found"}), 404

        dist_path = Path(__file__).resolve().parent.parent / "frontend" / "dist"
        if dist_path.exists():
            file_candidate = dist_path / path
            if file_candidate.is_file():
                return send_from_directory(dist_path, path)
            index_file = dist_path / "index.html"
            if index_file.exists():
                return send_from_directory(dist_path, "index.html")

        # Fallback informative splash if frontend is running via Vite on port 5173
        return jsonify({
            "platform": "MEDVAULT AI - Medical Document Intelligence & Patient Timeline",
            "status": "API Server Running on Port 5000",
            "frontend_dev_url": "http://localhost:5173",
            "health_check": "/api/health",
            "instructions": "To view the React UI, run 'npm run dev' in the frontend folder (http://localhost:5173), or run 'npm run build' to bundle it into Flask!"
        })

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"status": "error", "message": "Internal server error occurred"}), 500

    return app

app = create_app()

if __name__ == "__main__":
    print(f"[*] MedVault AI API Server initialized on port {Config.PORT}")
    print(f"[*] Health check: http://localhost:{Config.PORT}/api/health")
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)
