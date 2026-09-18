-- ==========================================================
-- MEDVAULT AI - Database Schema (Supabase PostgreSQL)
-- Medical Document Intelligence & Patient Timeline
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PATIENTS
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    mrn VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    blood_group VARCHAR(10),
    phone VARCHAR(30),
    email VARCHAR(255),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(30),
    allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
    chronic_conditions TEXT[] DEFAULT ARRAY[]::TEXT[],
    preferred_language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. DOCTOR_PATIENT_ACCESS (Authorized doctor-patient relationship)
CREATE TABLE IF NOT EXISTS doctor_patient_access (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'pending')),
    UNIQUE(doctor_user_id, patient_id)
);

-- 3. DOCUMENTS
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    storage_path TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    page_count INT DEFAULT 1,
    document_type VARCHAR(100) NOT NULL, -- 'Lab Report', 'Prescription', 'Discharge Summary', 'Imaging Report', 'Consultation Note'
    document_date DATE,
    facility_name VARCHAR(255),
    attending_physician VARCHAR(255),
    language VARCHAR(10) DEFAULT 'en',
    processing_status VARCHAR(50) DEFAULT 'uploaded' CHECK (processing_status IN ('uploaded', 'extracting', 'analyzing', 'processed', 'failed')),
    ocr_applied BOOLEAN DEFAULT FALSE,
    ai_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. DOCUMENT PAGES
CREATE TABLE IF NOT EXISTS document_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    page_number INT NOT NULL,
    extracted_text TEXT NOT NULL,
    ocr_confidence NUMERIC(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(document_id, page_number)
);

-- 5. EVIDENCE (Verifiable source snippets)
CREATE TABLE IF NOT EXISTS evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    page_number INT NOT NULL,
    snippet_text TEXT NOT NULL,
    bounding_box JSONB, -- {x1, y1, x2, y2}
    confidence_score NUMERIC(5,2) DEFAULT 0.95,
    extracted_finding TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. MEDICAL EVENTS (Chronological events)
CREATE TABLE IF NOT EXISTS medical_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    evidence_id UUID REFERENCES evidence(id) ON DELETE SET NULL,
    event_date DATE NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- 'lab_test', 'prescription', 'discharge', 'imaging', 'consultation', 'procedure'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    severity VARCHAR(20) DEFAULT 'normal' CHECK (severity IN ('normal', 'attention', 'abnormal', 'critical')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. EVENT RELATIONSHIPS (For React Flow clinical pathway graph)
CREATE TABLE IF NOT EXISTS event_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    source_event_id UUID NOT NULL REFERENCES medical_events(id) ON DELETE CASCADE,
    target_event_id UUID NOT NULL REFERENCES medical_events(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) NOT NULL, -- 'triggers', 'prescribes', 'follows_up', 'clarifies', 'resolves'
    label VARCHAR(100),
    confidence NUMERIC(5,2) DEFAULT 0.90,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. LAB RESULTS
CREATE TABLE IF NOT EXISTS lab_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    evidence_id UUID REFERENCES evidence(id) ON DELETE SET NULL,
    test_name VARCHAR(100) NOT NULL,
    parameter VARCHAR(100) NOT NULL, -- 'Total Cholesterol', 'LDL', 'HDL', 'Fasting Blood Glucose', 'HbA1c', 'Hemoglobin'
    value_numeric NUMERIC(10,2),
    value_text VARCHAR(100),
    unit VARCHAR(50),
    reference_range VARCHAR(100),
    flag VARCHAR(20) DEFAULT 'normal' CHECK (flag IN ('normal', 'low', 'high', 'critical')),
    test_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. MEDICATIONS
CREATE TABLE IF NOT EXISTS medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    document_id REFERENCES documents(id) ON DELETE SET NULL,
    evidence_id UUID REFERENCES evidence(id) ON DELETE SET NULL,
    medication_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    route VARCHAR(50) DEFAULT 'oral',
    start_date DATE,
    end_date DATE,
    prescribing_doctor VARCHAR(255),
    indication VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. REMINDERS (Follow-ups & tests)
CREATE TABLE IF NOT EXISTS reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    evidence_id UUID REFERENCES evidence(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'follow_up', 'medication_refill', 'lab_repeat', 'imaging'
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'missed', 'cancelled')),
    in_app_notification BOOLEAN DEFAULT TRUE,
    email_notification BOOLEAN DEFAULT TRUE,
    sms_notification BOOLEAN DEFAULT FALSE,
    remind_7_days BOOLEAN DEFAULT TRUE,
    remind_1_day BOOLEAN DEFAULT TRUE,
    remind_on_due BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('INFO', 'REMINDER', 'DOCUMENT', 'SYSTEM')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    is_read BOOLEAN DEFAULT FALSE,
    link_route VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. AUDIT LOGS (HIPAA compliant record tracking)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- 'LOGIN', 'VIEW_RECORD', 'UPLOAD_DOCUMENT', 'AI_ANALYSIS', 'VIEW_EVIDENCE', 'CHAT_QUERY'
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255),
    details JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Patient can view/edit own profile
CREATE POLICY "Patients view own profile" ON patients
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Patients update own profile" ON patients
    FOR UPDATE USING (auth.uid() = user_id);

-- Patients view own documents
CREATE POLICY "Patients view own documents" ON documents
    FOR ALL USING (patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()));

-- Doctors view authorized patients' records
CREATE POLICY "Doctor view authorized patient docs" ON documents
    FOR SELECT USING (
        patient_id IN (
            SELECT patient_id FROM doctor_patient_access 
            WHERE doctor_user_id = auth.uid() AND status = 'active'
        )
    );
