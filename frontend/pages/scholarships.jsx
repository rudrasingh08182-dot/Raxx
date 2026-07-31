import { useState } from "react";
import { useRouter } from "next/router";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

const CLASS_LEVELS = [
  "Class 9", "Class 10", "Class 11", "Class 12",
  "Graduation (UG)", "Post Graduation (PG)", "PhD/Research", "Diploma/ITI",
];

const COURSES = [
  "Science (PCM/PCB)", "Commerce", "Arts/Humanities",
  "Engineering/B.Tech", "Medical/MBBS/BDS", "Law/LLB",
  "MBA/Management", "B.Sc", "B.Com", "B.A",
  "Pharmacy", "Nursing", "Agriculture", "Polytechnic/Diploma",
  "ITI", "Other",
];

const CATEGORIES = ["General", "OBC", "SC", "ST", "EBC", "DNT", "Minority"];
const RELIGIONS = ["Any", "Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];
const GENDERS = ["Male", "Female", "Other"];

export default function Scholarships() {
  const router = useRouter();
  const [step, setStep] = useState("form"); // form | loading | results
  const [form, setForm] = useState({
    name: "", class_level: "", course: "", category: "",
    state: "", income: "", marks: "", gender: "", religion: "Any",
  });
  const [results, setResults] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("raxx_user") || "{}")
    : {};

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const isFormValid = form.name && form.class_level && form.course &&
    form.category && form.state && form.income && form.marks && form.gender;

  const handleFind = async () => {
    if (!isFormValid) return;
    setStep("loading");
    try {
      const res = await fetch("http://127.0.0.1:8000/scholarship/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          income: parseInt(form.income),
          marks: parseFloat(form.marks),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data);
        setStep("results");
      }
    } catch {
      alert("Error! Make sure backend is running.");
      setStep("form");
    }
  };

  const difficultyColor = (d) => {
    if (d === "Easy") return { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" };
    if (d === "Medium") return { bg: "#fffbeb", color: "#d97706", border: "#fde68a" };
    return { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" };
  };

  const categoryColor = (c) => {
    if (c === "Central") return { bg: "#f5f3ff", color: "#7c3aed", border: "#ddd6fe" };
    if (c === "State") return { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" };
    if (c === "Merit") return { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" };
    return { bg: "#fdf4ff", color: "#a21caf", border: "#f0abfc" };
  };

  // ════════════════════════════
  // FORM SCREEN
  // ════════════════════════════
  if (step === "form") return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "system-ui,sans-serif" }}>

      {/* TOPBAR */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "14px 24px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <button onClick={() => router.push("/dashboard/student")} style={{ background: "none", border: "none", color: "#64748b", fontSize: "13px", cursor: "pointer" }}>← Dashboard</button>
        <span style={{ color: "#e2e8f0" }}>|</span>
        <span style={{ fontWeight: "700", fontSize: "15px", color: "#1e293b" }}>🏆 Scholarship Finder</span>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 16px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 16px", boxShadow: "0 8px 24px rgba(124,58,237,0.25)" }}>🏆</div>
          <h1 style={{ color: "#1e293b", fontSize: "26px", fontWeight: "800", margin: "0 0 8px 0" }}>Find Your Scholarship</h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Fill your details — AI will find all government scholarships you are eligible for!</p>
        </div>

        {/* Form Card */}
        <div style={{ background: "#ffffff", borderRadius: "20px", padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>

          {/* Name */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#374151", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px" }}>Your Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#1e293b", outline: "none", boxSizing: "border-box", transition: "border 0.15s" }}
              onFocus={(e) => e.target.style.borderColor = "#7c3aed"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          {/* Class Level */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#374151", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px" }}>Class / Level</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {CLASS_LEVELS.map((c) => (
                <button key={c} onClick={() => handleChange("class_level", c)} style={{
                  padding: "7px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "600",
                  cursor: "pointer", transition: "all 0.15s",
                  background: form.class_level === c ? "#7c3aed" : "#f8fafc",
                  color: form.class_level === c ? "#ffffff" : "#475569",
                  border: form.class_level === c ? "1.5px solid #7c3aed" : "1.5px solid #e2e8f0",
                }}>{c}</button>
              ))}
            </div>
          </div>

          {/* Course */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#374151", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px" }}>Course / Stream</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {COURSES.map((c) => (
                <button key={c} onClick={() => handleChange("course", c)} style={{
                  padding: "7px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "600",
                  cursor: "pointer", transition: "all 0.15s",
                  background: form.course === c ? "#7c3aed" : "#f8fafc",
                  color: form.course === c ? "#ffffff" : "#475569",
                  border: form.course === c ? "1.5px solid #7c3aed" : "1.5px solid #e2e8f0",
                }}>{c}</button>
              ))}
            </div>
          </div>

          {/* Category + Gender */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={{ color: "#374151", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px" }}>Category</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {CATEGORIES.map((c) => (
                  <button key={c} onClick={() => handleChange("category", c)} style={{
                    padding: "6px 12px", borderRadius: "7px", fontSize: "12px", fontWeight: "600",
                    cursor: "pointer", transition: "all 0.15s",
                    background: form.category === c ? "#7c3aed" : "#f8fafc",
                    color: form.category === c ? "#ffffff" : "#475569",
                    border: form.category === c ? "1.5px solid #7c3aed" : "1.5px solid #e2e8f0",
                  }}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ color: "#374151", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px" }}>Gender</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {GENDERS.map((g) => (
                  <button key={g} onClick={() => handleChange("gender", g)} style={{
                    padding: "6px 12px", borderRadius: "7px", fontSize: "12px", fontWeight: "600",
                    cursor: "pointer", transition: "all 0.15s",
                    background: form.gender === g ? "#7c3aed" : "#f8fafc",
                    color: form.gender === g ? "#ffffff" : "#475569",
                    border: form.gender === g ? "1.5px solid #7c3aed" : "1.5px solid #e2e8f0",
                  }}>{g}</button>
                ))}
              </div>
            </div>
          </div>

          {/* State */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "#374151", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px" }}>State</label>
            <select
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", color: form.state ? "#1e293b" : "#94a3b8", outline: "none", background: "#ffffff", cursor: "pointer" }}
            >
              <option value="">Select your state</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Income + Marks */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <label style={{ color: "#374151", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px" }}>Annual Family Income (Rs.)</label>
              <input
                type="number"
                placeholder="e.g. 250000"
                value={form.income}
                onChange={(e) => handleChange("income", e.target.value)}
                style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#1e293b", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => e.target.style.borderColor = "#7c3aed"}
                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>
            <div>
              <label style={{ color: "#374151", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px" }}>Last Exam Marks (%)</label>
              <input
                type="number"
                placeholder="e.g. 75"
                value={form.marks}
                onChange={(e) => handleChange("marks", e.target.value)}
                style={{ width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#1e293b", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => e.target.style.borderColor = "#7c3aed"}
                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>
          </div>

          {/* Religion */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ color: "#374151", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px" }}>Religion <span style={{ color: "#94a3b8", fontWeight: "400" }}>(optional)</span></label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {RELIGIONS.map((r) => (
                <button key={r} onClick={() => handleChange("religion", r)} style={{
                  padding: "6px 12px", borderRadius: "7px", fontSize: "12px", fontWeight: "600",
                  cursor: "pointer", transition: "all 0.15s",
                  background: form.religion === r ? "#7c3aed" : "#f8fafc",
                  color: form.religion === r ? "#ffffff" : "#475569",
                  border: form.religion === r ? "1.5px solid #7c3aed" : "1.5px solid #e2e8f0",
                }}>{r}</button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleFind}
            disabled={!isFormValid}
            style={{
              width: "100%", padding: "15px", borderRadius: "12px", fontWeight: "800",
              fontSize: "15px", color: "#ffffff",
              background: isFormValid ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "#cbd5e1",
              border: "none", cursor: isFormValid ? "pointer" : "not-allowed",
              boxShadow: isFormValid ? "0 4px 16px rgba(124,58,237,0.35)" : "none",
              transition: "all 0.2s",
            }}>
            🔍 Find My Scholarships
          </button>
        </div>
      </div>
    </div>
  );

  // ════════════════════════════
  // LOADING SCREEN
  // ════════════════════════════
  if (step === "loading") return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 24px", boxShadow: "0 8px 24px rgba(124,58,237,0.25)", animation: "pulse 1.5s infinite" }}>🔍</div>
        <h2 style={{ color: "#1e293b", fontSize: "20px", fontWeight: "800", margin: "0 0 8px 0" }}>Finding Scholarships...</h2>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 24px 0" }}>AI is searching all govt databases for you</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#7c3aed", animation: `bounce 1s infinite ${i * 0.2}s` }} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>
    </div>
  );

  // ════════════════════════════
  // RESULTS SCREEN
  // ════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "system-ui,sans-serif" }}>

      {/* TOPBAR */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={() => setStep("form")} style={{ background: "none", border: "none", color: "#64748b", fontSize: "13px", cursor: "pointer" }}>← Search Again</button>
          <span style={{ color: "#e2e8f0" }}>|</span>
          <span style={{ fontWeight: "700", fontSize: "15px", color: "#1e293b" }}>🏆 Your Scholarships</span>
        </div>
        <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "20px", background: "#f5f3ff", color: "#7c3aed", fontWeight: "700", border: "1px solid #ddd6fe" }}>
          {results?.total_found || 0} Found
        </span>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px 16px" }}>

        {/* Summary Card */}
        <div style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", borderRadius: "20px", padding: "24px", marginBottom: "20px", color: "#ffffff", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "13px", opacity: 0.8, margin: "0 0 4px 0" }}>Scholarships found for {form.name}</p>
              <h2 style={{ fontSize: "24px", fontWeight: "900", margin: "0 0 4px 0" }}>{results?.total_found} Scholarships</h2>
              <p style={{ fontSize: "13px", opacity: 0.9, margin: 0 }}>Total potential: <strong>{results?.total_potential_amount}</strong></p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "14px", padding: "16px", minWidth: "160px" }}>
              <p style={{ fontSize: "11px", opacity: 0.8, margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "1px" }}>Apply First</p>
              <p style={{ fontSize: "13px", fontWeight: "700", margin: 0 }}>{results?.priority_scholarship}</p>
            </div>
          </div>
        </div>

        {/* AI Tip */}
        <div style={{ background: "#ffffff", borderRadius: "14px", padding: "18px", marginBottom: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>🤖</div>
          <div>
            <p style={{ color: "#7c3aed", fontSize: "12px", fontWeight: "700", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "1px" }}>AI Tip</p>
            <p style={{ color: "#374151", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>{results?.ai_tip}</p>
          </div>
        </div>

        {/* Scholarship Cards */}
        {(results?.scholarships || []).map((s, i) => {
          const diff = difficultyColor(s.difficulty);
          const cat = categoryColor(s.category_type);
          const isExpanded = expandedId === i;

          return (
            <div key={i} style={{ background: "#ffffff", borderRadius: "16px", marginBottom: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", overflow: "hidden", transition: "all 0.2s" }}>

              {/* Card Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : i)}
                style={{ padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "14px" }}>

                {/* Number */}
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "13px", fontWeight: "800", flexShrink: 0 }}>
                  {i + 1}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "6px" }}>
                    <h3 style={{ color: "#1e293b", fontSize: "14px", fontWeight: "700", margin: 0, lineHeight: "1.4" }}>{s.name}</h3>
                    <span style={{ fontSize: "14px", flexShrink: 0 }}>{isExpanded ? "▲" : "▼"}</span>
                  </div>

                  <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 8px 0" }}>{s.provider}</p>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#15803d", background: "#f0fdf4", padding: "3px 10px", borderRadius: "20px", border: "1px solid #bbf7d0" }}>
                      💰 {s.amount}
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: diff.color, background: diff.bg, padding: "3px 8px", borderRadius: "20px", border: `1px solid ${diff.border}` }}>
                      {s.difficulty}
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: "600", color: cat.color, background: cat.bg, padding: "3px 8px", borderRadius: "20px", border: `1px solid ${cat.border}` }}>
                      {s.category_type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f1f5f9" }}>

                  {/* Eligibility */}
                  <div style={{ background: "#f5f3ff", borderRadius: "10px", padding: "12px 14px", marginTop: "14px", marginBottom: "12px" }}>
                    <p style={{ color: "#7c3aed", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px 0" }}>Why You Are Eligible</p>
                    <p style={{ color: "#4c1d95", fontSize: "13px", lineHeight: "1.5", margin: 0 }}>{s.eligibility}</p>
                  </div>

                  {/* Deadline + Action */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                    <div style={{ background: "#fef2f2", borderRadius: "10px", padding: "12px" }}>
                      <p style={{ color: "#dc2626", fontSize: "11px", fontWeight: "700", margin: "0 0 3px 0" }}>⏰ Deadline</p>
                      <p style={{ color: "#991b1b", fontSize: "13px", fontWeight: "600", margin: 0 }}>{s.deadline}</p>
                    </div>
                    <div style={{ background: "#f0fdf4", borderRadius: "10px", padding: "12px" }}>
                      <p style={{ color: "#15803d", fontSize: "11px", fontWeight: "700", margin: "0 0 3px 0" }}>✅ Next Step</p>
                      <p style={{ color: "#166534", fontSize: "12px", margin: 0 }}>{s.action}</p>
                    </div>
                  </div>

                  {/* Documents */}
                  {s.documents_needed?.length > 0 && (
                    <div style={{ marginBottom: "14px" }}>
                      <p style={{ color: "#374151", fontSize: "12px", fontWeight: "700", margin: "0 0 8px 0" }}>📄 Documents Needed</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {s.documents_needed.map((doc, di) => (
                          <span key={di} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "6px", background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0" }}>
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Apply Button */}
                  <a
                    href={s.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block", width: "100%", padding: "13px", borderRadius: "10px",
                      fontWeight: "800", fontSize: "14px", color: "#ffffff", textAlign: "center",
                      background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                      textDecoration: "none", boxSizing: "border-box",
                      boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
                    }}>
                    Apply Now → Official Website 🔗
                  </a>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <button onClick={() => setStep("form")} style={{ flex: 1, padding: "13px", borderRadius: "12px", fontWeight: "700", fontSize: "14px", color: "#7c3aed", background: "#ffffff", border: "1.5px solid #ddd6fe", cursor: "pointer" }}>
            🔍 Search Again
          </button>
          <button onClick={() => router.push("/dashboard/student")} style={{ flex: 1, padding: "13px", borderRadius: "12px", fontWeight: "700", fontSize: "14px", color: "#ffffff", background: "linear-gradient(135deg,#7c3aed,#a855f7)", border: "none", cursor: "pointer" }}>
            🏠 Dashboard
          </button>
        </div>
      </div>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  )
}
