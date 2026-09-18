# MEDVAULT AI 🩺
### Medical Document Intelligence & Chronological Patient Timeline
*A Next-Generation Clinical Record Intelligence Operating System*

---

## 🌟 Executive Summary
A patient's medical history is scattered across disparate paper records, hospital discharge summaries, outpatient prescriptions, imaging scans, and digital laboratory PDFs. **MedVault AI** bridges this fragmentation through an intelligent, verifiable record intelligence platform.

MedVault AI:
1. Ingests medical records (PDFs, JPGs, PNGs) page-by-page.
2. Extracts machine-readable text and applies OCR to scanned layers.
3. Leverages **Google Gemini 2.5 Flash** to extract typed clinical entities.
4. Distinguishes strictly between **Documented Clinical Facts** and **AI Interpretation**.
5. Anchors every clinical finding to **Verifiable Document Coordinates & Page Snippets**.
6. Synthesizes a **Chronological Patient Timeline** and **React Flow Clinical Pathway Graph**.
7. Detects follow-up deadlines and auto-schedules multi-channel reminders (In-App, Email, SMS).
8. Powers a grounded, multilingual **AI Clinical Chatbot** (English, Tamil, Hindi).
9. Enforces patient data isolation through Supabase Row-Level Security (RLS) and HIPAA audit logging.

> **Medical Safety Notice:** MedVault AI is an information and record-intelligence assistant. It does **not** diagnose conditions, recommend treatments, or replace qualified healthcare professionals.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend UI** | React 18, Vite, Tailwind CSS, Lucide React, Framer Motion, Recharts, React Flow (`@xyflow/react`), React Router v6 |
| **Backend REST API** | Python 3.10+, Flask, Flask-CORS, APScheduler |
| **Clinical Intelligence** | Google Gemini API (`gemini-2.5-flash`), Deterministic Clinical Parsing Engine |
| **Document Processing** | PyMuPDF (`fitz`), Tesseract OCR, Pillow |
| **Database & Auth** | Supabase PostgreSQL, Supabase Auth, Row-Level Security (RLS), Supabase Storage |
| **Multi-Channel Dispatch** | In-App Alerts, Email Provider Hook, SMS Provider Hook (with simulated Demo mode) |

---

