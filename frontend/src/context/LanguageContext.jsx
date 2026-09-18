import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

const TRANSLATIONS = {
  en: {
    app_name: "MEDVAULT AI",
    tagline: "Medical Document Intelligence & Patient Timeline",
    dashboard: "Dashboard",
    documents: "Documents",
    timeline: "Timeline",
    analytics: "Analytics",
    ai_chat: "AI Chat",
    reminders: "Reminders",
    notifications: "Notifications",
    profile: "Profile",
    settings: "Settings",
    doctor_portal: "Doctor Portal",
    upload_doc: "Upload Document",
    view_timeline: "View Timeline",
    view_analytics: "View Analytics",
    ask_ai: "Ask MedVault AI",
    ai_record_overview: "AI RECORD OVERVIEW",
    medical_events: "Medical Events",
    upcoming_followups: "Upcoming Follow-ups",
    recent_documents: "Recent Documents",
    view_evidence: "View Evidence",
    search_placeholder: "Search records, lab results, medications...",
    disclaimer: "MedVault AI is an informational record intelligence assistant. It does NOT diagnose diseases or replace qualified healthcare professionals.",
    evidence_backed: "Evidence-Backed Clinical Fact",
    ai_interpretation: "AI Interpretation / Clinical Synthesis",
    mark_complete: "Mark Complete",
    status_processed: "Processed",
    suggested_q1: "What was my latest blood test?",
    suggested_q2: "What medications are in my records?",
    suggested_q3: "When is my next follow-up?",
    suggested_q4: "Which documents mention cholesterol?",
  },
  ta: {
    app_name: "மெட்வால்ட் AI",
    tagline: "மருத்துவ ஆவண நுண்ணறிவு மற்றும் நோயாளி காலவரிசை",
    dashboard: "முகப்பு",
    documents: "மருத்துவ ஆவணங்கள்",
    timeline: "காலவரிசை",
    analytics: "பகுப்பாய்வு",
    ai_chat: "AI அரட்டை",
    reminders: "நினைவூட்டல்கள்",
    notifications: "அறிவிப்புகள்",
    profile: "சுயவிவரம்",
    settings: "அமைப்புகள்",
    doctor_portal: "மருத்துவர் தளம்",
    upload_doc: "ஆவணம் பதிவேற்றுக",
    view_timeline: "காலவரிசையைக் காண்க",
    view_analytics: "பகுப்பாய்வைக் காண்க",
    ask_ai: "AI உதவியாளரிடம் கேளுங்கள்",
    ai_record_overview: "AI மருத்துவ ஆவண கண்ணோட்டம்",
    medical_events: "மருத்துவ நிகழ்வுகள்",
    upcoming_followups: "வரவிருக்கும் பரிசோதனைகள்",
    recent_documents: "சமீபத்திய ஆவணங்கள்",
    view_evidence: "ஆதாரத்தைக் காண்க",
    search_placeholder: "ஆவணங்கள், பரிசோதனை முடிவுகள், மருந்துகளைத் தேடுங்கள்...",
    disclaimer: "மெட்வால்ட் AI ஒரு தகவல் நுண்ணறிவு உதவியாளர் மட்டுமே. இது நோய்களைக் கண்டறிவதற்கோ மருத்துவ சிகிச்சையளிப்பதற்கோ மாற்றாகாது.",
    evidence_backed: "ஆவண சான்றுடன் கூடிய உண்மை",
    ai_interpretation: "AI பகுப்பாய்வு விளக்கம்",
    mark_complete: "முடிந்தது எனக் குறிக்கவும்",
    status_processed: "செயலாக்கப்பட்டது",
    suggested_q1: "என்னோட latest blood test என்ன?",
    suggested_q2: "என் பதிவுகளில் என்னென்ன மருந்துகள் உள்ளன?",
    suggested_q3: "எனது அடுத்த மருத்துவ பரிசோதனை எப்போது?",
    suggested_q4: "கொலஸ்ட்ரால் பற்றிய ஆவணம் எது?",
  },
  hi: {
    app_name: "मेडवॉल्ट AI",
    tagline: "मेडिकल दस्तावेज़ इंटेलिजेंस और मरीज टाइमलाइन",
    dashboard: "डैशबोर्ड",
    documents: "दस्तावेज़",
    timeline: "टाइमलाइन",
    analytics: "एनालिटिक्स",
    ai_chat: "AI चैट",
    reminders: "रिमाइंडर",
    notifications: "सूचनाएं",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    doctor_portal: "डॉक्टर पोर्टल",
    upload_doc: "दस्तावेज़ अपलोड करें",
    view_timeline: "टाइमलाइन देखें",
    view_analytics: "एनालिटिक्स देखें",
    ask_ai: "MedVault AI से पूछें",
    ai_record_overview: "AI रिकॉर्ड अवलोकन",
    medical_events: "मेडिकल इवेंट्स",
    upcoming_followups: "आगामी फॉलो-अप",
    recent_documents: "हालिया दस्तावेज़",
    view_evidence: "साक्ष्य देखें",
    search_placeholder: "रिकॉर्ड, लैब रिपोर्ट, दवाएं खोजें...",
    disclaimer: "MedVault AI केवल एक सूचना सहायक है। यह किसी बीमारी का निदान नहीं करता और न ही डॉक्टरों का विकल्प है।",
    evidence_backed: "साक्ष्य-आधारित नैदानिक तथ्य",
    ai_interpretation: "AI व्याख्या एवं विश्लेषण",
    mark_complete: "पूर्ण चिह्नित करें",
    status_processed: "संसाधित",
    suggested_q1: "मेरा नवीनतम रक्त परीक्षण क्या था?",
    suggested_q2: "मेरे रिकॉर्ड में कौन सी दवाएं हैं?",
    suggested_q3: "मेरा अगला फॉलो-अप कब है?",
    suggested_q4: "कोलेस्ट्रॉल के परिणाम किस दस्तावेज़ में हैं?",
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('mv_lang') || 'en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('mv_lang', lang);
  };

  const t = (key) => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
