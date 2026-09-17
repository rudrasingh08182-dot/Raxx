import { useState } from "react";
import { useRouter } from "next/router";

const examOptions = [
  "JEE Mains", "JEE Advanced", "NEET UG", "UPSC CSE",
  "SSC CGL", "Banking IBPS", "Railway RRB", "GATE",
  "Class 10 Boards", "Class 12 Boards"
];

const subjectOptions = {
  "JEE Mains": ["Mathematics", "Physics", "Chemistry"],
  "JEE Advanced": ["Mathematics", "Physics", "Chemistry"],
  "NEET UG": ["Physics", "Chemistry", "Biology"],
  "UPSC CSE": ["History", "Geography", "Polity", "Economics", "Science & Tech", "Current Affairs"],
  "SSC CGL": ["Mathematics", "Reasoning", "English", "General Knowledge"],
  "Banking IBPS": ["Quantitative Aptitude", "Reasoning", "English", "General Awareness"],
  "Railway RRB": ["Mathematics", "General Science", "Reasoning", "General Awareness"],
  "GATE": ["Engineering Mathematics", "Computer Science", "General Aptitude"],
  "Class 10 Boards": ["Mathematics", "Science", "Social Science", "English", "Hindi"],
  "Class 12 Boards": ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
};

const taskTypeColors = {
  study: "#2D5A47",
  revision: "#4A7A5A",
  break: "#5A8A6A",
  practice: "#3D6A52",
  test: "#6B1A1A",
};

