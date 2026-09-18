import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend directory or parent
env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / '.env')

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "medvault-ai-super-secret-security-key-2026")
    PORT = int(os.getenv("PORT", 5000))
    DEBUG = os.getenv("FLASK_ENV", "development") == "development"
    
    # Supabase credentials (optional, dual-mode fallback enabled)
    SUPABASE_URL = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    
    # Gemini AI
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    
    # Notification credentials (demo mode fallback enabled)
    EMAIL_API_KEY = os.getenv("EMAIL_API_KEY", "")
    SMS_API_KEY = os.getenv("SMS_API_KEY", "")
    
    # Upload folder
    UPLOAD_FOLDER = Path(__file__).resolve().parent / "uploads"
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload
    ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)
