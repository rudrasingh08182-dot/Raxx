import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Payment() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [subStatus, setSubStatus] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("raxx_user");
    if (!stored) { router.push("/login"); return; }
    const u = JSON.parse(stored);
    setUser(u);
    checkSubscription(u.id);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const checkSubscription = async (userId) => {
    try {
      const res = await fetch(`http://localhost:8000/payment/status/${userId}`);
      const data = await res.json();
      setSubStatus(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayment = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const orderRes = await fetch("http://localhost:8000/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, email: user.email }),
      });
      const orderData = await orderRes.json();
      if (!orderData.success) { setStatus("failed"); setLoading(false); return; }

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RAXX AI",
        description: "Premium Plan — 1 Month",
        order_id: orderData.order_id,
        handler: async (response) => {
          const verifyRes = await fetch("http://localhost:8000/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: user.id,
              email: user.email,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setStatus("success");
            const updated = { ...user, plan: "premium" };
            localStorage.setItem("raxx_user", JSON.stringify(updated));
          } else {
            setStatus("failed");
          }
          setLoading(false);
        },
        prefill: { email: user?.email, name: user?.name || "Student" },
        theme: { color: "#f59e0b" },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setStatus("failed");
      setLoading(false);
    }
  };

  // ── SUCCESS ──
  if (status === "success") return (
    <div style={{ minHeight: "100vh", background: "#111214", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: "380px", width: "100%" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(245,158,11,0.1)", border: "2px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 24px" }}>🎉</div>
        <h1 style={{ color: "#ffffff", fontSize: "24px", fontWeight: "800", margin: "0 0 8px 0" }}>Premium Activated!</h1>
        <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 32px 0" }}>All features unlocked. Welcome to RAXX AI Premium!</p>
        <div style={{ background: "#1a1b1e", border: "1px solid #2a2b2e", borderRadius: "14px", padding: "20px", marginBottom: "24px", textAlign: "left" }}>
          {["Unlimited AI Doubts", "Smart Notes Generator", "Unlimited Mock Tests", "AI Study Planner", "All 6 Games", "Monthly Reports"].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: "1px solid #2a2b2e" }}>
              <span style={{ color: "#f59e0b", fontSize: "14px" }}>✓</span>
              <span style={{ color: "#d1d5db", fontSize: "13px" }}>{f}</span>
            </div>
          ))}
        </div>
        <button onClick={() => router.push("/dashboard/student")} style={{ width: "100%", padding: "14px", borderRadius: "11px", fontWeight: "800", fontSize: "15px", color: "#000", background: "linear-gradient(135deg,#f59e0b,#fb923c)", border: "none", cursor: "pointer" }}>
          Go to Dashboard →
        </button>
      </div>
    </div>
  );

  // ── FAILED ──
  if (status === "failed") return (
    <div style={{ minHeight: "100vh", background: "#111214", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: "340px", width: "100%" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(239,68,68,0.1)", border: "2px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 24px" }}>❌</div>
        <h1 style={{ color: "#ffffff", fontSize: "24px", fontWeight: "800", margin: "0 0 8px 0" }}>Payment Failed</h1>
        <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 32px 0" }}>Something went wrong. Please try again.</p>
        <button onClick={() => setStatus("idle")} style={{ width: "100%", padding: "14px", borderRadius: "11px", fontWeight: "800", fontSize: "15px", color: "#000", background: "linear-gradient(135deg,#f59e0b,#fb923c)", border: "none", cursor: "pointer", marginBottom: "10px" }}>
          Try Again
        </button>
        <button onClick={() => router.push("/dashboard/student")} style={{ width: "100%", padding: "12px", borderRadius: "11px", fontWeight: "700", fontSize: "14px", color: "#6b7280", background: "transparent", border: "1px solid #2a2b2e", cursor: "pointer" }}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  // ── MAIN PAYMENT PAGE ──
  return (
    <div style={{ minHeight: "100vh", background: "#111214", fontFamily: "system-ui,sans-serif", color: "#fff" }}>

      {/* TOPBAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", background: "#16171a", borderBottom: "1px solid #2a2b2e" }}>
        <button onClick={() => router.push("/dashboard/student")} style={{ background: "none", border: "none", color: "#6b7280", fontSize: "13px", cursor: "pointer" }}>← Dashboard</button>
        <span style={{ fontWeight: "800", fontSize: "15px", color: "#f59e0b" }}>RAXX AI</span>
        <span style={{ fontSize: "12px", color: "#6b7280" }}>Secure Payment</span>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>

        {/* LEFT — PLAN DETAILS */}
        <div style={{ flex: "1", minWidth: "280px", maxWidth: "420px" }}>

          {/* Already subscribed banner */}
          {subStatus?.active && (
            <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "12px", padding: "14px 18px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "18px" }}>⭐</span>
              <div>
                <p style={{ color: "#f59e0b", fontSize: "13px", fontWeight: "700", margin: "0 0 2px 0" }}>Already Premium!</p>
                <p style={{ color: "#6b7280", fontSize: "11px", margin: 0 }}>
                  Expires: {new Date(subStatus.expires_at).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>
          )}

          {/* Plan Card */}
          <div style={{ background: "#16171a", border: "1px solid #2a2b2e", borderRadius: "18px", padding: "28px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div>
                <p style={{ color: "#6b7280", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 4px 0" }}>Premium Plan</p>
                <h2 style={{ color: "#ffffff", fontSize: "32px", fontWeight: "900", margin: 0 }}>
                  ₹129
                  <span style={{ color: "#6b7280", fontSize: "14px", fontWeight: "400" }}>/month</span>
                </h2>
              </div>
              <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>⭐</div>
            </div>

            <div style={{ height: "1px", background: "#2a2b2e", marginBottom: "20px" }} />

            {/* Features */}
            {[
              { icon: "🤖", label: "Unlimited AI Doubts",     desc: "Ask anything, anytime" },
              { icon: "📝", label: "Smart Notes Generator",   desc: "4 types of AI notes" },
              { icon: "📊", label: "Unlimited Mock Tests",    desc: "All subjects + AI evaluation" },
              { icon: "📅", label: "AI Study Planner",        desc: "Personalized schedule" },
              { icon: "🎮", label: "All 6 Games",             desc: "Chess, Sudoku, Speed Math & more" },
              { icon: "💻", label: "Coding Lab",              desc: "AI tutor + code runner" },
              { icon: "📄", label: "Monthly PDF Reports",     desc: "Detailed progress analysis" },
              { icon: "🏆", label: "Leaderboards & Badges",   desc: "Compete with students" },
            ].map((f) => (
              <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #1e1f22" }}>
                <span style={{ fontSize: "18px", width: "28px", textAlign: "center" }}>{f.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#e5e7eb", fontSize: "13px", fontWeight: "600", margin: "0 0 1px 0" }}>{f.label}</p>
                  <p style={{ color: "#6b7280", fontSize: "11px", margin: 0 }}>{f.desc}</p>
                </div>
                <span style={{ color: "#f59e0b", fontSize: "12px", fontWeight: "700" }}>✓</span>
              </div>
            ))}
          </div>

          {/* Compare */}
          <div style={{ background: "#16171a", border: "1px solid #2a2b2e", borderRadius: "14px", padding: "18px" }}>
            <p style={{ color: "#6b7280", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 14px 0" }}>Free vs Premium</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", textAlign: "center" }}>
              <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: "700", paddingBottom: "8px", borderBottom: "1px solid #2a2b2e" }}>Feature</div>
              <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: "700", paddingBottom: "8px", borderBottom: "1px solid #2a2b2e" }}>Free</div>
              <div style={{ color: "#f59e0b", fontSize: "11px", fontWeight: "700", paddingBottom: "8px", borderBottom: "1px solid #2a2b2e" }}>Premium</div>
              {[
                ["AI Doubts",   "5/day",    "Unlimited"],
                ["Mock Tests",  "3/day",    "Unlimited"],
                ["Notes",       "Basic",    "All Types"],
                ["Games",       "2 only",   "All 6"],
                ["Reports",     "❌",        "✓"],
                ["Study Plan",  "❌",        "✓"],
              ].map(([feat, free, pro]) => (
                <>
                  <div key={feat} style={{ color: "#9ca3af", fontSize: "11px", padding: "6px 0", borderBottom: "1px solid #1e1f22" }}>{feat}</div>
                  <div key={free} style={{ color: "#6b7280", fontSize: "11px", padding: "6px 0", borderBottom: "1px solid #1e1f22" }}>{free}</div>
                  <div key={pro} style={{ color: "#f59e0b", fontSize: "11px", fontWeight: "700", padding: "6px 0", borderBottom: "1px solid #1e1f22" }}>{pro}</div>
                </>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — CHECKOUT */}
        <div style={{ flex: "1", minWidth: "280px", maxWidth: "380px" }}>
          <div style={{ background: "#16171a", border: "1px solid #2a2b2e", borderRadius: "18px", padding: "28px", position: "sticky", top: "20px" }}>

            <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: "800", margin: "0 0 6px 0" }}>Order Summary</h3>
            <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 24px 0" }}>One-time monthly subscription</p>

            {/* Order Details */}
            <div style={{ background: "#111214", border: "1px solid #2a2b2e", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#9ca3af", fontSize: "13px" }}>RAXX AI Premium</span>
                <span style={{ color: "#fff", fontSize: "13px", fontWeight: "600" }}>₹129</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#9ca3af", fontSize: "13px" }}>Duration</span>
                <span style={{ color: "#fff", fontSize: "13px", fontWeight: "600" }}>30 Days</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#9ca3af", fontSize: "13px" }}>GST</span>
                <span style={{ color: "#6b7280", fontSize: "13px" }}>Included</span>
              </div>
              <div style={{ height: "1px", background: "#2a2b2e", margin: "12px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#fff", fontSize: "14px", fontWeight: "700" }}>Total</span>
                <span style={{ color: "#f59e0b", fontSize: "18px", fontWeight: "900" }}>₹129</span>
              </div>
            </div>

            {/* User info */}
            {user && (
              <div style={{ background: "#111214", border: "1px solid #2a2b2e", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>👤</div>
                <div>
                  <p style={{ color: "#e5e7eb", fontSize: "13px", fontWeight: "600", margin: "0 0 1px 0" }}>{user.name || "Student"}</p>
                  <p style={{ color: "#6b7280", fontSize: "11px", margin: 0 }}>{user.email}</p>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              style={{
                width: "100%", padding: "16px", borderRadius: "12px", fontWeight: "800",
                fontSize: "16px", color: "#000",
                background: loading ? "#4b5563" : "linear-gradient(135deg,#f59e0b,#fb923c)",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 4px 20px rgba(245,158,11,0.35)",
                marginBottom: "14px", transition: "all 0.2s",
              }}>
              {loading ? "Processing..." : "⚡ Pay ₹129 — Activate Premium"}
            </button>

            {/* Payment methods */}
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <p style={{ color: "#6b7280", fontSize: "11px", margin: "0 0 10px 0" }}>Accepted payment methods</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
                {["GPay", "PhonePe", "Paytm", "UPI", "Card", "NetBanking"].map((m) => (
                  <span key={m} style={{ fontSize: "10px", padding: "3px 8px", borderRadius: "5px", background: "#1e1f22", color: "#9ca3af", border: "1px solid #2a2b2e" }}>{m}</span>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { icon: "🔒", text: "100% Secure — Powered by Razorpay" },
                { icon: "↩️", text: "Cancel anytime — no auto renewal" },
                { icon: "⚡", text: "Instant activation after payment" },
              ].map((t) => (
                <div key={t.text} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "13px" }}>{t.icon}</span>
                  <span style={{ color: "#6b7280", fontSize: "11px" }}>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}