import { useState, useRef } from "react";
import { useRouter } from "next/router";

// ─── RAXX DESIGN SYSTEM ───
const C = {
  bg: "#0F1A14",
  surface: "#16241D",
  surfaceHi: "#1E3228",
  border: "rgba(232,221,208,0.07)",
  cream: "#E8DDD0",
  creamMute: "#8A9A8A",
  terra: "#C46B4A",
  terraGlow: "rgba(196,107,74,0.15)",
  forest: "#3D5A48",
  forestHi: "#4A8C6A",
  forestGlow: "rgba(61,90,72,0.2)",
  gold: "#D4A843",
  orange: "#F5A623",
  red: "#E05A5A",
  green: "#4A8C6A",
};

const EXAM_TYPES = ["UPSC", "SSC", "Board Exam", "GATE", "NEET", "JEE", "Bank PO", "NDA", "Other"];

const SUBJECTS = {
  "UPSC": ["General Studies", "History", "Geography", "Polity", "Economy", "Environment", "Ethics"],
  "SSC": ["General Awareness", "English", "Reasoning", "Mathematics"],
  "Board Exam": ["Physics", "Chemistry", "Biology", "Mathematics", "History", "Geography", "English", "Hindi"],
  "GATE": ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"],
  "NEET": ["Physics", "Chemistry", "Biology"],
  "JEE": ["Physics", "Chemistry", "Mathematics"],
  "Bank PO": ["English", "Reasoning", "Quantitative Aptitude", "General Awareness"],
  "NDA": ["Mathematics", "General Ability", "English"],
};

const SAMPLE_QUESTIONS = {
  "UPSC": [
    { question: "Discuss the role of civil society in strengthening democracy in India.", word_limit: 250, marks: 15, topic: "Polity" },
    { question: "Explain the causes and consequences of soil erosion in India.", word_limit: 200, marks: 10, topic: "Geography" },
    { question: "What is the significance of the Preamble of the Indian Constitution?", word_limit: 150, marks: 10, topic: "Polity" },
  ],
  "Board Exam": [
    { question: "Explain the process of photosynthesis with a neat diagram.", word_limit: 200, marks: 5, topic: "Biology" },
    { question: "Describe Newton's three laws of motion with examples.", word_limit: 250, marks: 10, topic: "Physics" },
    { question: "Write a note on the causes of World War I.", word_limit: 200, marks: 8, topic: "History" },
  ],
  "SSC": [
    { question: "Write a short note on the Indian Space Research Organisation (ISRO).", word_limit: 150, marks: 5, topic: "General Awareness" },
    { question: "Describe the importance of renewable energy sources in India.", word_limit: 200, marks: 8, topic: "General Awareness" },
  ],
};

