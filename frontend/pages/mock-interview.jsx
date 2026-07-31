import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

// ─── COLOR PALETTE (from your 3 references) ───
const COLORS = {
  bg: "#0A0A0A",           // MuseFlow deep black
  surface: "#111111",      // Elevated cards
  surfaceHighlight: "#1A1A1A",
  border: "rgba(232,224,213,0.08)", // HØLME cream at low opacity
  cream: "#E8E0D5",        // HØLME cream
  creamMuted: "#A89F94",   // Muted cream
  copper: "#B87333",       // HØLME rust/copper
  copperGlow: "rgba(184,115,51,0.15)",
  orange: "#F97316",       // MuseFlow orange
  orangeGlow: "rgba(249,115,22,0.15)",
  green: "#1B4332",        // Noxtua forest green
  greenLight: "#2D6A4F",
  greenGlow: "rgba(27,67,50,0.2)",
  red: "#DC2626",
  yellow: "#D97706",
};

const COMPANIES = [
  { name: "Google", logo: "https://www.google.com/favicon.ico" },
  { name: "Microsoft", logo: "https://www.microsoft.com/favicon.ico" },
  { name: "Amazon", logo: "https://www.amazon.in/favicon.ico" },
  { name: "Meta", logo: "https://www.meta.com/favicon.ico" },
  { name: "Apple", logo: "https://www.apple.com/favicon.ico" },
  { name: "Flipkart", logo: "https://www.flipkart.com/favicon.ico" },
  { name: "Zomato", logo: "https://www.zomato.com/favicon.ico" },
  { name: "Swiggy", logo: "https://www.swiggy.com/favicon.ico" },
  { name: "Razorpay", logo: "https://razorpay.com/favicon.ico" },
  { name: "CRED", logo: "https://www.cred.club/favicon.ico" },
  { name: "TCS", logo: "https://www.tcs.com/favicon.ico" },
  { name: "Infosys", logo: "https://www.infosys.com/favicon.ico" },
  { name: "Wipro", logo: "https://www.wipro.com/favicon.ico" },
  { name: "HCL", logo: "https://www.hcltech.com/favicon.ico" },
  { name: "Cognizant", logo: "https://www.cognizant.com/favicon.ico" },
  { name: "Capgemini", logo: "https://www.capgemini.com/favicon.ico" },
  { name: "Accenture", logo: "https://www.accenture.com/favicon.ico" },
];

const ROLES = [
  "Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "Data Analyst",
  "Data Engineer",
  "Data Scientist",
  "AI/ML Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cybersecurity Engineer",
  "Mobile Developer",
  "Product Manager",
  "QA Engineer",
  "System Design Engineer",
];

