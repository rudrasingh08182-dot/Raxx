import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const CODE_LANGUAGES = [
  { key: 'python', label: 'Python', monaco: 'python' },
  { key: 'javascript', label: 'JavaScript', monaco: 'javascript' },
  { key: 'java', label: 'Java', monaco: 'java' },
  { key: 'c', label: 'C', monaco: 'c' },
  { key: 'cpp', label: 'C++', monaco: 'cpp' },
];

// ─── CLAUDE-STYLE DARK MATTE PALETTE ───
const C = {
  bg: "#0B0C0F",           // Claude-like deep dark gray
  surface: "#15161A",      // Elevated cards
  surfaceHi: "#1C1D22",    // Inputs / highlights
  surfaceHover: "#22232A",
  border: "rgba(232,224,213,0.06)", // Very subtle warm border
  cream: "#E8E0D5",        // Warm off-white
  creamMute: "#6B6D75",   // Muted gray text
  terra: "#C46B4A",        // Primary accent
  terraGlow: "rgba(196,107,74,0.12)",
  forest: "#3D5A48",
  forestHi: "#4A8C6A",
  forestGlow: "rgba(74,140,106,0.12)",
  gold: "#D4A843",
  red: "#E05A5A",
  green: "#4A8C6A",
  violet: "#8B7FD4",
};

