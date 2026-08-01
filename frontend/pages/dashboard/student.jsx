import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../utils/supabase";

export default function StudentDashboardMobile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [examDays, setExamDays] = useState(null);
  const [examReady, setExamReady] = useState(null);
  const [todayTasks, setTodayTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [addingTask, setAddingTask] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [rewards, setRewards] = useState({ coins: 0, current_streak: 0 });
  const [roomCode, setRoomCode] = useState("");
  const [settingsForm, setSettingsForm] = useState({
    name: "", phone: "", board: "", exam: "", city: "",
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  useEffect(() => {
    const handleFocus = () => fetchData();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const generateStudentCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return `RAXX-STU-${code}`;
  };

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const [profileRes, rewardRes, studyPlanRes, mockTestRes] = await Promise.all([
        supabase.from("users").select("*").eq("id", user.id).single(),
        supabase.from("player_rewards").select("*").eq("student_id", user.id),
        supabase.from("study_plans").select("exam_date").eq("student_id", user.id).order("created_at", { ascending: false }).limit(1),
        supabase.from("mock_tests").select("score, total").eq("student_id", user.id).limit(5),
      ]);

      let profile = profileRes.data;
      if (profile && !profile.student_code) {
        const newCode = generateStudentCode();
        const { data: updated } = await supabase.from("users").update({ student_code: newCode }).eq("id", user.id).select().single();
        if (updated) profile = updated;
      }

      const rewardData = rewardRes.data?.[0] || null;
      const studyPlan = studyPlanRes.data?.[0] || null;
      const mockTests = mockTestRes.data || [];

      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));

      fetchTodayTasks(user.id);
      if (rewardData) setRewards(rewardData);
      else {
        const freshReward = await supabase
          .from("player_rewards")
          .select("*")
          .eq("student_id", user.id)
          .single();
        if (freshReward.data) setRewards(freshReward.data);
      }

      if (studyPlan?.exam_date) {
        const today = new Date();
        const examDate = new Date(studyPlan.exam_date);
        const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
        setExamDays(daysLeft > 0 ? daysLeft : 0);
      }

      if (mockTests.length > 0) {
        const avgScore = mockTests.reduce((sum, t) => sum + (t.score / t.total * 100), 0) / mockTests.length;
        const streakBonus = Math.min((rewardData?.current_streak || 0) * 2, 20);
        setExamReady(Math.min(Math.round(avgScore * 0.7 + streakBonus), 100));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const copyStudentCode = () => {
    if (user?.student_code) {
      navigator.clipboard.writeText(user.student_code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const fetchTodayTasks = async (studentId) => {
    setTaskLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/tasks/today/${studentId}`);
      const data = await res.json();
      if (data.success) setTodayTasks(data.tasks || []);
    } catch (err) { console.error(err); }
    setTaskLoading(false);
  };

  const addTask = async () => {
    if (!newTaskText.trim()) return;
    setAddingTask(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: user.id, task_text: newTaskText.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setNewTaskText("");
        fetchTodayTasks(user.id);
      }
    } catch (err) { console.error(err); }
    setAddingTask(false);
  };

  const toggleTask = async (task) => {
    try {
      if (task.is_completed) {
        await fetch(`http://127.0.0.1:8000/tasks/uncomplete/${task.id}`, { method: "POST" });
      } else {
        await fetch(`http://127.0.0.1:8000/tasks/complete/${task.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ student_id: user.id, task_text: task.task_text }),
        });
      }
      fetchTodayTasks(user.id);
    } catch (err) { console.error(err); }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://127.0.0.1:8000/tasks/delete/${taskId}`, { method: "DELETE" });
      fetchTodayTasks(user.id);
    } catch (err) { console.error(err); }
  };

  const openSettings = () => {
    setSettingsForm({
      name: user?.name || "",
      phone: user?.phone || "",
      board: user?.board || "",
      exam: user?.exam || "",
      city: user?.city || "",
    });
    setActiveTab("profile");
  };

  const saveSettings = async () => {
    if (!settingsForm.name.trim()) {
      alert("Name khali nahi ho sakta!");
      return;
    }
    setSavingSettings(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .update({
          name: settingsForm.name,
          phone: settingsForm.phone,
          board: settingsForm.board,
          exam: settingsForm.exam,
          city: settingsForm.city,
        })
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;
      setUser(data);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) {
      alert("Save nahi hua! Try again.");
      console.error(err);
    }
    setSavingSettings(false);
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
    pink: "#C48BA8",
  };

  // ── BOTTOM NAV ITEMS ──
  const bottomTabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "ai", icon: "🤖", label: "AI" },
    { id: "study", icon: "📚", label: "Study" },
    { id: "games", icon: "🎮", label: "Games" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];

  // ── DRAWER MENU ITEMS ──
  const drawerItems = [
    { id: "doubt", icon: "🤖", label: "AI Doubt Solver", route: "/doubt-solver" },
    { id: "notes", icon: "📝", label: "Smart Notes", route: "/notes" },
    { id: "mocktest", icon: "📄", label: "Mock Tests", route: "/mock-test" },
    { id: "studyplan", icon: "📅", label: "Study Plan", route: "/study-plan" },
    { id: "interview", icon: "🎤", label: "Mock Interview", route: "/mock-interview" },
    { id: "career", icon: "🎯", label: "Career Guide", route: "/career-guide" },
    { id: "answer", icon: "✍️", label: "Answer Writing", route: "/answer-writing" },
    { id: "scholarship", icon: "🏆", label: "Scholarships", route: "/scholarships" },
    { id: "coding", icon: "💻", label: "Coding Section", route: "/coding" },
    { id: "homework", icon: "📚", label: "Homework", route: "/homework" },
    { id: "joinbatch", icon: "🏫", label: "Join Class", route: "/join-batch" },
    { id: "whatsapp", icon: "💬", label: "WhatsApp Alerts", route: "/whatsapp-settings" },
    { id: "progress", icon: "📊", label: "My Progress", route: "/progress" },
    { id: "engineering", icon: "🖥️", label: "Engineering Hub", route: "/engineering" },
    { id: "community", icon: "👥", label: "Community", route: "/community" },
  ];

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: c.bg }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 animate-spin" style={{ borderColor: c.rust, borderTopColor: "transparent" }} />
        <p className="font-bold text-base" style={{ color: c.rustLight }}>Loading RAXX...</p>
      </div>
    </div>
  );

  // ─── HOME TAB ───
  const HomeTab = () => (
    <div className="pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between" style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: c.rust, color: c.cream }}>R</div>
          <span className="font-black text-lg tracking-wider" style={{ color: c.cream }}>RAXX</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(139,58,42,0.15)", color: c.amber }}>
            🔥 {rewards?.current_streak || 0}
          </div>
          <div className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(200,149,108,0.12)", color: c.gold }}>
            🪙 {rewards?.coins || 0}
          </div>
          <button onClick={() => setDrawerOpen(true)} className="p-1.5 rounded-lg" style={{ color: c.textMuted }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Welcome Banner */}
        <div className="rounded-2xl p-5" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: c.amber }}>Welcome back 👋</p>
          <h2 className="text-xl font-bold mb-1" style={{ color: c.text }}>{user?.name?.split(" ")[0]}!</h2>
          <p className="text-sm" style={{ color: c.textMuted }}>
            {rewards?.current_streak > 0 ? `🔥 ${rewards.current_streak} day streak!` : "Start your study session today!"}
          </p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <button onClick={() => router.push("/doubt-solver")} className="px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: c.rust, color: c.cream }}>
              Ask Doubt 🤖
            </button>
            <button onClick={() => router.push("/study-plan")} className="px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: c.hover, border: `1px solid ${c.border}`, color: c.text }}>
              Study Plan 📅
            </button>
          </div>
        </div>

        {/* Stats Row - 2 cols on mobile */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "🔥", label: "Streak", value: `${rewards?.current_streak || 0}`, sub: "days", accent: c.amber },
            { icon: "🪙", label: "Coins", value: `${rewards?.coins || 0}`, sub: "coins", accent: c.gold },
            { icon: "📊", label: "Ready", value: examReady !== null ? `${examReady}%` : "—", sub: examReady !== null ? "prepared" : "mock test", accent: c.green },
            { icon: "⏳", label: "Exam In", value: examDays !== null ? `${examDays}` : "—", sub: examDays !== null ? "days" : "set date", accent: c.blue },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl p-3.5" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="font-bold text-lg" style={{ color: stat.accent }}>{stat.value}</div>
              <div className="text-xs" style={{ color: c.textDim }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* RAXX Code */}
        <div onClick={() => setShowCodeModal(true)} className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: "rgba(139,58,42,0.15)" }}>🎓</div>
              <div>
                <p className="font-bold text-sm" style={{ color: c.text }}>My RAXX Code</p>
                <p className="text-xs" style={{ color: c.textDim }}>Share with parents</p>
              </div>
            </div>
            <span className="text-xs font-medium" style={{ color: c.amber }}>View →</span>
          </div>
          <div className="rounded-lg px-4 py-2.5 text-center" style={{ background: c.bg, border: `1px solid rgba(139,58,42,0.15)` }}>
            <p className="font-mono font-bold text-base tracking-widest" style={{ color: c.amber }}>{user?.student_code || "Generating..."}</p>
          </div>
        </div>

        {/* Join Class */}
        <div onClick={() => router.push("/join-batch")} className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: "rgba(45,90,71,0.15)" }}>🏫</div>
              <div>
                <p className="font-bold text-sm" style={{ color: c.text }}>Join Class</p>
                <p className="text-xs" style={{ color: c.textDim }}>Enter teacher's code</p>
              </div>
            </div>
            <span className="text-xs font-medium" style={{ color: c.green }}>Join →</span>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm" style={{ color: c.text }}>📋 Today's Tasks</h3>
            <span className="text-xs" style={{ color: c.textDim }}>{todayTasks.filter(t => t.is_completed).length}/{todayTasks.length}</span>
          </div>
          <div className="w-full rounded-full h-1.5 mb-3" style={{ background: c.bg }}>
            <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: todayTasks.length > 0 ? `${(todayTasks.filter(t => t.is_completed).length / todayTasks.length) * 100}%` : "0%", background: c.rust }} />
          </div>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Task likho..."
              value={newTaskText}
              onChange={e => setNewTaskText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTask()}
              className="flex-1 text-sm px-3 py-2.5 rounded-xl focus:outline-none"
              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
            />
            <button onClick={addTask} disabled={addingTask || !newTaskText.trim()} className="px-4 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-40" style={{ background: c.rust, color: c.cream }}>
              {addingTask ? "..." : "+"}
            </button>
          </div>
          {taskLoading ? (
            <p className="text-sm text-center py-3" style={{ color: c.textDim }}>Loading...</p>
          ) : todayTasks.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-1">📝</p>
              <p className="text-xs" style={{ color: c.textDim }}>Koi task nahi hai</p>
            </div>
          ) : (
            todayTasks.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2.5 group" style={{ borderBottom: `1px solid ${c.border}` }}>
                <button onClick={() => toggleTask(item)} className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: item.is_completed ? c.green : c.textDim, background: item.is_completed ? c.green : "transparent" }}>
                  {item.is_completed && <span className="text-white text-xs">✓</span>}
                </button>
                <span className={`text-sm flex-1 ${item.is_completed ? "line-through" : ""}`} style={{ color: item.is_completed ? c.textDim : c.textMuted }}>{item.task_text}</span>
                {item.is_completed && <span className="text-xs font-semibold" style={{ color: c.gold }}>+10</span>}
                <button onClick={() => deleteTask(item.id)} className="text-xs opacity-0 group-hover:opacity-100 transition" style={{ color: c.rustLight }}>🗑️</button>
              </div>
            ))
          )}
        </div>

        {/* AI Features */}
        <div>
          <h3 className="font-bold text-sm mb-3 px-1" style={{ color: c.text }}>🤖 AI Features</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: "🤖", title: "Doubt Solver", route: "/doubt-solver" },
              { icon: "📝", title: "Smart Notes", route: "/notes" },
              { icon: "📄", title: "Mock Tests", route: "/mock-test" },
              { icon: "📅", title: "Study Plan", route: "/study-plan" },
              { icon: "🎤", title: "Interview", route: "/mock-interview" },
              { icon: "🎯", title: "Career", route: "/career-guide" },
              { icon: "✍️", title: "Answers", route: "/answer-writing" },
              { icon: "🏆", title: "Scholarships", route: "/scholarships" },
            ].map((f, i) => (
              <button key={i} onClick={() => router.push(f.route)} className="rounded-xl p-3.5 text-left" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
                <div className="text-xl mb-1.5">{f.icon}</div>
                <div className="font-semibold text-xs" style={{ color: c.text }}>{f.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Coding + Games */}
        <div className="grid grid-cols-2 gap-2.5">
          <button onClick={() => router.push("/coding")} className="rounded-xl p-4 text-left" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <div className="text-2xl mb-2">💻</div>
            <div className="font-bold text-sm" style={{ color: c.text }}>Coding</div>
            <div className="text-xs mt-0.5" style={{ color: c.textDim }}>Editor + AI Tutor</div>
          </button>
          <button onClick={() => router.push("/games")} className="rounded-xl p-4 text-left" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <div className="text-2xl mb-2">🎮</div>
            <div className="font-bold text-sm" style={{ color: c.text }}>Games</div>
            <div className="text-xs mt-0.5" style={{ color: c.textDim }}>Quiz, Sudoku & more</div>
          </button>
        </div>

        {/* Engineering Hub + Community — ADDED TO FRONT PAGE */}
        <div className="grid grid-cols-2 gap-2.5">
          <button onClick={() => router.push("/engineering")} className="rounded-xl p-4 text-left" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <div className="text-2xl mb-2">🖥️</div>
            <div className="font-bold text-sm" style={{ color: c.text }}>Engineering Hub</div>
            <div className="text-xs mt-0.5" style={{ color: c.textDim }}>Tech resources</div>
          </button>
          <button onClick={() => router.push("/community")} className="rounded-xl p-4 text-left" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <div className="text-2xl mb-2">👥</div>
            <div className="font-bold text-sm" style={{ color: c.text }}>Community</div>
            <div className="text-xs mt-0.5" style={{ color: c.textDim }}>Connect & discuss</div>
          </button>
        </div>

        {/* Homework */}
        <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: c.text }}>📚 Homework</h3>
          <p className="text-xs mb-3" style={{ color: c.textMuted }}>Teacher ka 6-digit room code daalo</p>
          <div className="flex gap-2">
            <input type="text" placeholder="000000" maxLength={6} value={roomCode} onChange={e => setRoomCode(e.target.value)} className="flex-1 px-4 py-3 rounded-xl text-center text-lg tracking-widest font-mono focus:outline-none" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }} />
            <button onClick={() => { if (roomCode.length === 6) router.push(`/homework?code=${roomCode}`); else alert('6-digit code daalo!'); }} className="px-5 py-3 rounded-xl font-semibold" style={{ background: c.rust, color: c.cream }}>Join</button>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm" style={{ color: c.text }}>💬 WhatsApp Alerts</h3>
            <button onClick={() => router.push('/whatsapp-settings')} className="text-xs" style={{ color: c.green }}>Setup →</button>
          </div>
          <div className="rounded-xl p-3 text-center" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
            <span className="text-2xl mb-2 block">📱</span>
            <p className="text-xs" style={{ color: c.textMuted }}>Monthly report automatically WhatsApp pe</p>
          </div>
        </div>

        {/* Help */}
        <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: c.text }}>🆘 Help & Support</h3>
          <div className="space-y-2">
            <a href="tel:8739042876" className="flex items-center gap-3 rounded-xl px-3 py-3" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: "rgba(45,90,71,0.15)" }}>📞</div>
              <div>
                <p className="text-xs" style={{ color: c.textDim }}>Call / WhatsApp</p>
                <p className="font-bold text-sm" style={{ color: c.text }}>+91 8739042876</p>
              </div>
            </a>
            <a href="mailto:help@raxxai.com" className="flex items-center gap-3 rounded-xl px-3 py-3" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: "rgba(60,100,130,0.15)" }}>📧</div>
              <div>
                <p className="text-xs" style={{ color: c.textDim }}>Email</p>
                <p className="font-bold text-sm" style={{ color: c.text }}>help@raxxai.com</p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs pb-2" style={{ color: c.textDim }}>© 2026 RAXX AI Technologies</p>
      </div>
    </div>
  );

  // ─── AI TAB ───
  const AITab = () => (
    <div className="pb-24 px-4 pt-4 space-y-3">
      <h2 className="text-lg font-bold mb-2" style={{ color: c.text }}>🤖 AI Tools</h2>
      {[
        { icon: "🤖", title: "AI Doubt Solver", desc: "Kuch bhi pucho, instant answer", route: "/doubt-solver", accent: c.amber },
        { icon: "📝", title: "Smart Notes", desc: "AI chapter-wise notes banata hai", route: "/notes", accent: c.blue },
        { icon: "📄", title: "Mock Tests", desc: "PYQs + AI generated questions", route: "/mock-test", accent: c.green },
        { icon: "📅", title: "Study Plan", desc: "Day-by-day schedule", route: "/study-plan", accent: c.purple },
        { icon: "🎤", title: "Mock Interview", desc: "AI placement preparation", route: "/mock-interview", accent: c.pink },
        { icon: "🎯", title: "Career Guide", desc: "Best career path for you", route: "/career-guide", accent: c.gold },
        { icon: "✍️", title: "Answer Writing", desc: "UPSC/SSC answer feedback", route: "/answer-writing", accent: c.rustLight },
        { icon: "🏆", title: "Scholarships", desc: "Govt schemes finder", route: "/scholarships", accent: "#7BAE9F" },
      ].map((item, i) => (
        <button key={i} onClick={() => router.push(item.route)} className="w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <div className="text-2xl">{item.icon}</div>
          <div className="flex-1">
            <div className="font-semibold text-sm" style={{ color: c.text }}>{item.title}</div>
            <div className="text-xs" style={{ color: c.textDim }}>{item.desc}</div>
          </div>
          <span className="text-lg" style={{ color: item.accent }}>→</span>
        </button>
      ))}
    </div>
  );

  // ─── STUDY TAB ───
  const StudyTab = () => (
    <div className="pb-24 px-4 pt-4 space-y-3">
      <h2 className="text-lg font-bold mb-2" style={{ color: c.text }}>📚 Study Hub</h2>
      {[
        { icon: "📅", title: "Study Plan", desc: "Day-by-day schedule", route: "/study-plan" },
        { icon: "📄", title: "Mock Tests", desc: "Test your preparation", route: "/mock-test" },
        { icon: "📝", title: "Smart Notes", desc: "AI generated notes", route: "/notes" },
        { icon: "📊", title: "My Progress", desc: "Track your growth", route: "/progress" },
        { icon: "✍️", title: "Answer Writing", desc: "Practice writing answers", route: "/answer-writing" },
        { icon: "📚", title: "Homework", desc: "Teacher assignments", route: "/homework" },
        { icon: "🏫", title: "Join Class", desc: "Enter batch code", route: "/join-batch" },
        { icon: "🖥️", title: "Engineering Hub", desc: "Tech resources", route: "/engineering" },
      ].map((item, i) => (
        <button key={i} onClick={() => router.push(item.route)} className="w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <div className="text-2xl">{item.icon}</div>
          <div className="flex-1">
            <div className="font-semibold text-sm" style={{ color: c.text }}>{item.title}</div>
            <div className="text-xs" style={{ color: c.textDim }}>{item.desc}</div>
          </div>
          <span className="text-lg" style={{ color: c.amber }}>→</span>
        </button>
      ))}
    </div>
  );

  // ─── GAMES TAB ───
  const GamesTab = () => (
    <div className="pb-24 px-4 pt-4 space-y-3">
      <h2 className="text-lg font-bold mb-2" style={{ color: c.text }}>🎮 Games</h2>
      {[
        { icon: "⚔️", title: "Quiz Battle", desc: "Solo or vs friends", accent: c.amber },
        { icon: "🔢", title: "Sudoku", desc: "Daily puzzle", accent: c.blue },
        { icon: "🔤", title: "Word Scramble", desc: "Vocabulary game", accent: c.green },
        { icon: "🃏", title: "Memory Match", desc: "Formulas & facts", accent: c.purple },
        { icon: "⚡", title: "Speed Math", desc: "Rapid arithmetic", accent: c.gold },
      ].map((game, i) => (
        <button key={i} onClick={() => router.push("/games")} className="w-full flex items-center gap-3 rounded-xl px-4 py-3.5 text-left" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
          <span className="text-2xl">{game.icon}</span>
          <div className="text-left flex-1">
            <div className="font-semibold text-sm" style={{ color: c.text }}>{game.title}</div>
            <div className="text-xs" style={{ color: c.textDim }}>{game.desc}</div>
          </div>
          <span className="text-xs font-semibold" style={{ color: game.accent }}>Play →</span>
        </button>
      ))}
      <button onClick={() => router.push("/games")} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: c.rust, color: c.cream }}>
        🎮 All Games
      </button>
    </div>
  );

  // ─── PROFILE TAB ───
  const ProfileTab = () => (
    <div className="pb-24 px-4 pt-4 space-y-4">
      {/* Profile Header */}
      <div className="rounded-2xl p-5 text-center" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center font-bold text-3xl mb-3" style={{ background: c.rust, color: c.cream }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-bold" style={{ color: c.text }}>{user?.name}</h2>
        <p className="text-sm" style={{ color: c.textMuted }}>{user?.email}</p>
        <p className="text-xs font-mono mt-1" style={{ color: c.amber }}>{user?.student_code}</p>
        <div className="flex gap-3 mt-4 justify-center">
          <div className="rounded-xl px-4 py-2" style={{ background: "rgba(139,58,42,0.12)" }}>
            <p className="font-bold text-sm" style={{ color: c.amber }}>🔥 {rewards?.current_streak || 0}</p>
            <p className="text-xs" style={{ color: c.textDim }}>Streak</p>
          </div>
          <div className="rounded-xl px-4 py-2" style={{ background: "rgba(200,149,108,0.10)" }}>
            <p className="font-bold text-sm" style={{ color: c.gold }}>🪙 {rewards?.coins || 0}</p>
            <p className="text-xs" style={{ color: c.textDim }}>Coins</p>
          </div>
        </div>
        <button onClick={() => setShowCodeModal(true)} className="mt-4 w-full py-2.5 rounded-xl font-semibold text-sm" style={{ background: c.hover, border: `1px solid ${c.border}`, color: c.amber }}>
          📋 Copy RAXX Code
        </button>
      </div>

      {/* Settings Form */}
      <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
        <h3 className="font-bold text-sm mb-4" style={{ color: c.text }}>⚙️ Edit Profile</h3>
        <div className="space-y-3">
          {[
            { label: "Full Name", key: "name", placeholder: "Enter name" },
            { label: "Phone", key: "phone", placeholder: "9876543210" },
            { label: "City", key: "city", placeholder: "Lucknow, Delhi..." },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: c.textDim }}>{field.label}</label>
              <input
                type="text"
                value={settingsForm[field.key]}
                onChange={e => setSettingsForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: c.textDim }}>Board</label>
            <select value={settingsForm.board} onChange={e => setSettingsForm(prev => ({ ...prev, board: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
              <option value="">Select Board</option>
              {["CBSE", "UP Board", "ICSE", "MP Board", "Bihar Board", "Rajasthan Board", "Maharashtra Board", "other"].map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: c.textDim }}>Target Exam</label>
            <select value={settingsForm.exam} onChange={e => setSettingsForm(prev => ({ ...prev, exam: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
              <option value="">Select Exam</option>
              {["JEE", "NEET", "UPSC", "SSC", "Class 10 Board", "Class 12 Board", "NDA", "CUET", "CAT", "Other"].map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>
        <button onClick={saveSettings} disabled={savingSettings} className="w-full mt-4 font-bold py-3 rounded-xl text-sm disabled:opacity-40" style={{ background: c.rust, color: c.cream }}>
          {savingSettings ? "Saving..." : settingsSaved ? "✅ Saved!" : "💾 Save Changes"}
        </button>
        {settingsSaved && <p className="text-xs text-center mt-2 font-semibold" style={{ color: c.green }}>✅ Profile updated!</p>}
      </div>

      {/* Locked Email */}
      <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
        <h3 className="font-bold text-sm mb-2" style={{ color: c.text }}>🔒 Account</h3>
        <div className="rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: c.bg }}>
          <div>
            <p className="text-xs" style={{ color: c.textDim }}>Email</p>
            <p className="text-sm font-medium" style={{ color: c.text }}>{user?.email}</p>
          </div>
          <span className="text-xs" style={{ color: c.textDim }}>🔒</span>
        </div>
      </div>

      {/* Premium */}
      <button onClick={() => router.push("/payment")} className="w-full rounded-2xl p-4 text-left" style={{ background: "rgba(200,149,108,0.08)", border: `1px solid rgba(200,149,108,0.20)` }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">⭐</span>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: c.gold }}>Upgrade to Premium</p>
            <p className="text-xs" style={{ color: c.textDim }}>Unlock all AI features</p>
          </div>
          <span className="text-lg" style={{ color: c.gold }}>→</span>
        </div>
      </button>

      {/* Danger Zone */}
      <div className="rounded-2xl p-4" style={{ background: c.surfaceElevated, border: `1px solid rgba(139,58,42,0.25)` }}>
        <h3 className="font-bold text-sm mb-3" style={{ color: c.rustLight }}>⚠️ Danger Zone</h3>
        <button onClick={async () => { if (confirm("Logout karna chahte ho?")) { await supabase.auth.signOut(); localStorage.clear(); router.push("/login"); } }} className="w-full font-semibold py-3 rounded-xl text-sm" style={{ background: "rgba(139,58,42,0.12)", border: `1px solid rgba(139,58,42,0.25)`, color: c.rustLight }}>
          🚪 Logout
        </button>
      </div>

      <p className="text-center text-xs pb-2" style={{ color: c.textDim }}>© 2026 RAXX AI Technologies</p>
    </div>
  );

  return (
    <div className="min-h-screen max-w-md mx-auto relative" style={{ background: c.bg, color: c.text }}>

      {/* ── MAIN CONTENT ── */}
      <div className="min-h-screen">
        {activeTab === "home" && <HomeTab />}
        {activeTab === "ai" && <AITab />}
        {activeTab === "study" && <StudyTab />}
        {activeTab === "games" && <GamesTab />}
        {activeTab === "profile" && <ProfileTab />}
      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <div className="flex items-center justify-around py-2 pb-safe">
          {bottomTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition"
              style={{ color: activeTab === tab.id ? c.amber : c.textDim }}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── DRAWER OVERLAY ── */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-50" style={{ background: "rgba(13,17,23,0.7)" }} onClick={() => setDrawerOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 z-50 w-72 overflow-y-auto" style={{ background: c.surface, borderLeft: `1px solid ${c.border}` }}>
            {/* Drawer Header */}
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${c.border}` }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: c.rust, color: c.cream }}>R</div>
                <span className="font-black text-lg tracking-wider" style={{ color: c.cream }}>RAXX</span>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-1" style={{ color: c.textMuted }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* User Mini */}
            <div className="p-4" style={{ borderBottom: `1px solid ${c.border}` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: c.rust, color: c.cream }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: c.text }}>{user?.name}</p>
                  <p className="text-xs" style={{ color: c.amber }}>{user?.exam || "Student"}</p>
                </div>
              </div>
            </div>

            {/* Drawer Items */}
            <div className="py-2">
              {drawerItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { router.push(item.route); setDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition"
                  style={{ color: c.textMuted }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="p-4" style={{ borderTop: `1px solid ${c.border}` }}>
              <button
                onClick={async () => { await supabase.auth.signOut(); localStorage.clear(); router.push("/login"); }}
                className="w-full flex items-center gap-3 py-2"
                style={{ color: c.rustLight }}
              >
                <span className="text-lg">🚪</span>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── RAXX CODE MODAL ── */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "rgba(13,17,23,0.85)" }}>
          <div className="rounded-2xl p-6 w-full max-w-xs text-center" style={{ background: c.surfaceElevated, border: `1px solid ${c.border}` }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3" style={{ background: "rgba(139,58,42,0.15)" }}>🎓</div>
            <h2 className="text-lg font-bold mb-1" style={{ color: c.text }}>My RAXX Code</h2>
            <p className="text-xs mb-4" style={{ color: c.textMuted }}>Parents can track your progress</p>
            <div className="rounded-xl px-4 py-3 mb-4" style={{ background: c.bg, border: `1px solid rgba(139,58,42,0.25)` }}>
              <p className="text-xs mb-1" style={{ color: c.textDim }}>Your Code</p>
              <p className="text-xl font-mono font-bold tracking-widest" style={{ color: c.amber }}>{user?.student_code || "RAXX-STU-????"}</p>
            </div>
            <button onClick={copyStudentCode} className="w-full font-bold py-3 rounded-xl mb-2 text-sm" style={{ background: c.rust, color: c.cream }}>
              {codeCopied ? "✓ Copied!" : "Copy Code 📋"}
            </button>
            <button onClick={() => setShowCodeModal(false)} className="w-full font-semibold py-2.5 rounded-xl text-sm" style={{ background: c.hover, color: c.textMuted }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}