const companyLogos = {
  "Google": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>`,
  "Microsoft": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#ff5722" d="M6 6h17v17H6z"/><path fill="#4caf50" d="M25 6h17v17H25z"/><path fill="#ffc107" d="M6 25h17v17H6z"/><path fill="#03a9f4" d="M25 25h17v17H25z"/></svg>`,
  "Amazon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#FF9900" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="11" font-weight="bold" fill="white" font-family="Arial">amazon</text></svg>`,
  "Meta": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#1877F2" d="M24 4C13 4 4 13 4 24s9 20 20 20s20-9 20-20S35 4 24 4z"/><path fill="#fff" d="M26.5 28.5H30l.5-3.5h-4v-2c0-1 .5-2 2-2h2v-3s-1-.5-3-.5c-3 0-5 2-5 5v2.5h-3V28h3v8h4v-7.5z"/></svg>`,
  "Apple": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#fff" d="M38.5 32.2c-.7 1.5-1 2.2-1.9 3.6c-1.2 1.9-3 4.2-5.1 4.2c-1.9.1-2.4-1.2-5-1.2c-2.6 0-3.2 1.3-5.1 1.2c-2.1-.1-3.8-2.2-5-4.1c-3.5-5.3-3.8-11.5-1.7-14.8c1.5-2.3 3.8-3.7 6-3.7c2.2 0 3.6 1.2 5.5 1.2c1.8 0 2.9-1.2 5.5-1.2c2 0 4 1.1 5.5 3c-4.8 2.7-4 9.5.3 11.8z"/><path fill="#fff" d="M29 10.5c1-1.4 1.7-3.3 1.4-5.2c-1.7.1-3.7 1.2-4.8 2.6c-1 1.3-1.8 3.2-1.5 5.1c1.8.1 3.8-1 4.9-2.5z"/></svg>`,
  "Flipkart": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#2874F0" rx="8"/><path fill="#fff" d="M14 12h8v6h6v4h-6v14h-8zm14 10h8l-4 6 4 6h-8l-4-6z"/></svg>`,
  "Zomato": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#E23744" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="11" font-weight="bold" fill="white" font-family="Arial">zomato</text></svg>`,
  "Swiggy": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#FC8019" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="11" font-weight="bold" fill="white" font-family="Arial">swiggy</text></svg>`,
  "Razorpay": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#2D6BE4" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="9" font-weight="bold" fill="white" font-family="Arial">Razorpay</text></svg>`,
  "CRED": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#1A1A1A" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="13" font-weight="bold" fill="white" font-family="Arial">CRED</text></svg>`,
  "TCS": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#000080" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="14" font-weight="bold" fill="white" font-family="Arial">TCS</text></svg>`,
  "Infosys": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#007CC3" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="9" font-weight="bold" fill="white" font-family="Arial">INFOSYS</text></svg>`,
  "Wipro": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#341C6B" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="11" font-weight="bold" fill="white" font-family="Arial">WIPRO</text></svg>`,
  "HCL": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#0000A0" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="16" font-weight="bold" fill="white" font-family="Arial">HCL</text></svg>`,
  "Cognizant": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#0033A1" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="8" font-weight="bold" fill="white" font-family="Arial">Cognizant</text></svg>`,
  "Capgemini": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#0070AD" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="8" font-weight="bold" fill="white" font-family="Arial">Capgemini</text></svg>`,
  "Accenture": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#A100FF" rx="8"/><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-size="8" font-weight="bold" fill="white" font-family="Arial">Accenture</text></svg>`,
};

