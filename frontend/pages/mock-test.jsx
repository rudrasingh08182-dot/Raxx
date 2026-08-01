import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const examOptions = [
  "JEE", "NEET", "UPSC", "SSC", "Banking",
  "Railway", "Class 10", "Class 12", "GATE"
];

const subjectsByExam = {
  "JEE": ["Mathematics", "Physics", "Chemistry"],
  "NEET": ["Physics", "Chemistry", "Biology"],
  "UPSC": ["History", "Geography", "Polity", "Economics", "Science & Tech"],
  "SSC": ["General Knowledge", "Reasoning", "Mathematics", "English"],
  "Banking": ["Quantitative Aptitude", "Reasoning", "English", "General Awareness"],
  "Railway": ["Mathematics", "General Science", "Reasoning", "General Awareness"],
  "Class 10": ["Mathematics", "Science", "Social Science", "English"],
  "Class 12": ["Mathematics", "Physics", "Chemistry", "Biology", "Economics"],
  "GATE": ["Engineering Mathematics", "Computer Science", "Electronics"],
};

export default function MockTest() {
  const router = useRouter();
  const [screen, setScreen] = useState("setup");
  const [exam, setExam] = useState("JEE");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");
  const [language, setLanguage] = useState("english");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (screen === "test" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const generateTest = async () => {
    if (!subject) {
      setError("Please select a subject!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mocktest/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam, subject, topic,
          num_questions: numQuestions,
          difficulty, language
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setQuestions(data.questions);
        setTimeLeft(numQuestions * 60);
        setCurrentQ(0);
        setAnswers({});
        setScreen("test");
      } else {
        setError(data.detail || "Failed to generate test!");
      }
    } catch (err) {
      setError("Server error. Make sure backend is running.");
    }

    setLoading(false);
  };

  const handleAnswer = (optionKey) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQ].id]: optionKey
    }));
  };

  const handleSubmit = async () => {
    clearInterval(timerRef.current);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mocktest/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions, answers }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setScreen("result");
      }
    } catch (err) {
      setError("Failed to submit test!");
    }

    setLoading(false);
  };

  // ── MAROON + WHITE MATTE COLORS ──
  const c = {
    bg: "#1C1212",           // deep maroon-black
    surface: "#2A1A1A",       // maroon surface
    surfaceElevated: "#351F1F", // lighter maroon
    border: "#4A2A2A",        // maroon border
    hover: "#3D2222",         // hover state
    text: "#F5EDE0",          // warm white/cream
    textMuted: "#C4B5A5",     // muted cream
    textDim: "#8B7B6B",       // dim text
    maroon: "#6B1A1A",        // primary maroon
    maroonLight: "#8B3A3A",   // lighter maroon
    maroonDark: "#4A1212",    // dark maroon
    cream: "#F5EDE0",         // cream white
    white: "#FFFFFF",         // pure white
    gold: "#C8956C",          // warm accent
    green: "#5A8A5A",         // muted green for correct
    red: "#8B3A3A",           // maroon-red for wrong
    orange: "#A85D4A",        // warm orange
  };

  const answeredCount = screen === "test" ? Object.keys(answers).length : 0;
  const timerColor = timeLeft < 60 ? c.red : timeLeft < 180 ? c.gold : c.green;

  // ─── SETUP SCREEN ───
  if (screen === "setup") {
    return (
      <div className="min-h-screen max-w-md mx-auto pb-6" style={{ background: c.bg, color: c.text }}>
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-2.5" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
          <button onClick={() => router.push("/dashboard/student")} className="p-1.5 rounded-lg" style={{ color: c.textMuted }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: c.maroon, color: c.cream }}>📄</div>
            <span className="font-bold text-sm" style={{ color: c.text }}>Mock Test</span>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Hero */}
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-3" style={{ background: "rgba(107,26,26,0.20)", border: `1px solid ${c.border}` }}>🎯</div>
            <h1 className="text-lg font-bold" style={{ color: c.text }}>Setup Your Test</h1>
            <p className="text-xs mt-1" style={{ color: c.textMuted }}>AI generated exam questions</p>
          </div>

          {/* Exam */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Select Exam</label>
            <div className="grid grid-cols-3 gap-2">
              {examOptions.map((e) => (
                <button
                  key={e}
                  onClick={() => { setExam(e); setSubject(""); }}
                  className="py-2 rounded-xl text-[11px] font-bold transition"
                  style={{
                    background: exam === e ? c.maroon : c.hover,
                    color: exam === e ? c.cream : c.textMuted,
                    border: exam === e ? `1px solid ${c.maroonLight}` : `1px solid ${c.border}`,
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Select Subject</label>
            <div className="flex flex-wrap gap-2">
              {subjectsByExam[exam]?.map((s) => (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  style={{
                    background: subject === s ? c.maroon : c.hover,
                    color: subject === s ? c.cream : c.textMuted,
                    border: subject === s ? `1px solid ${c.maroonLight}` : `1px solid ${c.border}`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Specific Topic (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Thermodynamics, Mughal Empire..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
            />
          </div>

          {/* Questions */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Questions</label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((n) => (
                <button
                  key={n}
                  onClick={() => setNumQuestions(n)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold transition"
                  style={{
                    background: numQuestions === n ? c.maroon : c.hover,
                    color: numQuestions === n ? c.cream : c.textMuted,
                    border: numQuestions === n ? `1px solid ${c.maroonLight}` : `1px solid ${c.border}`,
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Difficulty</label>
            <div className="flex gap-2">
              {[
                { id: "easy", label: "Easy" },
                { id: "medium", label: "Medium" },
                { id: "hard", label: "Hard" },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold transition"
                  style={{
                    background: difficulty === d.id ? c.maroon : c.hover,
                    color: difficulty === d.id ? c.cream : c.textMuted,
                    border: difficulty === d.id ? `1px solid ${c.maroonLight}` : `1px solid ${c.border}`,
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Language</label>
            <div className="flex gap-2">
              {[
                { id: "english", label: "English" },
                { id: "hindi", label: "Hindi" },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLanguage(l.id)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold transition"
                  style={{
                    background: language === l.id ? c.maroon : c.hover,
                    color: language === l.id ? c.cream : c.textMuted,
                    border: language === l.id ? `1px solid ${c.maroonLight}` : `1px solid ${c.border}`,
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: "rgba(107,26,26,0.12)", border: `1px solid ${c.border}` }}>
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-semibold text-sm" style={{ color: c.text }}>
                {numQuestions} Qs • {exam} • {subject || "Select Subject"} • {difficulty}
              </p>
              <p className="text-xs" style={{ color: c.textDim }}>Time: {numQuestions} min</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(107,26,26,0.15)", border: `1px solid ${c.maroonLight}`, color: c.gold }}>
              ⚠️ {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateTest}
            disabled={loading}
            className="w-full font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 text-sm disabled:opacity-40"
            style={{ background: c.maroon, color: c.cream }}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>🚀 Start Mock Test</>
            )}
          </button>
        </div>
      </div>
    );
  }

  // ─── TEST SCREEN ───
  if (screen === "test") {
    const q = questions[currentQ];
    const answered = answers[q?.id];

    return (
      <div className="min-h-screen max-w-md mx-auto flex flex-col" style={{ background: c.bg, color: c.text }}>
        {/* Test Header */}
        <div className="sticky top-0 z-30 px-4 py-3" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm" style={{ color: c.text }}>{exam}</span>
            <span className="font-bold text-lg" style={{ color: timerColor }}>
              ⏱️ {formatTime(timeLeft)}
            </span>
          </div>
          {/* Progress */}
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-full h-1.5" style={{ background: c.hover }}>
              <div className="h-1.5 rounded-full transition-all duration-300" style={{ width: `${(answeredCount / questions.length) * 100}%`, background: c.maroon }} />
            </div>
            <span className="text-xs font-medium" style={{ color: c.textDim }}>{answeredCount}/{questions.length}</span>
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="rounded-2xl p-5 mb-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <div className="flex items-start gap-3 mb-5">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0" style={{ background: c.maroon, color: c.cream }}>
                Q{currentQ + 1}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: c.text }}>
                {q?.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {q?.options && Object.entries(q.options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition text-left"
                  style={{
                    background: answered === key ? "rgba(107,26,26,0.15)" : c.hover,
                    borderColor: answered === key ? c.maroonLight : c.border,
                    color: answered === key ? c.cream : c.textMuted,
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: answered === key ? c.maroon : c.surface,
                      color: answered === key ? c.cream : c.textDim,
                      border: `1px solid ${answered === key ? c.maroonLight : c.border}`,
                    }}
                  >
                    {key}
                  </span>
                  <span className="text-sm">{value}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-4">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className="w-8 h-8 rounded-lg text-xs font-bold transition"
                style={{
                  background: i === currentQ ? c.maroon : answers[questions[i]?.id] ? "rgba(107,26,26,0.20)" : c.hover,
                  color: i === currentQ ? c.cream : answers[questions[i]?.id] ? c.gold : c.textDim,
                  border: `1px solid ${i === currentQ ? c.maroonLight : answers[questions[i]?.id] ? "rgba(107,26,26,0.30)" : c.border}`,
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="px-4 py-3 pb-safe flex items-center gap-2" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
          <button
            onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))}
            disabled={currentQ === 0}
            className="px-4 py-3 rounded-xl font-semibold text-sm disabled:opacity-30 transition"
            style={{ background: c.hover, color: c.textMuted }}
          >
            ← Prev
          </button>

          {currentQ === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-xl font-bold text-sm transition"
              style={{ background: c.maroon, color: c.cream }}
            >
              Submit Test ✓
            </button>
          ) : (
            <button
              onClick={() => setCurrentQ(prev => Math.min(questions.length - 1, prev + 1))}
              className="flex-1 py-3 rounded-xl font-bold text-sm transition"
              style={{ background: c.maroon, color: c.cream }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── RESULT SCREEN ───
  if (screen === "result") {
    const scoreColor = result?.percentage >= 80 ? c.green : result?.percentage >= 60 ? c.blue : result?.percentage >= 40 ? c.gold : c.red;
    const scoreEmoji = result?.percentage >= 80 ? "🏆" : result?.percentage >= 60 ? "👍" : result?.percentage >= 40 ? "📚" : "💪";

    return (
      <div className="min-h-screen max-w-md mx-auto pb-6" style={{ background: c.bg, color: c.text }}>
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
          <span className="font-bold text-sm" style={{ color: c.text }}>Test Result</span>
          <button onClick={() => router.push("/dashboard/student")} className="text-xs font-semibold px-3 py-1.5 rounded-lg transition" style={{ background: c.hover, color: c.textMuted }}>
            🏠 Home
          </button>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Score Card */}
          <div className="rounded-2xl p-6 text-center" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <div className="text-5xl mb-3">{scoreEmoji}</div>
            <h2 className="text-3xl font-bold mb-1" style={{ color: c.text }}>
              {result?.score}/{result?.total}
            </h2>
            <div className="text-5xl font-black mb-2" style={{ color: scoreColor }}>
              {result?.percentage}%
            </div>
            <p className="text-base font-semibold mb-4" style={{ color: c.textMuted }}>
              {result?.grade}
            </p>
            <div className="w-full rounded-full h-2.5 mb-5" style={{ background: c.hover }}>
              <div className="h-2.5 rounded-full transition-all duration-1000" style={{ width: `${result?.percentage}%`, background: scoreColor }} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl p-3" style={{ background: "rgba(90,138,90,0.12)", border: `1px solid rgba(90,138,90,0.25)` }}>
                <div className="text-xl font-bold" style={{ color: c.green }}>{result?.score}</div>
                <div className="text-xs mt-0.5" style={{ color: c.textDim }}>Correct</div>
              </div>
              <div className="rounded-xl p-3" style={{ background: "rgba(139,58,58,0.12)", border: `1px solid rgba(139,58,58,0.25)` }}>
                <div className="text-xl font-bold" style={{ color: c.red }}>{result?.total - result?.score}</div>
                <div className="text-xs mt-0.5" style={{ color: c.textDim }}>Wrong</div>
              </div>
              <div className="rounded-xl p-3" style={{ background: c.hover, border: `1px solid ${c.border}` }}>
                <div className="text-xl font-bold" style={{ color: c.text }}>{result?.total}</div>
                <div className="text-xs mt-0.5" style={{ color: c.textDim }}>Total</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={() => setScreen("setup")} className="flex-1 py-3 rounded-xl font-bold text-sm transition" style={{ background: c.maroon, color: c.cream }}>
              🔄 New Test
            </button>
            <button onClick={() => setShowExplanation(!showExplanation)} className="flex-1 py-3 rounded-xl font-bold text-sm transition" style={{ background: c.hover, border: `1px solid ${c.border}`, color: c.textMuted }}>
              {showExplanation ? "Hide" : "Show"} Review 📖
            </button>
          </div>

          {/* Answer Review */}
          {showExplanation && (
            <div className="space-y-3 pb-4">
              <h3 className="font-bold text-sm" style={{ color: c.text }}>📋 Answer Review</h3>
              {result?.results?.map((r, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4"
                  style={{
                    background: c.surfaceElevated,
                    border: `1px solid ${r.is_correct ? "rgba(90,138,90,0.25)" : "rgba(139,58,58,0.25)"}`,
                  }}
                >
                  <div className="flex items-start gap-2.5 mb-2.5">
                    <span
                      className="px-2 py-0.5 rounded-lg text-xs font-bold flex-shrink-0"
                      style={{
                        background: r.is_correct ? c.green : c.red,
                        color: c.cream,
                      }}
                    >
                      Q{i + 1}
                    </span>
                    <p className="text-sm" style={{ color: c.text }}>{r.question}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div
                      className="px-3 py-2 rounded-lg text-xs"
                      style={{
                        background: r.is_correct ? "rgba(90,138,90,0.12)" : "rgba(139,58,58,0.12)",
                        color: r.is_correct ? c.green : c.red,
                      }}
                    >
                      You: <strong>{r.student_answer || "—"}</strong>
                    </div>
                    <div className="px-3 py-2 rounded-lg text-xs" style={{ background: "rgba(90,138,90,0.12)", color: c.green }}>
                      Correct: <strong>{r.correct_answer}</strong>
                    </div>
                  </div>
                  {r.explanation && (
                    <div className="rounded-lg px-3 py-2 text-xs" style={{ background: c.hover, border: `1px solid ${c.border}`, color: c.textMuted }}>
                      💡 {r.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}