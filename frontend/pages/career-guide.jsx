import { useState } from "react";
import { useRouter } from "next/router";

// ─── RAXX COLOR PALETTE (from your screenshot) ───
const COLORS = {
  bg: "#0F1A14",           // Deep forest black-green
  surface: "#16241D",      // Card background
  surfaceHighlight: "#1E3228", // Elevated elements
  border: "rgba(232,221,208,0.07)", // Subtle cream border
  cream: "#E8DDD0",        // Warm cream text
  creamMuted: "#8A9A8A",   // Muted sage text
  terracotta: "#C46B4A",   // Ask Doubt button rust
  terracottaGlow: "rgba(196,107,74,0.15)",
  forest: "#3D5A48",       // Study Plan muted green
  forestLight: "#4A8C6A",  // Lighter green accent
  forestGlow: "rgba(61,90,72,0.2)",
  gold: "#D4A843",         // Coins
  orange: "#F5A623",       // Streak/fire
  red: "#E05A5A",
  yellow: "#D4A843",
};

const INTERESTS = [
  "Mathematics", "Science", "Computers & Coding", "Biology & Medicine",
  "Arts & Design", "Business & Finance", "Teaching", "Law & Justice",
  "Sports & Fitness", "Music & Performing Arts", "Agriculture & Nature",
  "Government & Civil Services"
];

const SUBJECTS = ["Mathematics", "Science", "English", "Hindi", "Social Science", "Physics", "Chemistry", "Biology", "Computer Science"];

const BOARDS = ["CBSE", "ICSE", "UP Board", "MP Board", "Bihar Board", "Rajasthan Board", "Maharashtra Board", "Other State Board"];
const CLASSES = ["Class 10", "Class 11", "Class 12", "Just passed Class 12"];

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
    backgroundColor: "rgba(15,26,20,0.92)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "16px 20px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  card: {
    backgroundColor: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "14px",
  },
  cardForest: {
    background: `linear-gradient(180deg, ${COLORS.forestGlow} 0%, ${COLORS.surface} 100%)`,
    border: `1px solid ${COLORS.forest}30`,
  },
  cardTerracotta: {
    background: `linear-gradient(180deg, ${COLORS.terracottaGlow} 0%, ${COLORS.surface} 100%)`,
    border: `1px solid ${COLORS.terracotta}25`,
  },
  btnPrimary: {
    width: "100%",
    backgroundColor: COLORS.terracotta,
    color: "#fff",
    fontWeight: 700,
    fontSize: "16px",
    padding: "16px 24px",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.3px",
    boxShadow: `0 4px 24px ${COLORS.terracotta}30`,
  },
  btnSecondary: {
    width: "100%",
    backgroundColor: COLORS.forest,
    color: COLORS.cream,
    fontWeight: 600,
    fontSize: "15px",
    padding: "14px 24px",
    borderRadius: "16px",
    border: `1px solid ${COLORS.forest}50`,
    cursor: "pointer",
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.surfaceHighlight,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "14px",
    padding: "14px 16px",
    color: COLORS.cream,
    fontSize: "15px",
    outline: "none",
    fontFamily: "inherit",
  },
  select: {
    width: "100%",
    backgroundColor: COLORS.surfaceHighlight,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "14px",
    padding: "14px 16px",
    color: COLORS.cream,
    fontSize: "15px",
    outline: "none",
    fontFamily: "inherit",
    appearance: "none",
    WebkitAppearance: "none",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 600,
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.surfaceHighlight,
    color: COLORS.creamMuted,
    transition: "all 0.2s ease",
    cursor: "pointer",
    textAlign: "center",
    lineHeight: 1.3,
  },
  chipActive: {
    backgroundColor: COLORS.terracottaGlow,
    borderColor: `${COLORS.terracotta}50`,
    color: COLORS.terracotta,
  },
  sectionTitle: {
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: COLORS.creamMuted,
    marginBottom: "10px",
  },
  pageTitle: {
    fontSize: "26px",
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
  stepCircle: (active) => ({
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 700,
    backgroundColor: active ? COLORS.terracotta : COLORS.surfaceHighlight,
    color: active ? "#fff" : COLORS.creamMuted,
    border: `1.5px solid ${active ? COLORS.terracotta : COLORS.border}`,
    transition: "all 0.3s ease",
  }),
  stepLine: (active) => ({
    width: 36,
    height: 2,
    backgroundColor: active ? COLORS.terracotta : COLORS.border,
    borderRadius: 1,
    transition: "all 0.3s ease",
  }),
  pill: (color, bg) => ({
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 700,
    backgroundColor: bg,
    color: color,
    border: `1px solid ${bg}`,
    letterSpacing: "0.3px",
  }),
  floatingBtn: {
    position: "fixed",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 40px)",
    maxWidth: "440px",
    zIndex: 50,
  },
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
  safeBottom: { paddingBottom: "100px" },
  shimmer: {
    background: `linear-gradient(90deg, ${COLORS.surfaceHighlight} 25%, ${COLORS.surface} 50%, ${COLORS.surfaceHighlight} 75%)`,
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "8px",
  },
};