// ─── MOBILE STYLES ───
const styles = {
  appContainer: {
    minHeight: "100vh",
    backgroundColor: COLORS.bg,
    color: COLORS.cream,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    maxWidth: "480px",
    margin: "0 auto",
    position: "relative",
    overflowX: "hidden",
  },
  header: {
    backgroundColor: "rgba(10,10,10,0.85)",
    backdropFilter: "blur(20px)",
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "16px 20px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "16px",
  },
  cardGreen: {
    background: `linear-gradient(135deg, ${COLORS.green}20 0%, ${COLORS.surface} 100%)`,
    border: `1px solid ${COLORS.greenGlow}`,
  },
  cardCopper: {
    background: `linear-gradient(135deg, ${COLORS.copperGlow} 0%, ${COLORS.surface} 100%)`,
    border: `1px solid ${COLORS.copper}30`,
  },
  btnPrimary: {
    width: "100%",
    background: `linear-gradient(135deg, ${COLORS.copper} 0%, ${COLORS.orange} 100%)`,
    color: "#fff",
    fontWeight: 700,
    fontSize: "16px",
    padding: "16px 24px",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.3px",
    boxShadow: `0 4px 20px ${COLORS.copper}40`,
  },
  btnSecondary: {
    width: "100%",
    backgroundColor: COLORS.surfaceHighlight,
    color: COLORS.cream,
    fontWeight: 600,
    fontSize: "15px",
    padding: "14px 24px",
    borderRadius: "16px",
    border: `1px solid ${COLORS.border}`,
    cursor: "pointer",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 600,
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.surfaceHighlight,
    color: COLORS.creamMuted,
    transition: "all 0.2s ease",
  },
  chipActive: {
    backgroundColor: COLORS.copperGlow,
    borderColor: `${COLORS.copper}60`,
    color: COLORS.copper,
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.surfaceHighlight,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "16px",
    padding: "16px",
    color: COLORS.cream,
    fontSize: "15px",
    lineHeight: 1.6,
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
  },
  scoreRing: (score) => ({
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: `conic-gradient(${score >= 8 ? COLORS.greenLight : score >= 6 ? COLORS.yellow : score >= 4 ? COLORS.copper : COLORS.red} ${score * 36}deg, ${COLORS.surfaceHighlight} 0deg)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: "0 auto",
  }),
  progressBar: (pct, color) => ({
    height: "6px",
    borderRadius: "3px",
    backgroundColor: COLORS.surfaceHighlight,
    overflow: "hidden",
  }),
  progressFill: (pct, color) => ({
    height: "100%",
    width: `${pct}%`,
    backgroundColor: color,
    borderRadius: "3px",
    transition: "width 0.8s ease",
  }),
  badge: (type) => ({
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    ...(type === "excellent" ? { backgroundColor: `${COLORS.greenLight}25`, color: "#4ade80" } :
      type === "good" ? { backgroundColor: `${COLORS.yellow}20`, color: "#fbbf24" } :
      type === "average" ? { backgroundColor: `${COLORS.copper}25`, color: COLORS.copper } :
      { backgroundColor: `${COLORS.red}20`, color: "#f87171" })
  }),
  timer: (timer) => ({
    padding: "8px 16px",
    borderRadius: "12px",
    fontFamily: "monospace",
    fontWeight: 700,
    fontSize: "15px",
    backgroundColor: timer <= 30 ? `${COLORS.red}15` : timer <= 60 ? `${COLORS.yellow}15` : `${COLORS.greenLight}15`,
    color: timer <= 30 ? "#f87171" : timer <= 60 ? "#fbbf24" : "#4ade80",
    border: `1px solid ${timer <= 30 ? `${COLORS.red}30` : timer <= 60 ? `${COLORS.yellow}30` : `${COLORS.greenLight}30`}`,
  }),
  sectionTitle: {
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: COLORS.creamMuted,
    marginBottom: "12px",
    marginTop: "8px",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: 800,
    color: COLORS.cream,
    letterSpacing: "-0.5px",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "14px",
    color: COLORS.creamMuted,
    lineHeight: 1.5,
    marginTop: "6px",
  },
  scrollX: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    paddingBottom: "8px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  companyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  companyBtn: (selected) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "14px 8px",
    borderRadius: "16px",
    border: `1.5px solid ${selected ? COLORS.copper : COLORS.border}`,
    backgroundColor: selected ? COLORS.copperGlow : COLORS.surfaceHighlight,
    transition: "all 0.2s ease",
    cursor: "pointer",
  }),
  roleBtn: (selected) => ({
    width: "100%",
    textAlign: "left",
    padding: "14px 16px",
    borderRadius: "14px",
    border: `1.5px solid ${selected ? COLORS.copper : COLORS.border}`,
    backgroundColor: selected ? COLORS.copperGlow : COLORS.surfaceHighlight,
    color: selected ? COLORS.copper : COLORS.cream,
    fontSize: "14px",
    fontWeight: selected ? 700 : 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginBottom: "8px",
  }),
  difficultyBtn: (selected, color) => ({
    flex: 1,
    padding: "16px 8px",
    borderRadius: "16px",
    border: `1.5px solid ${selected ? color : COLORS.border}`,
    backgroundColor: selected ? `${color}15` : COLORS.surfaceHighlight,
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }),
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${COLORS.copper}, ${COLORS.orange})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "14px",
    color: "#fff",
    flexShrink: 0,
  },
  aiAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenLight})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: "14px",
    color: "#fff",
    flexShrink: 0,
  },
  messageBubble: (isUser) => ({
    backgroundColor: isUser ? COLORS.surfaceHighlight : COLORS.green,
    border: `1px solid ${isUser ? COLORS.border : `${COLORS.greenLight}40`}`,
    borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
    padding: "16px",
    color: COLORS.cream,
    fontSize: "15px",
    lineHeight: 1.6,
  }),
  bottomFade: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100px",
    background: `linear-gradient(to top, ${COLORS.bg} 0%, transparent 100%)`,
    pointerEvents: "none",
    zIndex: 40,
    maxWidth: "480px",
    margin: "0 auto",
  },
  floatingBtn: {
    position: "fixed",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 40px)",
    maxWidth: "440px",
    zIndex: 50,
  },
  safeBottom: { paddingBottom: "100px" },
};

export default function MockInterviewMobile() {
  const router = useRouter();
  const [screen, setScreen] = useState("setup");
  const [user, setUser] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluations, setEvaluations] = useState([]);
  const [currentEval, setCurrentEval] = useState(null);
  const [finalReport, setFinalReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("raxx_user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    if (timerActive && timer > 0) {
      timerRef.current = setTimeout(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && timerActive) {
      handleSubmitAnswer();
    }
    return () => clearTimeout(timerRef.current);
  }, [timer, timerActive]);

  const startInterview = async () => {
    if (!selectedCompany || !selectedRole) {
      alert("Please select company and role!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user?.id,
          company: selectedCompany,
          role: selectedRole,
          difficulty
        })
      });
      const data = await res.json();
      if (data.success) {
        setQuestions(data.questions);
        setCurrentQ(0);
        setEvaluations([]);
        setAnswer("");
        setTimer(120);
        setTimerActive(true);
        setScreen("interview");
      }
    } catch (err) {
      alert("Server error! Make sure backend is running.");
    }
    setLoading(false);
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please write your answer!");
      return;
    }
    setTimerActive(false);
    clearTimeout(timerRef.current);
    setLoading(true);
    setScreen("evaluation");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user?.id,
          session_id: `${user?.id}-${Date.now()}`,
          question: questions[currentQ]?.question,
          answer,
          company: selectedCompany,
          role: selectedRole,
          question_number: currentQ + 1
        })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentEval(data.evaluation);
        setEvaluations(prev => [...prev, { ...data.evaluation, question: questions[currentQ]?.question, answer }]);
      }
    } catch (err) {
      alert("Evaluation failed. Try again!");
    }
    setLoading(false);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setAnswer("");
      setCurrentEval(null);
      setTimer(120);
      setTimerActive(true);
      setScreen("interview");
    } else {
      generateFinalReport();
    }
  };

  const generateFinalReport = async () => {
    setLoading(true);
    setScreen("report");
    const avgScore = evaluations.reduce((a, b) => a + (b.score || 0), 0) / evaluations.length;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/interview/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user?.id,
          company: selectedCompany,
          role: selectedRole,
          total_questions: questions.length,
          score: Math.round(avgScore),
          feedback: evaluations.map(e => e.rating).join(", ")
        })
      });
      const data = await res.json();
      if (data.success) setFinalReport(data.report);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const resetInterview = () => {
    setScreen("setup");
    setSelectedCompany("");
    setSelectedRole("");
    setDifficulty("medium");
    setQuestions([]);
    setCurrentQ(0);
    setAnswer("");
    setEvaluations([]);
    setCurrentEval(null);
    setFinalReport(null);
    setTimerActive(false);
    setTimer(120);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "#4ade80";
    if (score >= 6) return "#fbbf24";
    if (score >= 4) return COLORS.copper;
    return "#f87171";
  };

  const getScoreBadge = (score) => {
    if (score >= 8) return "excellent";
    if (score >= 6) return "good";
    if (score >= 4) return "average";
    return "needs_work";
  };

  // ─── SETUP SCREEN ───
  if (screen === "setup") {
    return (
      <div style={styles.appContainer}>
        {/* Header */}
        <div style={styles.header}>
          <button 
            onClick={() => router.push("/dashboard/student")}
            style={{ background: "none", border: "none", color: COLORS.creamMuted, fontSize: "20px", cursor: "pointer" }}
          >
            ←
          </button>
          <span style={{ fontWeight: 700, fontSize: "16px", color: COLORS.cream }}>Mock Interview</span>
          <div style={{ width: 24 }} />
        </div>

        <div style={{ padding: "20px" }}>
          {/* Hero */}
          <div style={{ marginBottom: "28px", marginTop: "8px" }}>
            <h1 style={styles.pageTitle}>
              Practice with <span style={{ color: COLORS.copper }}>AI</span>
            </h1>
            <p style={styles.subtitle}>
              Real company questions. Instant feedback. Get interview-ready.
            </p>
          </div>

          {/* Company Selection */}
          <div style={styles.sectionTitle}>Select Company</div>
          <div style={styles.companyGrid}>
            {COMPANIES.map((company) => (
              <button
                key={company.name}
                onClick={() => setSelectedCompany(company.name)}
                style={styles.companyBtn(selectedCompany === company.name)}
              >
                <div
                  style={{ width: 32, height: 32 }}
                  dangerouslySetInnerHTML={{ __html: companyLogos[company.name] }}
                />
                <span style={{ 
                  fontSize: "11px", 
                  fontWeight: selectedCompany === company.name ? 700 : 500,
                  color: selectedCompany === company.name ? COLORS.copper : COLORS.creamMuted,
                  textAlign: "center",
                  lineHeight: 1.2
                }}>
                  {company.name}
                </span>
              </button>
            ))}
          </div>

          {/* Role Selection */}
          <div style={styles.sectionTitle}>Select Role</div>
          <div style={styles.scrollX}>
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                style={{
                  ...styles.chip,
                  ...(selectedRole === role ? styles.chipActive : {}),
                  whiteSpace: "nowrap",
                }}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div style={styles.sectionTitle}>Difficulty</div>
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { id: "easy", label: "Easy", desc: "Fresher", color: COLORS.greenLight },
              { id: "medium", label: "Medium", desc: "1-2 Yrs", color: COLORS.yellow },
              { id: "hard", label: "Hard", desc: "Senior", color: COLORS.red },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDifficulty(d.id)}
                style={styles.difficultyBtn(difficulty === d.id, d.color)}
              >
                <p style={{ 
                  fontWeight: 700, 
                  fontSize: "14px", 
                  color: difficulty === d.id ? d.color : COLORS.cream,
                  margin: 0 
                }}>
                  {d.label}
                </p>
                <p style={{ 
                  fontSize: "11px", 
                  color: COLORS.creamMuted, 
                  margin: "4px 0 0 0",
                  opacity: 0.8
                }}>
                  {d.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Summary */}
          {selectedCompany && selectedRole && (
            <div style={{
              ...styles.card,
              ...styles.cardCopper,
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: COLORS.copperGlow,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ fontSize: "20px" }}>🎯</span>
              </div>
              <div>
                <p style={{ fontSize: "13px", color: COLORS.creamMuted, margin: 0 }}>Ready to interview</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: COLORS.cream, margin: "2px 0 0 0" }}>
                  {selectedRole} at {selectedCompany}
                </p>
              </div>
            </div>
          )}

          <div style={{ height: 100 }} />
        </div>

        {/* Floating Start Button */}
        <div style={styles.floatingBtn}>
          <button
            onClick={startInterview}
            disabled={!selectedCompany || !selectedRole || loading}
            style={{
              ...styles.btnPrimary,
              opacity: (!selectedCompany || !selectedRole || loading) ? 0.5 : 1,
            }}
          >
            {loading ? "Generating..." : "Start Interview →"}
          </button>
        </div>
        <div style={styles.bottomFade} />
      </div>
    );
  }

  // ─── INTERVIEW SCREEN ───
  if (screen === "interview") {
    const q = questions[currentQ];
    return (
      <div style={styles.appContainer}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{ width: 28, height: 28 }}
              dangerouslySetInnerHTML={{ __html: companyLogos[selectedCompany] }}
            />
            <div>
              <p style={{ fontWeight: 700, fontSize: "14px", color: COLORS.cream, margin: 0 }}>
                {selectedCompany}
              </p>
              <p style={{ fontSize: "11px", color: COLORS.creamMuted, margin: 0 }}>
                {selectedRole}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", color: COLORS.creamMuted }}>
              {currentQ + 1}/{questions.length}
            </span>
            <div style={styles.timer(timer)}>
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ width: "100%", height: 3, backgroundColor: COLORS.surfaceHighlight }}>
          <div style={{
            height: "100%",
            width: `${((currentQ) / questions.length) * 100}%`,
            background: `linear-gradient(90deg, ${COLORS.copper}, ${COLORS.orange})`,
            transition: "width 0.5s ease",
          }} />
        </div>

        <div style={{ padding: "20px", ...styles.safeBottom }}>
          {/* Question */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <div style={styles.aiAvatar}>AI</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "11px", color: COLORS.greenLight, fontWeight: 600, marginBottom: "6px" }}>
                Interviewer • {selectedCompany}
              </p>
              <div style={styles.messageBubble(false)}>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.6 }}>{q?.question}</p>
                {q?.hint && (
                  <p style={{ 
                    margin: "12px 0 0 0", 
                    fontSize: "12px", 
                    color: COLORS.creamMuted,
                    borderTop: `1px solid ${COLORS.greenLight}30`,
                    paddingTop: "10px"
                  }}>
                    💡 {q.hint}
                  </p>
                )}
              </div>
              <span style={{ fontSize: "11px", color: COLORS.creamMuted, marginTop: "6px", display: "block" }}>
                {q?.type} • {q?.difficulty}
              </span>
            </div>
          </div>

          {/* Answer Input */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{
              ...styles.avatar,
              background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.copper})`,
            }}>
              {user?.name?.[0]?.toUpperCase() || "Y"}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "11px", color: COLORS.creamMuted, marginBottom: "6px" }}>Your Answer</p>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your structured answer here..."
                rows={6}
                style={styles.input}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                <span style={{ fontSize: "12px", color: COLORS.creamMuted }}>
                  {answer.length} chars
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Submit */}
        <div style={styles.floatingBtn}>
          <button
            onClick={handleSubmitAnswer}
            disabled={!answer.trim() || loading}
            style={{
              ...styles.btnPrimary,
              opacity: (!answer.trim() || loading) ? 0.5 : 1,
            }}
          >
            {loading ? "Evaluating..." : "Submit Answer →"}
          </button>
        </div>
        <div style={styles.bottomFade} />
      </div>
    );
  }

  // ─── EVALUATION SCREEN ───
  if (screen === "evaluation") {
    return (
      <div style={styles.appContainer}>
        <div style={styles.header}>
          <span style={{ fontWeight: 700, fontSize: "16px", color: COLORS.cream }}>
            Feedback
          </span>
          <span style={{ fontSize: "13px", color: COLORS.creamMuted }}>
            Q{currentQ + 1}/{questions.length}
          </span>
        </div>

        <div style={{ padding: "20px", ...styles.safeBottom }}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", gap: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                border: `3px solid ${COLORS.copper}30`,
                borderTopColor: COLORS.copper,
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ color: COLORS.creamMuted, fontSize: "15px" }}>AI is evaluating...</p>
            </div>
          ) : currentEval ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Score Ring */}
              <div style={styles.card}>
                <div style={styles.scoreRing(currentEval.score)}>
                  <div style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: COLORS.surface,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "32px", fontWeight: 800, color: getScoreColor(currentEval.score) }}>
                      {currentEval.score}
                    </span>
                    <span style={{ fontSize: "12px", color: COLORS.creamMuted }}>/10</span>
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "16px" }}>
                  <span style={styles.badge(getScoreBadge(currentEval.score))}>
                    {currentEval.rating}
                  </span>
                </div>
              </div>

              {/* Your Answer */}
              <div style={styles.card}>
                <p style={{ ...styles.sectionTitle, marginTop: 0 }}>Your Answer</p>
                <p style={{ fontSize: "14px", color: COLORS.creamMuted, lineHeight: 1.6, margin: 0 }}>
                  {evaluations[evaluations.length - 1]?.answer}
                </p>
              </div>

              {/* Good vs Missing */}
              <div style={styles.card}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "20px" }}>✅</span>
                  <div>
                    <p style={{ fontWeight: 700, color: "#4ade80", fontSize: "14px", margin: "0 0 6px 0" }}>What Was Good</p>
                    <p style={{ fontSize: "14px", color: COLORS.creamMuted, lineHeight: 1.6, margin: 0 }}>
                      {currentEval.what_was_good}
                    </p>
                  </div>
                </div>
                <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: "16px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>❌</span>
                  <div>
                    <p style={{ fontWeight: 700, color: "#f87171", fontSize: "14px", margin: "0 0 6px 0" }}>What Was Missing</p>
                    <p style={{ fontSize: "14px", color: COLORS.creamMuted, lineHeight: 1.6, margin: 0 }}>
                      {currentEval.what_was_missing}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ideal Answer */}
              <div style={{ ...styles.card, ...styles.cardGreen }}>
                <p style={{ fontWeight: 700, color: COLORS.greenLight, fontSize: "14px", margin: "0 0 8px 0" }}>
                  💡 Ideal Answer Should Cover
                </p>
                <p style={{ fontSize: "14px", color: COLORS.creamMuted, lineHeight: 1.6, margin: 0 }}>
                  {currentEval.ideal_answer_points}
                </p>
              </div>

              {/* Follow Up */}
              <div style={styles.card}>
                <p style={{ fontWeight: 700, color: COLORS.yellow, fontSize: "14px", margin: "0 0 8px 0" }}>
                  🔁 Follow-up Question
                </p>
                <p style={{ fontSize: "14px", color: COLORS.cream, fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
                  "{currentEval.follow_up_question}"
                </p>
              </div>

              {/* Encouragement */}
              <div style={{ ...styles.card, ...styles.cardCopper, textAlign: "center" }}>
                <p style={{ fontSize: "15px", color: COLORS.copper, fontWeight: 600, margin: 0 }}>
                  💪 {currentEval.encouragement}
                </p>
              </div>

              <div style={{ height: 20 }} />
            </div>
          ) : null}
        </div>

        {/* Floating Next */}
        <div style={styles.floatingBtn}>
          <button
            onClick={nextQuestion}
            style={styles.btnPrimary}
          >
            {currentQ < questions.length - 1
              ? `Next Question (${currentQ + 2}/${questions.length}) →`
              : "View Final Report 📊"}
          </button>
        </div>
        <div style={styles.bottomFade} />
      </div>
    );
  }

  // ─── FINAL REPORT SCREEN ───
  if (screen === "report") {
    const avgScore = evaluations.length > 0
      ? Math.round(evaluations.reduce((a, b) => a + (b.score || 0), 0) / evaluations.length)
      : 0;

    return (
      <div style={styles.appContainer}>
        <div style={styles.header}>
          <span style={{ fontWeight: 700, fontSize: "16px", color: COLORS.cream }}>
            📊 Report
          </span>
          <span style={{ fontSize: "12px", color: COLORS.creamMuted }}>
            {selectedCompany}
          </span>
        </div>

        <div style={{ padding: "20px", ...styles.safeBottom }}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", gap: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                border: `3px solid ${COLORS.copper}30`,
                borderTopColor: COLORS.copper,
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ color: COLORS.creamMuted, fontSize: "15px" }}>Generating report...</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Overall Score */}
              <div style={{ ...styles.card, textAlign: "center" }}>
                <div style={styles.scoreRing(avgScore)}>
                  <div style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: COLORS.surface,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "36px", fontWeight: 800, color: getScoreColor(avgScore) }}>
                      {avgScore}
                    </span>
                    <span style={{ fontSize: "12px", color: COLORS.creamMuted }}>/10</span>
                  </div>
                </div>
                <p style={{ fontWeight: 800, fontSize: "20px", color: COLORS.cream, margin: "16px 0 4px 0" }}>
                  {finalReport?.overall_rating || "Good"}
                </p>
                <p style={{ fontSize: "13px", color: COLORS.creamMuted, margin: 0 }}>
                  {selectedRole} at {selectedCompany}
                </p>
                {finalReport?.hire_recommendation && (
                  <div style={{ marginTop: "12px" }}>
                    <span style={styles.badge(getScoreBadge(avgScore))}>
                      {finalReport.hire_recommendation}
                    </span>
                  </div>
                )}
              </div>

              {/* Per Question */}
              <div style={styles.card}>
                <p style={{ ...styles.sectionTitle, marginTop: 0 }}>Question Performance</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {evaluations.map((ev, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "13px", color: COLORS.creamMuted, width: 28, fontWeight: 600 }}>
                        Q{i + 1}
                      </span>
                      <div style={{ flex: 1, ...styles.progressBar() }}>
                        <div style={styles.progressFill(ev.score * 10, getScoreColor(ev.score))} />
                      </div>
                      <span style={{ 
                        fontSize: "13px", 
                        fontWeight: 700, 
                        color: getScoreColor(ev.score),
                        width: 40,
                        textAlign: "right"
                      }}>
                        {ev.score}/10
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {finalReport && (
                <>
                  {/* Strengths */}
                  <div style={{ ...styles.card, ...styles.cardGreen }}>
                    <p style={{ fontWeight: 700, color: "#4ade80", fontSize: "14px", margin: "0 0 12px 0" }}>
                      💪 Your Strengths
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {finalReport.top_strengths?.map((s, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <span style={{ color: "#4ade80", fontSize: "14px", marginTop: "2px" }}>✓</span>
                          <p style={{ fontSize: "14px", color: COLORS.creamMuted, lineHeight: 1.5, margin: 0 }}>
                            {s}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Areas to Improve */}
                  <div style={styles.card}>
                    <p style={{ fontWeight: 700, color: "#f87171", fontSize: "14px", margin: "0 0 12px 0" }}>
                      📈 Areas to Improve
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {finalReport.areas_to_improve?.map((a, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <span style={{ color: "#f87171", fontSize: "14px", marginTop: "2px" }}>•</span>
                          <p style={{ fontSize: "14px", color: COLORS.creamMuted, lineHeight: 1.5, margin: 0 }}>
                            {a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Study Topics */}
                  <div style={{ ...styles.card, ...styles.cardCopper }}>
                    <p style={{ fontWeight: 700, color: COLORS.copper, fontSize: "14px", margin: "0 0 12px 0" }}>
                      📚 Study Next
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {finalReport.study_topics?.map((t, i) => (
                        <span key={i} style={{
                          ...styles.chip,
                          backgroundColor: `${COLORS.copper}15`,
                          borderColor: `${COLORS.copper}30`,
                          color: COLORS.copper,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div style={styles.card}>
                    <p style={{ fontWeight: 700, color: COLORS.yellow, fontSize: "14px", margin: "0 0 8px 0" }}>
                      🗓️ 2-Week Plan
                    </p>
                    <p style={{ fontSize: "14px", color: COLORS.creamMuted, lineHeight: 1.6, margin: 0 }}>
                      {finalReport.next_steps}
                    </p>
                  </div>

                  {/* Motivation */}
                  <div style={{ ...styles.card, ...styles.cardCopper, textAlign: "center" }}>
                    <p style={{ fontSize: "15px", color: COLORS.copper, fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                      💪 {finalReport.motivational_message}
                    </p>
                  </div>
                </>
              )}

              <div style={{ height: 20 }} />
            </div>
          )}
        </div>

        {/* Floating Actions */}
        <div style={styles.floatingBtn}>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={resetInterview} style={styles.btnSecondary}>
              🔄 New
            </button>
            <button 
              onClick={() => router.push("/dashboard/student")} 
              style={styles.btnPrimary}
            >
              🏠 Dashboard
            </button>
          </div>
        </div>
        <div style={styles.bottomFade} />
      </div>
    );
  }

  return null;
}