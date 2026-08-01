import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../utils/supabase";

// ── HOMEWORK TAB COMPONENT ──
function HomeworkTab({ teacher }) {
  const [homeworks, setHomeworks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [successCode, setSuccessCode] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [uploadingPdf, setUploadingPdf] = useState(false);
const [pdfUploaded, setPdfUploaded] = useState(false);
const [replies, setReplies] = useState({});
const [expandedReplies, setExpandedReplies] = useState({});
  const [form, setForm] = useState({
    title: '',
    subject: '',
    description: '',
    due_date: '',
    file_url: '',
  });

  useEffect(() => {
    if (teacher?.id) fetchHomeworks();
  }, [teacher]);

  const fetchHomeworks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/homework/teacher/${teacher.id}`);
      const data = await res.json();
      // backend "status" return karta hai "success" nahi
      if (data.status === 'success') setHomeworks(data.homeworks || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };
  const uploadPdf = async (file) => {
  if (!file) return null;
  setUploadingPdf(true);
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('homework-files')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('homework-files')
      .getPublicUrl(fileName);

    setPdfUploaded(true);
    setUploadingPdf(false);
    return urlData.publicUrl;
  } catch (err) {
    console.error('Upload error:', err);
    setUploadingPdf(false);
    return null;
  }
};
   const handleCreate = async () => {
  if (!form.title || !form.due_date) {
    alert("Please fill Title and Due Date!");
    return;
  }
  setCreating(true);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/homework/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teacher_id: teacher.id,
        title: form.title,
        description: form.description,
        due_date: form.due_date,
        file_url: form.file_url || "",
      }),
    });
    const data = await res.json();
    if (data.status === 'success') {
      setSuccessCode(data.room_code);
      setShowForm(false);
      setForm({ title: '', subject: '', description: '', due_date: '', file_url: '' });
      fetchHomeworks();
    } else {
      alert("Error: " + (data.detail || "Something went wrong!"));
    }
  } catch (err) {
    alert("Backend error!");
    console.error(err);
  }
  setCreating(false);
};
 
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Homework</h1>
          <p className="text-gray-500 text-sm mt-1">Upload assignments — students join with 6-digit room code</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          + Upload Homework
        </button>
      </div>

      {/* Success Code Banner */}
      {successCode && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-bold text-lg">✅ Homework Created!</p>
              <p className="text-green-600 text-sm mt-1">Share this room code with students:</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-mono font-bold text-3xl tracking-widest bg-green-100 border border-green-300 px-4 py-2 rounded-xl text-green-800">
                  {successCode}
                </span>
                <button
                  onClick={() => copyCode(successCode)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                >
                  {copiedCode === successCode ? "✓ Copied!" : "Copy Code"}
                </button>
              </div>
            </div>
            <button onClick={() => setSuccessCode('')} className="text-gray-400 hover:text-gray-600 text-xl ml-4">✕</button>
          </div>
        </div>
      )}

      {/* Upload Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-gray-800 text-lg mb-5">📝 Create New Homework</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Title *</label>
              <input
                type="text"
                placeholder="e.g. Chapter 5 Exercise"
                value={form.title}
                onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white text-gray-900 bg-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
              <input
                type="text"
                placeholder="e.g. Physics, Maths"
                value={form.subject}
                onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Due Date *</label>
              <input
                type="date"
                value={form.due_date}
                onChange={e => setForm(prev => ({ ...prev, due_date: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-indigo-400"
              />
            </div>

            {/* PDF Link */}
            <div>
              <label className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
  Homework PDF (Optional)
</label>
<label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-teal-300 rounded-xl p-5 cursor-pointer hover:border-teal-500 bg-teal-50 transition">
  <input
    type="file"
    accept=".pdf"
    className="hidden"
    onChange={async (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = await uploadPdf(file);
        if (url) setForm(prev => ({ ...prev, file_url: url }));
      }
    }}
  />
  {form.file_url ? (
    <div className="flex flex-col items-center gap-2">
      <span className="text-3xl">✅</span>
      <p className="text-green-600 text-sm font-semibold">PDF Uploaded!</p>
      <a href={form.file_url} target="_blank" rel="noreferrer" className="text-teal-600 text-xs hover:text-teal-800">
        Preview PDF →
      </a>
      <p className="text-gray-400 text-xs">Click to change</p>
    </div>
  ) : uploadingPdf ? (
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-teal-600 text-sm font-semibold">Uploading PDF...</p>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2">
      <span className="text-3xl">📄</span>
      <p className="text-teal-600 text-sm font-semibold">Click to upload Homework PDF</p>
      <p className="text-gray-400 text-xs">Max size: 50MB</p>
    </div>
  )}
</label>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 block mb-1">Instructions / Description</label>
            <textarea
              placeholder="Write homework instructions, questions, or notes here..."
              value={form.description}
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-indigo-400 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setShowForm(false); setForm({ title: '', subject: '', description: '', due_date: '', file_url: '' }); }}
              className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {creating ? "Creating..." : "🚀 Create & Get Room Code"}
            </button>
          </div>
        </div>
      )}

      {/* Homework List */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading homeworks...</div>
      ) : homeworks.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-gray-500 font-medium">No homework uploaded yet</p>
          <p className="text-gray-400 text-sm mt-1">Click "Upload Homework" to create your first assignment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {homeworks.map((hw, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">{hw.title}</h3>
                  </div>
                  {hw.description && (
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{hw.description}</p>
                  )}
                  {hw.file_url && (
                    <a
                      href={hw.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-indigo-600 text-sm hover:text-indigo-800 font-medium"
                    >
                      📎 View Attached File →
                    </a>
                  )}
                  <p className="text-red-400 text-xs mt-3 font-medium">
                    📅 Due: {hw.due_date ? new Date(hw.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No deadline'}
                  </p>
                </div>

                {/* Room Code */}
                <div className="text-right flex-shrink-0">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-3">
                    <p className="text-xs text-gray-400 mb-1">Room Code</p>
                    <p className="font-mono font-bold text-indigo-700 text-2xl tracking-widest">{hw.room_code}</p>
                    <button
                      onClick={() => copyCode(hw.room_code)}
                      className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      {copiedCode === hw.room_code ? "✓ Copied" : "Copy Code"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function UpdatesModal({ batch, teacher, onClose }) {
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState({});         // { announcement_id: [replies] }
  const [loadingReplies, setLoadingReplies] = useState({});  // { announcement_id: true/false }
  const [expandedReplies, setExpandedReplies] = useState({}); // { announcement_id: true/false }

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcements/batch/${batch.id}`);
      const data = await res.json();
      if (data.success) setAnnouncements(data.announcements || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  // ── Replies fetch karo jab teacher "View Replies" click kare ──
  const fetchReplies = async (announcementId) => {
    // Toggle: agar already open hai toh band karo
    if (expandedReplies[announcementId]) {
      setExpandedReplies(prev => ({ ...prev, [announcementId]: false }));
      return;
    }

    setLoadingReplies(prev => ({ ...prev, [announcementId]: true }));
    setExpandedReplies(prev => ({ ...prev, [announcementId]: true }));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcements/replies/${announcementId}`);
      const data = await res.json();
      if (data.success) {
        setReplies(prev => ({ ...prev, [announcementId]: data.replies || [] }));
      }
    } catch (err) { console.error(err); }

    setLoadingReplies(prev => ({ ...prev, [announcementId]: false }));
  };

  const uploadPdf = async (file) => {
    setUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('batch-files')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('batch-files')
        .getPublicUrl(fileName);

      setFileUrl(urlData.publicUrl);
      setFileName(file.name);
    } catch (err) {
      alert('Upload failed! Try again.');
      console.error(err);
    }
    setUploading(false);
  };

  const postUpdate = async () => {
    if (!message.trim() && !fileUrl) {
      alert('Please write a message or upload a file!');
      return;
    }
    setPosting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcements/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batch_id: batch.id,
          teacher_id: teacher.id,
          message: message,
          file_url: fileUrl,
          file_name: fileName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('');
        setFileUrl('');
        setFileName('');
        fetchAnnouncements();
      }
    } catch (err) { console.error(err); }
    setPosting(false);
  };

  const deleteAnnouncement = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcements/${id}`, { method: 'DELETE' });
      fetchAnnouncements();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-800">📢 Updates</h2>
            <p className="text-gray-500 text-xs mt-0.5">{batch.batch_name} • {batch.subject}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {/* Post New Update */}
        <div className="p-5 border-b border-gray-100">
          <textarea
            placeholder="Write an update for your students..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-indigo-400 resize-none mb-3"
          />

          <div className="mb-3">
            <label className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-200 rounded-xl p-3 cursor-pointer hover:border-indigo-400 transition">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) await uploadPdf(file);
                }}
              />
              {uploading ? (
                <span className="text-indigo-500 text-sm">Uploading...</span>
              ) : fileUrl ? (
                <span className="text-green-600 text-sm font-semibold">✅ {fileName}</span>
              ) : (
                <span className="text-gray-400 text-sm">📎 Attach PDF / Image (optional)</span>
              )}
            </label>
          </div>

          <button
            onClick={postUpdate}
            disabled={posting || uploading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl transition text-sm"
          >
            {posting ? 'Posting...' : '📢 Post Update'}
          </button>
        </div>

        {/* Announcements List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {loading ? (
            <p className="text-center text-gray-400 text-sm py-8">Loading...</p>
          ) : announcements.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">📭</p>
              <p className="text-gray-400 text-sm">No updates posted yet</p>
            </div>
          ) : (
            announcements.map((ann, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4">

                {/* Announcement Content */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    {ann.message && (
                      <p className="text-gray-800 text-sm mb-2">{ann.message}</p>
                    )}
                    {ann.file_url && (
                      <a
                        href={ann.file_url}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition"
                      >
                        📥 {ann.file_name || 'Download File'}
                      </a>
                    )}
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(ann.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="text-red-400 hover:text-red-600 text-xs transition flex-shrink-0"
                  >
                    🗑️
                  </button>
                </div>

                {/* ── View Replies Button ── */}
                <button
                  onClick={() => fetchReplies(ann.id)}
                  className="mt-3 w-full flex items-center justify-between bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 text-xs font-semibold px-3 py-2 rounded-lg transition"
                >
                  <span>💬 Student Replies</span>
                  <span>{expandedReplies[ann.id] ? '▲ Hide' : '▼ View'}</span>
                </button>

                {/* ── Replies Section ── */}
                {expandedReplies[ann.id] && (
                  <div className="mt-2 space-y-2">
                    {loadingReplies[ann.id] ? (
                      <p className="text-center text-gray-400 text-xs py-3">Loading replies...</p>
                    ) : !replies[ann.id] || replies[ann.id].length === 0 ? (
                      <div className="text-center py-3 bg-white rounded-lg border border-gray-100">
                        <p className="text-gray-400 text-xs">No replies yet from students</p>
                      </div>
                    ) : (
                      replies[ann.id].map((reply, ri) => (
                        <div key={ri} className="bg-white border border-gray-100 rounded-lg px-3 py-2.5 flex items-start gap-2">
                          {/* Student Avatar */}
                          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                            {reply.student_name?.[0]?.toUpperCase() || 'S'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-indigo-700 font-semibold text-xs">{reply.student_name || 'Student'}</p>
                            {reply.message && (
                              <p className="text-gray-700 text-xs mt-0.5 leading-relaxed">{reply.message}</p>
                            )}
                            {reply.file_url && (
                              <a
                                href={reply.file_url}
                                target="_blank"
                                rel="noreferrer"
                                download
                                className="inline-flex items-center gap-1 mt-1 bg-teal-50 border border-teal-200 text-teal-600 text-xs px-2 py-1 rounded-lg hover:bg-teal-100 transition font-medium"
                              >
                                📎 {reply.file_name || 'Download File'}
                              </a>
                            )}
                            <p className="text-gray-300 text-xs mt-1">
                              {new Date(reply.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN TEACHER DASHBOARD ──
export default function TeacherDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [batches, setBatches] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdates, setShowUpdates] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [form, setForm] = useState({
    batch_name: "",
    subject: "",
    board: "",
    description: "",
  });

  const subjects = [
    "Physics", "Chemistry", "Mathematics", "Biology",
    "English", "Hindi", "History", "Geography",
    "Computer Science", "Economics", "Accountancy",
  ];

  const boards = [
    "CBSE", "UP Board", "ICSE", "MP Board",
    "Bihar Board", "Rajasthan Board", "Maharashtra Board",
  ];

  const menuItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "batches", label: "My Batches", icon: "🏫" },
    { id: "students", label: "Students", icon: "👨‍🎓" },
    { id: "homework", label: "Homework", icon: "📝" },
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setTeacher(parsed);
      fetchMyStudents(parsed.id);
    }
  }, []);

  const fetchMyStudents = async (teacherId) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/batch/my-students/${teacherId}`);
      const data = await res.json();
      setBatches(data.batches || []);
      setTotalStudents(data.total_students || 0);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleCreateBatch = async () => {
    if (!form.batch_name || !form.subject || !form.board) {
      alert("Please fill all required fields!");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/batch/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, teacher_id: teacher?.id }),
      });
      const data = await res.json();
      if (data.success || data.batch_code) {
        setSuccessMsg(data.batch_code);
        setShowCreateModal(false);
        setForm({ batch_name: "", subject: "", board: "", description: "" });
        fetchMyStudents(teacher?.id);
      }
    } catch (err) { alert("Error creating batch. Try again!"); }
    setCreating(false);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── SIDEBAR ── */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 fixed h-full z-50 shadow-sm`}>

        {/* Logo */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">RAXX AI</span>
                <span className="ml-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">Teacher</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Teacher Info */}
        {sidebarOpen && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                {teacher?.name?.charAt(0).toUpperCase() || 'T'}
              </div>
              <div>
                <p className="text-gray-800 font-semibold text-sm">{teacher?.name || 'Teacher'}</p>
                <p className="text-gray-400 text-xs">{teacher?.email || ''}</p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition duration-200 ${
                activeTab === item.id
                  ? "bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => { localStorage.clear(); router.push("/login"); }}
            className="w-full flex items-center gap-3 text-red-400 hover:text-red-600 transition"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-16"} flex-1 transition-all duration-300`}>

        {/* Top Navbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <h2 className="font-bold text-gray-800 text-lg">
            {menuItems.find(m => m.id === activeTab)?.icon}{" "}
            {menuItems.find(m => m.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">👋 {teacher?.name || "Teacher"}</span>
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              {teacher?.name?.charAt(0).toUpperCase() || 'T'}
            </div>
          </div>
        </div>

        <div className="p-6">

          {/* Success Banner */}
          {successMsg && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-green-700 font-semibold">✅ Batch Created Successfully!</p>
                <p className="text-green-600 text-sm mt-1">
                  Share this code with your students:
                  <span className="ml-2 font-bold text-lg tracking-widest bg-green-100 px-3 py-1 rounded-lg">{successMsg}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyCode(successMsg)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                >
                  {copiedCode === successMsg ? "Copied! ✓" : "Copy Code"}
                </button>
                <button onClick={() => setSuccessMsg("")} className="text-gray-400 hover:text-gray-600 px-2">✕</button>
              </div>
            </div>
          )}

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your batches and track student progress</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Batches", value: batches.length, icon: "🏫" },
                  { label: "Total Students", value: totalStudents, icon: "👨‍🎓" },
                  { label: "Active Batches", value: batches.filter(b => b.is_active).length, icon: "✅" },
                  { label: "Subjects", value: [...new Set(batches.map(b => b.subject))].length, icon: "📚" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-indigo-800 text-lg">Create a New Batch</h3>
                  <p className="text-indigo-600 text-sm mt-1">Generate a batch code and share with your students</p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm"
                >
                  + Create Batch
                </button>
              </div>

              {batches.length > 0 ? (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Your Batches</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {batches.slice(0, 4).map((batch, i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-gray-800">{batch.batch_name}</h3>
                            <p className="text-gray-500 text-xs mt-1">{batch.subject} • {batch.board}</p>
                          </div>
                          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-lg">
                            {batch.students?.length || 0} students
                          </span>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                          <span className="font-mono font-bold text-indigo-700 tracking-widest text-sm">{batch.batch_code}</span>
                          <button onClick={() => copyCode(batch.batch_code)} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                            {copiedCode === batch.batch_code ? "Copied! ✓" : "Copy"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🏫</div>
                  <h3 className="text-gray-600 font-semibold text-lg">No batches yet</h3>
                  <p className="text-gray-400 text-sm mt-2">Create your first batch to connect with students</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    + Create First Batch
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── BATCHES TAB ── */}
          {activeTab === "batches" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">My Batches</h1>
                  <p className="text-gray-500 text-sm mt-1">{batches.length} batches created</p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm"
                >
                  + New Batch
                </button>
              </div>

              {loading ? (
                <div className="text-center py-20 text-gray-400">Loading batches...</div>
              ) : batches.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-3">📭</div>
                  <p className="text-gray-500">No batches yet. Create one!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {batches.map((batch, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                      <div className="p-5 border-b border-gray-100">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{batch.batch_name}</h3>
                            <div className="flex gap-2 mt-2">
                              <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">{batch.subject}</span>
                              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">{batch.board}</span>
                            </div>
                          </div>
                          <span className="bg-indigo-100 text-indigo-700 font-bold text-sm px-3 py-1 rounded-full">
                            {batch.students?.length || 0} 👨‍🎓
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
  <p className="text-xs text-gray-400 mb-2">Batch Code — Share with students</p>
  <div className="flex items-center justify-between bg-indigo-50 rounded-lg px-4 py-3 border border-indigo-100 mb-3">
    <span className="font-mono font-bold text-indigo-700 tracking-widest">{batch.batch_code}</span>
    <button
      onClick={() => copyCode(batch.batch_code)}
      className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition font-medium"
    >
      {copiedCode === batch.batch_code ? "✓ Copied" : "Copy"}
    </button>
  </div>
  <button
    onClick={() => { setSelectedBatch(batch); setShowUpdates(true); }}
    className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-600 font-semibold py-2 rounded-lg text-sm transition flex items-center justify-center gap-2"
  >
    📢 Updates
  </button>
</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── STUDENTS TAB ── */}
          {activeTab === "students" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Students</h1>
                <p className="text-gray-500 text-sm mt-1">{totalStudents} students across all batches</p>
              </div>

              {batches.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-3">👨‍🎓</div>
                  <p className="text-gray-500">No students yet. Create a batch first!</p>
                </div>
              ) : (
                batches.map((batch, bi) => (
                  <div key={bi} className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="font-bold text-gray-700">{batch.batch_name}</h2>
                      <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full">{batch.subject}</span>
                      <span className="text-gray-400 text-sm">{batch.students?.length || 0} students</span>
                    </div>

                    {!batch.students || batch.students.length === 0 ? (
                      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                        <p className="text-gray-400 text-sm">No students joined yet</p>
                        <p className="text-gray-400 text-xs mt-1">Share code <span className="font-mono font-bold text-indigo-600">{batch.batch_code}</span> with students</p>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                              <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">#</th>
                              <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Name</th>
                              <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Board</th>
                              <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Joined</th>
                            </tr>
                          </thead>
                          <tbody>
                            {batch.students.map((member, si) => (
                              <tr key={si} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                <td className="px-4 py-3 text-gray-400 text-sm">{si + 1}</td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
                                      {member.users?.name?.[0]?.toUpperCase() || "S"}
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-800 text-sm">{member.users?.name || "Student"}</p>
                                      <p className="text-gray-400 text-xs">{member.users?.email || ""}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-sm">{member.users?.board || "—"}</td>
                                <td className="px-4 py-3 text-gray-400 text-xs">
                                  {member.joined_at ? new Date(member.joined_at).toLocaleDateString("en-IN") : "—"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── HOMEWORK TAB ── */}
          {activeTab === "homework" && (
            <HomeworkTab teacher={teacher} />
          )}

          {showUpdates && selectedBatch && (
            <UpdatesModal
              batch={selectedBatch}
              teacher={teacher}
              onClose={() => { setShowUpdates(false); setSelectedBatch(null); }}
            />
          )}

        </div>
      </div>

      {/* ── CREATE BATCH MODAL ── */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Create New Batch</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Batch Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Class 12-B Physics 2026"
                  value={form.batch_name}
                  onChange={(e) => setForm({ ...form, batch_name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Subject *</label>
                <input
                  type="text"
                 placeholder="e.g. Physics, Maths, Hindi"
                 value={form.subject}
                 onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-indigo-400"
                 />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Board *</label>
                 <input
                  type="text"
                   placeholder="e.g. CBSE, UP Board, ICSE"
                   value={form.board}
                   onChange={(e) => setForm({ ...form, board: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-indigo-400"
                    />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Description (Optional)</label>
                <textarea
                  placeholder="Any notes about this batch..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBatch}
                disabled={creating}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
              >
                {creating ? "Creating..." : "Create & Get Code"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}