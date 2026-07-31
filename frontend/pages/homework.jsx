import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";

export default function Homework() {
  const router = useRouter();
  const [mode, setMode] = useState("student");
  const [checkingRole, setCheckingRole] = useState(true);
  const [roomCode, setRoomCode] = useState("");
  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [answerFileUrl, setAnswerFileUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [createdCode, setCreatedCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [teacherForm, setTeacherForm] = useState({
    title: "",
    description: "",
    due_date: "",
    file_url: "",
  });

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "teacher") {
        setMode("teacher");
      } else {
        setMode("student");
      }
    } catch (error) {
      console.error("Role check error:", error);
    }
    setCheckingRole(false);
  };

  const joinHomework = async () => {
    if (roomCode.length !== 6) {
      setError("Please enter a valid 6-digit room code!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/homework/join/" + roomCode);
      const data = await res.json();
      if (res.ok) {
        setHomework(data.homework);
      } else {
        setError(data.detail || "Invalid room code!");
      }
    } catch (err) {
      setError("Server error. Make sure backend is running.");
    }
    setLoading(false);
  };

  const uploadPdf = async (file) => {
    if (!file) return null;
    setUploadingPdf(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("homework-files")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("homework-files")
        .getPublicUrl(fileName);

      setPdfUploaded(true);
      setUploadingPdf(false);
      return urlData.publicUrl;
    } catch (err) {
      console.error("Upload error:", err);
      setUploadingPdf(false);
      return null;
    }
  };

  const submitHomework = async () => {
    if (!answerText.trim() && !answerFileUrl.trim()) {
      setError("Please write your answer or paste a PDF link!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const res = await fetch("http://127.0.0.1:8000/homework/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homework_id: homework.id,
          student_id: user?.id || "test-student",
          answer_text: answerText,
          file_url: answerFileUrl,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.detail || "Submission failed!");
      }
    } catch (err) {
      setError("Server error. Make sure backend is running.");
    }
    setLoading(false);
  };

  const createHomework = async () => {
    if (!teacherForm.title) {
      setError("Please enter homework title!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const res = await fetch("http://127.0.0.1:8000/homework/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacher_id: user?.id || "test-teacher",
          title: teacherForm.title,
          description: teacherForm.description,
          due_date: teacherForm.due_date,
          file_url: teacherForm.file_url,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCreatedCode(data.room_code);
      } else {
        setError(data.detail || "Failed to create homework!");
      }
    } catch (err) {
      setError("Server error. Make sure backend is running.");
    }
    setLoading(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(createdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (checkingRole) {
    return (
      <div className="min-h-screen bg-[#060b07] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#1c3824] border-t-emerald-400 animate-spin mb-4" />
        <p className="text-emerald-400/90 text-xs font-semibold uppercase tracking-widest">
          Loading Mobile App...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060b07] text-[#e2f1e6] flex justify-center selection:bg-emerald-500/20 font-sans">
      {/* Mobile App Container Viewport */}
      <div className="w-full max-w-md bg-[#081009] min-h-screen flex flex-col border-x border-[#122216] shadow-2xl relative">
        
        {/* Mobile Header / Navigation Bar */}
        <header className="sticky top-0 z-40 bg-[#0a140c]/90 backdrop-blur-lg border-b border-[#162a1d] px-4 py-3.5 flex items-center justify-between">
          <button
            onClick={() =>
              router.push(
                mode === "teacher"
                  ? "/dashboard/teacher"
                  : "/dashboard/student"
              )
            }
            className="w-9 h-9 rounded-xl bg-[#0f1d13] border border-[#1b3623] hover:bg-[#162a1d] flex items-center justify-center text-emerald-300 transition active:scale-90"
            aria-label="Back"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600/90 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-emerald-950">
              📚
            </div>
            <span className="text-white font-bold text-sm tracking-wide">
              Homework
            </span>
          </div>

          <div className="bg-[#0e1d13] border border-[#1d3826] rounded-full px-3 py-1 text-[11px] font-semibold text-emerald-400">
            {mode === "teacher" ? "Teacher" : "Student"}
          </div>
        </header>

        {/* Scrollable Content Body */}
        <div className="flex-1 p-4 sm:p-5 space-y-5 overflow-y-auto">

          {/* STUDENT — Enter Code */}
          {mode === "student" && !homework && (
            <div className="space-y-5">
              {/* App Banner */}
              <div className="bg-gradient-to-b from-[#0f1f14] to-[#0a140d] border border-[#183120] rounded-3xl p-5 text-center space-y-2 shadow-lg">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#060c08] border border-[#1b3623] flex items-center justify-center text-2xl shadow-inner">
                  🔑
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Join Homework Room
                </h2>
                <p className="text-[#84a68e] text-xs leading-relaxed max-w-[260px] mx-auto">
                  Enter 6-digit access code provided by your teacher
                </p>
              </div>

              {/* Matte Input Card */}
              <div className="bg-[#0b160d] border border-[#172d1e] rounded-3xl p-5 space-y-4 shadow-md">
                <label className="text-[#72967d] text-[11px] font-bold uppercase tracking-wider block text-center">
                  Room Access Code
                </label>

                {/* Mobile PIN Grid */}
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-12 bg-[#060c07] border-2 rounded-xl flex items-center justify-center text-xl font-bold font-mono transition-all ${
                        roomCode[i]
                          ? "border-emerald-500 text-emerald-300 bg-[#0e1e13] shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                          : "border-[#162c1d] text-[#3d5c46]"
                      }`}
                    >
                      {roomCode[i] || ""}
                    </div>
                  ))}
                </div>

                <input
                  type="number"
                  placeholder="Enter 6 digits"
                  value={roomCode}
                  onChange={(e) => {
                    setRoomCode(e.target.value.slice(0, 6));
                    setError("");
                  }}
                  className="w-full bg-[#060c07] text-white px-4 py-3 rounded-xl border border-[#193220] focus:outline-none focus:border-emerald-500 text-center text-base tracking-widest font-mono placeholder-[#3b5944] transition"
                />

                {error && (
                  <div className="bg-red-950/40 border border-red-800/50 text-red-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={joinHomework}
                  disabled={loading || roomCode.length !== 6}
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-emerald-950/80 flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>🔍</span>
                      <span>Find Homework</span>
                    </>
                  )}
                </button>
              </div>

              {/* How it works */}
              <div className="bg-[#09120a] border border-[#15281a] rounded-2xl p-4 space-y-3">
                <h3 className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>📋</span> How it works
                </h3>
                <div className="space-y-2.5">
                  {[
                    "Teacher creates assignment & gets code",
                    "Teacher shares code with students",
                    "Enter code here to view questions",
                    "Submit text or PDF answer online",
                    "Teacher reviews your submission",
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 bg-[#102216] border border-[#1f3a27] text-emerald-400 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-[#84a88f] text-xs leading-tight">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { icon: "⚡", title: "Instant View", desc: "No delay loading" },
                  { icon: "📄", title: "PDF View", desc: "Read assignment" },
                  { icon: "✅", title: "Fast Submit", desc: "One-tap response" },
                  { icon: "🔔", title: "Due Alerts", desc: "Track deadlines" },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="bg-[#0a140d] border border-[#162b1c] rounded-xl p-3"
                  >
                    <div className="text-lg mb-1">{f.icon}</div>
                    <div className="text-emerald-200 font-semibold text-xs">
                      {f.title}
                    </div>
                    <div className="text-[#597a62] text-[10px]">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STUDENT — Homework Detail */}
          {mode === "student" && homework && !submitted && (
            <div className="space-y-4">
              {/* Assignment Overview Card */}
              <div className="bg-[#0b160d] border border-[#183120] rounded-3xl p-5 space-y-3 shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="inline-block bg-[#122619] border border-[#20422b] text-emerald-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md">
                      CODE: {homework.room_code}
                    </span>
                    <h2 className="text-white font-bold text-lg leading-snug">
                      {homework.title}
                    </h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#070e09] border border-[#1a3422] flex items-center justify-center text-xl shrink-0">
                    📋
                  </div>
                </div>

                {homework.due_date && (
                  <p className="text-emerald-400/90 text-xs flex items-center gap-1.5 pt-1">
                    <span>📅</span>
                    <span>
                      Due:{" "}
                      {new Date(homework.due_date).toLocaleDateString("en-IN")}
                    </span>
                  </p>
                )}

                {homework.description && (
                  <div className="bg-[#070e08] border border-[#162c1d] rounded-xl p-3.5">
                    <h4 className="text-emerald-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                      Instructions
                    </h4>
                    <p className="text-[#9fc2a9] text-xs leading-relaxed whitespace-pre-wrap">
                      {homework.description}
                    </p>
                  </div>
                )}

                {homework.file_url && (
                  <a
                    href={homework.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#070e08] border border-[#183020] hover:border-emerald-500/50 rounded-xl p-3 transition active:scale-[0.99]"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400 text-sm shrink-0">
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-xs truncate">
                        Download Assignment PDF
                      </p>
                      <p className="text-[#597a62] text-[10px]">Tap to open file</p>
                    </div>
                    <span className="text-emerald-400 text-sm">↓</span>
                  </a>
                )}
              </div>

              {/* Answer Input Card */}
              <div className="bg-[#0b160d] border border-[#183120] rounded-3xl p-5 space-y-4 shadow-lg">
                <div className="space-y-1.5">
                  <label className="text-[#73967e] text-[11px] font-bold uppercase tracking-wider block">
                    Write Your Answer
                  </label>
                  <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Write your response here..."
                    rows={4}
                    className="w-full bg-[#060c07] text-white px-3.5 py-3 rounded-xl border border-[#172d1e] focus:outline-none focus:border-emerald-500 text-xs placeholder-[#3a5843] resize-none transition"
                  />
                </div>

                {/* PDF Upload Button */}
                <div className="space-y-1.5">
                  <label className="text-[#73967e] text-[11px] font-bold uppercase tracking-wider block">
                    Or Attach PDF File
                  </label>
                  <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-[#1a3322] rounded-xl p-4 cursor-pointer bg-[#060c07] hover:bg-[#09130b] transition active:scale-[0.99]">
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const url = await uploadPdf(file);
                          if (url) setAnswerFileUrl(url);
                        }
                      }}
                    />
                    {uploadingPdf ? (
                      <div className="flex items-center gap-2 py-1">
                        <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-emerald-400 text-xs font-medium">
                          Uploading...
                        </span>
                      </div>
                    ) : pdfUploaded ? (
                      <div className="text-center py-1">
                        <span className="text-xl">✅</span>
                        <p className="text-emerald-400 text-xs font-semibold mt-1">
                          PDF Attached
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-1">
                        <span className="text-xl">📄</span>
                        <p className="text-emerald-300 text-xs font-medium mt-1">
                          Tap to select PDF
                        </p>
                      </div>
                    )}
                  </label>

                  {answerFileUrl && !uploadingPdf && (
                    <a
                      href={answerFileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-medium pt-1"
                    >
                      <span>📄</span> View uploaded PDF →
                    </a>
                  )}
                </div>

                {/* Cloud Link Input */}
                <div className="space-y-1.5">
                  <label className="text-[#73967e] text-[11px] font-bold uppercase tracking-wider block">
                    Or Paste PDF Link
                  </label>
                  <input
                    type="text"
                    placeholder="Paste Google Drive PDF URL..."
                    value={answerFileUrl}
                    onChange={(e) => setAnswerFileUrl(e.target.value)}
                    className="w-full bg-[#060c07] text-white px-3.5 py-2.5 rounded-xl border border-[#172d1e] focus:outline-none focus:border-emerald-500 text-xs placeholder-[#375440]"
                  />
                </div>

                {error && (
                  <div className="bg-red-950/40 border border-red-800/50 text-red-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      setHomework(null);
                      setRoomCode("");
                    }}
                    className="w-1/3 h-11 bg-[#070e08] text-[#7a9d84] border border-[#182e1f] font-bold rounded-xl text-xs active:scale-95 transition"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={submitHomework}
                    disabled={loading}
                    className="w-2/3 h-11 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-950 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider active:scale-95"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>✅</span>
                        <span>Submit Answer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STUDENT — Submitted */}
          {mode === "student" && submitted && (
            <div className="bg-[#0b160d] border border-[#183120] rounded-3xl p-6 text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0e2114] border border-emerald-500/40 text-3xl flex items-center justify-center shadow-lg">
                🎉
              </div>
              <h2 className="text-xl font-bold text-white">Submitted!</h2>
              <p className="text-[#84a68e] text-xs">
                Your homework answer has been sent to your teacher.
              </p>
              <div className="bg-[#060c07] border border-[#162c1d] rounded-xl p-3">
                <p className="text-emerald-400 text-xs font-medium">
                  Teacher will review your work soon.
                </p>
              </div>
              <button
                onClick={() => {
                  setHomework(null);
                  setRoomCode("");
                  setSubmitted(false);
                  setAnswerText("");
                }}
                className="w-full h-12 bg-emerald-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition"
              >
                Join Another Room
              </button>
            </div>
          )}

          {/* TEACHER — Create Form */}
          {mode === "teacher" && !createdCode && (
            <div className="space-y-5">
              <div className="bg-gradient-to-b from-[#0f1f14] to-[#0a140d] border border-[#183120] rounded-3xl p-5 text-center space-y-2 shadow-lg">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#060c08] border border-[#1b3623] flex items-center justify-center text-2xl shadow-inner">
                  👨‍🏫
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Create Homework Room
                </h2>
                <p className="text-[#84a68e] text-xs leading-relaxed max-w-[260px] mx-auto">
                  Generate a 6-digit access code for your class
                </p>
              </div>

              <div className="bg-[#0b160d] border border-[#172d1e] rounded-3xl p-5 space-y-3.5 shadow-md">
                <div className="space-y-1">
                  <label className="text-[#72967d] text-[11px] font-bold uppercase tracking-wider block">
                    Homework Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Newton's Laws Exercise"
                    value={teacherForm.title}
                    onChange={(e) =>
                      setTeacherForm({ ...teacherForm, title: e.target.value })
                    }
                    className="w-full bg-[#060c07] text-white px-3.5 py-2.5 rounded-xl border border-[#172d1e] focus:outline-none focus:border-emerald-500 text-xs placeholder-[#375440]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#72967d] text-[11px] font-bold uppercase tracking-wider block">
                    Instructions for Students
                  </label>
                  <textarea
                    placeholder="Write instructions..."
                    value={teacherForm.description}
                    onChange={(e) =>
                      setTeacherForm({
                        ...teacherForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full bg-[#060c07] text-white px-3.5 py-2.5 rounded-xl border border-[#172d1e] focus:outline-none focus:border-emerald-500 text-xs placeholder-[#375440] resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#72967d] text-[11px] font-bold uppercase tracking-wider block">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={teacherForm.due_date}
                    onChange={(e) =>
                      setTeacherForm({ ...teacherForm, due_date: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-[#060c07] text-white px-3.5 py-2.5 rounded-xl border border-[#172d1e] focus:outline-none focus:border-emerald-500 text-xs [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#72967d] text-[11px] font-bold uppercase tracking-wider block">
                    File URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Google Drive / PDF link"
                    value={teacherForm.file_url}
                    onChange={(e) =>
                      setTeacherForm({ ...teacherForm, file_url: e.target.value })
                    }
                    className="w-full bg-[#060c07] text-white px-3.5 py-2.5 rounded-xl border border-[#172d1e] focus:outline-none focus:border-emerald-500 text-xs placeholder-[#375440]"
                  />
                </div>

                {error && (
                  <div className="bg-red-950/40 border border-red-800/50 text-red-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={createHomework}
                  disabled={loading}
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 text-xs uppercase tracking-wider active:scale-[0.98]"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>📋</span>
                      <span>Generate Room Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Teacher Tips */}
              <div className="bg-[#09120a] border border-[#15281a] rounded-2xl p-4 space-y-2">
                <h3 className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  💡 Teacher Guide
                </h3>
                <div className="space-y-1.5">
                  {[
                    "Upload assignment PDF to Drive first",
                    "Set due date & clear instructions",
                    "Share 6-digit room code with class",
                    "View responses on Teacher Dashboard",
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 text-xs">•</span>
                      <p className="text-[#84a88f] text-xs">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TEACHER — Display Code */}
          {mode === "teacher" && createdCode && (
            <div className="space-y-5 text-center">
              <div className="bg-[#0b160d] border border-[#183120] rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#0e2114] border border-emerald-500/40 text-3xl flex items-center justify-center">
                  🎉
                </div>
                <h2 className="text-xl font-bold text-white">Room Code Created</h2>
                
                {/* Code Digits Display */}
                <div className="flex gap-2 justify-center py-2">
                  {createdCode.split("").map((digit, i) => (
                    <div
                      key={i}
                      className="w-11 h-14 bg-[#060c07] border-2 border-emerald-500/80 rounded-xl flex items-center justify-center text-2xl font-bold font-mono text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    >
                      {digit}
                    </div>
                  ))}
                </div>

                <button
                  onClick={copyCode}
                  className={`w-full h-11 rounded-xl font-bold transition text-xs uppercase tracking-wider ${
                    copied
                      ? "bg-emerald-600 text-white"
                      : "bg-[#102216] border border-[#1f3d28] text-emerald-300"
                  }`}
                >
                  {copied ? "✅ Code Copied!" : "📋 Copy Room Code"}
                </button>
              </div>

              {/* Share Message Box */}
              <div className="bg-[#070e08] border border-[#172e1e] rounded-2xl p-4 text-left space-y-2">
                <p className="text-emerald-400 text-[11px] font-bold uppercase">
                  📱 Share Message
                </p>
                <div className="bg-[#0b160f] p-3 rounded-xl border border-[#183020]">
                  <p className="text-[#96b8a1] text-xs">
                    "Open RAXX AI → Homework → Code:{" "}
                    <strong className="text-emerald-300 font-mono">
                      {createdCode}
                    </strong>"
                  </p>
                </div>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `Open RAXX AI → Go to Homework section → Enter code: ${createdCode} to see your homework!`
                    )
                  }
                  className="w-full bg-[#102216] text-emerald-300 border border-[#1e3d28] py-2 rounded-xl text-xs font-semibold active:scale-95 transition"
                >
                  Copy Message Text
                </button>
              </div>

              <button
                onClick={() => {
                  setCreatedCode("");
                  setTeacherForm({
                    title: "",
                    description: "",
                    due_date: "",
                    file_url: "",
                  });
                }}
                className="w-full h-12 bg-emerald-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider active:scale-95 transition shadow-lg"
              >
                ➕ Create Another Room
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}