const COMPANIES = [
  { name: 'TCS', domain: 'tcs.com' },
  { name: 'Infosys', domain: 'infosys.com' },
  { name: 'Wipro', domain: 'wipro.com' },
  { name: 'Google', domain: 'google.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Flipkart', domain: 'flipkart.com' },
  { name: 'Paytm', domain: 'paytm.com' },
  { name: 'Zomato', domain: 'zomato.com' },
  { name: 'Swiggy', domain: 'swiggy.com' },
  { name: 'HCL', domain: 'hcltech.com' },
  { name: 'Cognizant', domain: 'cognizant.com' },
  { name: 'Accenture', domain: 'accenture.com' },
  { name: 'IBM', domain: 'ibm.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'Apple', domain: 'apple.com' },
  { name: 'Uber', domain: 'uber.com' },
  { name: 'PhonePe', domain: 'phonepe.com' },
  { name: 'Razorpay', domain: 'razorpay.com' },
  { name: 'Myntra', domain: 'myntra.com' },
];

const BRANCHES = [
  'CSE', 'ECE', 'ME', 'CE', 'EE', 'IT',
  'Chemical', 'Aerospace', 'Biotechnology', 'Automobile',
  'Mining', 'Textile', 'Marine', 'Metallurgy',
  'Production', 'Industrial', 'Instrumentation',
  'Petroleum', 'Agriculture', 'Environmental'
];

// ─── SVG Previews (unchanged) ───
const ClassicPreview = () => (
  <svg viewBox="0 0 120 160" style={{ width: "100%", height: "100%" }}>
    <rect width="120" height="160" fill="#f8f8f8" rx="2"/>
    <rect x="10" y="10" width="100" height="18" fill="#1a1a2e" rx="1"/>
    <rect x="20" y="14" width="50" height="4" fill="white" rx="1"/>
    <rect x="20" y="20" width="70" height="2" fill="#ffffff80" rx="1"/>
    <rect x="10" y="32" width="100" height="1" fill="#1a1a2e"/>
    <rect x="10" y="37" width="35" height="3" fill="#1a1a2e" rx="1"/>
    <rect x="10" y="43" width="100" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="47" width="85" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="54" width="40" height="3" fill="#1a1a2e" rx="1"/>
    <rect x="10" y="59" width="100" height="1" fill="#ccc"/>
    <rect x="10" y="63" width="90" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="67" width="70" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="74" width="30" height="3" fill="#1a1a2e" rx="1"/>
    <rect x="10" y="79" width="100" height="1" fill="#ccc"/>
    <rect x="10" y="83" width="95" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="90" width="35" height="3" fill="#1a1a2e" rx="1"/>
    <rect x="10" y="95" width="100" height="1" fill="#ccc"/>
    <rect x="10" y="99" width="80" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="103" width="15" height="2" fill="#ccc" rx="1"/>
    <rect x="27" y="103" width="60" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="107" width="15" height="2" fill="#ccc" rx="1"/>
    <rect x="27" y="107" width="50" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="114" width="50" height="3" fill="#1a1a2e" rx="1"/>
    <rect x="10" y="119" width="100" height="1" fill="#ccc"/>
    <rect x="10" y="123" width="15" height="2" fill="#ccc" rx="1"/>
    <rect x="27" y="123" width="70" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="127" width="15" height="2" fill="#ccc" rx="1"/>
    <rect x="27" y="127" width="55" height="2" fill="#ccc" rx="1"/>
  </svg>
);

const ModernPreview = () => (
  <svg viewBox="0 0 120 160" style={{ width: "100%", height: "100%" }}>
    <rect width="120" height="160" fill="#f8f8f8" rx="2"/>
    <rect width="120" height="35" fill="#6366f1" rx="2"/>
    <rect x="10" y="8" width="55" height="5" fill="white" rx="1"/>
    <rect x="10" y="16" width="80" height="2" fill="#ffffff80" rx="1"/>
    <rect x="10" y="21" width="60" height="2" fill="#ffffff60" rx="1"/>
    <rect x="10" y="40" width="30" height="3" fill="#6366f1" rx="1"/>
    <rect x="10" y="45" width="110" height="1" fill="#6366f1"/>
    <rect x="10" y="49" width="100" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="53" width="80" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="60" width="38" height="3" fill="#6366f1" rx="1"/>
    <rect x="10" y="65" width="110" height="1" fill="#6366f1"/>
    <rect x="10" y="69" width="90" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="73" width="70" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="80" width="28" height="3" fill="#6366f1" rx="1"/>
    <rect x="10" y="85" width="110" height="1" fill="#6366f1"/>
    <rect x="10" y="89" width="100" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="96" width="40" height="3" fill="#6366f1" rx="1"/>
    <rect x="10" y="101" width="110" height="1" fill="#6366f1"/>
    <rect x="10" y="105" width="85" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="109" width="15" height="2" fill="#ccc" rx="1"/>
    <rect x="27" y="109" width="65" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="116" width="34" height="3" fill="#6366f1" rx="1"/>
    <rect x="10" y="121" width="110" height="1" fill="#6366f1"/>
    <rect x="10" y="125" width="80" height="2" fill="#ccc" rx="1"/>
    <rect x="10" y="129" width="15" height="2" fill="#ccc" rx="1"/>
    <rect x="27" y="129" width="60" height="2" fill="#ccc" rx="1"/>
  </svg>
);

const ElegantPreview = () => (
  <svg viewBox="0 0 120 160" style={{ width: "100%", height: "100%" }}>
    <rect width="120" height="160" fill="#f8f8f8" rx="2"/>
    <rect x="0" y="0" width="40" height="160" fill="#f1f5f9"/>
    <rect x="8" y="12" width="24" height="3" fill="#0f172a" rx="1"/>
    <rect x="8" y="18" width="28" height="2" fill="#64748b" rx="1"/>
    <rect x="8" y="22" width="26" height="2" fill="#64748b" rx="1"/>
    <rect x="8" y="34" width="24" height="3" fill="#0f172a" rx="1"/>
    <rect x="8" y="40" width="28" height="2" fill="#64748b" rx="1"/>
    <rect x="8" y="44" width="24" height="2" fill="#64748b" rx="1"/>
    <rect x="8" y="56" width="20" height="3" fill="#0f172a" rx="1"/>
    <rect x="8" y="62" width="26" height="2" fill="#64748b" rx="1"/>
    <rect x="8" y="66" width="22" height="2" fill="#64748b" rx="1"/>
    <rect x="48" y="10" width="60" height="6" fill="#0f172a" rx="1"/>
    <rect x="48" y="24" width="20" height="3" fill="#0f172a" rx="1"/>
    <rect x="48" y="30" width="65" height="2" fill="#ccc" rx="1"/>
    <rect x="48" y="34" width="55" height="2" fill="#ccc" rx="1"/>
    <rect x="48" y="46" width="30" height="3" fill="#0f172a" rx="1"/>
    <rect x="48" y="52" width="65" height="2" fill="#ccc" rx="1"/>
    <rect x="48" y="56" width="60" height="2" fill="#ccc" rx="1"/>
    <rect x="48" y="66" width="26" height="3" fill="#0f172a" rx="1"/>
    <rect x="48" y="72" width="65" height="2" fill="#ccc" rx="1"/>
    <rect x="48" y="76" width="50" height="2" fill="#ccc" rx="1"/>
  </svg>
);

const TechnicalPreview = () => (
  <svg viewBox="0 0 120 160" style={{ width: "100%", height: "100%" }}>
    <rect width="120" height="160" fill="white" rx="2"/>
    <rect x="10" y="10" width="55" height="5" fill="#000" rx="1"/>
    <rect x="10" y="18" width="95" height="2" fill="#333" rx="1"/>
    <rect x="10" y="24" width="100" height="1" fill="#000"/>
    <rect x="10" y="30" width="25" height="2.5" fill="#000" rx="1"/>
    <rect x="10" y="35" width="100" height="1.5" fill="#999" rx="1"/>
    <rect x="10" y="39" width="90" height="1.5" fill="#999" rx="1"/>
    <rect x="10" y="46" width="35" height="2.5" fill="#000" rx="1"/>
    <rect x="10" y="51" width="100" height="1.5" fill="#999" rx="1"/>
    <rect x="10" y="58" width="45" height="2.5" fill="#000" rx="1"/>
    <rect x="10" y="63" width="95" height="1.5" fill="#999" rx="1"/>
    <rect x="10" y="67" width="85" height="1.5" fill="#999" rx="1"/>
    <rect x="10" y="71" width="90" height="1.5" fill="#999" rx="1"/>
    <rect x="10" y="78" width="30" height="2.5" fill="#000" rx="1"/>
    <rect x="10" y="83" width="95" height="1.5" fill="#999" rx="1"/>
    <rect x="10" y="87" width="80" height="1.5" fill="#999" rx="1"/>
    <rect x="10" y="91" width="90" height="1.5" fill="#999" rx="1"/>
    <rect x="10" y="98" width="35" height="2.5" fill="#000" rx="1"/>
    <rect x="10" y="103" width="85" height="1.5" fill="#999" rx="1"/>
  </svg>
);

const MinimalPreview = () => (
  <svg viewBox="0 0 120 160" style={{ width: "100%", height: "100%" }}>
    <rect width="120" height="160" fill="white" rx="2"/>
    <rect x="10" y="12" width="65" height="6" fill="#111" rx="1"/>
    <rect x="10" y="21" width="90" height="2" fill="#999" rx="1"/>
    <rect x="10" y="27" width="100" height="0.5" fill="#333"/>
    <rect x="10" y="32" width="28" height="3" fill="#111" rx="1"/>
    <rect x="10" y="38" width="100" height="2" fill="#ddd" rx="1"/>
    <rect x="10" y="42" width="85" height="2" fill="#ddd" rx="1"/>
    <rect x="10" y="50" width="35" height="3" fill="#111" rx="1"/>
    <rect x="10" y="56" width="90" height="2" fill="#ddd" rx="1"/>
    <rect x="10" y="60" width="70" height="2" fill="#ddd" rx="1"/>
    <rect x="10" y="68" width="25" height="3" fill="#111" rx="1"/>
    <rect x="10" y="74" width="100" height="2" fill="#ddd" rx="1"/>
    <rect x="10" y="82" width="38" height="3" fill="#111" rx="1"/>
    <rect x="10" y="88" width="85" height="2" fill="#ddd" rx="1"/>
    <rect x="10" y="92" width="15" height="2" fill="#ddd" rx="1"/>
    <rect x="27" y="92" width="60" height="2" fill="#ddd" rx="1"/>
    <rect x="10" y="100" width="30" height="3" fill="#111" rx="1"/>
    <rect x="10" y="106" width="80" height="2" fill="#ddd" rx="1"/>
    <rect x="10" y="110" width="15" height="2" fill="#ddd" rx="1"/>
    <rect x="27" y="110" width="55" height="2" fill="#ddd" rx="1"/>
    <rect x="10" y="118" width="45" height="3" fill="#111" rx="1"/>
    <rect x="10" y="124" width="15" height="2" fill="#ddd" rx="1"/>
    <rect x="27" y="124" width="70" height="2" fill="#ddd" rx="1"/>
    <rect x="10" y="128" width="15" height="2" fill="#ddd" rx="1"/>
    <rect x="27" y="128" width="55" height="2" fill="#ddd" rx="1"/>
  </svg>
);

export default function EngineeringHub() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('resume');

  // Resume Builder State
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [resumeForm, setResumeForm] = useState({
    name: '', email: '', phone: '', linkedin: '', github: '',
    college: '', branch: '', cgpa: '', year: '',
    skills: '', achievements: '',
  });
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeChat, setResumeChat] = useState([]);
  const [resumeChatInput, setResumeChatInput] = useState('');
  const [resumeChatLoading, setResumeChatLoading] = useState(false);

  // Interview State
  const [interviewCompany, setInterviewCompany] = useState('');
  const [interviewRole, setInterviewRole] = useState('');
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewMessages, setInterviewMessages] = useState([]);
  const [interviewAnswer, setInterviewAnswer] = useState('');
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);

  // Company Questions State
  const [selectedCompany, setSelectedCompany] = useState('');
  const [questionType, setQuestionType] = useState('dsa');
  const [companyQuestions, setCompanyQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Coding Workspace State
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [workspaceLanguage, setWorkspaceLanguage] = useState('python');
  const [workspaceCode, setWorkspaceCode] = useState('');
  const [workspaceLoading, setWorkspaceLoading] = useState(false);
  const [workspaceResult, setWorkspaceResult] = useState(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [hints, setHints] = useState([]);
  const [hintLevel, setHintLevel] = useState(1);

  // Branch Syllabus State
  const [selectedBranch, setSelectedBranch] = useState('');
  const [syllabus, setSyllabus] = useState(null);
  const [syllabusLoading, setSyllabusLoading] = useState(false);
  const [topicNotes, setTopicNotes] = useState('');
  const [notesLoading, setNotesLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('raxx_user');
    if (!userData) { router.push('/login'); return; }
    setUser(JSON.parse(userData));
  }, [router]);

  const addExperience = () => setExperiences([...experiences, { company: '', role: '', duration: '', description: '' }]);
  const addProject = () => setProjects([...projects, { name: '', description: '', tech: '' }]);

  const handleResumeChat = async () => {
    if (!resumeChatInput.trim()) return;
    const userMsg = { role: 'user', text: resumeChatInput };
    setResumeChat(prev => [...prev, userMsg]);
    setResumeChatInput('');
    setResumeChatLoading(true);
    try {
      const res = await fetch(`${API_BASE}/engineering/resume-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: resumeChatInput,
          resume_data: {
            name: resumeForm.name,
            skills: resumeForm.skills,
            projects: projects,
            experience: experiences,
            achievements: resumeForm.achievements,
          }
        }),
      });
      const data = await res.json();
      setResumeChat(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (err) { console.error(err); }
    setResumeChatLoading(false);
  };

  const handleResumeGenerate = async () => {
    if (!resumeForm.name || !resumeForm.email || !resumeForm.phone) {
      alert('Please fill Name, Email and Phone!');
      return;
    }
    setResumeLoading(true);
    try {
      const payload = {
        user_id: user?.id,
        template: selectedTemplate,
        name: resumeForm.name,
        email: resumeForm.email,
        phone: resumeForm.phone,
        linkedin: resumeForm.linkedin,
        github: resumeForm.github,
        education: {
          college: resumeForm.college,
          branch: resumeForm.branch,
          cgpa: resumeForm.cgpa,
          year: resumeForm.year,
        },
        skills: resumeForm.skills,
        experience: experiences,
        projects: projects,
        achievements: resumeForm.achievements,
      };
      const res = await fetch(`${API_BASE}/engineering/resume-generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Resume generation failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeForm.name.replace(' ', '_')}_Resume.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error generating resume. Please try again!');
    }
    setResumeLoading(false);
  };

  const startInterview = async () => {
    if (!interviewCompany || !interviewRole) return;
    setInterviewStarted(true);
    setInterviewLoading(true);
    try {
      const res = await fetch(`${API_BASE}/engineering/mock-interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: interviewCompany, role: interviewRole, question_number: 1 }),
      });
      const data = await res.json();
      setInterviewMessages([{ role: 'interviewer', text: data.message }]);
      setQuestionNumber(2);
    } catch (err) { console.error(err); }
    setInterviewLoading(false);
  };

  const submitAnswer = async () => {
    if (!interviewAnswer.trim()) return;
    const userMsg = { role: 'candidate', text: interviewAnswer };
    setInterviewMessages(prev => [...prev, userMsg]);
    setInterviewAnswer('');
    setInterviewLoading(true);
    try {
      const res = await fetch(`${API_BASE}/engineering/mock-interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: interviewCompany,
          role: interviewRole,
          previous_answer: interviewAnswer,
          question_number: questionNumber,
        }),
      });
      const data = await res.json();
      setInterviewMessages(prev => [...prev, { role: 'interviewer', text: data.message }]);
      setQuestionNumber(prev => prev + 1);
    } catch (err) { console.error(err); }
    setInterviewLoading(false);
  };

  const fetchCompanyQuestions = async (company) => {
    setSelectedCompany(company);
    setQuestionsLoading(true);
    setCompanyQuestions([]);
    try {
      const res = await fetch(`${API_BASE}/engineering/company-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, type: questionType, exclude: [] }),
      });
      const data = await res.json();
      setCompanyQuestions(data.questions || []);
    } catch (err) { console.error(err); }
    setQuestionsLoading(false);
  };

  const loadMoreQuestions = async () => {
    setLoadingMore(true);
    try {
      const res = await fetch(`${API_BASE}/engineering/company-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: selectedCompany,
          type: questionType,
          exclude: companyQuestions.map(q => q.question),
        }),
      });
      const data = await res.json();
      setCompanyQuestions(prev => [...prev, ...(data.questions || [])]);
    } catch (err) { console.error(err); }
    setLoadingMore(false);
  };

  const openWorkspace = (q) => {
    setActiveQuestion(q);
    setWorkspaceCode('');
    setWorkspaceResult(null);
    setHints([]);
    setHintLevel(1);
  };

  const closeWorkspace = () => {
    setActiveQuestion(null);
    setWorkspaceResult(null);
    setHints([]);
  };

  const submitForReview = async () => {
    if (!workspaceCode.trim()) { alert('Pehle kuch code likho!'); return; }
    setWorkspaceLoading(true);
    setWorkspaceResult(null);
    try {
      const res = await fetch(`${API_BASE}/engineering/evaluate-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: selectedCompany,
          question: activeQuestion.question,
          language: workspaceLanguage,
          code: workspaceCode,
        }),
      });
      const data = await res.json();
      if (data.success) setWorkspaceResult(data.evaluation);
      else alert(data.detail || 'Evaluation failed, try again!');
    } catch (err) {
      alert('Evaluation failed, try again!');
    }
    setWorkspaceLoading(false);
  };

  const getHint = async () => {
    setHintLoading(true);
    try {
      const res = await fetch(`${API_BASE}/engineering/code-hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: selectedCompany,
          question: activeQuestion.question,
          language: workspaceLanguage,
          code: workspaceCode,
          hint_level: hintLevel,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setHints(prev => [...prev, data.hint]);
        setHintLevel(prev => prev + 1);
      }
    } catch (err) { console.error(err); }
    setHintLoading(false);
  };

  const fetchSyllabus = async (branch) => {
    setSelectedBranch(branch);
    setSyllabusLoading(true);
    setSyllabus(null);
    try {
      const res = await fetch(`${API_BASE}/engineering/branch-syllabus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branch }),
      });
      const data = await res.json();
      setSyllabus(data.syllabus);
    } catch (err) { console.error(err); }
    setSyllabusLoading(false);
  };

  const fetchTopicNotes = async (topic) => {
    setSelectedTopic(topic);
    setNotesLoading(true);
    setTopicNotes('');
    try {
      const res = await fetch(`${API_BASE}/engineering/topic-notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, branch: selectedBranch }),
      });
      const data = await res.json();
      setTopicNotes(data.notes);
    } catch (err) { console.error(err); }
    setNotesLoading(false);
  };

  // ─── SHARED STYLES ───
  const app = {
    minHeight: "100vh",
    backgroundColor: C.bg,
    color: C.cream,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    maxWidth: 480,
    margin: "0 auto",
    position: "relative",
    overflowX: "hidden",
    paddingBottom: 24,
  };

  const head = {
    backgroundColor: "rgba(11,12,15,0.92)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: `1px solid ${C.border}`,
    padding: "14px 16px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    gap: 12,
  };

  const card = {
    backgroundColor: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  };

  const input = {
    width: "100%",
    backgroundColor: C.surfaceHi,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: "12px 14px",
    color: C.cream,
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const textarea = {
    ...input,
    resize: "none",
    lineHeight: 1.6,
    minHeight: 80,
  };

  const btnPri = {
    width: "100%",
    backgroundColor: C.terra,
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    padding: "14px 20px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: `0 4px 20px ${C.terra}25`,
    fontFamily: "inherit",
  };

  const btnSec = {
    width: "100%",
    backgroundColor: C.surfaceHi,
    color: C.cream,
    fontWeight: 600,
    fontSize: 14,
    padding: "10px 16px",
    borderRadius: 12,
    border: `1px solid ${C.border}`,
    cursor: "pointer",
    fontFamily: "inherit",
  };

  const chip = (active, color) => ({
    padding: "8px 14px",
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 700,
    border: `1.5px solid ${active ? color : C.border}`,
    backgroundColor: active ? `${color}12` : C.surfaceHi,
    color: active ? color : C.creamMute,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
  });

  const label = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    color: C.creamMute,
    marginBottom: 10,
    marginTop: 0,
  };

  const sectionTitle = {
    fontSize: 20,
    fontWeight: 800,
    color: C.cream,
    margin: "0 0 4px 0",
    letterSpacing: "-0.3px",
  };

  const sub = {
    fontSize: 13,
    color: C.creamMute,
    lineHeight: 1.5,
    margin: "0 0 16px 0",
  };

  const spin = {
    width: 14,
    height: 14,
    border: "2px solid rgba(255,255,255,0.2)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  };

  const SECTIONS = [
    { id: 'resume', icon: '📄', label: 'Resume', color: C.terra },
    { id: 'interview', icon: '🎯', label: 'Interview', color: C.violet },
    { id: 'company', icon: '🏢', label: 'Companies', color: C.forestHi },
    { id: 'syllabus', icon: '📚', label: 'Syllabus', color: C.gold },
  ];

  return (
    <>
      <Head><title>Engineering Hub — RAXX AI</title></Head>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={app}>
        {/* HEADER */}
        <div style={head}>
          <a href="/dashboard/student" style={{ color: C.creamMute, fontSize: 20, textDecoration: "none" }}>←</a>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: 17, color: C.cream, margin: 0 }}>Engineering Hub</h1>
            <p style={{ fontSize: 10, color: C.creamMute, margin: "2px 0 0 0", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Resume • Interview • Prep
            </p>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {/* SECTION TABS */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16, scrollbarWidth: "none" }}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                style={chip(activeTab === s.id, s.color)}
              >
                <span style={{ marginRight: 4 }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* ===== RESUME BUILDER ===== */}
          {activeTab === 'resume' && (
            <div>
              <h2 style={sectionTitle}>Build Your Resume</h2>
              <p style={sub}>ATS-friendly PDFs optimized by AI.</p>

              {/* Templates */}
              <p style={label}>Choose Template</p>
              <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
                {[
                  { key: 'classic', Preview: ClassicPreview, label: 'Classic' },
                  { key: 'modern', Preview: ModernPreview, label: 'Modern' },
                  { key: 'minimal', Preview: MinimalPreview, label: 'Minimal' },
                  { key: 'elegant', Preview: ElegantPreview, label: 'Elegant' },
                  { key: 'technical', Preview: TechnicalPreview, label: 'Technical' },
                ].map(({ key, Preview, label: lbl }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTemplate(key)}
                    style={{
                      flexShrink: 0,
                      width: 110,
                      backgroundColor: selectedTemplate === key ? C.surfaceHi : C.surface,
                      border: `1.5px solid ${selectedTemplate === key ? C.terra : C.border}`,
                      borderRadius: 14,
                      padding: 8,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      color: "inherit",
                    }}
                  >
                    <div style={{ height: 140, borderRadius: 8, overflow: "hidden", backgroundColor: "#fff", marginBottom: 8 }}>
                      <Preview />
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: C.cream, margin: "0 0 2px 0" }}>{lbl}</p>
                    {selectedTemplate === key && <p style={{ fontSize: 10, color: C.terra, margin: 0, fontWeight: 700 }}>✓ Selected</p>}
                  </button>
                ))}
              </div>

              {/* Personal */}
              <div style={card}>
                <p style={{ ...label, marginBottom: 12 }}>👤 Personal Info</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { k: 'name', p: 'Full Name *' },
                    { k: 'email', p: 'Email *' },
                    { k: 'phone', p: 'Phone *' },
                    { k: 'linkedin', p: 'LinkedIn (optional)' },
                    { k: 'github', p: 'GitHub (optional)' },
                  ].map((f) => (
                    <input
                      key={f.k}
                      type="text"
                      placeholder={f.p}
                      value={resumeForm[f.k]}
                      onChange={(e) => setResumeForm((prev) => ({ ...prev, [f.k]: e.target.value }))}
                      style={input}
                    />
                  ))}
                </div>
              </div>

              {/* Education */}
              <div style={card}>
                <p style={{ ...label, marginBottom: 12 }}>🎓 Education</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { k: 'college', p: 'College Name' },
                    { k: 'branch', p: 'Branch (e.g. CSE)' },
                    { k: 'cgpa', p: 'CGPA (e.g. 8.5)' },
                    { k: 'year', p: 'Passing Year' },
                  ].map((f) => (
                    <input
                      key={f.k}
                      type="text"
                      placeholder={f.p}
                      value={resumeForm[f.k]}
                      onChange={(e) => setResumeForm((prev) => ({ ...prev, [f.k]: e.target.value }))}
                      style={input}
                    />
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div style={card}>
                <p style={{ ...label, marginBottom: 12 }}>🛠️ Skills</p>
                <textarea
                  placeholder="Python, React, Node.js, SQL..."
                  value={resumeForm.skills}
                  onChange={(e) => setResumeForm((prev) => ({ ...prev, skills: e.target.value }))}
                  style={textarea}
                  rows={3}
                />
              </div>

              {/* Experience */}
              <div style={card}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <p style={label}>💼 Experience</p>
                  <button onClick={addExperience} style={{ ...btnSec, width: "auto", padding: "6px 12px", fontSize: 12 }}>+ Add</button>
                </div>
                {experiences.length === 0 && <p style={{ fontSize: 12, color: C.creamMute }}>No experience added.</p>}
                {experiences.map((exp, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
                    {[
                      { k: 'company', p: 'Company Name' },
                      { k: 'role', p: 'Role' },
                      { k: 'duration', p: 'Duration' },
                      { k: 'description', p: 'Description' },
                    ].map((f) => (
                      <input
                        key={f.k}
                        type="text"
                        placeholder={f.p}
                        value={exp[f.k]}
                        onChange={(e) => { const u = [...experiences]; u[i][f.k] = e.target.value; setExperiences(u); }}
                        style={input}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div style={card}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <p style={label}>🏗️ Projects</p>
                  <button onClick={addProject} style={{ ...btnSec, width: "auto", padding: "6px 12px", fontSize: 12 }}>+ Add</button>
                </div>
                {projects.length === 0 && <p style={{ fontSize: 12, color: C.creamMute }}>No projects added.</p>}
                {projects.map((proj, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
                    {[
                      { k: 'name', p: 'Project Name' },
                      { k: 'tech', p: 'Tech Stack' },
                      { k: 'description', p: 'Description' },
                    ].map((f) => (
                      <input
                        key={f.k}
                        type="text"
                        placeholder={f.p}
                        value={proj[f.k]}
                        onChange={(e) => { const u = [...projects]; u[i][f.k] = e.target.value; setProjects(u); }}
                        style={input}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div style={card}>
                <p style={{ ...label, marginBottom: 12 }}>🏆 Achievements</p>
                <textarea
                  placeholder="Hackathon winner, AWS Certified..."
                  value={resumeForm.achievements}
                  onChange={(e) => setResumeForm((prev) => ({ ...prev, achievements: e.target.value }))}
                  style={textarea}
                  rows={3}
                />
              </div>

              {/* Generate */}
              <button onClick={handleResumeGenerate} disabled={resumeLoading} style={{ ...btnPri, opacity: resumeLoading ? 0.6 : 1, marginBottom: 16 }}>
                {resumeLoading ? <><span style={spin} />Building...</> : '🚀 Generate Resume PDF'}
              </button>

              {/* AI Chat */}
              <div style={card}>
                <p style={{ ...label, marginBottom: 8 }}>🤖 AI Resume Assistant</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12, maxHeight: 280, overflowY: "auto" }}>
                  {resumeChat.length === 0 && <p style={{ fontSize: 12, color: C.creamMute, textAlign: "center", padding: "12px 0" }}>Ask AI to improve your resume...</p>}
                  {resumeChat.map((msg, i) => (
                    <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: "85%" }}>
                      <div style={{
                        backgroundColor: msg.role === 'user' ? C.terra : C.surfaceHi,
                        color: msg.role === 'user' ? '#fff' : C.cream,
                        padding: "10px 14px",
                        borderRadius: 14,
                        fontSize: 13,
                        lineHeight: 1.5,
                        border: msg.role === 'user' ? 'none' : `1px solid ${C.border}`,
                      }}>
                        <p style={{ fontSize: 10, fontWeight: 700, margin: "0 0 4px 0", opacity: 0.7 }}>{msg.role === 'user' ? 'You' : 'AI'}</p>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {resumeChatLoading && (
                    <div style={{ alignSelf: 'flex-start' }}>
                      <div style={{ backgroundColor: C.surfaceHi, padding: "10px 14px", borderRadius: 14, fontSize: 13, color: C.creamMute, border: `1px solid ${C.border}` }}>
                        AI is thinking...
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={resumeChatInput}
                    onChange={(e) => setResumeChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleResumeChat()}
                    placeholder="Ask anything..."
                    style={{ ...input, flex: 1 }}
                  />
                  <button onClick={handleResumeChat} disabled={resumeChatLoading || !resumeChatInput.trim()} style={{ ...btnPri, width: "auto", padding: "10px 16px", fontSize: 13 }}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== INTERVIEW ===== */}
          {activeTab === 'interview' && (
            <div>
              <h2 style={sectionTitle}>Mock Interview</h2>
              <p style={sub}>AI interviewer for your target company.</p>

              {!interviewStarted ? (
                <div style={card}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <p style={{ ...label, marginBottom: 6 }}>Target Company</p>
                      <input
                        type="text"
                        placeholder="e.g. Google, TCS"
                        value={interviewCompany}
                        onChange={(e) => setInterviewCompany(e.target.value)}
                        style={input}
                      />
                    </div>
                    <div>
                      <p style={{ ...label, marginBottom: 6 }}>Role</p>
                      <input
                        type="text"
                        placeholder="e.g. Software Engineer"
                        value={interviewRole}
                        onChange={(e) => setInterviewRole(e.target.value)}
                        style={input}
                      />
                    </div>
                    <button
                      onClick={startInterview}
                      disabled={!interviewCompany || !interviewRole}
                      style={{ ...btnPri, backgroundColor: C.violet, boxShadow: `0 4px 20px ${C.violet}25`, opacity: !interviewCompany || !interviewRole ? 0.5 : 1 }}
                    >
                      Start Interview 🎙️
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.violet }}>{interviewCompany} — {interviewRole}</span>
                    <button onClick={() => { setInterviewStarted(false); setInterviewMessages([]); setQuestionNumber(1); }} style={{ ...btnSec, width: "auto", padding: "6px 12px", fontSize: 12 }}>
                      End
                    </button>
                  </div>

                  <div style={{ ...card, minHeight: 300, maxHeight: 450, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
                    {interviewMessages.map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.role === 'candidate' ? 'flex-end' : 'flex-start', maxWidth: "90%" }}>
                        <div style={{
                          backgroundColor: msg.role === 'candidate' ? C.violet : C.surfaceHi,
                          color: msg.role === 'candidate' ? '#fff' : C.cream,
                          padding: "12px 14px",
                          borderRadius: 16,
                          fontSize: 13,
                          lineHeight: 1.6,
                          border: msg.role === 'candidate' ? 'none' : `1px solid ${C.border}`,
                        }}>
                          <p style={{ fontSize: 10, fontWeight: 700, margin: "0 0 4px 0", opacity: 0.7 }}>
                            {msg.role === 'candidate' ? 'You' : `Interviewer`}
                          </p>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {interviewLoading && (
                      <div style={{ alignSelf: 'flex-start' }}>
                        <div style={{ backgroundColor: C.surfaceHi, padding: "12px 14px", borderRadius: 16, fontSize: 13, color: C.creamMute, border: `1px solid ${C.border}` }}>
                          <span style={spin} /> Thinking...
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <textarea
                      value={interviewAnswer}
                      onChange={(e) => setInterviewAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      style={{ ...textarea, flex: 1, minHeight: 60 }}
                      rows={2}
                    />
                    <button
                      onClick={submitAnswer}
                      disabled={interviewLoading || !interviewAnswer.trim()}
                      style={{ ...btnPri, width: "auto", padding: "10px 16px", backgroundColor: C.violet, boxShadow: `0 4px 20px ${C.violet}25`, opacity: interviewLoading || !interviewAnswer.trim() ? 0.5 : 1 }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== COMPANY QUESTIONS ===== */}
          {activeTab === 'company' && (
            <div>
              <h2 style={sectionTitle}>Company Questions</h2>
              <p style={sub}>DSA & HR questions by company.</p>

              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {['dsa', 'hr'].map((type) => (
                  <button
                    key={type}
                    onClick={() => { setQuestionType(type); setCompanyQuestions([]); setSelectedCompany(''); }}
                    style={chip(questionType === type, C.forestHi)}
                  >
                    {type === 'dsa' ? '💻 DSA' : '🤝 HR'}
                  </button>
                ))}
              </div>

              <p style={label}>Select Company</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
                {COMPANIES.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => fetchCompanyQuestions(c.name)}
                    style={{
                      backgroundColor: selectedCompany === c.name ? `${C.forestHi}15` : C.surfaceHi,
                      border: `1.5px solid ${selectedCompany === c.name ? `${C.forestHi}50` : C.border}`,
                      borderRadius: 12,
                      padding: "10px 4px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "inherit",
                    }}
                  >
                    <img
                      src={`https://logo.clearbit.com/${c.domain}`}
                      alt={c.name}
                      style={{ width: 28, height: 28, objectFit: "contain", borderRadius: 6 }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span style={{ fontSize: 10, fontWeight: 700, color: selectedCompany === c.name ? C.forestHi : C.creamMute }}>{c.name}</span>
                  </button>
                ))}
              </div>

              {questionsLoading && <p style={{ textAlign: "center", color: C.creamMute, fontSize: 13, padding: "20px 0" }}>Loading {selectedCompany} questions...</p>}

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {companyQuestions.map((q, i) => (
                  <div
                    key={i}
                    onClick={() => questionType === 'dsa' && openWorkspace(q)}
                    style={{ ...card, cursor: questionType === 'dsa' ? 'pointer' : 'default' }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: C.forestHi, marginTop: 2 }}>{i + 1}.</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, color: C.cream, lineHeight: 1.6, margin: "0 0 8px 0" }}>{q.question}</p>
                        {q.difficulty && (
                          <span style={{
                            display: "inline-block",
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: 20,
                            backgroundColor: q.difficulty === 'Easy' ? `${C.green}15` : q.difficulty === 'Medium' ? `${C.gold}15` : `${C.red}15`,
                            color: q.difficulty === 'Easy' ? C.green : q.difficulty === 'Medium' ? C.gold : C.red,
                          }}>
                            {q.difficulty} {q.topic ? `• ${q.topic}` : ''}
                          </span>
                        )}
                        {q.tip && <p style={{ fontSize: 12, color: C.creamMute, margin: "8px 0 0 0" }}>💡 {q.tip}</p>}
                        {questionType === 'dsa' && (
                          <p style={{ fontSize: 11, color: C.forestHi, margin: "8px 0 0 0", fontWeight: 700 }}>💻 Tap to code this →</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {companyQuestions.length > 0 && (
                <button
                  onClick={loadMoreQuestions}
                  disabled={loadingMore}
                  style={{ ...btnSec, marginTop: 12, opacity: loadingMore ? 0.6 : 1 }}
                >
                  {loadingMore ? <><span style={spin} />&nbsp;Loading more...</> : '⬇️ Load More Questions'}
                </button>
              )}
            </div>
          )}

          {/* ===== SYLLABUS ===== */}
          {activeTab === 'syllabus' && (
            <div>
              <h2 style={sectionTitle}>Branch Syllabus</h2>
              <p style={sub}>20+ branches covered with AI notes.</p>

              <p style={label}>Select Branch</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {BRANCHES.map((b) => (
                  <button key={b} onClick={() => fetchSyllabus(b)} style={chip(selectedBranch === b, C.gold)}>
                    {b}
                  </button>
                ))}
              </div>

              {syllabusLoading && <p style={{ textAlign: "center", color: C.creamMute, fontSize: 13, padding: "20px 0" }}>Loading {selectedBranch} syllabus...</p>}

              {syllabus && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {Object.entries(syllabus).map(([sem, topics]) => (
                    <div key={sem} style={card}>
                      <p style={{ ...label, color: C.gold, marginBottom: 10 }}>
                        {sem.replace('sem', 'Semester ')}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {topics.map((topic, i) => (
                          <button
                            key={i}
                            onClick={() => fetchTopicNotes(topic)}
                            style={{
                              textAlign: "left",
                              backgroundColor: C.surfaceHi,
                              border: `1px solid ${C.border}`,
                              borderRadius: 10,
                              padding: "10px 12px",
                              fontSize: 13,
                              color: C.cream,
                              cursor: "pointer",
                              fontFamily: "inherit",
                              fontWeight: 500,
                            }}
                          >
                            📖 {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TOPIC NOTES MODAL */}
      {selectedTopic && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.85)",
          zIndex: 100,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
          <div style={{
            width: "100%",
            maxWidth: 480,
            maxHeight: "85vh",
            backgroundColor: C.surface,
            borderTop: `1px solid ${C.border}`,
            borderRadius: "24px 24px 0 0",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: C.surfaceHi,
            }}>
              <p style={{ fontSize: 15, fontWeight: 800, color: C.gold, margin: 0 }}>{selectedTopic}</p>
              <button
                onClick={() => { setSelectedTopic(''); setTopicNotes(''); }}
                style={{ background: "none", border: "none", color: C.creamMute, fontSize: 20, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
                       <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
              {notesLoading ? (
                <p style={{ textAlign: "center", color: C.creamMute, fontSize: 14, padding: "40px 0" }}>Claude is generating notes...</p>
              ) : (
                <pre style={{ color: C.cream, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0 }}>
                  {topicNotes}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CODING WORKSPACE MODAL */}
      {activeQuestion && (
        <div style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.9)",
          zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center",
        }}>
          <div style={{
            width: "100%", maxWidth: 480, maxHeight: "92vh",
            backgroundColor: C.surface, borderTop: `1px solid ${C.border}`,
            borderRadius: "24px 24px 0 0", display: "flex", flexDirection: "column", overflow: "hidden",
          }}>
            <div style={{
              padding: "14px 16px", borderBottom: `1px solid ${C.border}`,
              display: "flex", alignItems: "flex-start", justifyContent: "space-between",
              backgroundColor: C.surfaceHi, gap: 10,
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.cream, margin: 0, lineHeight: 1.5 }}>{activeQuestion.question}</p>
              <button onClick={closeWorkspace} style={{ background: "none", border: "none", color: C.creamMute, fontSize: 20, cursor: "pointer", flexShrink: 0 }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
              {/* Language selector */}
              <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 10, marginBottom: 10 }}>
                {CODE_LANGUAGES.map((l) => (
                  <button key={l.key} onClick={() => setWorkspaceLanguage(l.key)} style={chip(workspaceLanguage === l.key, C.forestHi)}>
                    {l.label}
                  </button>
                ))}
              </div>

              {/* Editor */}
              <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, marginBottom: 12 }}>
                <Editor
                  height="260px"
                  language={CODE_LANGUAGES.find(l => l.key === workspaceLanguage)?.monaco || 'python'}
                  theme="vs-dark"
                  value={workspaceCode}
                  onChange={(val) => setWorkspaceCode(val || '')}
                  options={{ fontSize: 13, minimap: { enabled: false }, scrollBeyondLastLine: false, padding: { top: 12 } }}
                />
              </div>

              {/* Hints */}
              {hints.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  {hints.map((h, i) => (
                    <div key={i} style={{ ...card, backgroundColor: `${C.gold}10`, border: `1px solid ${C.gold}30`, margin: 0 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.gold, margin: "0 0 4px 0" }}>💡 Hint {i + 1}</p>
                      <p style={{ fontSize: 13, color: C.cream, margin: 0, lineHeight: 1.6 }}>{h}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button onClick={getHint} disabled={hintLoading} style={{ ...btnSec, opacity: hintLoading ? 0.6 : 1 }}>
                  {hintLoading ? <><span style={spin} />&nbsp;...</> : '💡 Get Hint'}
                </button>
                <button onClick={submitForReview} disabled={workspaceLoading} style={{ ...btnPri, backgroundColor: C.forestHi, boxShadow: `0 4px 20px ${C.forestHi}25`, opacity: workspaceLoading ? 0.6 : 1 }}>
                  {workspaceLoading ? <><span style={spin} />&nbsp;Evaluating...</> : '✅ Submit for AI Review'}
                </button>
              </div>

              {/* Result */}
              {workspaceResult && (
                <div style={card}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 20,
                      backgroundColor: workspaceResult.correctness === 'Correct' ? `${C.green}18` : workspaceResult.correctness === 'Partially Correct' ? `${C.gold}18` : `${C.red}18`,
                      color: workspaceResult.correctness === 'Correct' ? C.green : workspaceResult.correctness === 'Partially Correct' ? C.gold : C.red,
                    }}>
                      {workspaceResult.correctness === 'Correct' ? '✅' : workspaceResult.correctness === 'Partially Correct' ? '⚠️' : '❌'} {workspaceResult.correctness}
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 20,
                      backgroundColor: workspaceResult.approach === 'Optimal' ? `${C.green}18` : workspaceResult.approach === 'Brute Force' ? `${C.terra}18` : `${C.gold}18`,
                      color: workspaceResult.approach === 'Optimal' ? C.green : workspaceResult.approach === 'Brute Force' ? C.terra : C.gold,
                    }}>
                      {workspaceResult.approach}
                    </span>
                  </div>

                  <p style={{ fontSize: 11, color: C.creamMute, margin: "0 0 10px 0" }}>
                    ⏱️ Time: <b style={{ color: C.cream }}>{workspaceResult.time_complexity}</b> &nbsp;|&nbsp; 💾 Space: <b style={{ color: C.cream }}>{workspaceResult.space_complexity}</b>
                  </p>

                  <p style={{ fontSize: 13, color: C.cream, lineHeight: 1.6, margin: "0 0 10px 0" }}>{workspaceResult.explanation}</p>

                  {workspaceResult.bugs_found?.length > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.red, margin: "0 0 4px 0" }}>🐛 Bugs Found</p>
                      {workspaceResult.bugs_found.map((b, i) => (
                        <p key={i} style={{ fontSize: 12, color: C.creamMute, margin: "2px 0" }}>• {b}</p>
                      ))}
                    </div>
                  )}

                  {workspaceResult.improvement_suggestions && (
                    <div style={{ marginBottom: 10 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.gold, margin: "0 0 4px 0" }}>📈 Improve</p>
                      <p style={{ fontSize: 12, color: C.creamMute, margin: 0, lineHeight: 1.5 }}>{workspaceResult.improvement_suggestions}</p>
                    </div>
                  )}

                  {workspaceResult.encouragement && (
                    <p style={{ fontSize: 13, color: C.terra, fontWeight: 600, margin: 0, textAlign: "center" }}>💪 {workspaceResult.encouragement}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
