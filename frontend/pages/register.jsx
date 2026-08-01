import { useState, useRef, useEffect, useCallback } from "react";
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

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  const [form, setForm] = useState({
    category: "", name: "", email: "", password: "", whatsapp: "",
    parent_whatsapp: "", language: "hindi", board: "", exam: "",
    branch: "", college: "", class: "", role: "student",
  });

  useEffect(() => {
    setMounted(true);
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 5, duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);

    const interval = setInterval(() => {
      const newShooting = {
        id: Date.now(), startX: Math.random() * 100,
        startY: Math.random() * 30, angle: Math.random() * 45 + 30,
      };
      setShootingStars(prev => [...prev.slice(-2), newShooting]);
      setTimeout(() => setShootingStars(prev => prev.filter(s => s.id !== newShooting.id)), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (y - 0.5) * -12, ry: (x - 0.5) * 12 });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const resetTilt = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setGlowPos({ x: 50, y: 50 });
  }, []);

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
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-3deg); }
        }
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
          100% { transform: translateX(300px) translateY(300px) rotate(-45deg); opacity: 0; }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 5px #00d4ff, 0 0 10px #00d4ff; }
          50% { box-shadow: 0 0 15px #00d4ff, 0 0 30px #00d4ff, 0 0 45px rgba(0,212,255,0.3); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .star { animation: twinkle var(--duration) ease-in-out infinite; animation-delay: var(--delay); }
        .float-anim { animation: float 6s ease-in-out infinite; }
        .rise-anim { animation: rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .neon-border:focus-within { animation: neonPulse 2s ease-in-out infinite; }
      `}</style>

      <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-8"
        style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0f2440 30%, #1a3a5c 60%, #0d2137 100%)' }}>

        {/* Background layers - same as before */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'float 10s ease-in-out infinite' }} />
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(123,104,238,0.4) 0%, transparent 70%)', filter: 'blur(100px)', animation: 'floatReverse 12s ease-in-out infinite' }} />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'pulseGlow 5s ease-in-out infinite' }} />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <div key={star.id} className="star absolute rounded-full bg-white"
              style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, opacity: star.opacity, '--duration': `${star.duration}s`, '--delay': `${star.delay}s` }} />
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {shootingStars.map((star) => (
            <div key={star.id} className="absolute" style={{ left: `${star.startX}%`, top: `${star.startY}%`, animation: 'shootingStar 2s ease-out forwards' }}>
              <div className="w-24 h-[2px] bg-gradient-to-r from-white to-transparent" style={{ transform: 'rotate(-45deg)' }} />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
          <div className="absolute top-[15%] left-[8%] w-14 h-14 rounded-full float-anim"
            style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.4), rgba(123,104,238,0.2))', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,212,255,0.3)', boxShadow: '0 0 30px rgba(0,212,255,0.3)', animation: 'orbit 25s linear infinite, float 5s ease-in-out infinite' }} />
          <div className="absolute top-[65%] right-[10%] w-10 h-10 rounded-full"
            style={{ background: 'linear-gradient(135deg, rgba(123,104,238,0.5), rgba(0,212,255,0.2))', backdropFilter: 'blur(10px)', border: '1px solid rgba(123,104,238,0.3)', boxShadow: '0 0 25px rgba(123,104,238,0.3)', animation: 'orbit 20s linear infinite reverse, floatReverse 6s ease-in-out infinite' }} />
          <div className="absolute bottom-[20%] left-[15%] w-16 h-16 rounded-full"
            style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(255,255,255,0.1))', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 0 35px rgba(0,212,255,0.2)', animation: 'float 8s ease-in-out infinite 1s' }} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none opacity-30"
          style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.9) 0%, transparent 100%)' }}>
          <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0a1628" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[[50,80,40,120],[100,60,30,140],[140,90,50,110],[200,50,35,150],[250,70,45,130],[310,40,25,160],[350,85,40,115],[410,55,30,145],[460,75,50,125],[520,45,35,155],[570,65,40,135],[630,85,30,115],[680,50,45,150],[740,70,35,130],[790,55,40,145],[850,80,30,120],[900,60,50,140],[960,45,25,155],[1000,75,40,125],[1060,65,35,135],[1110,85,45,115]].map(([x,y,w,h],i) => (
              <rect key={i} x={x} y={y} width={w} height={h} fill="url(#cityGrad)" />
            ))}
            {[50,100,140,200,250,310,350,410,460,520,570,630,680,740,790,850,900,960,1000,1060,1110].map((x, i) => (
              <g key={`w${i}`}>
                <rect x={x+5} y={90+(i%3)*20} width="4" height="6" fill="rgba(255,255,200,0.6)" />
                <rect x={x+20} y={100+(i%2)*25} width="4" height="6" fill="rgba(255,255,200,0.4)" />
              </g>
            ))}
          </svg>
        </div>

        {/* ── MAIN CARD ── */}
        <div className="relative z-10 w-full max-w-lg"
          style={{ perspective: '1200px', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>

          <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={resetTilt}
            style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`, transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
            className="relative">

            <div className="absolute -inset-[2px] rounded-3xl opacity-70"
              style={{ background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, #00d4ff, #7b68ee, transparent 60%)`, filter: 'blur(15px)' }} />

            <div className="absolute -inset-[1px] rounded-3xl overflow-hidden" style={{ transform: 'translateZ(-10px)' }}>
              <div className="absolute inset-[-100%]"
                style={{ background: 'conic-gradient(from 0deg, transparent, #00d4ff, #7b68ee, #00d4ff, transparent)', animation: 'borderRotate 4s linear infinite' }} />
            </div>

            {/* ── DARKER GLASS CARD ── */}
            <div className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(5,10,25,0.85) 0%, rgba(10,18,40,0.9) 50%, rgba(5,12,30,0.85) 100%)',
                backdropFilter: 'blur(25px)',
                border: '1px solid rgba(0,212,255,0.15)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.05), 0 0 80px rgba(0,212,255,0.06)',
              }}>

              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(0,212,255,0.08), transparent 50%)` }} />

              {/* ── LOGO ── */}
              <div className="text-center mb-6" style={{ transform: 'translateZ(40px)' }}>
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 rounded-2xl blur-xl"
                    style={{ background: 'linear-gradient(135deg, #00d4ff, #7b68ee)', opacity: 0.5, animation: 'pulseGlow 3s ease-in-out infinite' }} />
                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.8), rgba(123,104,238,0.8))', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 0 40px rgba(0,212,255,0.3)', transform: 'rotateX(10deg)' }}>
                    <span className="text-2xl font-black text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)', transform: 'translateZ(15px)' }}>R</span>
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-white" style={{ animation: 'orbit 3s linear infinite', boxShadow: '0 0 10px white' }} />
                  </div>
                </div>
                <h1 className="text-3xl font-black tracking-tight"
                  style={{ background: 'linear-gradient(90deg, #00d4ff, #7b68ee, #00d4ff)', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'aurora 4s linear infinite', filter: 'drop-shadow(0 0 10px rgba(0,212,255,0.3))' }}>
                  RAXX AI
                </h1>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <p className="text-xs font-medium text-white/60 tracking-wide">India's Universal Study Platform</p>
                </div>
              </div>

              {/* ── PROGRESS BAR ── */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span className={step >= 1 ? "text-[#00d4ff] font-bold" : ""}>Step 1</span>
                  <span className={step >= 2 ? "text-[#00d4ff] font-bold" : ""}>Step 2</span>
                  <span className={step >= 3 ? "text-[#00d4ff] font-bold" : ""}>Step 3</span>
                </div>
                <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #00d4ff, #7b68ee, #00d4ff)', backgroundSize: '200% auto', animation: 'shimmer 2s linear infinite', boxShadow: '0 0 10px rgba(0,212,255,0.5)' }} />
                </div>
              </div>

              {/* ── ERROR ── */}
              {error && (
                <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-900/30 px-4 py-3 text-sm text-red-300 rise-anim" style={{ transform: 'translateZ(20px)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span>{error}</span>
                </div>
              )}

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <div className="rise-anim">
                  <h2 className="text-xl font-bold text-white mb-5 text-center" style={{ transform: 'translateZ(25px)' }}>Who are you? 👋</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat, i) => (
                      <button key={cat.id} onClick={() => selectCategory(cat)}
                        className="group relative rounded-xl p-4 text-left transition-all duration-300 hover:-translate-y-1"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0,10,30,0.6) 0%, rgba(0,15,40,0.7) 100%)',
                          border: '1px solid rgba(0,212,255,0.1)',
                          backdropFilter: 'blur(10px)',
                          transform: 'translateZ(15px)',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'; e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,30,60,0.7) 0%, rgba(0,20,50,0.8) 100%)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.15)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)'; e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,10,30,0.6) 0%, rgba(0,15,40,0.7) 100%)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
                        <div className="text-white font-semibold text-sm">{cat.title}</div>
                        <div className="text-white/40 text-xs mt-1">{cat.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <div className="rise-anim">
                  <h2 className="text-xl font-bold text-white mb-5 text-center" style={{ transform: 'translateZ(25px)' }}>Basic Information 📝</h2>

                  {[
                    { label: 'Full Name *', name: 'name', type: 'text', placeholder: 'Enter your full name' },
                    { label: 'Email *', name: 'email', type: 'email', placeholder: 'Enter your email' },
                    { label: 'Password * (min 6 chars)', name: 'password', type: 'password', placeholder: 'Create a strong password' },
                    { label: 'WhatsApp Number *', name: 'whatsapp', type: 'text', placeholder: '10 digit WhatsApp number' },
                  ].map((field) => (
                    <div key={field.name} className="mb-4" style={{ transform: 'translateZ(20px)' }}>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">{field.label}</label>
                      <div className="group relative neon-border rounded-xl transition-all duration-300">
                        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#00d4ff] via-[#7b68ee] to-[#00d4ff] opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                        <input type={field.type} name={field.name} placeholder={field.placeholder} value={form[field.name]} onChange={handleChange}
                          className="relative w-full text-white px-4 py-3 rounded-xl border focus:outline-none focus:border-transparent text-sm transition-all"
                          style={{ 
                            background: 'rgba(0,5,15,0.6)', 
                            backdropFilter: 'blur(10px)',
                            borderColor: 'rgba(0,212,255,0.15)',
                          }}
                          onFocus={(e) => { e.target.style.background = 'rgba(0,10,25,0.8)'; e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                          onBlur={(e) => { e.target.style.background = 'rgba(0,5,15,0.6)'; e.target.style.borderColor = 'rgba(0,212,255,0.15)'; }}
                        />
                      </div>
                    </div>
                  ))}

                  {form.role === 'student' && (
                    <div className="mb-4" style={{ transform: 'translateZ(20px)' }}>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">Parent's WhatsApp (Optional)</label>
                      <div className="group relative neon-border rounded-xl">
                        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#00d4ff] via-[#7b68ee] to-[#00d4ff] opacity-0 group-focus-within:opacity-100 blur transition-opacity" />
                        <input type="text" name="parent_whatsapp" placeholder="Parent ka 10 digit number" value={form.parent_whatsapp} onChange={handleChange}
                          className="relative w-full text-white px-4 py-3 rounded-xl border focus:outline-none text-sm"
                          style={{ background: 'rgba(0,5,15,0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(0,212,255,0.15)' }}
                          onFocus={(e) => { e.target.style.background = 'rgba(0,10,25,0.8)'; e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                          onBlur={(e) => { e.target.style.background = 'rgba(0,5,15,0.6)'; e.target.style.borderColor = 'rgba(0,212,255,0.15)'; }}
                        />
                      </div>
                      <p className="text-xs text-white/30 mt-1">📱 Monthly progress report parents ko WhatsApp pe jayega</p>
                    </div>
                  )}

                  <div className="mb-6" style={{ transform: 'translateZ(20px)' }}>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">Preferred Language</label>
                    <select name="language" value={form.language} onChange={handleChange}
                      className="w-full text-white px-4 py-3 rounded-xl border focus:outline-none text-sm transition-all"
                      style={{ background: 'rgba(0,5,15,0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(0,212,255,0.15)' }}
                      onFocus={(e) => { e.target.style.background = 'rgba(0,10,25,0.8)'; e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                      onBlur={(e) => { e.target.style.background = 'rgba(0,5,15,0.6)'; e.target.style.borderColor = 'rgba(0,212,255,0.15)'; }}>
                      {["Hindi", "English", "Marathi", "Bengali", "Tamil", "Telugu", "Bhojpuri"].map((l) => (
                        <option key={l.toLowerCase()} value={l.toLowerCase()} style={{ background: '#0a1628', color: 'white' }}>{l}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-3" style={{ transform: 'translateZ(25px)' }}>
                    <button onClick={() => setStep(1)} className="w-1/3 py-3 rounded-xl font-bold text-sm text-white/70 transition-all duration-300 hover:text-white hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, rgba(0,10,25,0.6), rgba(0,15,35,0.7))', border: '1px solid rgba(0,212,255,0.15)' }}>
                      ← Back
                    </button>
                    <button onClick={handleNext} className="w-2/3 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group"
                      style={{ background: 'linear-gradient(135deg, #00d4ff, #7b68ee)', boxShadow: '0 0 20px rgba(0,212,255,0.3)' }}>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <span className="relative">Next →</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <div className="rise-anim">
                  <h2 className="text-xl font-bold text-white mb-5 text-center" style={{ transform: 'translateZ(25px)' }}>Almost Done! 🎯</h2>

                  {form.category === "school" && (
                    <>
                      <div className="mb-4" style={{ transform: 'translateZ(20px)' }}>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">Class</label>
                        <select name="class" value={form.class} onChange={handleChange}
                          className="w-full text-white px-4 py-3 rounded-xl border focus:outline-none text-sm"
                          style={{ background: 'rgba(0,5,15,0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(0,212,255,0.15)' }}
                          onFocus={(e) => { e.target.style.background = 'rgba(0,10,25,0.8)'; e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                          onBlur={(e) => { e.target.style.background = 'rgba(0,5,15,0.6)'; e.target.style.borderColor = 'rgba(0,212,255,0.15)'; }}>
                          <option value="" style={{ background: '#0a1628' }}>Select Class</option>
                          {["Class 9", "Class 10", "Class 11", "Class 12"].map((c) => <option key={c} value={c} style={{ background: '#0a1628' }}>{c}</option>)}
                        </select>
                      </div>
                      <div className="mb-4" style={{ transform: 'translateZ(20px)' }}>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">Board</label>
                        <select name="board" value={form.board} onChange={handleChange}
                          className="w-full text-white px-4 py-3 rounded-xl border focus:outline-none text-sm"
                          style={{ background: 'rgba(0,5,15,0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(0,212,255,0.15)' }}
                          onFocus={(e) => { e.target.style.background = 'rgba(0,10,25,0.8)'; e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                          onBlur={(e) => { e.target.style.background = 'rgba(0,5,15,0.6)'; e.target.style.borderColor = 'rgba(0,212,255,0.15)'; }}>
                          <option value="" style={{ background: '#0a1628' }}>Select Board</option>
                          {boardOptions.map((b) => <option key={b} value={b} style={{ background: '#0a1628' }}>{b}</option>)}
                        </select>
                      </div>
                    </>
                  )}

                  {form.category === "engineering" && (
                    <>
                      <div className="mb-4" style={{ transform: 'translateZ(20px)' }}>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">Branch</label>
                        <select name="branch" value={form.branch} onChange={handleChange}
                          className="w-full text-white px-4 py-3 rounded-xl border focus:outline-none text-sm"
                          style={{ background: 'rgba(0,5,15,0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(0,212,255,0.15)' }}
                          onFocus={(e) => { e.target.style.background = 'rgba(0,10,25,0.8)'; e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                          onBlur={(e) => { e.target.style.background = 'rgba(0,5,15,0.6)'; e.target.style.borderColor = 'rgba(0,212,255,0.15)'; }}>
                          <option value="" style={{ background: '#0a1628' }}>Select Branch</option>
                          {branchOptions.map((b) => <option key={b} value={b} style={{ background: '#0a1628' }}>{b}</option>)}
                        </select>
                      </div>
                      <div className="mb-4" style={{ transform: 'translateZ(20px)' }}>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">College Name</label>
                        <div className="group relative neon-border rounded-xl">
                          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#00d4ff] via-[#7b68ee] to-[#00d4ff] opacity-0 group-focus-within:opacity-100 blur transition-opacity" />
                          <input type="text" name="college" placeholder="Enter your college name" value={form.college} onChange={handleChange}
                            className="relative w-full text-white px-4 py-3 rounded-xl border focus:outline-none text-sm"
                            style={{ background: 'rgba(0,5,15,0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(0,212,255,0.15)' }}
                            onFocus={(e) => { e.target.style.background = 'rgba(0,10,25,0.8)'; e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                            onBlur={(e) => { e.target.style.background = 'rgba(0,5,15,0.6)'; e.target.style.borderColor = 'rgba(0,212,255,0.15)'; }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {form.category !== "teacher" && form.category !== "parent" && (
                    <div className="mb-4" style={{ transform: 'translateZ(20px)' }}>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60">Target Exam / Goal</label>
                      <select name="exam" value={form.exam} onChange={handleChange}
                        className="w-full text-white px-4 py-3 rounded-xl border focus:outline-none text-sm"
                        style={{ background: 'rgba(0,5,15,0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(0,212,255,0.15)' }}
                        onFocus={(e) => { e.target.style.background = 'rgba(0,10,25,0.8)'; e.target.style.borderColor = 'rgba(0,212,255,0.4)'; }}
                        onBlur={(e) => { e.target.style.background = 'rgba(0,5,15,0.6)'; e.target.style.borderColor = 'rgba(0,212,255,0.15)'; }}>
                        <option value="" style={{ background: '#0a1628' }}>Select Target</option>
                        {examOptions[form.category]?.map((e) => <option key={e} value={e} style={{ background: '#0a1628' }}>{e}</option>)}
                      </select>
                    </div>
                  )}

                  {(form.category === "teacher" || form.category === "parent") && (
                    <div className="rounded-xl p-4 mb-4" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(123,104,238,0.08))', border: '1px solid rgba(0,212,255,0.15)', backdropFilter: 'blur(10px)', transform: 'translateZ(20px)' }}>
                      <p className="text-[#00d4ff] text-sm text-center">
                        {form.category === "teacher" ? "👨‍🏫 Teacher Dashboard — upload homework, manage batches, track student progress!" : "👨‍👩‍👧 Parent Dashboard — track your child's study progress and get monthly reports!"}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6" style={{ transform: 'translateZ(25px)' }}>
                    <button onClick={() => setStep(2)} className="w-1/3 py-3 rounded-xl font-bold text-sm text-white/70 transition-all duration-300 hover:text-white hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, rgba(0,10,25,0.6), rgba(0,15,35,0.7))', border: '1px solid rgba(0,212,255,0.15)' }}>
                      ← Back
                    </button>
                    <button onClick={handleRegister} disabled={loading} className="w-2/3 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #00d4ff, #7b68ee)', boxShadow: '0 0 25px rgba(0,212,255,0.4)' }}>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <span className="relative flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
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

              <p className="text-center mt-6 text-sm text-white/40" style={{ transform: 'translateZ(15px)' }}>
                Already have an account?{" "}
                <a href="/login" className="font-bold bg-gradient-to-r from-[#00d4ff] to-[#7b68ee] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── POPUP ── */}
      {showCodePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(5,10,25,0.9)', backdropFilter: 'blur(10px)' }}>
          <div className="relative rounded-2xl p-8 w-full max-w-sm text-center overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(5,10,25,0.9) 0%, rgba(10,18,40,0.95) 100%)',
              backdropFilter: 'blur(25px)',
              border: '1px solid rgba(0,212,255,0.2)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 60px rgba(0,212,255,0.1)',
            }}>
            <div className="absolute -inset-[2px] rounded-2xl opacity-50" style={{ background: 'radial-gradient(circle at 50% 0%, #00d4ff, transparent 60%)', filter: 'blur(15px)' }} />
            <div className="relative">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
              <p className="text-white/50 text-sm mb-6">Ye hai tumhara unique RAXX Student Code — ise parents ko share karo!</p>

              <div className="rounded-xl px-6 py-4 mb-4" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(123,104,238,0.1))', border: '2px solid rgba(0,212,255,0.3)', boxShadow: '0 0 20px rgba(0,212,255,0.1)' }}>
                <p className="text-xs text-white/40 mb-1">Your RAXX Student Code</p>
                <p className="text-2xl font-mono font-bold text-[#00d4ff] tracking-widest" style={{ textShadow: '0 0 20px rgba(0,212,255,0.5)' }}>{studentCode}</p>
              </div>

              <button onClick={copyCode} className="w-full py-3 rounded-xl font-bold text-white mb-3 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7b68ee)', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative">{codeCopied ? "✓ Copied!" : "Copy Code 📋"}</span>
              </button>

              <p className="text-white/30 text-xs mb-4">Parent is code se tumhari progress dekh sakte hain!</p>

              <button onClick={() => router.push("/login")} className="w-full py-3 rounded-xl font-bold text-white/70 transition-all duration-300 hover:text-white hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, rgba(0,10,25,0.6), rgba(0,15,35,0.7))', border: '1px solid rgba(0,212,255,0.15)' }}>
                Continue to Login →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}