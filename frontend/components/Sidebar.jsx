import { useRouter } from "next/router";

export default function Sidebar({
  role = "student",
  user = null,
  activeTab,
  setActiveTab,
  sidebarOpen = true,
  setSidebarOpen = () => {},
  onLogout = () => {},
  extraData = {}, // studentData for parent, batches/totalStudents for teacher
}) {
  const router = useRouter();

  // ── ROLE CONFIG ──
  const config = {
    student: {
      bg: "bg-gray-900",
      border: "border-gray-800",
      text: "text-gray-400",
      activeText: "text-orange-500",
      activeBg: "bg-orange-500/20",
      activeBorder: "border-orange-500",
      accent: "bg-orange-500",
      hover: "hover:bg-gray-800 hover:text-white",
      logoText: "text-orange-500",
      fixed: true,
      dark: true,
    },
    teacher: {
      bg: "bg-white",
      border: "border-gray-200",
      text: "text-gray-600",
      activeText: "text-indigo-700",
      activeBg: "bg-indigo-50",
      activeBorder: "border-indigo-200",
      accent: "bg-indigo-600",
      hover: "hover:bg-gray-100",
      logoText: "text-gray-800",
      badgeColor: "bg-indigo-100 text-indigo-600",
      fixed: false,
      dark: false,
    },
    parent: {
      bg: "bg-white",
      border: "border-gray-200",
      text: "text-gray-600",
      activeText: "text-rose-700",
      activeBg: "bg-rose-50",
      activeBorder: "border-rose-200",
      accent: "bg-rose-500",
      hover: "hover:bg-gray-100",
      logoText: "text-gray-800",
      badgeColor: "bg-rose-100 text-rose-600",
      fixed: false,
      dark: false,
    },
  };

  const c = config[role];

  // ── MENU ITEMS PER ROLE ──
  const menus = {
    student: [
      { id: "home", icon: "🏠", label: "Home", route: null },
      { id: "doubt", icon: "🤖", label: "AI Doubt Solver", route: "/doubt-solver" },
      { id: "notes", icon: "📝", label: "Smart Notes", route: "/notes" },
      { id: "mocktest", icon: "📄", label: "Mock Tests", route: "/mock-test" },
      { id: "studyplan", icon: "📅", label: "Study Plan", route: "/study-plan" },
      { id: "interview", icon: "🎤", label: "Mock Interview", route: "/mock-interview" },
      { id: "career", icon: "🎯", label: "Career Guide", route: "/career-guide" },
      { id: "answer", icon: "✍️", label: "Answer Writing", route: "/answer-writing" },
      { id: "scholarship", icon: "🏆", label: "Scholarships", route: "/scholarships" },
      { id: "coding", icon: "💻", label: "Coding Section", route: "/coding" },
      { id: "games", icon: "🎮", label: "Games", route: "/games" },
      { id: "homework", icon: "📚", label: "Homework", route: "/homework" },
      { id: "joinbatch", icon: "🏫", label: "Join Class", route: "/join-batch" },
      { id: "progress", icon: "📊", label: "My Progress", route: "/progress" },
      { id: "engineering", icon: "⚙️", label: "Engineering Hub", route: "/engineering" },
      { id: "community", icon: "👥", label: "Community", route: "/community" },
    ],
    teacher: [
      { id: "overview", icon: "📊", label: "Overview", route: null },
      { id: "batches", icon: "🏫", label: "My Batches", route: null },
      { id: "students", icon: "👨‍🎓", label: "Students", route: null },
      { id: "homework", icon: "📝", label: "Homework", route: null },
    ],
    parent: [
      { id: "overview", icon: "📊", label: "Overview", route: null },
      { id: "performance", icon: "📈", label: "Performance", route: null },
      { id: "activity", icon: "📅", label: "Activity", route: null },
      { id: "tests", icon: "📋", label: "Mock Tests", route: null },
    ],
  };

  const items = menus[role];

  const handleClick = (item) => {
    if (item.route) {
      router.push(item.route);
    } else {
      setActiveTab(item.id);
    }
  };

  // ── DARK SIDEBAR (Student) — fixed, full height ──
  if (c.dark) {
    return (
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} ${c.bg} border-r ${c.border} flex flex-col transition-all duration-300 fixed h-full z-50`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="RAXX AI" className="w-8 h-8" />
              <h1 className={`text-xl font-bold ${c.logoText}`}>RAXX AI</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white text-xl"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* User Info */}
        {sidebarOpen && user && (
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${c.accent} flex items-center justify-center text-white font-bold text-lg`}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{user?.name}</p>
                <p className="text-gray-400 text-xs">{user?.exam || "Student"}</p>
              </div>
            </div>
            {user?.student_code && (
              <div className="mt-3 bg-orange-500/10 border border-orange-500/30 rounded-lg px-3 py-2 cursor-pointer hover:bg-orange-500/20 transition">
                <p className="text-xs text-gray-400">My RAXX Code</p>
                <p className="text-orange-400 font-mono font-bold text-sm tracking-wider">
                  {user?.student_code}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition duration-200 ${
                activeTab === item.id
                  ? `${c.activeBg} ${c.activeText} border-r-2 ${c.activeBorder}`
                  : `${c.text} ${c.hover}`
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 text-red-400 hover:text-red-300 transition"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>
    );
  }

  // ── LIGHT SIDEBAR (Teacher / Parent) — normal flow, hidden on mobile ──
  return (
    <div className={`w-56 ${c.bg} border-r ${c.border} min-h-screen pt-6 px-3 hidden md:block`}>

      {/* Parent-only: connected student card */}
      {role === "parent" && extraData?.studentData && (
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-200 rounded-full flex items-center justify-center font-bold text-rose-700 text-lg">
              {extraData.studentData?.name?.[0]?.toUpperCase() || "S"}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">{extraData.studentData?.name || "Student"}</p>
              <p className="text-xs text-gray-500">{extraData.studentData?.exam || "Student"}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-rose-100 flex justify-between">
            <div className="text-center">
              <p className="font-bold text-rose-600 text-lg">{extraData.studentData?.streak || 0}</p>
              <p className="text-xs text-gray-400">Day Streak</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-rose-600 text-lg">{extraData.studentData?.readiness || 0}%</p>
              <p className="text-xs text-gray-400">Readiness</p>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 uppercase font-semibold px-3 mb-3">Menu</p>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all ${
            activeTab === item.id
              ? `${c.activeBg} ${c.activeText} border ${c.activeBorder}`
              : `text-gray-600 hover:bg-gray-100`
          }`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}

      {/* Teacher-only: quick links */}
      {role === "teacher" && (
        <div className="mt-6 border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400 uppercase font-semibold px-3 mb-3">Quick Links</p>
          <button
            onClick={() => router.push("/homework")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            <span>📂</span> Upload Homework
          </button>
          <button
            onClick={() => router.push("/mock-test")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            <span>📋</span> Create Test
          </button>
        </div>
      )}

      {/* Parent-only: disconnect button */}
      {role === "parent" && (
        <div className="mt-4 border-t border-gray-100 pt-4 px-3">
          <button
            onClick={onLogout}
            className="text-xs text-gray-400 hover:text-red-500 transition"
          >
            🔌 Disconnect Child
          </button>
        </div>
      )}
    </div>
  );
}