export default function AnswerWriting() {
  const router = useRouter();
  const [step, setStep] = useState("setup");
  const [examType, setExamType] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedQ, setSelectedQ] = useState(null);
  const [customQ, setCustomQ] = useState("");
  const [useCustomQ, setUseCustomQ] = useState(false);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [aiQuestions, setAiQuestions] = useState([]);
  const fileRef = useRef(null);
  const cameraRef = useRef(null);

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("raxx_user") || "{}")
    : {};

  const loadAIQuestions = async () => {
    if (!examType || !subject) return;
    setLoadingQuestions(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/answer/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam_type: examType, subject }),
      });
      const data = await res.json();
      if (data.success) setAiQuestions(data.questions);
    } catch {
      setAiQuestions(SAMPLE_QUESTIONS[examType] || []);
    }
    setLoadingQuestions(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setImageBase64(result.split(",")[1]);
      setMediaType(file.type);
      setImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleEvaluate = async () => {
    if (!imageBase64) return;
    const question = useCustomQ ? customQ : selectedQ?.question;
    if (!question) return;

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/answer/evaluate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id || "guest",
          image_base64: imageBase64,
          media_type: mediaType,
          question,
          exam_type: examType,
          subject,
          word_limit: selectedQ?.word_limit || 200,
          marks: selectedQ?.marks || 10,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEvaluation(data.evaluation);
        setStep("result");
      }
    } catch {
      alert("Error! Make sure backend is running.");
    }
    setLoading(false);
  };

  const resetAll = () => {
    setStep("setup");
    setExamType("");
    setSubject("");
    setSelectedQ(null);
    setCustomQ("");
    setUseCustomQ(false);
    setImage(null);
    setImageBase64("");
    setMediaType("");
    setEvaluation(null);
    setAiQuestions([]);
  };

  const scoreColor = (score, max = 10) => {
    const pct = (score / max) * 100;
    return pct >= 75 ? C.green : pct >= 50 ? C.gold : C.red;
  };

  // ─── STYLES ───
  const appStyle = {
    minHeight: "100vh",
    backgroundColor: C.bg,
    color: C.cream,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    maxWidth: 480,
    margin: "0 auto",
    position: "relative",
    overflowX: "hidden",
  };

  const headStyle = {
    backgroundColor: "rgba(15,26,20,0.92)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: `1px solid ${C.border}`,
    padding: "14px 20px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    gap: 12,
  };

  const cardStyle = {
    backgroundColor: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  };

  const btnPriStyle = {
    width: "100%",
    backgroundColor: C.terra,
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    padding: "16px 24px",
    borderRadius: 16,
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.3px",
    boxShadow: `0 4px 24px ${C.terra}30`,
  };

  const btnSecStyle = {
    width: "100%",
    backgroundColor: C.forest,
    color: C.cream,
    fontWeight: 600,
    fontSize: 15,
    padding: "14px 24px",
    borderRadius: 16,
    border: `1px solid ${C.forest}50`,
    cursor: "pointer",
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: C.surfaceHi,
    border: `1px solid ${C.border}`,
    borderRadius: 14,
    padding: "14px 16px",
    color: C.cream,
    fontSize: 15,
    outline: "none",
    fontFamily: "inherit",
    resize: "none",
    lineHeight: 1.6,
    boxSizing: "border-box",
  };

  const chipStyle = (active, color) => ({
    padding: "10px 16px",
    borderRadius: 12,
    fontSize: 13,
    fontWeight: 600,
    border: `1.5px solid ${active ? color : C.border}`,
    backgroundColor: active ? `${color}15` : C.surfaceHi,
    color: active ? color : C.creamMute,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  });

  const secTitleStyle = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: C.creamMute,
    marginBottom: 12,
    marginTop: 0,
  };

  const pageTitleStyle = {
    fontSize: 26,
    fontWeight: 800,
    color: C.cream,
    letterSpacing: "-0.5px",
    lineHeight: 1.2,
    margin: 0,
  };

  const subStyle = {
    fontSize: 14,
    color: C.creamMute,
    lineHeight: 1.5,
    marginTop: 6,
  };

  const floatStyle = {
    position: "fixed",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 40px)",
    maxWidth: 440,
    zIndex: 50,
  };

  const fadeStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    background: `linear-gradient(to top, ${C.bg} 0%, transparent 100%)`,
    pointerEvents: "none",
    zIndex: 40,
    maxWidth: 480,
    margin: "0 auto",
  };

  const pillStyle = (color, bg) => ({
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    backgroundColor: bg,
    color: color,
    letterSpacing: "0.3px",
  });

  const scoreRingStyle = (color) => ({
    width: 110,
    height: 110,
    borderRadius: "50%",
    border: `4px solid ${color}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 auto",
  });

  const barStyle = {
    height: 4,
    backgroundColor: C.surfaceHi,
    borderRadius: 2,
    overflow: "hidden",
  };

  const progressStyle = (pct, color) => ({
    height: "100%",
    width: `${pct}%`,
    backgroundColor: color,
    borderRadius: 2,
    transition: "width 0.8s ease",
  });

  const labelStyle = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: C.creamMute,
    marginBottom: 8,
  };

  const safeBottom = { paddingBottom: 100 };

  // ─── SETUP ───
  if (step === "setup") {
    return (
      <div style={appStyle}>
        <div style={headStyle}>
          <button
            onClick={() => router.push("/dashboard/student")}
            style={{ background: "none", border: "none", color: C.creamMute, fontSize: 20, cursor: "pointer", padding: 0 }}
          >
            ←
          </button>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: 17, color: C.cream, margin: 0, letterSpacing: "-0.3px" }}>
              Answer Evaluator
            </h1>
            <p style={{ fontSize: 10, color: C.creamMute, margin: "2px 0 0 0", letterSpacing: 1, textTransform: "uppercase" }}>
              AI-Powered Feedback
            </p>
          </div>
        </div>

        <div style={{ padding: 20, ...safeBottom }}>
          <div style={{ marginBottom: 28, marginTop: 4 }}>
            <h1 style={pageTitleStyle}>
              Write. Click. <span style={{ color: C.terra }}>Improve.</span>
            </h1>
            <p style={subStyle}>Upload your handwritten answer and get instant AI evaluation.</p>
          </div>

          <div style={cardStyle}>
            <p style={secTitleStyle}>Select Exam Type</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {EXAM_TYPES.map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    setExamType(e);
                    setSubject("");
                    setAiQuestions([]);
                  }}
                  style={chipStyle(examType === e, C.terra)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {examType && examType !== "Other" && (
            <div style={cardStyle}>
              <p style={secTitleStyle}>Select Subject</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(SUBJECTS[examType] || []).map((su) => (
                  <button key={su} onClick={() => setSubject(su)} style={chipStyle(subject === su, C.forestHi)}>
                    {su}
                  </button>
                ))}
              </div>
            </div>
          )}

          {examType === "Other" && (
            <div style={{ ...cardStyle, background: `linear-gradient(180deg, ${C.forestGlow} 0%, ${C.surface} 100%)`, border: `1px solid ${C.forest}25` }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: C.forestHi, margin: "0 0 6px 0" }}>
                🎓 Universal Mode
              </p>
              <p style={{ fontSize: 13, color: C.creamMute, lineHeight: 1.5, margin: 0 }}>
                Engineering, Medical, Business, Law — any subject works! Just type your question in the next step.
              </p>
            </div>
          )}

          {examType && (examType === "Other" || subject) && (
            <div style={floatStyle}>
              <button
                onClick={() => {
                  if (examType === "Other") setSubject("General");
                  setStep("question");
                  if (examType !== "Other") loadAIQuestions();
                }}
                style={btnPriStyle}
              >
                Continue →
              </button>
            </div>
          )}
        </div>
        <div style={fadeStyle} />
      </div>
    );
  }

  // ─── QUESTION ───
  if (step === "question") {
    return (
      <div style={appStyle}>
        <div style={headStyle}>
          <button onClick={() => setStep("setup")} style={{ background: "none", border: "none", color: C.creamMute, fontSize: 20, cursor: "pointer", padding: 0 }}>
            ←
          </button>
          <span style={{ fontWeight: 800, fontSize: 16, color: C.cream }}>Select Question</span>
          <span style={{ ...pillStyle(C.terra, C.terraGlow), fontSize: 10, marginLeft: "auto" }}>
            {examType} • {subject}
          </span>
        </div>

        <div style={{ padding: 20, ...safeBottom }}>
          {examType === "Other" && (
            <div style={cardStyle}>
              <p style={secTitleStyle}>Type Your Question</p>
              <textarea
                value={customQ}
                onChange={(e) => {
                  setCustomQ(e.target.value);
                  setUseCustomQ(true);
                }}
                placeholder="Paste or type your question here..."
                rows={4}
                style={inputStyle}
              />
            </div>
          )}

          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={secTitleStyle}>Select a Question</p>
              {loadingQuestions && <span style={{ fontSize: 12, color: C.terra }}>Generating...</span>}
            </div>
            {(aiQuestions.length > 0 ? aiQuestions : SAMPLE_QUESTIONS[examType] || []).map((q, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedQ(q);
                  setUseCustomQ(false);
                }}
                style={{
                  padding: 16,
                  borderRadius: 14,
                  marginBottom: 10,
                  cursor: "pointer",
                  backgroundColor: selectedQ === q && !useCustomQ ? C.terraGlow : C.surfaceHi,
                  border: `1.5px solid ${selectedQ === q && !useCustomQ ? `${C.terra}40` : C.border}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <p style={{ fontSize: 14, color: C.cream, fontWeight: 500, margin: "0 0 10px 0", lineHeight: 1.5, flex: 1 }}>
                    {q.question}
                  </p>
                  {selectedQ === q && !useCustomQ && <span style={{ color: C.terra, fontSize: 16, flexShrink: 0 }}>✓</span>}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={pillStyle(C.creamMute, C.surface)}>{q.word_limit} words</span>
                  <span style={pillStyle(C.creamMute, C.surface)}>{q.marks} marks</span>
                  {q.topic && <span style={pillStyle(C.terra, C.terraGlow)}>{q.topic}</span>}
                </div>
              </div>
            ))}
          </div>

          {examType !== "Other" && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <input
                  type="checkbox"
                  checked={useCustomQ}
                  onChange={(e) => setUseCustomQ(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: C.terra }}
                />
                <p style={{ fontSize: 14, fontWeight: 700, color: C.cream, margin: 0 }}>Or write your own question</p>
              </div>
              {useCustomQ && (
                <textarea
                  value={customQ}
                  onChange={(e) => setCustomQ(e.target.value)}
                  placeholder="Type your question..."
                  rows={3}
                  style={inputStyle}
                />
              )}
            </div>
          )}

          <div style={floatStyle}>
            <button
              onClick={() => setStep("upload")}
              disabled={!selectedQ && (!useCustomQ || !customQ.trim())}
              style={{
                ...btnPriStyle,
                opacity: !selectedQ && (!useCustomQ || !customQ.trim()) ? 0.4 : 1,
                cursor: !selectedQ && (!useCustomQ || !customQ.trim()) ? "not-allowed" : "pointer",
              }}
            >
              Continue → Upload Photo
            </button>
          </div>
        </div>
        <div style={fadeStyle} />
      </div>
    );
  }

  // ─── UPLOAD ───
  if (step === "upload") {
    return (
      <div style={appStyle}>
        <div style={headStyle}>
          <button onClick={() => setStep("question")} style={{ background: "none", border: "none", color: C.creamMute, fontSize: 20, cursor: "pointer", padding: 0 }}>
            ←
          </button>
          <span style={{ fontWeight: 800, fontSize: 16, color: C.cream }}>Upload Answer</span>
        </div>

        <div style={{ padding: 20, ...safeBottom }}>
          <div style={{ ...cardStyle, background: `linear-gradient(180deg, ${C.terraGlow} 0%, ${C.surface} 100%)`, border: `1px solid ${C.terra}20` }}>
            <p style={{ ...labelStyle, color: C.terra }}>Your Question</p>
            <p style={{ fontSize: 14, color: C.cream, lineHeight: 1.6, margin: "0 0 10px 0" }}>
              {useCustomQ ? customQ : selectedQ?.question}
            </p>
            {selectedQ && !useCustomQ && (
              <div style={{ display: "flex", gap: 8 }}>
                <span style={pillStyle(C.creamMute, C.surface)}>{selectedQ.word_limit} words</span>
                <span style={pillStyle(C.creamMute, C.surface)}>{selectedQ.marks} marks</span>
              </div>
            )}
          </div>

          <div style={cardStyle}>
            <p style={secTitleStyle}>Upload Handwritten Answer</p>
            {!image ? (
              <>
                <div
                  onClick={() => fileRef.current.click()}
                  style={{
                    border: `2px dashed ${C.border}`,
                    borderRadius: 16,
                    padding: "40px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: 12,
                    backgroundColor: C.surfaceHi,
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📷</div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: C.cream, margin: "0 0 4px 0" }}>Tap to upload photo</p>
                  <p style={{ fontSize: 12, color: C.creamMute, margin: 0 }}>JPG, PNG, WEBP supported</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
                <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handleFileUpload} style={{ display: "none" }} />
                <button onClick={() => cameraRef.current.click()} style={{ ...btnSecStyle, backgroundColor: C.surfaceHi }}>
                  📱 Take Photo with Camera
                </button>
              </>
            ) : (
              <>
                <div style={{ position: "relative", marginBottom: 12 }}>
                  <img
                    src={image}
                    alt="Answer"
                    style={{
                      width: "100%",
                      borderRadius: 14,
                      border: `1px solid ${C.border}`,
                      maxHeight: 400,
                      objectFit: "contain",
                      backgroundColor: C.surfaceHi,
                    }}
                  />
                  <button
                    onClick={() => {
                      setImage(null);
                      setImageBase64("");
                    }}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: C.red,
                      border: "none",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p style={{ color: C.green, fontSize: 13, fontWeight: 700, textAlign: "center", margin: "0 0 12px 0" }}>
                  ✓ Photo uploaded
                </p>
              </>
            )}
          </div>

          <div style={{ ...cardStyle, background: `linear-gradient(180deg, ${C.forestGlow} 0%, ${C.surface} 100%)`, border: `1px solid ${C.forest}25`, padding: 16 }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: C.forestHi, margin: "0 0 10px 0" }}>💡 Tips for best results</p>
            {["Good lighting — avoid shadows", "Keep paper flat & camera straight", "Handwriting must be clearly visible", "Entire answer should be in frame"].map((tip) => (
              <p key={tip} style={{ fontSize: 12, color: C.creamMute, margin: "0 0 4px 0" }}>
                • {tip}
              </p>
            ))}
          </div>

          <div style={floatStyle}>
            <button
              onClick={handleEvaluate}
              disabled={!imageBase64 || loading}
              style={{
                ...btnPriStyle,
                opacity: !imageBase64 || loading ? 0.4 : 1,
                cursor: !imageBase64 || loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "🤖 AI Evaluating..." : "🤖 Evaluate with AI"}
            </button>
          </div>
        </div>
        <div style={fadeStyle} />
      </div>
    );
  }

  // ─── RESULT ───
  if (step === "result" && evaluation) {
    const maxMarks = selectedQ?.marks || 10;
    const pct = Math.round((evaluation.score / maxMarks) * 100);
    const sc = scoreColor(evaluation.score, maxMarks);

    return (
      <div style={appStyle}>
        <div style={headStyle}>
          <span style={{ fontWeight: 800, fontSize: 16, color: C.cream }}>Evaluation</span>
          <button
            onClick={resetAll}
            style={{ ...pillStyle(C.cream, C.surfaceHi), marginLeft: "auto", cursor: "pointer", border: `1px solid ${C.border}` }}
          >
            ✍️ New
          </button>
        </div>

        <div style={{ padding: 20, ...safeBottom }}>
          <div style={{ ...cardStyle, textAlign: "center" }}>
            <div style={scoreRingStyle(sc)}>
              <p style={{ fontSize: 32, fontWeight: 900, color: sc, margin: 0, lineHeight: 1 }}>{evaluation.score}</p>
              <p style={{ fontSize: 12, color: C.creamMute, margin: 0 }}>/{maxMarks}</p>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.cream, margin: "16px 0 4px 0" }}>{evaluation.rating}</h2>
            <p style={{ fontSize: 13, color: C.creamMute, margin: "0 0 16px 0" }}>
              {examType} • {subject}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { label: "Structure", value: evaluation.structure_score },
                { label: "Content", value: evaluation.content_score },
                { label: "Language", value: evaluation.language_score },
              ].map((su) => (
                <div key={su.label} style={{ backgroundColor: C.surfaceHi, borderRadius: 12, padding: 12, border: `1px solid ${C.border}` }}>
                  <p style={{ fontSize: 18, fontWeight: 800, color: scoreColor(su.value), margin: "0 0 2px 0" }}>
                    {su.value}
                    <span style={{ fontSize: 11, color: C.creamMute }}>/10</span>
                  </p>
                  <p style={{ fontSize: 10, color: C.creamMute, margin: "0 0 8px 0", fontWeight: 600 }}>{su.label}</p>
                  <div style={barStyle}>
                    <div style={progressStyle(su.value * 10, scoreColor(su.value))} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <p style={labelStyle}>Question</p>
            <p style={{ fontSize: 14, color: C.cream, lineHeight: 1.6, margin: 0 }}>
              {useCustomQ ? customQ : selectedQ?.question}
            </p>
          </div>

          <div style={{ ...cardStyle, backgroundColor: `${C.green}10`, border: `1px solid ${C.green}25` }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: C.green, margin: "0 0 8px 0" }}>✅ What Was Good</p>
            <p style={{ fontSize: 14, color: C.cream, lineHeight: 1.6, margin: 0 }}>{evaluation.what_was_good}</p>
          </div>

          <div style={{ ...cardStyle, backgroundColor: `${C.red}10`, border: `1px solid ${C.red}25` }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: C.red, margin: "0 0 8px 0" }}>❌ What Was Missing</p>
            <p style={{ fontSize: 14, color: C.cream, lineHeight: 1.6, margin: 0 }}>{evaluation.what_was_missing}</p>
          </div>

          <div style={{ ...cardStyle, backgroundColor: `${C.forestHi}10`, border: `1px solid ${C.forestHi}25` }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: C.forestHi, margin: "0 0 8px 0" }}>💡 Ideal Answer Should Cover</p>
            <p style={{ fontSize: 14, color: C.cream, lineHeight: 1.6, margin: 0 }}>{evaluation.ideal_answer_points}</p>
          </div>

          <div style={{ ...cardStyle, backgroundColor: `${C.gold}10`, border: `1px solid ${C.gold}25` }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: C.gold, margin: "0 0 8px 0" }}>📝 Tips to Improve</p>
            <p style={{ fontSize: 14, color: C.cream, lineHeight: 1.6, margin: 0 }}>{evaluation.tips}</p>
          </div>

          <div style={{ ...cardStyle, background: `linear-gradient(180deg, ${C.terraGlow} 0%, ${C.surface} 100%)`, border: `1px solid ${C.terra}20`, textAlign: "center" }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.terra, margin: 0 }}>💪 {evaluation.encouragement}</p>
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[
              { label: "Words", val: evaluation.word_count || "~", color: C.cream },
              { label: "Readable", val: evaluation.handwriting_readable ? "✓ Yes" : "✗ No", color: evaluation.handwriting_readable ? C.green : C.red },
              { label: "Score %", val: `${pct}%`, color: sc },
            ].map((st) => (
              <div key={st.label} style={{ flex: 1, backgroundColor: C.surface, borderRadius: 14, padding: 14, textAlign: "center", border: `1px solid ${C.border}` }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: st.color, margin: "0 0 2px 0" }}>{st.val}</p>
                <p style={{ fontSize: 11, color: C.creamMute, margin: 0 }}>{st.label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <button onClick={resetAll} style={btnPriStyle}>✍️ New Answer</button>
            <button onClick={() => router.push("/dashboard/student")} style={btnSecStyle}>🏠 Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}