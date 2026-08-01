import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const categories = [
  { id: "school", icon: "🎓", title: "School Student", desc: "Class 9-12, Board Exams" },
  { id: "engineering", icon: "⚙️", title: "Engineering Student", desc: "B.Tech / B.E. / Diploma" },
  { id: "medical", icon: "🏥", title: "Medical Student", desc: "NEET UG / PG / FMGE" },
  { id: "banking", icon: "🏦", title: "Banking & Finance", desc: "IBPS / SBI / CA / RBI" },
  { id: "govt", icon: "📋", title: "Govt Exam Prep", desc: "UPSC / SSC / Railway / Police" },
  { id: "teacher", icon: "👨‍🏫", title: "Teacher / Coaching", desc: "Manage students & homework" },
  { id: "parent", icon: "👨‍👩‍👧", title: "Parent", desc: "Track your child's progress" },
];

const examOptions = {
  school: ["JEE Mains / Advanced", "NEET UG", "UPSC CSE", "SSC CGL", "Board Exam Only", "NDA / CDS"],
  engineering: ["Campus Placements", "GATE", "BITSAT", "MHT-CET", "WBJEE", "ISRO / DRDO", "PSU (BHEL/ONGC/NTPC)", "Higher Studies (MS/MBA)"],
  medical: ["NEET UG", "NEET PG", "FMGE / MCI", "AIIMS PG", "DNB CET", "Nursing Entrance"],
  banking: ["IBPS PO / Clerk", "SBI PO / Clerk", "RBI Grade B", "LIC AAO", "CA Foundation", "CA Inter / Final", "CMA / CS"],
  govt: ["UPSC CSE (IAS/IPS)", "SSC CGL / CHSL", "Railway RRB", "UP Police", "State PCS", "Army / Navy / Air Force", "NDA / CDS"],
  teacher: [],
  parent: [],
};

const boardOptions = ["CBSE", "ICSE / ISC", "UP Board", "MP Board", "Bihar Board", "Rajasthan Board", "Maharashtra Board", "Other State Board"];
const branchOptions = ["Computer Science (CSE)", "Information Technology (IT)", "Electronics (ECE)", "Electrical (EEE)", "Mechanical (ME)", "Civil (CE)", "Chemical (ChE)", "Other"];

const fieldStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(0,255,136,0.12)",
};

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    category: "", name: "", email: "", password: "", whatsapp: "",
    parent_whatsapp: "", language: "hindi", board: "", exam: "",
    branch: "", college: "", class: "", role: "student",
  });

  useEffect(() => setMounted(true), []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const selectCategory = (cat) => {
    setForm({
      ...form, category: cat.id,
      role: cat.id === "teacher" ? "teacher" : cat.id === "parent" ? "parent" : "student",
    });
    setStep(2);
  };

  const handleNext = () => {
    if (step === 2) {
      if (!form.name || !form.email || !form.password || !form.whatsapp) {
        setError("Please fill all required fields!"); return;
      }
      if (form.password.length < 6) { setError("Password must be at least 6 characters!"); return; }
      if (form.whatsapp.length < 10) { setError("Enter a valid WhatsApp number!"); return; }
      setError(""); setStep(3);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(studentCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleRegister = async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, password: form.password,
          whatsapp: form.whatsapp, parent_whatsapp: form.parent_whatsapp,
          role: form.role, board: form.board || form.branch || "",
          exam: form.exam, language: form.language,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.student_code) { setStudentCode(data.student_code); setShowCodePopup(true); }
        else { router.push("/login"); }
      } else { setError(data.detail || "Registration failed. Try again."); }
    } catch (err) { setError("Server error. Make sure backend is running."); }
    setLoading(false);
  };

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, -25px) scale(1.05); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.6; }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerBar {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .rise { animation: rise 0.6s cubic-bezier(0.2,0.8,0.2,1) forwards; }
        input::placeholder { color: rgba(255,255,255,0.28); }
        select option { background: #0d0d0d; color: white; }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden" style={{ background: "#090909" }}>
        {/* AMBIENT BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-24 w-[440px] h-[440px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,255,136,0.16) 0%, transparent 70%)", filter: "blur(90px)", animation: "floatSlow 12s ease-in-out infinite, pulseGlow 6s ease-in-out infinite" }} />
          <div className="absolute -bottom-32 -right-28 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(41,241,156,0.14) 0%, transparent 70%)", filter: "blur(100px)", animation: "floatSlow 15s ease-in-out infinite 2s, pulseGlow 8s ease-in-out infinite 1s" }} />
        </div>

        {/* MAIN CARD */}
        <div className="relative z-10 w-full max-w-lg"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)" }}>

          <div className="relative rounded-[32px] p-8 overflow-hidden"
            style={{
              background: "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(28px) saturate(1.4)",
              border: "1px solid rgba(0,255,136,0.14)",
              boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.06), 0 0 60px rgba(0,255,136,0.05)",
            }}>

            {/* LOGO */}
            <div className="text-center mb-6 rise">
              <div className="relative inline-flex mb-3">
                <div className="absolute inset-0 rounded-3xl blur-xl" style={{ background: "linear-gradient(135deg,#00FF88,#29F19C)", opacity: 0.35, animation: "pulseGlow 3.5s ease-in-out infinite" }} />
                <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#00FF88,#0a3d24)", border: "1px solid rgba(0,255,136,0.35)", boxShadow: "0 8px 30px rgba(0,255,136,0.25)" }}>
                  <span className="text-xl font-black text-black">R</span>
                </div>
              </div>
              <h1 className="text-[24px] font-black tracking-tight text-white">RAXX AI</h1>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
                style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.16)" }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "#00FF88" }} />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#00FF88" }} />
                </span>
                <p className="text-[11px] font-medium tracking-wide text-white/50">India's Universal Study Platform</p>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="mb-6">
              <div className="flex justify-between text-[11px] text-white/30 mb-2">
                <span className={step >= 1 ? "font-bold" : ""} style={step >= 1 ? { color: "#00FF88" } : {}}>Step 1</span>
                <span className={step >= 2 ? "font-bold" : ""} style={step >= 2 ? { color: "#00FF88" } : {}}>Step 2</span>
                <span className={step >= 3 ? "font-bold" : ""} style={step >= 3 ? { color: "#00FF88" } : {}}>Step 3</span>
              </div>
              <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%`, background: "linear-gradient(90deg,#00FF88,#29F19C,#00FF88)", backgroundSize: "200% auto", animation: "shimmerBar 2.5s linear infinite", boxShadow: "0 0 10px rgba(0,255,136,0.5)" }} />
              </div>
            </div>

            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-2xl px-4 py-3 text-[13px] rise"
                style={{ background: "rgba(255,90,90,0.08)", border: "1px solid rgba(255,90,90,0.25)", color: "#ff8a8a" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div className="rise">
                <h2 className="text-lg font-bold text-white mb-5 text-center">Who are you? 👋</h2>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button key={cat.id} onClick={() => selectCategory(cat)}
                      className="group text-left rounded-2xl p-4 transition-all duration-300 active:scale-[0.97]"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,255,136,0.1)" }}
                    >
                      <div className="text-xl mb-2">{cat.icon}</div>
                      <div className="text-white font-semibold text-[13px]">{cat.title}</div>
                      <div className="text-white/35 text-[11px] mt-1">{cat.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="rise">
                <h2 className="text-lg font-bold text-white mb-5 text-center">Basic Information 📝</h2>

                {[
                  { label: "Full Name *", name: "name", type: "text", placeholder: "Enter your full name" },
                  { label: "Email *", name: "email", type: "email", placeholder: "Enter your email" },
                  { label: "Password * (min 6 chars)", name: "password", type: "password", placeholder: "Create a strong password" },
                  { label: "WhatsApp Number *", name: "whatsapp", type: "text", placeholder: "10 digit WhatsApp number" },
                ].map((field) => (
                  <div key={field.name} className="mb-4">
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/35">{field.label}</label>
                    <input type={field.type} name={field.name} placeholder={field.placeholder} value={form[field.name]} onChange={handleChange}
                      className="w-full text-white px-4 py-3.5 rounded-2xl text-sm focus:outline-none"
                      style={fieldStyle}
                    />
                  </div>
                ))}

                {form.role === "student" && (
                  <div className="mb-4">
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/35">Parent's WhatsApp (Optional)</label>
                    <input type="text" name="parent_whatsapp" placeholder="Parent ka 10 digit number" value={form.parent_whatsapp} onChange={handleChange}
                      className="w-full text-white px-4 py-3.5 rounded-2xl text-sm focus:outline-none" style={fieldStyle} />
                    <p className="text-[11px] text-white/25 mt-1.5">📱 Monthly progress report parents ko WhatsApp pe jayega</p>
                  </div>
                )}

                <div className="mb-6">
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/35">Preferred Language</label>
                  <select name="language" value={form.language} onChange={handleChange}
                    className="w-full text-white px-4 py-3.5 rounded-2xl text-sm focus:outline-none" style={fieldStyle}>
                    {["Hindi", "English", "Marathi", "Bengali", "Tamil", "Telugu", "Bhojpuri"].map((l) => (
                      <option key={l.toLowerCase()} value={l.toLowerCase()}>{l}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="w-1/3 py-3.5 rounded-2xl font-bold text-sm text-white/60 active:scale-[0.97] transition-all"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,255,136,0.1)" }}>
                    ← Back
                  </button>
                  <button onClick={handleNext} className="w-2/3 py-3.5 rounded-2xl font-bold text-sm active:scale-[0.97] transition-all"
                    style={{ background: "linear-gradient(135deg,#00FF88,#29F19C)", color: "#04140b", boxShadow: "0 10px 25px rgba(0,255,136,0.25)" }}>
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="rise">
                <h2 className="text-lg font-bold text-white mb-5 text-center">Almost Done! 🎯</h2>

                {form.category === "school" && (
                  <>
                    <div className="mb-4">
                      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/35">Class</label>
                      <select name="class" value={form.class} onChange={handleChange}
                        className="w-full text-white px-4 py-3.5 rounded-2xl text-sm focus:outline-none" style={fieldStyle}>
                        <option value="">Select Class</option>
                        {["Class 9", "Class 10", "Class 11", "Class 12"].map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/35">Board</label>
                      <select name="board" value={form.board} onChange={handleChange}
                        className="w-full text-white px-4 py-3.5 rounded-2xl text-sm focus:outline-none" style={fieldStyle}>
                        <option value="">Select Board</option>
                        {boardOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </>
                )}

                {form.category === "engineering" && (
                  <>
                    <div className="mb-4">
                      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/35">Branch</label>
                      <select name="branch" value={form.branch} onChange={handleChange}
                        className="w-full text-white px-4 py-3.5 rounded-2xl text-sm focus:outline-none" style={fieldStyle}>
                        <option value="">Select Branch</option>
                        {branchOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/35">College Name</label>
                      <input type="text" name="college" placeholder="Enter your college name" value={form.college} onChange={handleChange}
                        className="w-full text-white px-4 py-3.5 rounded-2xl text-sm focus:outline-none" style={fieldStyle} />
                    </div>
                  </>
                )}

                {form.category !== "teacher" && form.category !== "parent" && (
                  <div className="mb-4">
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-white/35">Target Exam / Goal</label>
                    <select name="exam" value={form.exam} onChange={handleChange}
                      className="w-full text-white px-4 py-3.5 rounded-2xl text-sm focus:outline-none" style={fieldStyle}>
                      <option value="">Select Target</option>
                      {examOptions[form.category]?.map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </div>
                )}

                {(form.category === "teacher" || form.category === "parent") && (
                  <div className="rounded-2xl p-4 mb-4" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)" }}>
                    <p className="text-[13px] text-center" style={{ color: "#29F19C" }}>
                      {form.category === "teacher" ? "👨‍🏫 Teacher Dashboard — upload homework, manage batches, track student progress!" : "👨‍👩‍👧 Parent Dashboard — track your child's study progress and get monthly reports!"}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(2)} className="w-1/3 py-3.5 rounded-2xl font-bold text-sm text-white/60 active:scale-[0.97] transition-all"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,255,136,0.1)" }}>
                    ← Back
                  </button>
                  <button onClick={handleRegister} disabled={loading} className="w-2/3 py-3.5 rounded-2xl font-bold text-sm active:scale-[0.97] transition-all disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg,#00FF88,#29F19C)", color: "#04140b", boxShadow: "0 10px 28px rgba(0,255,136,0.3)" }}>
                    <span className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Creating Account...
                        </>
                      ) : (
                        <>Create Account 🚀</>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            )}

            <p className="text-center mt-6 text-[13px] text-white/40">
              Already have an account?{" "}
              <a href="/login" className="font-bold" style={{
                background: "linear-gradient(90deg,#00FF88,#29F19C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showCodePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(5,5,5,0.88)", backdropFilter: "blur(12px)" }}>
          <div className="relative rounded-[28px] p-8 w-full max-w-sm text-center"
            style={{
              background: "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(28px)",
              border: "1px solid rgba(0,255,136,0.18)",
              boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7), 0 0 60px rgba(0,255,136,0.08)",
            }}>
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-white mb-2">Account Created!</h2>
            <p className="text-white/40 text-[13px] mb-6">Ye hai tumhara unique RAXX Student Code — ise parents ko share karo!</p>

            <div className="rounded-2xl px-6 py-4 mb-4" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.25)" }}>
              <p className="text-[11px] text-white/35 mb-1">Your RAXX Student Code</p>
              <p className="text-xl font-mono font-bold tracking-widest" style={{ color: "#00FF88" }}>{studentCode}</p>
            </div>

            <button onClick={copyCode} className="w-full py-3.5 rounded-2xl font-bold mb-3 active:scale-[0.97] transition-all"
              style={{ background: "linear-gradient(135deg,#00FF88,#29F19C)", color: "#04140b" }}>
              {codeCopied ? "✓ Copied!" : "Copy Code 📋"}
            </button>

            <p className="text-white/25 text-[11px] mb-4">Parent is code se tumhari progress dekh sakte hain!</p>

            <button onClick={() => router.push("/login")} className="w-full py-3.5 rounded-2xl font-bold text-white/60 active:scale-[0.97] transition-all"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,255,136,0.1)" }}>
              Continue to Login →
            </button>
          </div>
        </div>
      )}
    </>
  );
}