import { useState } from "react";
import Editor from "@monaco-editor/react";

// ─── RAXX MOBILE DESIGN SYSTEM ───
const C = {
  bg: "#0F1A14",
  surface: "#16241D",
  surfaceHi: "#1E3228",
  border: "rgba(232,221,208,0.08)",
  cream: "#E8DDD0",
  creamMute: "#8A9A8A",
  terra: "#C46B4A",
  terraGlow: "rgba(196,107,74,0.15)",
  forest: "#3D5A48",
  forestHi: "#4A8C6A",
  forestGlow: "rgba(61,90,72,0.2)",
  gold: "#D4A843",
  red: "#E05A5A",
  green: "#4A8C6A",
};

const LANGUAGES = [
  { id: "python", label: "Python", icon: "🐍", defaultCode: `print("Hello RAXX!")` },
  { id: "javascript", label: "JS", icon: "🟨", defaultCode: `console.log("Hello RAXX!");` },
  { id: "java", label: "Java", icon: "☕", defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello RAXX!");\n    }\n}` },
  { id: "c", label: "C", icon: "⚡", defaultCode: `#include <stdio.h>\n\nint main() {\n    printf("Hello RAXX!\\n");\n    return 0;\n}` },
  { id: "cpp", label: "C++", icon: "🔷", defaultCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello RAXX!" << endl;\n    return 0;\n}` },
];

const TABS = [
  { id: "editor", label: "Editor", icon: "📝" },
  { id: "output", label: "Output", icon: "▶" },
  { id: "ai", label: "AI Tutor", icon: "🤖" },
  { id: "review", label: "Review", icon: "🔍" },
];

export default function CodingEditorMobile() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const [stdin, setStdin] = useState("");
  const [showStdin, setShowStdin] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [fontSize, setFontSize] = useState(13);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [review, setReview] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [execTime, setExecTime] = useState("");
  const [execStatus, setExecStatus] = useState("");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(lang.defaultCode);
    setOutput("");
    setError("");
    setExecStatus("");
  };

  const runCode = async () => {
    if (!code.trim()) {
      setError("Write some code first!");
      setActiveTab("output");
      return;
    }
    setRunning(true);
    setOutput("");
    setError("");
    setExecStatus("");
    setActiveTab("output");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coding/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: language.id, stdin }),
      });
      const data = await res.json();
      if (res.ok) {
        setOutput(data.output || "");
        setError(data.error || "");
        setExecTime(data.time || "");
        setExecStatus(data.execution_status || "");
      } else if (res.status === 503) {
        setOutput("🚧 " + data.detail);
      } else {
        setError(data.detail || "Failed to run code!");
      }
    } catch {
      setError("Server error. Make sure backend is running.");
    }
    setRunning(false);
  };

  const askAiTutor = async () => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer("");
    setActiveTab("ai");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coding/ai-tutor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: aiQuestion, language: language.id, code }),
      });
      const data = await res.json();
      if (res.ok) setAiAnswer(data.explanation);
    } catch {
      setAiAnswer("Server error. Make sure backend is running.");
    }
    setAiLoading(false);
  };

  const reviewCode = async () => {
    if (!code.trim()) return;
    setReviewLoading(true);
    setReview("");
    setActiveTab("review");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coding/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: language.id }),
      });
      const data = await res.json();
      if (res.ok) setReview(data.review);
    } catch {
      setReview("Server error. Make sure backend is running.");
    }
    setReviewLoading(false);
  };

  const getFileExtension = () => {
    const ext = { python: "py", javascript: "js", java: "java", c: "c", cpp: "cpp" };
    return ext[language.id] || "txt";
  };

  // ─── STYLES ───
  const app = { minHeight: "100vh", backgroundColor: C.bg, color: C.cream, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", maxWidth: 480, margin: "0 auto", position: "relative", overflowX: "hidden", paddingBottom: 140 };
  const head = { backgroundColor: "rgba(15,26,20,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, padding: "14px 16px", position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between" };
  const card = { backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, marginBottom: 12 };
  const btnPri = { width: "100%", backgroundColor: C.green, color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 20px", borderRadius: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 4px 20px ${C.green}35` };
  const btnSec = { width: "100%", backgroundColor: C.surfaceHi, color: C.cream, fontWeight: 600, fontSize: 14, padding: "12px 16px", borderRadius: 12, border: `1px solid ${C.border}`, cursor: "pointer" };
  const input = { width: "100%", backgroundColor: C.surfaceHi, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", color: C.cream, fontSize: 14, outline: "none", fontFamily: "inherit", resize: "none", lineHeight: 1.5, boxSizing: "border-box" };
  const chip = (active, color) => ({ padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, border: `1.5px solid ${active ? color : C.border}`, backgroundColor: active ? `${color}15` : C.surfaceHi, color: active ? color : C.creamMute, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" });
  const label = { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: C.creamMute, marginBottom: 10 };
  const float = { position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: 448, zIndex: 50 };
  const bottomNav = { position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(15,26,20,0.95)", backdropFilter: "blur(20px)", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "8px 0 20px", zIndex: 50, maxWidth: 480, margin: "0 auto" };
  const spin = { width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" };
  const codeOut = (color) => ({ color, fontSize: 13, fontFamily: "JetBrains Mono, Fira Code, monospace", whiteSpace: "pre-wrap", lineHeight: 1.6, margin: 0 });

  return (
    <div style={app}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* HEADER */}
      <div style={head}>
        <a href="/dashboard/student" style={{ color: C.creamMute, fontSize: 20, textDecoration: "none" }}>←</a>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, backgroundColor: C.terra, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800 }}>{"{ }"}</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: C.cream }}>Code Editor</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button onClick={() => setFontSize((p) => Math.max(10, p - 1))} style={{ ...chip(false, C.cream), padding: "4px 10px" }}>−</button>
          <span style={{ color: C.creamMute, fontSize: 12 }}>{fontSize}</span>
          <button onClick={() => setFontSize((p) => Math.min(24, p + 1))} style={{ ...chip(false, C.cream), padding: "4px 10px" }}>+</button>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Language Selector */}
        <div style={{ marginBottom: 16 }}>
          <p style={label}>Language</p>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
            {LANGUAGES.map((lang) => (
              <button key={lang.id} onClick={() => handleLanguageChange(lang)} style={chip(language.id === lang.id, C.terra)}>
                <span style={{ marginRight: 4 }}>{lang.icon}</span>{lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* EDITOR TAB */}
        {activeTab === "editor" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: C.creamMute }}>📄 main.{getFileExtension()}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => navigator.clipboard.writeText(code)} style={{ ...btnSec, width: "auto", padding: "6px 12px", fontSize: 11 }}>📋 Copy</button>
                <button onClick={() => { setCode(language.defaultCode); setOutput(""); setError(""); }} style={{ ...btnSec, width: "auto", padding: "6px 12px", fontSize: 11 }}>🗑️ Clear</button>
              </div>
            </div>

            <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, height: 380 }}>
              <Editor
                height="100%"
                language={language.id}
                value={code}
                theme="vs-dark"
                onChange={(value) => setCode(value || "")}
                options={{
                  fontSize: fontSize,
                  fontFamily: "JetBrains Mono, Fira Code, monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                  lineNumbers: "on",
                  folding: false,
                  autoClosingBrackets: "always",
                  autoClosingQuotes: "always",
                  cursorBlinking: "smooth",
                  renderLineHighlight: "line",
                  scrollbar: { vertical: "auto", horizontal: "auto" },
                }}
              />
            </div>

            {/* Stdin Toggle */}
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setShowStdin(!showStdin)} style={{ ...chip(showStdin, C.forestHi), marginBottom: 8 }}>
                {showStdin ? "Hide" : "Show"} stdin (input)
              </button>
              {showStdin && <textarea value={stdin} onChange={(e) => setStdin(e.target.value)} placeholder="Enter input for your program..." rows={3} style={input} />}
            </div>
          </div>
        )}

        {/* OUTPUT TAB */}
        {activeTab === "output" && (
          <div>
            {execStatus && (
              <div style={{ ...card, padding: "12px 16px", marginBottom: 12, backgroundColor: execStatus === "Accepted" ? `${C.green}10` : `${C.red}10`, borderColor: execStatus === "Accepted" ? `${C.green}25` : `${C.red}25` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: execStatus === "Accepted" ? C.green : C.red }}>{execStatus === "Accepted" ? "✅" : "❌"} {execStatus}</span>
                  {execTime && <span style={{ fontSize: 12, color: C.creamMute }}>⏱️ {execTime}s</span>}
                </div>
              </div>
            )}

            <div style={card}>
              <p style={label}>Console Output</p>
              {running ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.green, fontSize: 13 }}>
                  <span style={{ ...spin, borderColor: `${C.green}40`, borderTopColor: C.green }} />
                  Executing...
                </div>
              ) : output || error ? (
                <div>
                  {output && <pre style={codeOut(C.green)}>{output}</pre>}
                  {error && <pre style={{ ...codeOut(C.red), marginTop: 8 }}>{error}</pre>}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>▶</div>
                  <p style={{ color: C.creamMute, fontSize: 13 }}>Run your code to see output</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI TUTOR TAB */}
        {activeTab === "ai" && (
          <div>
            <div style={card}>
              <p style={label}>Ask AI Tutor</p>
              <textarea value={aiQuestion} onChange={(e) => setAiQuestion(e.target.value)} placeholder="What does this code do? How to fix this error?" rows={4} style={input} />
              <button onClick={askAiTutor} disabled={aiLoading || !aiQuestion.trim()} style={{ ...btnPri, backgroundColor: C.terra, boxShadow: `0 4px 20px ${C.terra}35`, marginTop: 10, opacity: aiLoading || !aiQuestion.trim() ? 0.5 : 1 }}>
                {aiLoading ? <><span style={spin} />Thinking...</> : "🤖 Ask AI"}
              </button>
            </div>

            {aiAnswer && (
              <div style={card}>
                <p style={label}>AI Response</p>
                <div style={{ color: C.cream, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{aiAnswer}</div>
              </div>
            )}

            {!aiAnswer && !aiLoading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["What does this code do?", "How to fix this error?", "Explain time complexity", "Optimize this code"].map((q, i) => (
                  <button key={i} onClick={() => setAiQuestion(q)} style={{ ...btnSec, textAlign: "left", fontSize: 13, color: C.terra, backgroundColor: C.terraGlow, border: `1px solid ${C.terra}20` }}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* REVIEW TAB */}
        {activeTab === "review" && (
          <div>
            <div style={card}>
              <button onClick={reviewCode} disabled={reviewLoading || !code.trim()} style={{ ...btnPri, backgroundColor: C.forestHi, boxShadow: `0 4px 20px ${C.forestHi}35`, opacity: reviewLoading || !code.trim() ? 0.5 : 1 }}>
                {reviewLoading ? <><span style={spin} />Reviewing...</> : "🔍 Review My Code"}
              </button>
            </div>

            {review && (
              <div style={card}>
                <p style={label}>AI Review</p>
                <div style={{ color: C.cream, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{review}</div>
              </div>
            )}

            {!review && !reviewLoading && (
              <div style={{ ...card, textAlign: "center", padding: "32px 16px" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                <p style={{ color: C.creamMute, fontSize: 13, marginBottom: 16 }}>Get AI feedback on your code</p>
                {[
                  "✅ Code quality score",
                  "🐛 Bug detection",
                  "💡 Improvement tips",
                  "⚡ Optimized version",
                ].map((item, i) => (
                  <p key={i} style={{ color: C.creamMute, fontSize: 12, margin: "0 0 6px 0" }}>{item}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FLOATING RUN BUTTON (only on editor tab) */}
      {activeTab === "editor" && (
        <div style={float}>
          <button onClick={runCode} disabled={running} style={{ ...btnPri, opacity: running ? 0.6 : 1 }}>
            {running ? <><span style={spin} />Running...</> : "▶ Run Code"}
          </button>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={bottomNav}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 12px",
              borderRadius: 12,
              backgroundColor: activeTab === tab.id ? C.surfaceHi : "transparent",
            }}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: activeTab === tab.id ? C.terra : C.creamMute }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}