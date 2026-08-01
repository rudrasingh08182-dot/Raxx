import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Progress() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState({
    doubts_asked: 0,
    notes_generated: 0,
    mock_tests: [],
    games_played: 0,
    coins_earned: 0,
    study_streak: 0,
    homework_submitted: 0,
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }
    const u = JSON.parse(stored);
    setUser(u);
    fetchProgress(u.id);
  }, []);

  const fetchProgress = async (userId) => {
    try {
      // Fetch all data in parallel
      const [doubts, notes, tests, games, rewards, homework] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/doubt/history/${userId}`)
            .then((r) => r.json())
            .catch(() => ({ data: [] })),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/history/${userId}`)
            .then((r) => r.json())
            .catch(() => ({ data: [] })),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/mocktest/history/${userId}`)
            .then((r) => r.json())
            .catch(() => ({ data: [] })),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/history/${userId}`)
            .then((r) => r.json())
            .catch(() => ({ data: [] })),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/rewards/${userId}`)
            .then((r) => r.json())
            .catch(() => ({})),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/homework/history/${userId}`)
            .then((r) => r.json())
            .catch(() => ({ data: [] })),
        ]);

      setData({
        doubts_asked: (doubts.data || []).length,
        notes_generated: (notes.data || []).length,
        mock_tests: tests.data || [],
        games_played: (games.data || []).length,
        coins_earned: rewards.coins || 0,
        study_streak: rewards.streak || 0,
        homework_submitted: (homework.data || []).length,
        badges: rewards.badges || [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    if (!user) return;
    try {
      const month = new Date().toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
      });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, month }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `RAXX_AI_Report_${month}.pdf`;
      a.click();
    } catch (err) {
      console.error(err);
    }
  };

  // ── EXAM READINESS SCORE ──
  const examReadiness = () => {
    const tests = data.mock_tests || [];
    if (!tests.length) return 0;
    const avg =
      tests.reduce(
        (s, t) => s + (t.score / (t.total_questions * 10)) * 100,
        0
      ) / tests.length;
    return Math.min(Math.round(avg), 100);
  };

  // ── SUBJECT WISE SCORES ──
  const subjectScores = () => {
    const map = {};
    (data.mock_tests || []).forEach((t) => {
      const subj = t.subject || "General";
      if (!map[subj]) map[subj] = { total: 0, count: 0 };
      map[subj].total += (t.score / (t.total_questions * 10)) * 100;
      map[subj].count += 1;
    });
    return Object.entries(map)
      .map(([subj, d]) => ({
        subject: subj,
        avg: Math.round(d.total / d.count),
      }))
      .sort((a, b) => b.avg - a.avg);
  };

  const readiness = examReadiness();
  const subjects = subjectScores();

  // ── READINESS COLOR ──
  const readinessColor =
    readiness >= 75 ? "#34d399" : readiness >= 50 ? "#f59e0b" : "#f87171";
  const readinessLabel =
    readiness >= 75
      ? "Excellent! 🔥"
      : readiness >= 50
      ? "Good 👍"
      : "Needs Work 💪";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060b07] flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-12 h-12 rounded-full border-2 border-[#162a1c] border-t-emerald-400 animate-spin mb-4" />
        <p className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">
          Loading Progress Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060b07] text-[#e2f1e6] flex justify-center selection:bg-emerald-500/20 font-sans">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-[#081009] min-h-screen flex flex-col border-x border-[#122216] shadow-2xl relative">
        
        {/* Mobile Header Bar */}
        <header className="sticky top-0 z-40 bg-[#0a140c]/90 backdrop-blur-lg border-b border-[#162a1d] px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => router.push("/dashboard/student")}
              className="w-9 h-9 rounded-xl bg-[#0f1d13] border border-[#1b3623] hover:bg-[#162a1d] flex items-center justify-center text-emerald-300 transition active:scale-90"
              aria-label="Dashboard"
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
              <h1 className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
                <span>📊</span>
                <span>My Progress</span>
              </h1>
            </div>
          </div>

          {/* Download PDF CTA & Streak Pill */}
          <div className="flex items-center gap-2">
            <div className="bg-[#0f2115] border border-[#1d3d27] rounded-full px-2.5 py-1 flex items-center gap-1">
              <span className="text-xs">🔥</span>
              <span className="text-[#34d399] text-[11px] font-bold">
                {data.study_streak}d
              </span>
            </div>
            <button
              onClick={downloadReport}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-md shadow-emerald-950 transition active:scale-95"
            >
              <span>📄</span>
              <span className="hidden sm:inline">Report</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">

          {/* EXAM READINESS — MATTE CARD */}
          <div className="bg-[#0b160d] border border-[#172d1e] rounded-3xl p-5 shadow-lg relative overflow-hidden space-y-4">
            <div className="flex items-center gap-4">
              {/* Circular SVG Gauge */}
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-24 h-24 -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="#122417"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke={readinessColor}
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 40 * (1 - readiness / 100)
                    }`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span
                    className="text-xl font-extrabold font-mono leading-none"
                    style={{ color: readinessColor }}
                  >
                    {readiness}%
                  </span>
                  <span className="text-[#597a62] text-[9px] uppercase tracking-wider font-bold mt-0.5">
                    READINESS
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider block">
                  Exam Readiness
                </span>
                <h2 className="text-white text-lg font-extrabold truncate">
                  {readinessLabel}
                </h2>
                <p className="text-[#72967d] text-xs">
                  Based on {data.mock_tests?.length || 0} mock tests this month
                </p>
              </div>
            </div>

            {/* Breakdown Progress Bars */}
            <div className="space-y-2 pt-1 border-t border-[#14281a]">
              {[
                {
                  label: "Mock Tests",
                  value: Math.min((data.mock_tests?.length || 0) * 10, 100),
                  color: "#34d399",
                },
                {
                  label: "Doubts Solved",
                  value: Math.min((data.doubts_asked || 0) * 2, 100),
                  color: "#60a5fa",
                },
                {
                  label: "Notes Generated",
                  value: Math.min((data.notes_generated || 0) * 8, 100),
                  color: "#fbbf24",
                },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#789b83] font-medium">
                      {item.label}
                    </span>
                    <span
                      className="font-bold font-mono"
                      style={{ color: item.color }}
                    >
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#060c07] rounded-full overflow-hidden border border-[#162b1d]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                icon: "🤖",
                label: "Doubts",
                value: data.doubts_asked,
                color: "#60a5fa",
              },
              {
                icon: "📝",
                label: "Notes",
                value: data.notes_generated,
                color: "#fbbf24",
              },
              {
                icon: "📊",
                label: "Tests",
                value: data.mock_tests?.length,
                color: "#34d399",
              },
              {
                icon: "🎮",
                label: "Games",
                value: data.games_played,
                color: "#a78bfa",
              },
              {
                icon: "🏆",
                label: "Coins",
                value: data.coins_earned,
                color: "#f59e0b",
              },
              {
                icon: "📋",
                label: "HW Done",
                value: data.homework_submitted,
                color: "#4ade80",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#0b160d] border border-[#172d1e] rounded-2xl p-2.5 text-center shadow-md space-y-0.5"
              >
                <div className="text-base">{s.icon}</div>
                <div
                  className="text-base font-extrabold font-mono leading-tight"
                  style={{ color: s.color }}
                >
                  {s.value || 0}
                </div>
                <div className="text-[#597a62] text-[10px] truncate">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* SEGMENTED TAB SELECTOR */}
          <div className="bg-[#060c07] border border-[#152a1c] p-1 rounded-2xl flex gap-1">
            {[
              { id: "overview", label: "📈 Overview" },
              { id: "subjects", label: "📚 Subjects" },
              { id: "tests", label: "📊 Tests" },
              { id: "badges", label: "🏆 Badges" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#102416] text-[#34d399] border border-[#1f4229] shadow-sm"
                    : "text-[#5d8067] hover:text-[#88a992]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT VIEWS */}

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-3">
              {/* Score Trend */}
              <div className="bg-[#0b160d] border border-[#172d1e] rounded-2xl p-4 space-y-3 shadow-md">
                <h3 className="text-[#34d399] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>📈</span> Test Score Trend
                </h3>
                {data.mock_tests?.length > 0 ? (
                  <div className="flex items-end gap-1.5 h-28 pt-4">
                    {data.mock_tests.slice(-8).map((t, i) => {
                      const pct = Math.round(
                        (t.score / (t.total_questions * 10)) * 100
                      );
                      const barColor =
                        pct >= 75
                          ? "#34d399"
                          : pct >= 50
                          ? "#f59e0b"
                          : "#f87171";
                      return (
                        <div
                          key={i}
                          className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
                        >
                          <span
                            className="text-[9px] font-mono font-bold"
                            style={{ color: barColor }}
                          >
                            {pct}%
                          </span>
                          <div
                            className="w-full rounded-t-md transition-all duration-500"
                            style={{
                              height: `${pct}%`,
                              backgroundColor: barColor,
                              minHeight: "4px",
                            }}
                          />
                          <span className="text-[#597a62] text-[8px] truncate max-w-full">
                            {t.subject?.slice(0, 3)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-20 flex items-center justify-center border border-dashed border-[#162c1d] rounded-xl">
                    <p className="text-[#4e6e57] text-xs">No test history yet</p>
                  </div>
                )}
              </div>

              {/* Weekly Activity */}
              <div className="bg-[#0b160d] border border-[#172d1e] rounded-2xl p-4 space-y-3 shadow-md">
                <h3 className="text-[#34d399] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>📅</span> Weekly Activity
                </h3>
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => {
                    const active = (i + 1) % 2 === 0 || i === 0;
                    return (
                      <div key={i} className="space-y-1">
                        <div
                          className={`aspect-square rounded-lg transition-all ${
                            active
                              ? "bg-emerald-500/80 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                              : "bg-[#060c07] border border-[#162b1d]"
                          }`}
                        />
                        <span className="text-[#597a62] text-[9px] font-medium">
                          {day}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[#72967d] text-xs font-medium">
                  🔥 {data.study_streak} day study streak — keep it up!
                </p>
              </div>

              {/* Coins & Tiers */}
              <div className="bg-[#0b160d] border border-[#172d1e] rounded-2xl p-4 space-y-3 shadow-md">
                <h3 className="text-[#fbbf24] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>🏆</span> Coins & Tier Progress
                </h3>
                <div className="flex items-center gap-4">
                  <div className="text-center shrink-0">
                    <p className="text-amber-400 text-3xl font-black font-mono leading-none">
                      {data.coins_earned || 0}
                    </p>
                    <p className="text-[#597a62] text-[10px] font-bold mt-1">
                      COINS
                    </p>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    {[
                      { label: "Bronze", needed: 100, color: "#cd7c2e" },
                      { label: "Silver", needed: 500, color: "#9ca3af" },
                      { label: "Gold", needed: 1000, color: "#fbbf24" },
                      { label: "Diamond", needed: 5000, color: "#60a5fa" },
                    ].map((tier) => (
                      <div key={tier.label} className="space-y-0.5">
                        <div className="flex justify-between text-[10px]">
                          <span
                            className="font-bold"
                            style={{ color: tier.color }}
                          >
                            {tier.label}
                          </span>
                          <span className="text-[#597a62] font-mono">
                            {Math.min(data.coins_earned || 0, tier.needed)}/
                            {tier.needed}
                          </span>
                        </div>
                        <div className="h-1 bg-[#060c07] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(
                                ((data.coins_earned || 0) / tier.needed) * 100,
                                100
                              )}%`,
                              backgroundColor: tier.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Summary List */}
              <div className="bg-[#0b160d] border border-[#172d1e] rounded-2xl p-4 space-y-2 shadow-md">
                <h3 className="text-[#34d399] font-bold text-xs uppercase tracking-wider mb-2">
                  ⚡ Performance Insights
                </h3>
                {[
                  {
                    label: "Avg Test Score",
                    value: data.mock_tests?.length
                      ? `${Math.round(
                          data.mock_tests.reduce(
                            (s, t) =>
                              s + (t.score / (t.total_questions * 10)) * 100,
                            0
                          ) / data.mock_tests.length
                        )}%`
                      : "N/A",
                    color: "#34d399",
                  },
                  {
                    label: "Strongest Subject",
                    value: subjects[0]?.subject || "N/A",
                    color: "#60a5fa",
                  },
                  {
                    label: "Needs Attention",
                    value: subjects[subjects.length - 1]?.subject || "N/A",
                    color: "#f87171",
                  },
                  {
                    label: "Total Study Sessions",
                    value:
                      (data.doubts_asked || 0) + (data.notes_generated || 0),
                    color: "#fbbf24",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between items-center py-1.5 border-b border-[#14281a] last:border-none text-xs"
                  >
                    <span className="text-[#72967d]">{s.label}</span>
                    <span
                      className="font-bold font-mono"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBJECTS TAB */}
          {activeTab === "subjects" && (
            <div className="bg-[#0b160d] border border-[#172d1e] rounded-3xl p-5 space-y-4 shadow-lg">
              <h3 className="text-[#34d399] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📚</span> Subject Performance
              </h3>

              {subjects.length > 0 ? (
                <div className="space-y-3.5">
                  {subjects.map((s, i) => {
                    const color =
                      s.avg >= 75
                        ? "#34d399"
                        : s.avg >= 50
                        ? "#f59e0b"
                        : "#f87171";
                    const tag =
                      s.avg >= 75
                        ? "Strong"
                        : s.avg >= 50
                        ? "Average"
                        : "Needs Work";
                    return (
                      <div key={s.subject} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-[#597a62] font-mono text-[10px]">
                              #{i + 1}
                            </span>
                            <span className="text-white font-semibold">
                              {s.subject}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className="font-bold font-mono"
                              style={{ color }}
                            >
                              {s.avg}%
                            </span>
                            <span
                              className="text-[9px] font-bold px-2 py-0.5 rounded-md border"
                              style={{
                                color,
                                borderColor: `${color}40`,
                                backgroundColor: `${color}15`,
                              }}
                            >
                              {tag}
                            </span>
                          </div>
                        </div>

                        <div className="h-2 bg-[#060c07] rounded-full overflow-hidden border border-[#162c1d]">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${s.avg}%`,
                              backgroundColor: color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="text-4xl">📊</div>
                  <p className="text-[#72967d] text-xs">
                    Take mock tests to see subject analytics!
                  </p>
                  <button
                    onClick={() => router.push("/mock-test")}
                    className="bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md active:scale-95 transition"
                  >
                    Take Mock Test →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TESTS TAB */}
          {activeTab === "tests" && (
            <div className="bg-[#0b160d] border border-[#172d1e] rounded-3xl p-5 space-y-4 shadow-lg">
              <h3 className="text-[#34d399] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>📊</span> Mock Test History
              </h3>

              {data.mock_tests?.length > 0 ? (
                <div className="space-y-2.5">
                  {data.mock_tests.map((t, i) => {
                    const pct = Math.round(
                      (t.score / (t.total_questions * 10)) * 100
                    );
                    const passed = pct >= 40;
                    return (
                      <div
                        key={i}
                        className="bg-[#060c07] border border-[#172e1e] rounded-2xl p-3.5 flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <p className="text-white font-semibold text-xs">
                            {t.subject || "General"} Test
                          </p>
                          <p className="text-[#597a62] text-[10px] font-mono">
                            Score: {t.score} / {t.total_questions * 10}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-bold text-sm font-mono"
                            style={{
                              color: pct >= 75 ? "#34d399" : pct >= 50 ? "#f59e0b" : "#f87171",
                            }}
                          >
                            {pct}%
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              passed
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                                : "bg-red-950 text-red-400 border border-red-800/50"
                            }`}
                          >
                            {passed ? "Pass ✓" : "Fail ✗"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="text-4xl">📝</div>
                  <p className="text-[#72967d] text-xs">
                    No mock tests recorded yet.
                  </p>
                  <button
                    onClick={() => router.push("/mock-test")}
                    className="bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md active:scale-95 transition"
                  >
                    Take First Test →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* BADGES TAB */}
          {activeTab === "badges" && (
            <div className="bg-[#0b160d] border border-[#172d1e] rounded-3xl p-5 space-y-4 shadow-lg">
              <h3 className="text-[#34d399] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span>🏆</span> Achievements & Badges
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    icon: "🔥",
                    label: "Streak Master",
                    desc: "7 day streak",
                    earned: data.study_streak >= 7,
                  },
                  {
                    icon: "🤖",
                    label: "Doubt Crusher",
                    desc: "50 doubts solved",
                    earned: data.doubts_asked >= 50,
                  },
                  {
                    icon: "📝",
                    label: "Note Ninja",
                    desc: "10 notes made",
                    earned: data.notes_generated >= 10,
                  },
                  {
                    icon: "📊",
                    label: "Test Champion",
                    desc: "10 tests taken",
                    earned: data.mock_tests?.length >= 10,
                  },
                  {
                    icon: "🎮",
                    label: "Game Master",
                    desc: "20 games played",
                    earned: data.games_played >= 20,
                  },
                  {
                    icon: "🏆",
                    label: "Coin Collector",
                    desc: "500 coins earned",
                    earned: data.coins_earned >= 500,
                  },
                  {
                    icon: "⭐",
                    label: "Premium Star",
                    desc: "Subscriber",
                    earned: false,
                  },
                  {
                    icon: "💎",
                    label: "Diamond Student",
                    desc: "1000 coins",
                    earned: data.coins_earned >= 1000,
                  },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className={`rounded-2xl p-3 border text-center transition-all ${
                      badge.earned
                        ? "bg-[#0e2114] border-emerald-500/40 shadow-sm"
                        : "bg-[#060c07] border-[#162a1c] opacity-40 grayscale"
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <p
                      className={`text-xs font-bold ${
                        badge.earned ? "text-emerald-300" : "text-[#597a62]"
                      }`}
                    >
                      {badge.label}
                    </p>
                    <p className="text-[#597a62] text-[10px] mt-0.5">
                      {badge.desc}
                    </p>
                    {badge.earned && (
                      <span className="inline-block mt-1.5 text-[9px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800/50">
                        ✓ UNLOCKED
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}