export default function StudyPlan() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [form, setForm] = useState({
    name: "",
    exam: "",
    exam_date: "",
    subjects: [],
    weak_subjects: [],
    daily_hours: 6,
    study_time_preference: "day", // "day" | "night" | "flexible"
  });

  // ── NOXTUA FOREST GREEN + WHITE TOUCH ──
  const c = {
    bg: "#0A1A12",           // deep forest black-green
    surface: "#0F2318",       // forest surface
    surfaceElevated: "#142B1F", // lighter forest card
    border: "#1E3A2A",        // green border
    hover: "#1A3224",         // hover
    text: "#E8F0EA",          // soft white with green tint
    textMuted: "#8BA89A",     // muted sage
    textDim: "#5A7A6A",       // dim green
    forest: "#2D5A47",        // primary forest accent
    forestLight: "#3D7A5F",   // lighter forest
    forestDark: "#1B3A2A",    // dark forest
    white: "#FFFFFF",         // pure white touch
    cream: "#E8DDD4",         // warm cream
    gold: "#C8956C",          // warm gold
    red: "#8B3A3A",           // muted red
  };

  const toggleSubject = (sub, field) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(sub)
        ? prev[field].filter(s => s !== sub)
        : [...prev[field], sub]
    }));
  };

  const generatePlan = async () => {
    if (!form.name || !form.exam || !form.exam_date || form.subjects.length === 0) {
      setError("Please fill all fields and select at least one subject!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studyplan/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setPlan(data.plan);
        setActiveDay(0);
        setStep(3);
      } else {
        setError(data.detail || "Failed to generate plan!");
      }
    } catch (err) {
      setError("Server error. Make sure backend is running.");
    }

    setLoading(false);
  };

  const daysLeft = form.exam_date
    ? Math.ceil((new Date(form.exam_date) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  // ─── STEP 1 — BASIC INFO ───
  if (step === 1) {
    return (
      <div className="min-h-screen max-w-md mx-auto pb-6" style={{ background: c.bg, color: c.text }}>
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-2.5" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
          <button onClick={() => router.push("/dashboard/student")} className="p-1.5 rounded-lg" style={{ color: c.textMuted }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: c.forest, color: c.white }}>📅</div>
            <span className="font-bold text-sm" style={{ color: c.text }}>Study Planner</span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {[1, 2, 3].map((s) => (
              <div key={s} className="w-6 h-1.5 rounded-full transition" style={{ background: s === 1 ? c.forest : c.border }} />
            ))}
          </div>
        </div>

        <div className="px-4 pt-5 space-y-4">
          {/* Hero */}
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-3" style={{ background: "rgba(45,90,71,0.20)", border: `1px solid ${c.border}` }}>📅</div>
            <h1 className="text-lg font-bold" style={{ color: c.text }}>Create Your Plan</h1>
            <p className="text-xs mt-1" style={{ color: c.textMuted }}>AI personalized day-by-day schedule</p>
          </div>

          {/* Name */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: c.textDim }}>Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
            />
          </div>

          {/* Exam */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Target Exam</label>
            <div className="grid grid-cols-2 gap-2">
              {examOptions.map((e) => (
                <button
                  key={e}
                  onClick={() => setForm({ ...form, exam: e, subjects: [], weak_subjects: [] })}
                  className="py-2.5 rounded-xl text-[11px] font-bold transition"
                  style={{
                    background: form.exam === e ? c.forest : c.hover,
                    color: form.exam === e ? c.white : c.textMuted,
                    border: form.exam === e ? `1px solid ${c.forestLight}` : `1px solid ${c.border}`,
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Exam Date */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: c.textDim }}>Exam Date</label>
            <input
              type="date"
              value={form.exam_date}
              onChange={(e) => setForm({ ...form, exam_date: e.target.value })}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
            />
            {daysLeft !== null && daysLeft > 0 && (
              <p className="text-xs mt-2 font-semibold" style={{ color: c.forestLight }}>
                📅 {daysLeft} days remaining!
              </p>
            )}
          </div>

          {/* Daily Hours */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>
              Daily Hours — <span style={{ color: c.forestLight }}>{form.daily_hours}h</span>
            </label>
            <input
              type="range"
              min={2}
              max={12}
              value={form.daily_hours}
              onChange={(e) => setForm({ ...form, daily_hours: parseInt(e.target.value) })}
              className="w-full"
              style={{ accentColor: c.forest }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: c.textDim }}>
              <span>2h</span>
              <span>6h</span>
              <span>12h</span>
            </div>
          </div>

          {/* Study Time Preference */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: c.textDim }}>When Do You Study Best?</label>
            <p className="text-xs mb-3" style={{ color: c.textDim }}>Plan tough topics ko is time ke around adjust kar dega</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "day", label: "🌞 Day Person" },
                { key: "night", label: "🌙 Night Owl" },
                { key: "flexible", label: "🔄 Flexible" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setForm({ ...form, study_time_preference: opt.key })}
                  className="py-2.5 rounded-xl text-[11px] font-bold transition"
                  style={{
                    background: form.study_time_preference === opt.key ? c.forest : c.hover,
                    color: form.study_time_preference === opt.key ? c.white : c.textMuted,
                    border: form.study_time_preference === opt.key ? `1px solid ${c.forestLight}` : `1px solid ${c.border}`,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(139,58,58,0.12)", border: `1px solid ${c.red}`, color: c.gold }}>
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={() => {
              if (!form.name || !form.exam || !form.exam_date) {
                setError("Please fill all fields!");
                return;
              }
              setError("");
              setStep(2);
            }}
            className="w-full font-bold py-4 rounded-xl transition text-sm"
            style={{ background: c.forest, color: c.white }}
          >
            Next — Select Subjects →
          </button>
        </div>
      </div>
    );
  }

  // ─── STEP 2 — SUBJECTS ───
  if (step === 2) {
    return (
      <div className="min-h-screen max-w-md mx-auto pb-6" style={{ background: c.bg, color: c.text }}>
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-2.5" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
          <button onClick={() => setStep(1)} className="p-1.5 rounded-lg" style={{ color: c.textMuted }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: c.forest, color: c.white }}>📚</div>
            <span className="font-bold text-sm" style={{ color: c.text }}>Subjects</span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {[1, 2, 3].map((s) => (
              <div key={s} className="w-6 h-1.5 rounded-full transition" style={{ background: s <= 2 ? c.forest : c.border }} />
            ))}
          </div>
        </div>

        <div className="px-4 pt-5 space-y-4">
          {/* Hero */}
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-3" style={{ background: "rgba(45,90,71,0.20)", border: `1px solid ${c.border}` }}>📚</div>
            <h1 className="text-lg font-bold" style={{ color: c.text }}>Select Subjects</h1>
            <p className="text-xs mt-1" style={{ color: c.textMuted }}>Mark weak subjects for extra time</p>
          </div>

          {/* Subjects */}
          <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Your Subjects</label>
            <div className="flex flex-wrap gap-2">
              {subjectOptions[form.exam]?.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSubject(s, "subjects")}
                  className="px-3 py-2 rounded-lg text-xs font-semibold transition"
                  style={{
                    background: form.subjects.includes(s) ? c.forest : c.hover,
                    color: form.subjects.includes(s) ? c.white : c.textMuted,
                    border: form.subjects.includes(s) ? `1px solid ${c.forestLight}` : `1px solid ${c.border}`,
                  }}
                >
                  {form.subjects.includes(s) ? "✓ " : ""}{s}
                </button>
              ))}
            </div>
          </div>

          {/* Weak Subjects */}
          {form.subjects.length > 0 && (
            <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: c.textDim }}>Weak Subjects (optional)</label>
              <p className="text-xs mb-3" style={{ color: c.textDim }}>AI will allocate more time to these</p>
              <div className="flex flex-wrap gap-2">
                {form.subjects.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSubject(s, "weak_subjects")}
                    className="px-3 py-2 rounded-lg text-xs font-semibold transition"
                    style={{
                      background: form.weak_subjects.includes(s) ? c.red : c.hover,
                      color: form.weak_subjects.includes(s) ? c.cream : c.textMuted,
                      border: form.weak_subjects.includes(s) ? `1px solid #A85D5D` : `1px solid ${c.border}`,
                    }}
                  >
                    {form.weak_subjects.includes(s) ? "⚠️ " : ""}{s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="rounded-xl p-4" style={{ background: "rgba(45,90,71,0.10)", border: `1px solid ${c.border}` }}>
            <h4 className="font-bold text-xs mb-2" style={{ color: c.forestLight }}>📋 Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div style={{ color: c.textMuted }}>👤 <span style={{ color: c.text }}>{form.name}</span></div>
              <div style={{ color: c.textMuted }}>🎯 <span style={{ color: c.text }}>{form.exam}</span></div>
              <div style={{ color: c.textMuted }}>📅 <span style={{ color: c.text }}>{form.exam_date}</span></div>
              <div style={{ color: c.textMuted }}>⏰ <span style={{ color: c.text }}>{form.daily_hours}h/day</span></div>
              <div style={{ color: c.textMuted }}>🕐 <span style={{ color: c.text }}>{form.study_time_preference === "night" ? "Night Owl" : form.study_time_preference === "day" ? "Day Person" : "Flexible"}</span></div>
              <div style={{ color: c.textMuted }}>📚 <span style={{ color: c.text }}>{form.subjects.length} subjects</span></div>
              <div style={{ color: c.textMuted }}>⚠️ <span style={{ color: c.text }}>{form.weak_subjects.length} weak</span></div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(139,58,58,0.12)", border: `1px solid ${c.red}`, color: c.gold }}>
              ⚠️ {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 py-3.5 rounded-xl font-bold text-sm transition"
              style={{ background: c.hover, color: c.textMuted }}
            >
              ← Back
            </button>
            <button
              onClick={generatePlan}
              disabled={loading}
              className="w-2/3 py-3.5 rounded-xl font-bold text-sm transition disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: c.forest, color: c.white }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>✨ Generate Plan</>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 3 — PLAN DISPLAY ───
  if (step === 3 && plan) {
    return (
      <div className="min-h-screen max-w-md mx-auto pb-6" style={{ background: c.bg, color: c.text }}>
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button onClick={() => { setStep(1); setPlan(null); }} className="p-1.5 rounded-lg" style={{ color: c.textMuted }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div>
                <h2 className="font-bold text-sm" style={{ color: c.text }}>{form.name}'s Plan</h2>
                <p className="text-xs" style={{ color: c.textDim }}>{form.exam} • {form.daily_hours}h/day</p>
              </div>
            </div>
            {daysLeft !== null && daysLeft > 0 && (
              <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ background: c.forest, color: c.white }}>
                ⏳ {daysLeft}d
              </span>
            )}
          </div>
        </div>

        <div className="px-4 pt-4 space-y-4">
          {/* Overview */}
          <div className="rounded-2xl p-5" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(45,90,71,0.20)", border: `1px solid ${c.border}` }}>🎯</div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: c.text }}>Your Plan is Ready!</h3>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: c.textMuted }}>{plan.overview}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: "📅", label: "Days", value: plan.total_days },
                { icon: "⏰", label: "Hours", value: `${plan.daily_hours}h` },
                { icon: "📚", label: "Subjects", value: form.subjects.length },
                { icon: "⚠️", label: "Weak", value: form.weak_subjects.length || "0" },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: c.hover, border: `1px solid ${c.border}` }}>
                  <div className="text-lg mb-0.5">{stat.icon}</div>
                  <div className="font-bold text-sm" style={{ color: c.text }}>{stat.value}</div>
                  <div className="text-[10px]" style={{ color: c.textDim }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tip */}
            {plan.tip && (
              <div className="mt-3 rounded-xl px-3 py-2.5 flex items-start gap-2" style={{ background: "rgba(45,90,71,0.10)", border: `1px solid ${c.border}` }}>
                <span style={{ color: c.forestLight }}>💡</span>
                <p className="text-xs" style={{ color: c.textMuted }}>{plan.tip}</p>
              </div>
            )}
          </div>

          {/* Day Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4">
            {plan.days?.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className="flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition"
                style={{
                  background: activeDay === i ? c.forest : c.hover,
                  color: activeDay === i ? c.white : c.textMuted,
                  border: activeDay === i ? `1px solid ${c.forestLight}` : `1px solid ${c.border}`,
                }}
              >
                Day {day.day}
              </button>
            ))}
          </div>

          {/* Active Day */}
          {plan.days?.[activeDay] && (
            <div className="rounded-2xl overflow-hidden" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
              {/* Day Header */}
              <div className="px-5 py-4" style={{ background: c.forestDark, borderBottom: `1px solid ${c.border}` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: c.white }}>{plan.days[activeDay].date_label}</h3>
                    <p className="text-xs mt-0.5" style={{ color: c.textMuted }}>Focus: {plan.days[activeDay].focus}</p>
                  </div>
                  <span className="text-3xl">{activeDay === 0 ? "🌅" : activeDay === 6 ? "🏁" : "📖"}</span>
                </div>
              </div>

              {/* Tasks */}
              <div className="p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: c.textDim }}>Today's Schedule</h4>
                <div className="space-y-2.5">
                  {plan.days[activeDay].tasks?.map((task, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl p-3.5"
                      style={{ background: c.hover, border: `1px solid ${c.border}` }}
                    >
                      <div className="flex-shrink-0 text-center min-w-[52px]">
                        <div className="font-bold text-xs" style={{ color: c.forestLight }}>{task.time}</div>
                        <div className="text-[10px] mt-0.5" style={{ color: c.textDim }}>{task.duration}</div>
                      </div>
                      <div className="w-px self-stretch" style={{ background: c.border }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: taskTypeColors[task.type] || c.forest }} />
                          <span className="text-[10px] font-semibold uppercase" style={{ color: c.textDim }}>{task.subject}</span>
                        </div>
                        <p className="text-sm font-semibold truncate" style={{ color: c.text }}>{task.topic}</p>
                        <span
                          className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: taskTypeColors[task.type] || c.forest, color: c.white }}
                        >
                          {task.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Revision + Motivation */}
                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="rounded-xl p-3" style={{ background: "rgba(45,90,71,0.08)", border: `1px solid ${c.border}` }}>
                    <h5 className="font-bold text-[10px] uppercase mb-1" style={{ color: c.forestLight }}>📖 Revision</h5>
                    <p className="text-xs" style={{ color: c.textMuted }}>{plan.days[activeDay].revision}</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ background: "rgba(200,149,108,0.06)", border: `1px solid ${c.border}` }}>
                    <h5 className="font-bold text-[10px] uppercase mb-1" style={{ color: c.gold }}>💪 Motivation</h5>
                    <p className="text-xs italic" style={{ color: c.textMuted }}>"{plan.days[activeDay].motivation}"</p>
                  </div>
                </div>
              </div>

              {/* Day Nav */}
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: `1px solid ${c.border}` }}>
                <button
                  onClick={() => setActiveDay(prev => Math.max(0, prev - 1))}
                  disabled={activeDay === 0}
                  className="px-3 py-2 rounded-xl text-xs font-bold disabled:opacity-30 transition"
                  style={{ background: c.hover, color: c.textMuted }}
                >
                  ← Prev
                </button>
                <span className="text-xs" style={{ color: c.textDim }}>Day {activeDay + 1} of {plan.days.length}</span>
                <button
                  onClick={() => setActiveDay(prev => Math.min(plan.days.length - 1, prev + 1))}
                  disabled={activeDay === plan.days.length - 1}
                  className="px-3 py-2 rounded-xl text-xs font-bold disabled:opacity-30 transition"
                  style={{ background: c.forest, color: c.white }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pb-2">
            <button onClick={() => { setStep(1); setPlan(null); }} className="flex-1 py-3 rounded-xl font-bold text-xs transition" style={{ background: c.hover, border: `1px solid ${c.border}`, color: c.textMuted }}>
              🔄 New Plan
            </button>
            <button onClick={() => window.print()} className="flex-1 py-3 rounded-xl font-bold text-xs transition" style={{ background: c.forest, color: c.white }}>
              🖨️ Print
            </button>
            <button onClick={() => router.push("/dashboard/student")} className="flex-1 py-3 rounded-xl font-bold text-xs transition" style={{ background: c.hover, border: `1px solid ${c.border}`, color: c.textMuted }}>
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}