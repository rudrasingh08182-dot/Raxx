import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

const subjects = [
  "All Subjects", "Mathematics", "Physics", "Chemistry",
  "Biology", "History", "Geography", "Economics",
  "English", "Computer Science", "Reasoning", "General Knowledge",
];

export default function DoubtSolver() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [language, setLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [recentDoubts, setRecentDoubts] = useState([]);
  const [showRecentDrawer, setShowRecentDrawer] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFile(file);
    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

 const askDoubt = async () => {
  if (!question.trim() && !uploadedFile) return;

  // Last 2 Q&A pairs nikalo history ke liye — poori chat nahi, sirf recent context
  const completedMessages = messages.filter((m) => m.content && m.content.trim() !== "");
  const historyPairs = [];
  for (let i = 0; i < completedMessages.length - 1; i++) {
    if (completedMessages[i].type === "user" && completedMessages[i + 1]?.type === "ai") {
      historyPairs.push({
        question: completedMessages[i].content,
        answer: completedMessages[i + 1].content,
      });
    }
  }
  const recentHistory = historyPairs.slice(-2);

  const userMessage = {
    id: Date.now(),
    type: "user",
    content: question,
    subject: subject !== "All Subjects" ? subject : "",
    file: previewUrl,
    fileName: uploadedFile?.name,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  setMessages((prev) => [...prev, userMessage]);
  setRecentDoubts((prev) =>
    [{ question, subject, time: userMessage.time }, ...prev].slice(0, 10)
  );

  const currentQuestion = question;
  setQuestion("");
  setUploadedFile(null);
  setPreviewUrl(null);
  setLoading(true);

  const aiMessageId = Date.now() + 1;
  // Empty AI message pehle hi add kar do — usko stream update karega
  setMessages((prev) => [
    ...prev,
    {
      id: aiMessageId,
      type: "ai",
      content: "",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doubt/ask-stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: currentQuestion || "Please solve this from the uploaded image",
        subject: subject !== "All Subjects" ? subject : "",
        language,
        history: recentHistory,
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error("Stream failed");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullAnswer = "";

    setLoading(false); // pehla chunk aate hi loading dots hata do

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullAnswer += decoder.decode(value, { stream: true });

      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMessageId ? { ...m, content: fullAnswer } : m
        )
      );
    }
  } catch (err) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === aiMessageId
          ? { ...m, content: "Server error. Make sure backend is running." }
          : m
      )
    );
  }

  setLoading(false);
};

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askDoubt();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setQuestion("");
    setUploadedFile(null);
    setPreviewUrl(null);
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
  };

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col relative" style={{ background: c.bg, color: c.text }}>

      {/* ── STICKY HEADER ── */}
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => router.push("/dashboard/student")}
            className="p-1.5 rounded-lg transition"
            style={{ color: c.textMuted }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: c.rust, color: c.cream }}>
              AI
            </div>
            <span className="font-bold text-sm" style={{ color: c.text }}>Doubt Solver</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="text-xs px-2.5 py-1 rounded-lg transition"
              style={{ background: c.hover, color: c.textDim }}
            >
              🗑️
            </button>
          )}
          <button
            onClick={() => setShowRecentDrawer(true)}
            className="text-xs px-2.5 py-1 rounded-lg transition relative"
            style={{ background: c.hover, color: c.textMuted }}
          >
            🕒
            {recentDoubts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ background: c.rust, color: c.cream }}>
                {recentDoubts.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── SUBJECT + LANGUAGE BAR ── */}
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
        {/* Subject Dropdown */}
        <button
          onClick={() => setShowSubjects(!showSubjects)}
          className="flex-1 flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition"
          style={{ background: c.hover, border: `1px solid ${c.border}`, color: c.textMuted }}
        >
          <span>📚 {subject}</span>
          <span style={{ color: c.textDim }}>{showSubjects ? "▲" : "▼"}</span>
        </button>

        {/* Language Toggle */}
        <div className="flex rounded-xl p-0.5" style={{ background: c.hover, border: `1px solid ${c.border}` }}>
          <button
            onClick={() => setLanguage("english")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
            style={{
              background: language === "english" ? c.rust : "transparent",
              color: language === "english" ? c.cream : c.textDim,
            }}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("hindi")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
            style={{
              background: language === "hindi" ? c.rust : "transparent",
              color: language === "hindi" ? c.cream : c.textDim,
            }}
          >
            HI
          </button>
        </div>
      </div>

      {/* Subject Dropdown Panel */}
      {showSubjects && (
        <div className="px-4 pb-2" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
          <div className="rounded-xl overflow-hidden" style={{ background: c.hover, border: `1px solid ${c.border}` }}>
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => { setSubject(s); setShowSubjects(false); }}
                className="w-full text-left text-xs px-3 py-2.5 transition flex items-center gap-2"
                style={{
                  color: subject === s ? c.amber : c.textMuted,
                  background: subject === s ? "rgba(139,58,42,0.12)" : "transparent",
                  borderBottom: `1px solid ${c.border}`,
                }}
              >
                {subject === s && <span>✓</span>}
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── MESSAGES AREA ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-4">

        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl mb-4"
              style={{ background: c.rust, color: c.cream }}
            >
              AI
            </div>
            <h3 className="text-xl font-bold mb-1" style={{ color: c.text }}>
              How can I help?
            </h3>
            <p className="text-sm mb-6" style={{ color: c.textMuted }}>
              Ask any doubt — step by step in Hindi or English!
            </p>

            {/* Suggestion Cards */}
            <div className="grid grid-cols-2 gap-2.5 w-full">
              {[
                { icon: "🔢", text: "Explain Pythagoras theorem" },
                { icon: "⚗️", text: "Acid vs Base difference?" },
                { icon: "📜", text: "First PM of India?" },
                { icon: "💻", text: "What is for loop in Python?" },
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setQuestion(suggestion.text)}
                  className="rounded-xl p-3.5 text-left transition"
                  style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}
                >
                  <span className="text-xl mb-1.5 block">{suggestion.icon}</span>
                  <p className="text-xs leading-relaxed" style={{ color: c.textMuted }}>
                    {suggestion.text}
                  </p>
                </button>
              ))}
            </div>

            {/* Tips */}
            <div className="mt-6 rounded-xl p-3 w-full text-left" style={{ background: "rgba(45,90,71,0.10)", border: `1px solid rgba(45,90,71,0.20)` }}>
              <p className="text-xs font-semibold mb-1" style={{ color: c.green }}>💡 Tips</p>
              <ul className="text-xs space-y-0.5" style={{ color: c.textDim }}>
                <li>• Select subject first for better answers</li>
                <li>• Upload photo of handwritten question</li>
                <li>• Press Enter to send quickly</li>
              </ul>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-5">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.type === "user" ? (
                /* User Message */
                <div className="flex justify-end">
                  <div className="max-w-[85%]">
                    {msg.subject && (
                      <div className="flex justify-end mb-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(139,58,42,0.15)", color: c.amber }}
                        >
                          📚 {msg.subject}
                        </span>
                      </div>
                    )}
                    {msg.file && (
                      <div className="mb-2 flex justify-end">
                        <img
                          src={msg.file}
                          alt="uploaded"
                          className="max-h-40 rounded-xl object-contain"
                          style={{ border: `1px solid ${c.border}` }}
                        />
                      </div>
                    )}
                    {msg.content && (
                      <div
                        className="px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed"
                        style={{ background: c.rust, color: c.cream }}
                      >
                        {msg.content}
                      </div>
                    )}
                    <p className="text-xs mt-1 text-right" style={{ color: c.textDim }}>{msg.time}</p>
                  </div>
                </div>
              ) : (
                /* AI Message */
                <div className="flex gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5"
                    style={{ background: c.rust, color: c.cream }}
                  >
                    AI
                  </div>
                  <div className="flex-1 max-w-[85%]">
                    <div
                      className="px-4 py-3 rounded-2xl rounded-tl-sm"
                      style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}
                    >
                      <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: c.textMuted }}>
                        {msg.content}
                      </div>
                      <div className="flex items-center gap-2 mt-2.5 pt-2.5" style={{ borderTop: `1px solid ${c.border}` }}>
                        <button
                          onClick={() => navigator.clipboard.writeText(msg.content)}
                          className="text-xs transition flex items-center gap-1"
                          style={{ color: c.textDim }}
                        >
                          📋 Copy
                        </button>
                        <span style={{ color: c.border }}>•</span>
                        <p className="text-xs" style={{ color: c.textDim }}>{msg.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0"
                style={{ background: c.rust, color: c.cream }}
              >
                AI
              </div>
              <div
                className="px-4 py-3 rounded-2xl rounded-tl-sm"
                style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: c.amber, animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: c.amber, animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: c.amber, animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── INPUT AREA ── */}
      <div className="px-4 py-3 pb-safe" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>

        {/* File Preview */}
        {previewUrl && (
          <div className="mb-2 flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
            <img src={previewUrl} alt="preview" className="h-10 w-10 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: c.textMuted }}>{uploadedFile?.name}</p>
              <p className="text-xs" style={{ color: c.textDim }}>Image</p>
            </div>
            <button
              onClick={() => { setUploadedFile(null); setPreviewUrl(null); }}
              className="text-sm p-1"
              style={{ color: c.textDim }}
            >
              ✕
            </button>
          </div>
        )}

        {uploadedFile && !previewUrl && (
          <div className="mb-2 flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
            <span className="text-lg">📄</span>
            <p className="text-xs flex-1 truncate" style={{ color: c.textMuted }}>{uploadedFile?.name}</p>
            <button
              onClick={() => setUploadedFile(null)}
              className="text-sm p-1"
              style={{ color: c.textDim }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Input Box */}
        <div
          className="flex items-end gap-2 rounded-2xl px-3 py-2.5"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          {/* Upload Button */}
          <button
            onClick={() => fileRef.current.click()}
            className="p-1.5 pb-2 transition"
            style={{ color: c.textDim }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>
          <input
            type="file"
            ref={fileRef}
            onChange={handleFileUpload}
            accept="image/*,.pdf"
            className="hidden"
          />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask your doubt..."
            rows={1}
            className="flex-1 bg-transparent text-sm resize-none focus:outline-none py-1.5"
            style={{ color: c.text, minHeight: "20px", maxHeight: "100px" }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
            }}
          />

          {/* Send Button */}
          <button
            onClick={askDoubt}
            disabled={loading || (!question.trim() && !uploadedFile)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition disabled:opacity-30"
            style={{ background: c.rust, color: c.cream }}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            )}
          </button>
        </div>

        <p className="text-xs text-center mt-1.5" style={{ color: c.textDim }}>
          RAXX AI can make mistakes. Verify important info.
        </p>
      </div>

      {/* ── RECENT DOUBTS DRAWER ── */}
      {showRecentDrawer && (
        <>
          <div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(13,17,23,0.7)" }}
            onClick={() => setShowRecentDrawer(false)}
          />
          <div
            className="fixed top-0 right-0 bottom-0 z-50 w-72 overflow-y-auto"
            style={{ background: c.surface, borderLeft: `1px solid ${c.border}` }}
          >
            {/* Drawer Header */}
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${c.border}` }}>
              <span className="font-bold text-sm" style={{ color: c.text }}>🕒 Recent Doubts</span>
              <button
                onClick={() => setShowRecentDrawer(false)}
                className="p-1"
                style={{ color: c.textMuted }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* New Doubt Button */}
            <div className="p-3">
              <button
                onClick={() => { clearChat(); setShowRecentDrawer(false); }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition"
                style={{ background: c.rust, color: c.cream }}
              >
                ✏️ New Doubt
              </button>
            </div>

            {/* Recent List */}
            <div className="px-3 pb-4 space-y-2">
              {recentDoubts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-2xl mb-2">🤔</p>
                  <p className="text-xs" style={{ color: c.textDim }}>No doubts yet</p>
                </div>
              ) : (
                recentDoubts.map((doubt, i) => (
                  <button
                    key={i}
                    onClick={() => { setQuestion(doubt.question); setShowRecentDrawer(false); }}
                    className="w-full text-left rounded-xl px-3 py-2.5 transition"
                    style={{ background: c.hover, border: `1px solid ${c.border}` }}
                  >
                    <p className="text-xs line-clamp-2" style={{ color: c.textMuted }}>
                      {doubt.question}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      {doubt.subject && (
                        <span className="text-xs" style={{ color: c.amber }}>{doubt.subject}</span>
                      )}
                      <span className="text-xs" style={{ color: c.textDim }}>{doubt.time}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}