## 📂 Project Structure
```
medvault-ai/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── context/
│       │   ├── AuthContext.jsx          # Supabase + Demo Auth (Sarah Jenkins / Dr. Chen)
│       │   ├── LanguageContext.jsx      # English, Tamil (தமிழ்), Hindi (हिन्दी)
│       │   └── NotificationContext.jsx  # Notification counter & toast alerts
│       ├── layouts/
│       │   ├── AppLayout.jsx            # Persistent authenticated shell (Sidebar, TopNav)
│       │   └── AuthLayout.jsx           # Split-screen branded login/register layout
│       ├── components/
│       │   ├── common/
│       │   │   ├── TopNav.jsx           # Bell dropdown, language picker, demo switcher
│       │   │   ├── Sidebar.jsx          # Responsive collapsible drawer
│       │   │   ├── MedicalDisclaimer.jsx# Persistent medical disclaimer
│       │   │   └── EvidenceBadge.jsx    # Clickable link to /evidence/:id
│       │   └── timeline/
│       │       └── RelationshipGraph.jsx# React Flow interactive causal graph
│       ├── pages/
│       │   ├── Login.jsx                # One-click demo evaluator logins
│       │   ├── Register.jsx             # Patient sign-up
│       │   ├── Dashboard.jsx            # 4 Quick stats, AI overview, recent records
│       │   ├── Documents.jsx            # Filterable document directory
│       │   ├── DocumentUpload.jsx       # Drag & drop upload zone with sample presets
│       │   ├── DocumentProcessing.jsx   # 6-step animated pipeline
│       │   ├── DocumentDetails.jsx      # Facts vs AI Interpretation, Labs, Meds
│       │   ├── Timeline.jsx             # Chronological timeline & React Flow graph
│       │   ├── TimelineEventDetails.jsx # Detailed single event view
│       │   ├── EvidenceViewer.jsx       # Side-by-side original text vs AI finding
│       │   ├── Analytics.jsx            # Recharts trends for Cholesterol, Glucose, BP
│       │   ├── AIChat.jsx               # Grounded multilingual QA with citations
│       │   ├── Reminders.jsx            # Upcoming, completed, channel toggles
│       │   ├── Notifications.jsx        # Notification center with read/unread
│       │   ├── Profile.jsx              # Demographics, allergies, chronic conditions
│       │   ├── Settings.jsx             # Channels, reminder offsets, audit trail
│       │   ├── DoctorDashboard.jsx      # Clinician overview & caseload metrics
│       │   ├── DoctorPatientList.jsx    # Authorized patient directory
│       │   └── DoctorPatientView.jsx    # Doctor's view of patient records
│       └── services/
│           └── api.js                   # API client with automatic demo fallback
│
├── backend/
│   ├── app.py                           # Flask server entrypoint
│   ├── config.py                        # Configuration and environment variables
│   ├── requirements.txt                 # Backend dependencies
│   ├── data/
│   │   └── seed_data.py                 # Realistic clinical history (Sarah Jenkins, 48F)
│   ├── routes/
│   │   ├── auth_routes.py               # Authentication endpoints
│   │   ├── document_routes.py           # Upload, list, details, re-process
│   │   ├── timeline_routes.py           # Events & relationship graph
│   │   ├── evidence_routes.py           # Verifiable snippet lookup
│   │   ├── analytics_routes.py          # Lab parameter trajectories
│   │   ├── chat_routes.py               # Multilingual grounded AI chat
│   │   ├── reminder_routes.py           # Reminders & deadline detection
│   │   ├── notification_routes.py       # Notification feed & read toggles
│   │   ├── profile_routes.py            # Patient demographics
│   │   ├── doctor_routes.py             # Doctor-authorized patient review
│   │   └── audit_routes.py              # HIPAA audit logging
│   └── services/
│       ├── store.py                     # Thread-safe in-memory/Supabase data layer
│       ├── ai_service.py                # Gemini API integration + clinical fallback
│       ├── document_service.py          # PyMuPDF parser & pipeline coordinator
│       ├── ocr_service.py               # OCR engine for scanned files
│       ├── timeline_service.py          # Event grouping & React Flow graph layout
│       ├── analytics_service.py         # Time-series lab aggregation
│       ├── reminder_service.py          # Automated deadline detection
│       ├── notification_service.py      # Multi-channel alert dispatcher
│       └── audit_service.py             # Structured audit logger
│
├── database/
│   ├── schema.sql                       # PostgreSQL schema with RLS & indexes
│   └── seed.sql                         # SQL seed for Supabase SQL Editor
├── .env.example                         # Environment configuration template
└── README.md
```

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
- **Node.js** v18+ and **npm** v9+
- **Python** 3.10+ and **pip**

---

### 2. Backend Setup
```bash
# Navigate to project root
cd "d:/medvault AI"

# Install Python requirements
pip install -r backend/requirements.txt

# (Optional) Set up environment variables
# Copy .env.example to .env or backend/.env and add your GEMINI_API_KEY
copy .env.example backend\.env

# Run the Flask backend server
python backend/app.py
```
*Backend runs at: `http://localhost:5000`*

---

### 3. Frontend Setup
```bash
# Open a new terminal in the frontend directory
cd "d:/medvault AI/frontend"

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
*Frontend runs at: `http://localhost:5173`*

---

## 🔑 Environment Configuration

MedVault AI operates in **Dual Mode**:
- If `GEMINI_API_KEY` or `SUPABASE_URL` are provided in `.env`, the system automatically communicates with live Google Gemini and Supabase services.
- If credentials are not provided, the platform automatically boots up in **High-Fidelity Demo Mode** using realistic preloaded clinical records (Sarah Jenkins, 48F, 15 records, 32 events, lab trends, evidence mappings).

### `.env` File Example:
```env
# Flask Config
PORT=5000
FLASK_ENV=development
SECRET_KEY=medvault-ai-super-secret-security-key-2026

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase (Optional)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Simulated Dispatch
EMAIL_API_KEY=
SMS_API_KEY=
```

