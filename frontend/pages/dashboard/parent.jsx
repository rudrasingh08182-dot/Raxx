import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar"

export default function ParentDashboard() {
  const router = useRouter();

  const [screen, setScreen] = useState("connect"); // connect | dashboard
  const [studentCode, setStudentCode] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [parent, setParent] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
const [showUpdates, setShowUpdates] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setParent(JSON.parse(userData));

    // Check if already connected to a student
    const savedStudent = localStorage.getItem("connected_student");
    if (savedStudent) {
      setStudentData(JSON.parse(savedStudent));
      setScreen("dashboard");
    }
  }, []);

  const handleConnect = async () => {
    if (!studentCode || studentCode.length < 12) {
      setError("Please enter a valid student code!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/parent/connect/${studentCode.toUpperCase()}`
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setStudentData(data);
        localStorage.setItem("connected_student", JSON.stringify(data));
        setScreen("dashboard");
      } else {
        setError(data.detail || "Invalid student code! Ask your child for their RAXX code.");
      }
    } catch (err) {
      setError("Connection failed. Please try again!");
    }
    setLoading(false);
  };

  const disconnect = () => {
    localStorage.removeItem("connected_student");
    setStudentData(null);
    setStudentCode("");
    setScreen("connect");
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "performance", label: "Performance", icon: "📈" },
    { id: "activity", label: "Activity", icon: "📅" },
    { id: "tests", label: "Mock Tests", icon: "📋" },
  ];

  // Mock progress data (will come from API later)
  const subjects = [
    { name: "Physics", score: 72, color: "blue", trend: "+5%" },
    { name: "Chemistry", score: 65, color: "green", trend: "+2%" },
    { name: "Mathematics", score: 88, color: "indigo", trend: "+8%" },
    { name: "Biology", score: 58, color: "red", trend: "-3%" },
  ];

  const recentTests = [
    { name: "Physics Mock Test 3", score: 72, total: 100, date: "12 Jun" },
    { name: "Chemistry PYQ 2024", score: 65, total: 100, date: "10 Jun" },
    { name: "Maths Full Test", score: 88, total: 100, date: "8 Jun" },
  ];

  const weekActivity = [
    { day: "Mon", hours: 3 },
    { day: "Tue", hours: 2 },
    { day: "Wed", hours: 4 },
    { day: "Thu", hours: 1 },
    { day: "Fri", hours: 3 },
    { day: "Sat", hours: 5 },
    { day: "Sun", hours: 2 },
  ];

  // ── CONNECT SCREEN ──
  if (screen === "connect") {
    return (
      <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-rose-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">RAXX AI</span>
            <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">Parent</span>
          </div>
          <button
            onClick={() => { localStorage.clear(); router.push("/login"); }}
            className="text-sm text-gray-500 hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>

        {/* Connect Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-8 w-full max-w-md mt-16">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">👨‍👩‍👧</div>
            <h1 className="text-2xl font-bold text-gray-800">Connect to Your Child</h1>
            <p className="text-gray-500 text-sm mt-2">
              Enter the unique RAXX code your child received when they registered
            </p>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Student Code
            </label>
            <input
              type="text"
              placeholder="RAXX-STU-XXXX"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value.toUpperCase())}
              maxLength={13}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold tracking-widest focus:outline-none focus:border-rose-400 transition"
            />
            {error && (
              <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
            )}
          </div>

          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-rose-600 transition disabled:opacity-60 shadow-sm"
          >
            {loading ? "Connecting..." : "Connect to Child 🔗"}
          </button>

          <div className="mt-6 bg-rose-50 rounded-xl p-4 border border-rose-100">
            <p className="text-rose-700 font-semibold text-sm mb-2">📱 Don't have RAXX?</p>
            <p className="text-gray-500 text-xs leading-relaxed">
              If your child has registered on RAXX AI, ask them to share their unique student code from their profile. You can also receive monthly progress reports directly on WhatsApp without creating an account!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── DASHBOARD SCREEN ──
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-rose-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <div>
            <span className="font-bold text-gray-800 text-lg">RAXX AI</span>
            <span className="ml-2 text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">Parent</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden md:block">
            👋 {parent?.name || "Parent"}
          </span>
          <button
            onClick={() => { localStorage.clear(); router.push("/login"); }}
            className="text-sm text-gray-500 hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        <Sidebar
  role="parent"
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  extraData={{ studentData }}
  onLogout={disconnect}
/>

        {/* Main Content */}
        <div className="flex-1 p-6">

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  {studentData?.name || "Student"}'s Progress
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {studentData?.board || "Board"} • {studentData?.exam || "Exam"} • Last updated today
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Study Streak", value: `${studentData?.streak || 7} days`, icon: "🔥", bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-600" },
                  { label: "Exam Readiness", value: `${studentData?.readiness || 68}%`, icon: "🎯", bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-600" },
                  { label: "Tests Taken", value: studentData?.tests || 12, icon: "📋", bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600" },
                  { label: "Avg Score", value: `${studentData?.avg_score || 71}%`, icon: "📈", bg: "bg-green-50", border: "border-green-100", text: "text-green-600" },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.bg} border ${stat.border} rounded-xl p-4`}>
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <p className={`text-xl font-bold ${stat.text}`}>{stat.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Subject Performance */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
                <h2 className="font-bold text-gray-800 mb-4">Subject-wise Performance</h2>
                <div className="space-y-4">
                  {subjects.map((sub, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${sub.trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                            {sub.trend}
                          </span>
                          <span className="text-sm font-bold text-gray-800">{sub.score}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            sub.score >= 75 ? "bg-green-400" :
                            sub.score >= 50 ? "bg-yellow-400" : "bg-red-400"
                          }`}
                          style={{ width: `${sub.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Activity */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h2 className="font-bold text-gray-800 mb-4">This Week's Study Hours</h2>
                <div className="flex items-end gap-2 h-28">
                  {weekActivity.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-gray-500">{day.hours}h</span>
                      <div
                        className="w-full bg-rose-400 rounded-t-md transition-all"
                        style={{ height: `${(day.hours / 5) * 80}px` }}
                      />
                      <span className="text-xs text-gray-400">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PERFORMANCE TAB ── */}
          {activeTab === "performance" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Detailed Performance</h1>
                <p className="text-gray-500 text-sm mt-1">Subject-wise analysis and weak areas</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((sub, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800">{sub.name}</h3>
                      <span className={`text-lg font-bold ${
                        sub.score >= 75 ? "text-green-600" :
                        sub.score >= 50 ? "text-yellow-600" : "text-red-600"
                      }`}>{sub.score}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                      <div
                        className={`h-3 rounded-full ${
                          sub.score >= 75 ? "bg-green-400" :
                          sub.score >= 50 ? "bg-yellow-400" : "bg-red-400"
                        }`}
                        style={{ width: `${sub.score}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Last month trend: <span className={sub.trend.startsWith("+") ? "text-green-500 font-medium" : "text-red-500 font-medium"}>{sub.trend}</span></span>
                      <span className={`font-medium ${
                        sub.score >= 75 ? "text-green-600" :
                        sub.score >= 50 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {sub.score >= 75 ? "Good ✅" : sub.score >= 50 ? "Average ⚠️" : "Needs Attention ❗"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Recommendation */}
              <div className="mt-6 bg-rose-50 border border-rose-200 rounded-xl p-5">
                <h3 className="font-bold text-rose-700 mb-3">🤖 AI Recommendation for {studentData?.name || "your child"}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-rose-500 mt-0.5">•</span>
                    Biology score is below average — encourage 1 extra hour daily on this subject
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-rose-500 mt-0.5">•</span>
                    Mathematics is performing excellently — keep the momentum going
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-rose-500 mt-0.5">•</span>
                    Study streak is strong — make sure adequate sleep and breaks are taken
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* ── ACTIVITY TAB ── */}
          {activeTab === "activity" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Daily Activity</h1>
                <p className="text-gray-500 text-sm mt-1">Study hours and consistency tracking</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
                <h2 className="font-bold text-gray-800 mb-4">This Week</h2>
                <div className="space-y-3">
                  {weekActivity.map((day, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 w-8">{day.day}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-4">
                        <div
                          className="bg-rose-400 h-4 rounded-full transition-all"
                          style={{ width: `${(day.hours / 6) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-8">{day.hours}h</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                  <span className="text-gray-500">Total this week</span>
                  <span className="font-bold text-rose-600">
                    {weekActivity.reduce((a, b) => a + b.hours, 0)} hours
                  </span>
                </div>
              </div>

              {/* Streak Info */}
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🔥</span>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{studentData?.streak || 7} Day Study Streak!</p>
                    <p className="text-gray-500 text-sm">
                      {studentData?.name || "Your child"} has studied consistently for {studentData?.streak || 7} days in a row. Great discipline!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TESTS TAB ── */}
          {activeTab === "tests" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Mock Test History</h1>
                <p className="text-gray-500 text-sm mt-1">All tests attempted by {studentData?.name || "your child"}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Test Name</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Score</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Date</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTests.map((test, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="px-5 py-4 text-sm font-medium text-gray-800">{test.name}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{test.score}/{test.total}</td>
                        <td className="px-5 py-4 text-sm text-gray-400">{test.date}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            test.score >= 75 ? "bg-green-100 text-green-700" :
                            test.score >= 50 ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {test.score >= 75 ? "Good" : test.score >= 50 ? "Average" : "Poor"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}