import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";

const generateQuestion = (difficulty) => {
  const ops = difficulty === "easy" ? ["+", "-"] : difficulty === "medium" ? ["+", "-", "×"] : ["+", "-", "×", "÷"];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let a, b, answer;

  if (op === "+") {
    a = Math.floor(Math.random() * (difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 99)) + 1;
    b = Math.floor(Math.random() * (difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 99)) + 1;
    answer = a + b;
  } else if (op === "-") {
    a = Math.floor(Math.random() * (difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 99)) + 10;
    b = Math.floor(Math.random() * a) + 1;
    answer = a - b;
  } else if (op === "×") {
    a = Math.floor(Math.random() * (difficulty === "medium" ? 10 : 15)) + 2;
    b = Math.floor(Math.random() * (difficulty === "medium" ? 10 : 15)) + 2;
    answer = a * b;
  } else {
    b = Math.floor(Math.random() * 9) + 2;
    answer = Math.floor(Math.random() * 10) + 1;
    a = b * answer;
  }

  return { a, b, op, answer };
};

export default function SpeedMath() {
  const router = useRouter();
  const [screen, setScreen] = useState("setup");
  const [difficulty, setDifficulty] = useState("easy");
  const [question, setQuestion] = useState(null);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [flash, setFlash] = useState(null); // "correct" | "wrong"
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem(`speedmath_hs_${difficulty}`);
    if (saved) setHighScore(parseInt(saved));
  }, [difficulty]);

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion(difficulty));
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [difficulty]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCorrect(0);
    setWrong(0);
    setTimeLeft(60);
    setGameOver(false);
    setFlash(null);
    setInput("");
    setScreen("game");
    setQuestion(generateQuestion(difficulty));
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Timer
  useEffect(() => {
    if (screen !== "game" || gameOver) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [screen, gameOver]);

  // Save high score on game over
  useEffect(() => {
  if (!gameOver) return;

  // High score update karo
  if (score > highScore) {
    setHighScore(score);
    localStorage.setItem(`speedmath_hs_${difficulty}`, score);
  }

  // Backend pe coins save karo
  const saveScore = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return;
      const user = JSON.parse(userData);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/save-score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user.id,
          game_name: "speedmath",
          score: score,
          time_taken: 60,
          difficulty: difficulty,
        }),
      });
    } catch (err) {
      console.error("Score save error:", err);
    }
  };

  saveScore();
}, [gameOver]);

  const handleSubmit = useCallback(() => {
    if (!question || gameOver) return;
    const userAnswer = parseInt(input);
    if (isNaN(userAnswer)) return;

    if (userAnswer === question.answer) {
      const newStreak = streak + 1;
      const bonus = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      setScore((s) => s + bonus * 10);
      setStreak(newStreak);
      setBestStreak((b) => Math.max(b, newStreak));
      setCorrect((c) => c + 1);
      setFlash("correct");
    } else {
      setStreak(0);
      setWrong((w) => w + 1);
      setFlash("wrong");
    }

    setTimeout(() => setFlash(null), 300);
    nextQuestion();
  }, [question, input, streak, gameOver, nextQuestion]);

  // Enter key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSubmit]);

  const timerColor = timeLeft > 30 ? "#f59e0b" : timeLeft > 10 ? "#fb923c" : "#ef4444";
  const timerPercent = (timeLeft / 60) * 100;

  // ════════════════════════════
  // SETUP SCREEN
  // ════════════════════════════
  if (screen === "setup") return (
    <div style={{ minHeight: "100vh", background: "#0c0800", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "340px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "60px", marginBottom: "10px" }}>⚡</div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px 0" }}>Speed Math</h1>
          <p style={{ color: "#78450a", fontSize: "13px", margin: 0 }}>Answer as fast as you can — 60 seconds!</p>
        </div>

        <div style={{ background: "#120d00", border: "1px solid #2d1f00", borderRadius: "14px", padding: "18px", marginBottom: "14px" }}>
          <p style={{ color: "#78450a", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 10px 0" }}>Difficulty</p>
          {[
            { id: "easy",   label: "Easy",   emoji: "😊", desc: "Addition & subtraction only",       color: "#f59e0b" },
            { id: "medium", label: "Medium", emoji: "🤔", desc: "Includes multiplication",            color: "#fb923c" },
            { id: "hard",   label: "Hard",   emoji: "😤", desc: "All operations, bigger numbers",    color: "#ef4444" },
          ].map((d) => (
            <button key={d.id} onClick={() => setDifficulty(d.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "10px",
              padding: "11px 14px", borderRadius: "10px", marginBottom: "7px", cursor: "pointer",
              background: difficulty === d.id ? "rgba(245,158,11,0.12)" : "#0a0600",
              border: difficulty === d.id ? `1.5px solid ${d.color}` : "1.5px solid #2d1f00",
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: "20px" }}>{d.emoji}</span>
              <div style={{ textAlign: "left", flex: 1 }}>
                <p style={{ color: "#fff", fontSize: "13px", fontWeight: "700", margin: "0 0 1px 0" }}>{d.label}</p>
                <p style={{ color: "#78450a", fontSize: "11px", margin: 0 }}>{d.desc}</p>
              </div>
              {difficulty === d.id && <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "5px", background: `${d.color}22`, color: d.color }}>✓</span>}
            </button>
          ))}
        </div>

        {highScore > 0 && (
          <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "10px", padding: "10px 16px", marginBottom: "14px", textAlign: "center" }}>
            <p style={{ color: "#78450a", fontSize: "11px", margin: "0 0 2px 0" }}>YOUR BEST</p>
            <p style={{ color: "#f59e0b", fontSize: "20px", fontWeight: "800", margin: 0 }}>{highScore} pts</p>
          </div>
        )}

        <button onClick={startGame} style={{
          width: "100%", padding: "14px", borderRadius: "11px", fontWeight: "800",
          fontSize: "15px", color: "#000", background: "linear-gradient(135deg,#f59e0b,#fb923c)",
          border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(245,158,11,0.4)",
        }}>⚡ Start Game</button>

        <button onClick={() => router.push("/games")} style={{
          display: "block", width: "100%", marginTop: "10px", padding: "10px",
          background: "transparent", border: "none", color: "#78450a", fontSize: "13px", cursor: "pointer",
        }}>← Back to Games</button>
      </div>
    </div>
  );

  // ════════════════════════════
  // GAME OVER SCREEN
  // ════════════════════════════
  if (gameOver) return (
    <div style={{ minHeight: "100vh", background: "#0c0800", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "340px", textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "12px" }}>{score >= highScore && score > 0 ? "🏆" : "⚡"}</div>
        <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: "800", margin: "0 0 4px 0" }}>
          {score >= highScore && score > 0 ? "New High Score!" : "Time's Up!"}
        </h2>
        <p style={{ color: "#78450a", fontSize: "13px", margin: "0 0 24px 0" }}>Here's how you did</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
          {[
            { label: "Score",       value: score,      color: "#f59e0b" },
            { label: "Best Score",  value: highScore,  color: "#fb923c" },
            { label: "Correct",     value: correct,    color: "#4ade80" },
            { label: "Wrong",       value: wrong,      color: "#f87171" },
            { label: "Best Streak", value: bestStreak, color: "#a78bfa" },
            { label: "Accuracy",    value: correct + wrong > 0 ? `${Math.round((correct / (correct + wrong)) * 100)}%` : "0%", color: "#60a5fa" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#120d00", border: "1px solid #2d1f00", borderRadius: "10px", padding: "12px" }}>
              <p style={{ color: "#78450a", fontSize: "10px", margin: "0 0 3px 0", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: "20px", fontWeight: "800", margin: 0, fontFamily: "monospace" }}>{s.value}</p>
            </div>
          ))}
        </div>

        <button onClick={startGame} style={{
          width: "100%", padding: "14px", borderRadius: "11px", fontWeight: "800",
          fontSize: "15px", color: "#000", background: "linear-gradient(135deg,#f59e0b,#fb923c)",
          border: "none", cursor: "pointer", marginBottom: "10px",
        }}>⚡ Play Again</button>

        <button onClick={() => setScreen("setup")} style={{
          width: "100%", padding: "12px", borderRadius: "11px", fontWeight: "700",
          fontSize: "14px", color: "#78450a", background: "transparent",
          border: "1px solid #2d1f00", cursor: "pointer",
        }}>⚙️ Change Difficulty</button>
      </div>
    </div>
  );

  // ════════════════════════════
  // GAME SCREEN
  // ════════════════════════════
  return (
    <div style={{
      minHeight: "100vh",
      background: flash === "correct" ? "#0c1f00" : flash === "wrong" ? "#1f0000" : "#0c0800",
      color: "#fff", fontFamily: "system-ui,sans-serif",
      transition: "background 0.15s",
    }}>

      {/* TOPBAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", background: "#120d00", borderBottom: "1px solid #2d1f00" }}>
        <button onClick={() => router.push("/games")} style={{ background: "none", border: "none", color: "#78450a", fontSize: "13px", cursor: "pointer" }}>← Games</button>
        <span style={{ fontWeight: "700", fontSize: "14px" }}>⚡ Speed Math</span>
        <span style={{ fontSize: "11px", padding: "2px 7px", borderRadius: "5px", background: "#1a0f00", color: "#f59e0b", textTransform: "capitalize" }}>{difficulty}</span>
      </div>

      {/* TIMER BAR */}
      <div style={{ height: "4px", background: "#1a0f00" }}>
        <div style={{ height: "100%", width: `${timerPercent}%`, background: timerColor, transition: "width 1s linear, background 0.5s" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px", gap: "20px" }}>

        {/* STATS ROW */}
        <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "380px" }}>
          {[
            { label: "Score",  value: score,                   color: "#f59e0b" },
            { label: "Time",   value: `${timeLeft}s`,          color: timerColor },
            { label: "Streak", value: `🔥 ${streak}`,          color: streak >= 3 ? "#fb923c" : "#555" },
            { label: "Best",   value: highScore,               color: "#a78bfa" },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, background: "#120d00", border: "1px solid #2d1f00", borderRadius: "8px", padding: "8px 6px", textAlign: "center" }}>
              <p style={{ color: "#78450a", fontSize: "9px", margin: "0 0 2px 0", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: "13px", fontWeight: "800", margin: 0, fontFamily: "monospace" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* STREAK BONUS */}
        {streak >= 3 && (
          <div style={{ background: "rgba(251,146,60,0.15)", border: "1px solid rgba(251,146,60,0.3)", borderRadius: "8px", padding: "6px 16px" }}>
            <p style={{ color: "#fb923c", fontSize: "12px", fontWeight: "700", margin: 0 }}>
              🔥 {streak >= 5 ? "3x" : "2x"} Bonus Active!
            </p>
          </div>
        )}

        {/* QUESTION CARD */}
        {question && (
          <div style={{
            background: "#120d00",
            border: `2px solid ${flash === "correct" ? "#4ade80" : flash === "wrong" ? "#f87171" : "#2d1f00"}`,
            borderRadius: "20px",
            padding: "40px 32px",
            textAlign: "center",
            width: "100%",
            maxWidth: "380px",
            transition: "border-color 0.15s",
          }}>
            <p style={{ color: "#78450a", fontSize: "12px", margin: "0 0 12px 0", textTransform: "uppercase", letterSpacing: "2px" }}>What is</p>
            <p style={{ color: "#fff", fontSize: "clamp(32px,8vw,52px)", fontWeight: "900", margin: "0 0 8px 0", fontFamily: "monospace", letterSpacing: "-1px" }}>
              {question.a} {question.op} {question.b}
            </p>
            <p style={{ color: "#f59e0b", fontSize: "18px", fontWeight: "700", margin: 0 }}>= ?</p>
          </div>
        )}

        {/* INPUT */}
        <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "380px" }}>
          <input
            ref={inputRef}
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your answer..."
            style={{
              flex: 1, padding: "14px 18px", borderRadius: "12px", fontSize: "20px",
              fontWeight: "700", fontFamily: "monospace", textAlign: "center",
              background: "#120d00", border: "2px solid #2d1f00", color: "#f59e0b",
              outline: "none",
            }}
          />
          <button onClick={handleSubmit} style={{
            padding: "14px 20px", borderRadius: "12px", fontSize: "20px",
            background: "linear-gradient(135deg,#f59e0b,#fb923c)",
            border: "none", cursor: "pointer", fontWeight: "800", color: "#000",
          }}>→</button>
        </div>

        <p style={{ color: "#2d1f00", fontSize: "12px", margin: 0 }}>Press Enter or tap → to submit</p>
      </div>
    </div>
  );
}