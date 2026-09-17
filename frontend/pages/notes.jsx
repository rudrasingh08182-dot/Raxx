import { useState } from "react";
import { useRouter } from "next/router";

const subjectsByExam = {
  "JEE": ["Mathematics", "Physics", "Chemistry"],
  "NEET": ["Physics", "Chemistry", "Biology"],
  "UPSC": ["History", "Geography", "Polity", "Economics", "Science & Tech", "Environment", "Current Affairs"],
  "SSC": ["General Knowledge", "Reasoning", "Mathematics", "English"],
  "Banking": ["Quantitative Aptitude", "Reasoning", "English", "General Awareness", "Computer"],
  "Railway": ["Mathematics", "General Science", "Reasoning", "General Awareness"],
  "Class 10": ["Mathematics", "Science", "Social Science", "English", "Hindi"],
  "Class 12": ["Mathematics", "Physics", "Chemistry", "Biology", "Economics", "History"],
  "GATE": ["Engineering Mathematics", "Computer Science", "Electronics", "Mechanical", "Civil"],
  "General": ["Mathematics", "Physics", "Chemistry", "Biology", "History", "Geography", "Economics", "English", "Computer Science", "Reasoning"],
};

const notesTypes = [
  { id: "detailed", icon: "📖", title: "Detailed Notes", desc: "Complete chapter coverage" },
  { id: "quick", icon: "⚡", title: "Quick Revision", desc: "Key points only, 1 page" },
  { id: "formula", icon: "🔢", title: "Formula Sheet", desc: "All formulas & equations" },
  { id: "interview", icon: "🎯", title: "Exam Focused", desc: "Most asked concepts" },
];