---

## 🩺 End-to-End Walkthrough & Demo Flow

1. **One-Click Login (`/`)**
   - Click **Demo Patient** (Sarah Jenkins, 48F) to test patient features.
   - Or click **Doctor Portal** to experience clinician caseload management.

2. **Patient Dashboard (`/dashboard`)**
   - View quick stats: 15 Ingested Documents, 32 Medical Events, 3 Upcoming Follow-ups, 5 Notifications.
   - Read the **AI Record Overview** card summarizing longitudinal history.
   - Inspect the recent documents and upcoming follow-ups.

3. **Document Ingestion (`/documents/upload`)**
   - Drag and drop a medical PDF or click one of the **Sample Presets** (*🧪 Fasting Lipid Panel*, *💊 Cardiology Rx*, *🏥 Inpatient Discharge*).
   - Click **Start AI Pipeline**.

4. **Animated Processing Pipeline (`/documents/:id/processing`)**
   - Watch the animated 6-stage clinical processing pipeline:
     `Upload → Text Extraction → OCR → AI Analysis → Event Extraction → Timeline & Evidence`.
   - Click **View Analysis**.

5. **Document Analysis (`/documents/:id`)**
   - Observe the strict separation between:
     - **DOCUMENTED CLINICAL FACTS** (Verbatim extracted parameters)
     - **AI CLINICAL INTERPRETATION** (Pattern analysis & risk context)
   - Click **View Evidence** on any item to open the Evidence Viewer.

6. **Evidence Viewer (`/evidence/:id`)**
   - See the side-by-side original document page coordinate excerpt and the AI finding with its 99% confidence score.
   - Click **Open Document** or **Back to Timeline**.

7. **Medical Timeline (`/timeline`)**
   - Navigate the chronological stream grouped by Year and Month.
   - Filter by event type (*🧪 Lab Test, 💊 Prescription, 🏥 Hospitalization, 🩻 Imaging, 👨⚕️ Consultation*).
   - Switch to the **Relationship Graph** tab to explore the interactive causal pathway graph powered by **React Flow**.

8. **Medical Analytics (`/analytics`)**
   - Explore longitudinal lab trajectories for *Total Cholesterol, LDL, Fasting Blood Glucose, Systolic BP, and Hemoglobin*.
   - **Interactive feature:** Click any data point on the trend line to reveal its source document and verified evidence excerpt.
   - Inspect the document distribution doughnut chart.

9. **Grounded Multilingual AI Chat (`/chat`)**
   - Ask: *"What was my latest cholesterol result?"*
   - Observe the response grounded strictly on patient documents, complete with **Document Citations** and page numbers.
   - Switch language to **தமிழ் (Tamil)** or **हिन्दी (Hindi)**:
     - Tamil prompt: *"என்னோட latest blood test என்ன?"*
     - The AI answers fluently in the selected language.

10. **Follow-ups & Reminders (`/reminders`)**
    - View follow-ups automatically extracted from physician notes (e.g. *Cardiology Review on Oct 02, 2026*).
    - Toggle channels (*In-App, Email, SMS*).
    - Click **Mark Complete** to update the reminder status.

11. **Doctor Portal (`/doctor` & `/doctor/patients`)**
    - Toggle role to **Doctor** via the top navigation switcher.
    - Review authorized patient directory and open patient dossiers with clinical summaries, active medications, and adherence tracking.

12. **Audit Trail (`/settings`)**
    - Inspect the HIPAA-compliant immutable audit trail logging user logins, document views, evidence inspections, and AI chat queries.

---

## 🔒 Security & HIPAA-Ready Design
- **Zero Plaintext Passwords:** Supabase Auth handles password encryption and JWT sessions.
- **Role-Based Row-Level Security:** Patients can only access their own documents (`patient_id = auth.uid()`). Doctors only access authorized patient records.
- **Service Role Isolation:** `SUPABASE_SERVICE_ROLE_KEY` is kept strictly on the backend.
- **Grounded AI Guardrails:** The AI prompt forbids inventing numbers, dates, or diagnoses not present in records.

---

## 📄 License
MedVault AI is licensed under the MIT License.
