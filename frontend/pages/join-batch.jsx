import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";

export default function JoinBatch() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [myBatches, setMyBatches] = useState([]);
  const [student, setStudent] = useState(null);
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showUpdates, setShowUpdates] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setStudent(parsed);
      fetchMyBatches(parsed.id);
    }
  }, []);

  const fetchMyBatches = async (studentId) => {
    setLoadingBatches(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/batch/my-batches/${studentId}`
      );
      const data = await res.json();
      setMyBatches(data.batches || []);
    } catch (err) {
      console.error(err);
    }
    setLoadingBatches(false);
  };

  const handleJoin = async () => {
    if (!code || code.length < 12) {
      setError("Please enter a valid batch code like RAXX-TCH-8472");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/batch/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: student?.id,
          batch_code: code.toUpperCase(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(data);
        setCode("");
        fetchMyBatches(student?.id);
      } else {
        setError(
          data.detail || "Invalid code! Please check with your teacher."
        );
      }
    } catch (err) {
      setError("Something went wrong. Please try again!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#060b07] text-[#e2f1e6] flex justify-center selection:bg-emerald-500/20 font-sans">
      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-[#081009] min-h-screen flex flex-col border-x border-[#122216] shadow-2xl relative">
        
        {/* Mobile Header Navbar */}
        <header className="sticky top-0 z-40 bg-[#0a140c]/90 backdrop-blur-lg border-b border-[#162a1d] px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => router.push("/dashboard/student")}
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
            <div>
              <h1 className="text-white font-bold text-sm tracking-wide">
                RAXX AI
              </h1>
              <p className="text-[#597a62] text-[10px]">Batch Access Portal</p>
            </div>
          </div>

          <div className="bg-[#0e1d13] border border-[#1d3826] rounded-full px-3 py-1 text-xs font-semibold text-emerald-400">
            {student?.name || "Student"}
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-1 p-4 sm:p-5 space-y-5 overflow-y-auto">

          {/* Header Banner */}
          <div className="bg-gradient-to-b from-[#0f1f14] to-[#0a140d] border border-[#183120] rounded-3xl p-5 text-center space-y-2 shadow-lg">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#060c08] border border-[#1b3623] flex items-center justify-center text-2xl shadow-inner">
              🏫
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Join Teacher's Class
            </h2>
            <p className="text-[#84a68e] text-xs leading-relaxed max-w-[260px] mx-auto">
              Enter the batch code shared by your teacher
            </p>
          </div>

          {/* Join Code Card */}
          <div className="bg-[#0b160d] border border-[#172d1e] rounded-3xl p-5 space-y-4 shadow-md">
            {success && (
              <div className="bg-[#0d2616] border border-[#1b4a2a] rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl shrink-0">🎉</span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-emerald-400 text-xs sm:text-sm">
                    {success.already_joined
                      ? "Already in this batch!"
                      : "Successfully Joined!"}
                  </p>
                  <p className="text-[#8cb899] text-xs truncate mt-0.5">
                    <span className="font-semibold text-white">
                      {success.batch_name}
                    </span>{" "}
                    — {success.subject}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[#72967d] text-[11px] font-bold uppercase tracking-wider block">
                Enter Batch Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="RAXX-TCH-8472"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError("");
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleJoin()}
                  maxLength={13}
                  className="flex-1 bg-[#060c07] text-white border border-[#183120] focus:border-emerald-500 focus:outline-none rounded-xl px-3.5 py-3 text-center text-sm sm:text-base font-mono font-bold tracking-wider placeholder-[#375440] uppercase transition"
                />
                <button
                  onClick={handleJoin}
                  disabled={loading || !code}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition active:scale-95 shadow-md shadow-emerald-950"
                >
                  {loading ? "Joining..." : "Join"}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-950/40 border border-red-800/50 text-red-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* My Batches List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-white tracking-wide">
                My Batches
              </h2>
              <span className="text-xs font-mono text-[#597a62]">
                ({myBatches.length} joined)
              </span>
            </div>

            {loadingBatches ? (
              <div className="text-center py-10 text-[#597a62] text-xs">
                Loading your batches...
              </div>
            ) : myBatches.length === 0 ? (
              <div className="bg-[#0b160d] rounded-3xl border border-[#172d1e] p-8 text-center space-y-2">
                <div className="text-3xl">📭</div>
                <p className="text-[#84a68e] text-xs font-medium">
                  No batches joined yet
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {myBatches.map((member, i) => {
                  const batch = member.batches || {};
                  return (
                    <div
                      key={i}
                      className="bg-[#0b160d] border border-[#172d1e] rounded-2xl p-4 shadow-md space-y-3 hover:border-emerald-500/40 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#102416] border border-[#1f4229] rounded-xl flex items-center justify-center text-emerald-400 font-bold text-base shrink-0">
                            {batch.subject?.[0] || "B"}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white text-xs sm:text-sm truncate">
                              {batch.batch_name || "Batch"}
                            </p>
                            <div className="flex gap-1.5 mt-1">
                              <span className="text-[10px] bg-[#07130a] text-emerald-400 px-2 py-0.5 rounded-full border border-[#183220] font-medium">
                                {batch.subject || "Subject"}
                              </span>
                              <span className="text-[10px] bg-[#07130a] text-[#71947c] px-2 py-0.5 rounded-full border border-[#183220]">
                                {batch.board || "Board"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-mono text-[#597a62] block">
                            {batch.batch_code}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold">
                            ✓ Joined
                          </span>
                        </div>
                      </div>

                      {/* Updates CTA Button */}
                      <button
                        onClick={() => {
                          setSelectedBatch(batch);
                          setShowUpdates(true);
                        }}
                        className="w-full bg-[#122417] hover:bg-[#18301f] border border-[#1f4229] text-emerald-300 font-semibold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 active:scale-95"
                      >
                        <span>📢</span> View Batch Updates
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={() => router.push("/dashboard/student")}
              className="text-[#597a62] hover:text-[#84a68e] text-xs transition"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Updates Modal */}
        {showUpdates && selectedBatch && (
          <StudentUpdatesModal
            batch={selectedBatch}
            student={student}
            onClose={() => {
              setShowUpdates(false);
              setSelectedBatch(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

// ── STUDENT UPDATES MODAL ──
function StudentUpdatesModal({ batch, student, onClose }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState({});
  const [replyText, setReplyText] = useState({});
  const [replyFileUrl, setReplyFileUrl] = useState({});
  const [replyFileName, setReplyFileName] = useState({});
  const [uploadingReply, setUploadingReply] = useState({});
  const [postingReply, setPostingReply] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/announcements/batch/${batch.id}`
      );
      const data = await res.json();
      if (data.success) {
        setAnnouncements(data.announcements || []);
        // Fetch replies for each announcement
        data.announcements.forEach((ann) => fetchReplies(ann.id));
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchReplies = async (announcementId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/announcements/replies/${announcementId}`
      );
      const data = await res.json();
      if (data.success) {
        setReplies((prev) => ({ ...prev, [announcementId]: data.replies }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const uploadReplyFile = async (announcementId, file) => {
    setUploadingReply((prev) => ({ ...prev, [announcementId]: true }));
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("batch-files")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("batch-files")
        .getPublicUrl(fileName);

      setReplyFileUrl((prev) => ({
        ...prev,
        [announcementId]: urlData.publicUrl,
      }));
      setReplyFileName((prev) => ({
        ...prev,
        [announcementId]: file.name,
      }));
    } catch (err) {
      alert("Upload failed!");
      console.error(err);
    }
    setUploadingReply((prev) => ({ ...prev, [announcementId]: false }));
  };

  const postReply = async (announcementId) => {
    if (!replyText[announcementId]?.trim() && !replyFileUrl[announcementId]) {
      alert("Please write a reply or attach a file!");
      return;
    }
    setPostingReply((prev) => ({ ...prev, [announcementId]: true }));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcements/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          announcement_id: announcementId,
          student_id: student.id,
          student_name: student.name,
          message: replyText[announcementId] || "",
          file_url: replyFileUrl[announcementId] || "",
          file_name: replyFileName[announcementId] || "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReplyText((prev) => ({ ...prev, [announcementId]: "" }));
        setReplyFileUrl((prev) => ({ ...prev, [announcementId]: "" }));
        setReplyFileName((prev) => ({ ...prev, [announcementId]: "" }));
        fetchReplies(announcementId);
      }
    } catch (err) {
      console.error(err);
    }
    setPostingReply((prev) => ({ ...prev, [announcementId]: false }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#0b160d] border border-[#183220] rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden text-[#e2f1e6]">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#162c1d]">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>📢</span> Updates & Announcements
            </h2>
            <p className="text-[#6c8f76] text-[11px] mt-0.5">
              {batch.batch_name} • {batch.subject}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#060c07] border border-[#1a3321] text-[#789d84] hover:text-white flex items-center justify-center text-sm font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* Modal List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center py-10 text-[#597a62] text-xs">
              Loading batch updates...
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <div className="text-3xl">📭</div>
              <p className="text-[#597a62] text-xs">
                No announcements from teacher yet
              </p>
            </div>
          ) : (
            announcements.map((ann, i) => (
              <div
                key={i}
                className="bg-[#060c07] border border-[#162b1c] rounded-2xl p-4 space-y-3"
              >
                {/* Teacher Announcement Header & Body */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 bg-emerald-950 border border-emerald-700/50 rounded-full flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                    T
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-400">
                        Teacher
                      </span>
                      <span className="text-[10px] text-[#597a62]">
                        {new Date(ann.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {ann.message && (
                      <p className="text-white text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                        {ann.message}
                      </p>
                    )}

                    {ann.file_url && (
                      <a
                        href={ann.file_url}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="inline-flex items-center gap-1.5 bg-[#0f2115] border border-[#1e4228] text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-[#162d1e] transition mt-1.5"
                      >
                        <span>📥</span>
                        <span className="truncate max-w-[180px]">
                          {ann.file_name || "Download Attachment"}
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Nested Student Replies */}
                {replies[ann.id]?.length > 0 && (
                  <div className="ml-3 pl-3 border-l border-[#193220] space-y-2">
                    <button
                      onClick={() =>
                        setExpandedReplies((prev) => ({
                          ...prev,
                          [ann.id]: !prev[ann.id],
                        }))
                      }
                      className="text-[11px] text-[#597a62] hover:text-emerald-400 transition flex items-center gap-1"
                    >
                      <span>
                        {expandedReplies[ann.id] ? "▼ Hide" : "▶ Show"}
                      </span>
                      <span>{replies[ann.id]?.length} replies</span>
                    </button>

                    {expandedReplies[ann.id] &&
                      replies[ann.id]?.map((reply, ri) => (
                        <div key={ri} className="flex items-start gap-2 pt-1">
                          <div className="w-5 h-5 bg-[#0e1d13] border border-[#1b3623] text-emerald-400 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                            {reply.student_name?.[0]?.toUpperCase() || "S"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-semibold text-emerald-400">
                              {reply.student_name}
                            </p>
                            {reply.message && (
                              <p className="text-white text-xs">
                                {reply.message}
                              </p>
                            )}
                            {reply.file_url && (
                              <a
                                href={reply.file_url}
                                target="_blank"
                                rel="noreferrer"
                                download
                                className="text-[11px] text-emerald-300 underline block mt-0.5"
                              >
                                📎 {reply.file_name || "Download"}
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Reply Composer Card */}
                <div className="bg-[#0a130d] border border-[#152a1c] rounded-xl p-3 space-y-2">
                  <textarea
                    placeholder="Write a reply..."
                    value={replyText[ann.id] || ""}
                    onChange={(e) =>
                      setReplyText((prev) => ({
                        ...prev,
                        [ann.id]: e.target.value,
                      }))
                    }
                    rows={2}
                    className="w-full text-xs text-white bg-transparent outline-none resize-none placeholder-[#375440]"
                  />

                  <div className="flex items-center justify-between border-t border-[#132719] pt-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.png,.jpg"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) await uploadReplyFile(ann.id, file);
                        }}
                      />
                      {uploadingReply[ann.id] ? (
                        <span className="text-[11px] text-emerald-400">
                          Uploading...
                        </span>
                      ) : replyFileUrl[ann.id] ? (
                        <span className="text-[11px] text-emerald-400 font-semibold">
                          ✅ Attached
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#597a62] hover:text-emerald-300 transition">
                          📎 Attach File
                        </span>
                      )}
                    </label>

                    <button
                      onClick={() => postReply(ann.id)}
                      disabled={postingReply[ann.id]}
                      className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition active:scale-95"
                    >
                      {postingReply[ann.id] ? "Sending..." : "Reply →"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}