export default function NotesGenerator() {
  const router = useRouter();
  const [exam, setExam] = useState("General");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [notesType, setNotesType] = useState("detailed");
  const [language, setLanguage] = useState("english");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(false);

  const generateNotes = async () => {
    if (!subject || !chapter) {
      setError("Please select subject and enter chapter name!");
      return;
    }

    setLoading(true);
    setError("");
    setNotes("");
    setGenerated({ subject, chapter, notes_type: notesType });
    setShowNotes(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/generate-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          chapter,
          exam,
          notes_type: notesType,
          language,
        }),
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => ({}));
        setError(data.detail || "Something went wrong!");
        setShowNotes(false);
        setLoading(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setNotes(accumulated);
      }

      setSavedNotes(prev => [{
        subject,
        chapter,
        notes_type: notesType,
        notes: accumulated,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }, ...prev].slice(0, 8));
    } catch (err) {
      setError("Server error. Make sure backend is running.");
      setShowNotes(false);
    }

    setLoading(false);
  };

  const copyNotes = () => navigator.clipboard.writeText(notes);

  const downloadNotes = () => {
    const blob = new Blob([notes], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${subject || "Notes"} - ${chapter || "Chapter"}.txt`.replace(/\s+/g, "_");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printNotes = () => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>${subject} — ${chapter} Notes</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; background: #0F1A14; color: #E8DDD4; }
            h1 { color: #C8956C; border-bottom: 2px solid #8B3A2A; padding-bottom: 10px; }
            pre { white-space: pre-wrap; font-family: Arial; line-height: 1.8; color: #A89B8C; }
            .meta { color: #6B5E52; font-size: 14px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>RAXX AI — ${subject}</h1>
          <div class="meta">Chapter: ${chapter} | Type: ${notesType} | Exam: ${exam}</div>
          <pre>${notes}</pre>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  // ── COLOR TOKENS ──
  const c = {
    bg: "#0F1A14",
    surface: "#141E18",
    surfaceElevated: "#1A2620",
    border: "#25382E",
    hover: "#1E3026",
    text: "#E8DDD4",
    textMuted: "#A89B8C",
    textDim: "#6B5E52",
    rust: "#8B3A2A",
    rustLight: "#A85D4A",
    amber: "#C8956C",
    gold: "#D4A574",
    forest: "#2D5A47",
    cream: "#E8DDD4",
    green: "#7BAE7F",
    blue: "#7BA3C4",
    purple: "#A88BC4",
  };

  // ─── NOTES DISPLAY SCREEN ───
  if (showNotes) {
    return (
      <div className="min-h-screen max-w-md mx-auto flex flex-col" style={{ background: c.bg, color: c.text }}>
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setShowNotes(false)} className="p-1.5 rounded-lg" style={{ color: c.textMuted }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div>
              <h2 className="font-bold text-sm" style={{ color: c.text }}>{generated?.subject}</h2>
              <p className="text-xs" style={{ color: c.textDim }}>{generated?.chapter}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={copyNotes} disabled={loading} className="p-2 rounded-lg text-xs disabled:opacity-40" style={{ background: c.hover, color: c.textMuted }}>📋</button>
            <button onClick={downloadNotes} disabled={loading} className="p-2 rounded-lg text-xs disabled:opacity-40" style={{ background: c.forest, color: c.cream }}>⬇️</button>
            <button onClick={printNotes} disabled={loading} className="p-2 rounded-lg text-xs disabled:opacity-40" style={{ background: c.rust, color: c.cream }}>🖨️</button>
          </div>
        </div>

        {/* Tags */}
        <div className="px-4 py-2.5 flex items-center gap-2 flex-wrap" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(139,58,42,0.15)", color: c.amber }}>{exam}</span>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(168,139,196,0.12)", color: c.purple }}>{notesTypes.find(t => t.id === notesType)?.title}</span>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(45,90,71,0.12)", color: c.green }}>{language === "hindi" ? "🇮🇳 Hindi" : "EN English"}</span>
        </div>

        {/* Notes Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="text-sm leading-relaxed whitespace-pre-wrap font-mono" style={{ color: c.textMuted }}>
            {notes}
            {loading && <span className="inline-block w-2 h-4 ml-0.5 align-middle animate-pulse" style={{ background: c.amber }} />}
          </div>
          {!loading && (
            <p className="text-xs mt-6 text-center" style={{ color: c.textDim }}>Generated by RAXX AI</p>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="px-4 py-3 pb-safe flex gap-2" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
          <button onClick={() => { setNotes(""); setGenerated(null); setShowNotes(false); }} disabled={loading} className="flex-1 py-3 rounded-xl font-semibold text-sm disabled:opacity-40" style={{ background: c.hover, border: `1px solid ${c.border}`, color: c.textMuted }}>
            ➕ New Notes
          </button>
          <button onClick={downloadNotes} disabled={loading} className="flex-1 py-3 rounded-xl font-semibold text-sm disabled:opacity-40" style={{ background: c.rust, color: c.cream }}>
            ⬇️ Download
          </button>
        </div>
      </div>
    );
  }

  // ─── FORM SCREEN ───
  return (
    <div className="min-h-screen max-w-md mx-auto pb-24" style={{ background: c.bg, color: c.text }}>

      {/* Sticky Header */}
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
        <div className="flex items-center gap-2.5">
          <button onClick={() => router.push("/dashboard/student")} className="p-1.5 rounded-lg" style={{ color: c.textMuted }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: c.forest, color: c.cream }}>📝</div>
            <span className="font-bold text-sm" style={{ color: c.text }}>Smart Notes</span>
          </div>
        </div>
        <div className="flex rounded-lg p-0.5" style={{ background: c.hover, border: `1px solid ${c.border}` }}>
          <button onClick={() => setLanguage("english")} className="px-2.5 py-1 rounded-md text-[10px] font-bold transition" style={{ background: language === "english" ? c.rust : "transparent", color: language === "english" ? c.cream : c.textDim }}>EN</button>
          <button onClick={() => setLanguage("hindi")} className="px-2.5 py-1 rounded-md text-[10px] font-bold transition" style={{ background: language === "hindi" ? c.rust : "transparent", color: language === "hindi" ? c.cream : c.textDim }}>HI</button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* Hero */}
        <div className="text-center py-2">
          <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-3" style={{ background: "rgba(45,90,71,0.15)", border: `1px solid rgba(45,90,71,0.25)` }}>📝</div>
          <h1 className="text-lg font-bold" style={{ color: c.text }}>AI Notes Generator</h1>
          <p className="text-xs mt-1" style={{ color: c.textMuted }}>Exam-ready notes in seconds</p>
        </div>

        {/* Step 1 — Exam */}
        <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Step 1 — Target Exam</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(subjectsByExam).map((e) => (
              <button
                key={e}
                onClick={() => { setExam(e); setSubject(""); }}
                className="px-2 py-2 rounded-xl text-[11px] font-semibold transition"
                style={{
                  background: exam === e ? c.rust : c.hover,
                  color: exam === e ? c.cream : c.textMuted,
                  border: exam === e ? `1px solid ${c.rustLight}` : `1px solid ${c.border}`,
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Subject */}
        <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Step 2 — Subject</label>
          <div className="flex flex-wrap gap-2">
            {subjectsByExam[exam]?.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                style={{
                  background: subject === s ? c.rust : c.hover,
                  color: subject === s ? c.cream : c.textMuted,
                  border: subject === s ? `1px solid ${c.rustLight}` : `1px solid ${c.border}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3 — Chapter */}
        <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Step 3 — Chapter / Topic</label>
          <input
            type="text"
            placeholder="e.g. Thermodynamics, French Revolution..."
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
          />
        </div>

        {/* Step 4 — Notes Type */}
        <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: c.textDim }}>Step 4 — Notes Type</label>
          <div className="space-y-2">
            {notesTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setNotesType(type.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left"
                style={{
                  background: notesType === type.id ? "rgba(139,58,42,0.12)" : c.hover,
                  border: notesType === type.id ? `1px solid ${c.rustLight}` : `1px solid ${c.border}`,
                }}
              >
                <span className="text-xl">{type.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold" style={{ color: c.text }}>{type.title}</div>
                  <div className="text-xs" style={{ color: c.textDim }}>{type.desc}</div>
                </div>
                {notesType === type.id && (
                  <span style={{ color: c.amber }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(139,58,42,0.12)", border: `1px solid rgba(139,58,42,0.30)`, color: c.amber }}>
            ⚠️ {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={generateNotes}
          disabled={loading}
          className="w-full font-bold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-40"
          style={{ background: c.rust, color: c.cream }}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Notes...
            </>
          ) : (
            <>✨ Generate Notes</>
          )}
        </button>

        {/* Loading Skeleton */}
        {loading && (
          <div className="rounded-2xl p-4 space-y-3" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl" style={{ background: c.border }} />
              <div className="flex-1 space-y-2">
                <div className="h-3 rounded w-2/3" style={{ background: c.border }} />
                <div className="h-2.5 rounded w-1/3" style={{ background: c.border }} />
              </div>
            </div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-2.5 rounded" style={{ background: c.border, width: i % 3 === 0 ? "75%" : i % 3 === 1 ? "100%" : "85%" }} />
            ))}
            <p className="text-xs text-center pt-2" style={{ color: c.amber }}>✨ AI is crafting your notes...</p>
          </div>
        )}

        {/* Features */}
        {!loading && (
          <div className="grid grid-cols-2 gap-2.5 pb-2">
            {[
              { icon: "⚡", text: "Instant generation" },
              { icon: "🎯", text: "Exam focused" },
              { icon: "🇮🇳", text: "Hindi & English" },
              { icon: "📄", text: "Print ready" },
            ].map((f, i) => (
              <div key={i} className="rounded-xl p-3 flex items-center gap-2" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
                <span className="text-lg">{f.icon}</span>
                <span className="text-xs" style={{ color: c.textMuted }}>{f.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Saved Notes */}
        {savedNotes.length > 0 && (
          <div className="pb-4">
            <h3 className="font-bold text-sm mb-3" style={{ color: c.text }}>🕒 Recently Generated</h3>
            <div className="space-y-2">
              {savedNotes.map((n, i) => (
                <button
                  key={i}
                  onClick={() => { setNotes(n.notes); setGenerated({ subject: n.subject, chapter: n.chapter }); setShowNotes(true); }}
                  className="w-full text-left rounded-xl px-4 py-3 transition"
                  style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold" style={{ color: c.text }}>{n.subject}</p>
                    <span className="text-xs" style={{ color: c.textDim }}>{n.time}</span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: c.textMuted }}>{n.chapter}</p>
                  <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(168,139,196,0.12)", color: c.purple }}>{n.notes_type}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}