export default function CareerGuide() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    student_name: "",
    board: "",
    class_level: "",
    marks: {},
    interests: [],
  });

  const handleMark = (subject, value) => {
    setForm(prev => ({ ...prev, marks: { ...prev.marks, [subject]: Number(value) } }));
  };

  const toggleInterest = (interest) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async () => {
    if (form.interests.length < 2) {
      setError("Please select at least 2 interests.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/career/suggest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.data.careers);
        setStep(4);
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch (e) {
      setError("Server error. Make sure backend is running.");
    }
    setLoading(false);
  };

  const growthColor = (g) => {
    if (g === "Very High") return "#4ade80";
    if (g === "High") return COLORS.gold;
    return COLORS.terracotta;
  };

  const growthBg = (g) => {
    if (g === "Very High") return `${COLORS.forestLight}20`;
    if (g === "High") return `${COLORS.gold}18`;
    return `${COLORS.terracotta}18`;
  };

  const markColor = (mark) => {
    if (mark >= 75) return COLORS.forestLight;
    if (mark >= 50) return COLORS.gold;
    return COLORS.red;
  };

  const StepIndicator = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
      {[1, 2, 3].map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={styles.stepCircle(step >= s)}>
            {step > s ? "✓" : s}
          </div>
          {i < 2 && <div style={styles.stepLine(step > s)} />}
        </div>
      ))}
      <span style={{ fontSize: "12px", color: COLORS.creamMuted, marginLeft: "4px", fontWeight: 500 }}>
        {step === 1 ? "Basic Info" : step === 2 ? "Your Marks" : "Interests"}
      </span>
    </div>
  );

  // ─── STEPS 1-3 ───
  if (step < 4) {
    return (
      <div style={styles.appContainer}>
        <div style={styles.header}>
          <button 
            onClick={() => step === 1 ? router.back() : setStep(step - 1)}
            style={{ background: "none", border: "none", color: COLORS.creamMuted, fontSize: "22px", cursor: "pointer", padding: 0 }}
          >
            ←
          </button>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: "17px", color: COLORS.cream, margin: 0, letterSpacing: "-0.3px" }}>
              AI Career Guide
            </h1>
            <p style={{ fontSize: "10px", color: COLORS.creamMuted, margin: "2px 0 0 0", letterSpacing: "1px", textTransform: "uppercase" }}>
              Powered by Claude Sonnet 4.6
            </p>
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          <StepIndicator />

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 style={styles.pageTitle}>Tell us about <span style={{ color: COLORS.terracotta }}>yourself</span></h2>
              <p style={styles.subtitle}>Basic details to personalize your career suggestions</p>

              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ ...styles.sectionTitle, display: "block" }}>Your Name</label>
                  <input
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={form.student_name}
                    onChange={e => setForm(p => ({ ...p, student_name: e.target.value }))}
                  />
                </div>

                <div>
                  <label style={{ ...styles.sectionTitle, display: "block" }}>Education Board</label>
                  <div style={{ position: "relative" }}>
                    <select
                      style={styles.select}
                      value={form.board}
                      onChange={e => setForm(p => ({ ...p, board: e.target.value }))}
                    >
                      <option value="" style={{ backgroundColor: COLORS.surface }}>Select Board</option>
                      {BOARDS.map(b => (
                        <option key={b} value={b} style={{ backgroundColor: COLORS.surface }}>{b}</option>
                      ))}
                    </select>
                    <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: COLORS.creamMuted, fontSize: "11px", pointerEvents: "none" }}>▼</span>
                  </div>
                </div>

                <div>
                  <label style={{ ...styles.sectionTitle, display: "block" }}>Current Class</label>
                  <div style={{ position: "relative" }}>
                    <select
                      style={styles.select}
                      value={form.class_level}
                      onChange={e => setForm(p => ({ ...p, class_level: e.target.value }))}
                    >
                      <option value="" style={{ backgroundColor: COLORS.surface }}>Select Class</option>
                      {CLASSES.map(c => (
                        <option key={c} value={c} style={{ backgroundColor: COLORS.surface }}>{c}</option>
                      ))}
                    </select>
                    <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: COLORS.creamMuted, fontSize: "11px", pointerEvents: "none" }}>▼</span>
                  </div>
                </div>
              </div>

              {error && (
                <div style={{ ...styles.card, ...styles.cardTerracotta, marginTop: "16px", padding: "14px 16px" }}>
                  <p style={{ color: COLORS.terracotta, fontSize: "13px", fontWeight: 600, margin: 0 }}>{error}</p>
                </div>
              )}

              <div style={{ height: 100 }} />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 style={styles.pageTitle}>Your <span style={{ color: COLORS.terracotta }}>Subject Marks</span></h2>
              <p style={styles.subtitle}>Enter marks out of 100. Skip subjects not in your syllabus.</p>

              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {SUBJECTS.map(subject => (
                  <div key={subject} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    backgroundColor: COLORS.surfaceHighlight,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "14px",
                    padding: "12px 16px",
                  }}>
                    <span style={{ fontSize: "14px", color: COLORS.cream, fontWeight: 500, flex: 1 }}>{subject}</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="—"
                      style={{
                        width: 64,
                        backgroundColor: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "10px",
                        padding: "8px 10px",
                        color: COLORS.cream,
                        fontSize: "14px",
                        fontWeight: 700,
                        textAlign: "center",
                        outline: "none",
                      }}
                      onChange={e => handleMark(subject, e.target.value)}
                    />
                    {form.marks[subject] > 0 && (
                      <span style={{ 
                        fontSize: "13px", 
                        fontWeight: 700, 
                        color: markColor(form.marks[subject]),
                        width: 32,
                        textAlign: "right"
                      }}>
                        {form.marks[subject]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <div style={{ ...styles.card, ...styles.cardTerracotta, marginTop: "16px", padding: "14px 16px" }}>
                  <p style={{ color: COLORS.terracotta, fontSize: "13px", fontWeight: 600, margin: 0 }}>{error}</p>
                </div>
              )}

              <div style={{ height: 100 }} />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 style={styles.pageTitle}>What are you <span style={{ color: COLORS.terracotta }}>interested</span> in?</h2>
              <p style={styles.subtitle}>Select all that apply — minimum 2 interests</p>

              <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {INTERESTS.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    style={{
                      ...styles.chip,
                      ...(form.interests.includes(interest) ? styles.chipActive : {}),
                    }}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              <div style={{ 
                marginTop: "16px", 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "8px",
                padding: "8px 14px",
                backgroundColor: COLORS.terracottaGlow,
                borderRadius: "20px",
                border: `1px solid ${COLORS.terracotta}25`,
              }}>
                <span style={{ color: COLORS.terracotta, fontSize: "13px", fontWeight: 700 }}>
                  {form.interests.length}
                </span>
                <span style={{ color: COLORS.creamMuted, fontSize: "12px" }}>
                  {form.interests.length === 1 ? "interest selected" : "interests selected"}
                </span>
              </div>

              {error && (
                <div style={{ ...styles.card, ...styles.cardTerracotta, marginTop: "16px", padding: "14px 16px" }}>
                  <p style={{ color: COLORS.terracotta, fontSize: "13px", fontWeight: 600, margin: 0 }}>{error}</p>
                </div>
              )}

              <div style={{ height: 100 }} />
            </div>
          )}
        </div>

        {/* Floating Button */}
        <div style={styles.floatingBtn}>
          {step === 1 ? (
            <button
              onClick={() => {
                if (!form.student_name || !form.board || !form.class_level) {
                  setError("Please fill all fields.");
                  return;
                }
                setError("");
                setStep(2);
              }}
              style={styles.btnPrimary}
            >
              Next →
            </button>
          ) : step === 2 ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(1)} style={styles.btnSecondary}>
                ← Back
              </button>
              <button
                onClick={() => {
                  if (Object.keys(form.marks).length < 2) {
                    setError("Enter at least 2 subject marks.");
                    return;
                  }
                  setError("");
                  setStep(3);
                }}
                style={styles.btnPrimary}
              >
                Next →
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setStep(2)} style={styles.btnSecondary}>
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ ...styles.btnPrimary, opacity: loading ? 0.6 : 1 }}
              >
                {loading ? "Analyzing..." : "Get Suggestions ✨"}
              </button>
            </div>
          )}
        </div>
        <div style={styles.bottomFade} />
      </div>
    );
  }

  // ─── LOADING ───
  if (loading) {
    return (
      <div style={styles.appContainer}>
        <div style={styles.header}>
          <span style={{ fontWeight: 800, fontSize: "17px", color: COLORS.cream }}>Analyzing...</span>
        </div>
        <div style={{ padding: "20px" }}>
          <style>{`@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`}</style>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ ...styles.card, padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ ...styles.shimmer, width: 48, height: 48, borderRadius: "14px" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ ...styles.shimmer, width: "60%", height: 18, marginBottom: "8px" }} />
                  <div style={{ ...styles.shimmer, width: "30%", height: 14 }} />
                </div>
              </div>
              <div style={{ ...styles.shimmer, width: "100%", height: 14, marginBottom: "8px" }} />
              <div style={{ ...styles.shimmer, width: "70%", height: 14 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── RESULTS ───
  return (
    <div style={styles.appContainer}>
      <div style={styles.header}>
        <button 
          onClick={() => { setStep(1); setResults(null); setForm({ student_name: "", board: "", class_level: "", marks: {}, interests: [] }); }}
          style={{ background: "none", border: "none", color: COLORS.creamMuted, fontSize: "22px", cursor: "pointer", padding: 0 }}
        >
          ←
        </button>
        <span style={{ fontWeight: 800, fontSize: "17px", color: COLORS.cream }}>Your Matches</span>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ padding: "20px", ...styles.safeBottom }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={styles.pageTitle}>
            Career <span style={{ color: COLORS.terracotta }}>Matches</span>
          </h1>
          <p style={styles.subtitle}>
            AI-curated paths based on your marks & interests
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {results?.map((career, idx) => (
            <div key={idx} style={{ ...styles.card, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: 50,
                      height: 50,
                      borderRadius: "16px",
                      background: `linear-gradient(135deg, ${COLORS.terracotta}25, ${COLORS.forest}20)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      flexShrink: 0,
                    }}>
                      {career.emoji}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "17px", fontWeight: 800, color: COLORS.cream, margin: "0 0 4px 0" }}>
                        {career.title}
                      </h3>
                      <span style={styles.pill(growthColor(career.growth), growthBg(career.growth))}>
                        {career.growth} Growth
                      </span>
                    </div>
                  </div>
                  <span style={{ 
                    fontSize: "13px", 
                    fontWeight: 700, 
                    color: COLORS.gold,
                    whiteSpace: "nowrap",
                    backgroundColor: `${COLORS.gold}12`,
                    padding: "6px 10px",
                    borderRadius: "10px",
                  }}>
                    {career.salary_range}
                  </span>
                </div>

                <p style={{ fontSize: "14px", color: COLORS.creamMuted, lineHeight: 1.6, margin: "14px 0 0 0" }}>
                  {career.description}
                </p>

                <div style={{
                  marginTop: "14px",
                  backgroundColor: COLORS.surfaceHighlight,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "14px",
                  padding: "14px 16px",
                }}>
                  <p style={{ fontSize: "11px", color: COLORS.creamMuted, margin: "0 0 4px 0", fontWeight: 700, letterSpacing: "0.5px" }}>
                    WHY IT SUITS YOU
                  </p>
                  <p style={{ fontSize: "13px", color: COLORS.cream, lineHeight: 1.5, margin: 0 }}>
                    {career.why_suits}
                  </p>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <p style={{ ...styles.sectionTitle, marginBottom: "10px" }}>Key Exams</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {career.key_exams.map((exam, i) => (
                      <span key={i} style={{
                        ...styles.pill(COLORS.creamMuted, COLORS.surfaceHighlight),
                        border: `1px solid ${COLORS.border}`,
                        fontSize: "11px",
                      }}>
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: "12px" }}>
                  <p style={{ ...styles.sectionTitle, marginBottom: "10px" }}>Top Colleges</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {career.top_colleges.map((col, i) => (
                      <span key={i} style={{
                        ...styles.pill(COLORS.forestLight, `${COLORS.forestLight}15`),
                        border: `1px solid ${COLORS.forestLight}25`,
                        fontSize: "11px",
                      }}>
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                  style={{
                    width: "100%",
                    marginTop: "16px",
                    padding: "12px",
                    borderRadius: "12px",
                    backgroundColor: COLORS.surfaceHighlight,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.terracotta,
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {expanded === idx ? "Hide Roadmap ↑" : "View 5-Step Roadmap ↓"}
                </button>
              </div>

              {expanded === idx && (
                <div style={{
                  borderTop: `1px solid ${COLORS.border}`,
                  padding: "20px",
                  backgroundColor: "rgba(0,0,0,0.25)",
                }}>
                  <p style={{ ...styles.sectionTitle, marginTop: 0 }}>Your Roadmap</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {career.roadmap.map((step_item, si) => (
                      <div key={si} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                        <div style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          backgroundColor: COLORS.terracotta,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#fff",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}>
                          {si + 1}
                        </div>
                        <p style={{ fontSize: "14px", color: COLORS.creamMuted, lineHeight: 1.6, margin: 0, paddingTop: "4px" }}>
                          {step_item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "24px", marginBottom: "40px" }}>
          <button
            onClick={() => { setStep(1); setResults(null); setForm({ student_name: "", board: "", class_level: "", marks: {}, interests: [] }); setExpanded(null); }}
            style={styles.btnSecondary}
          >
            ← Start Over
          </button>
        </div>
      </div>
    </div>
  );
}