import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";

const WORD_BANK = {
  science: [
    { word: "PHOTOSYNTHESIS", hint: "Process plants use to make food from sunlight" },
    { word: "EVAPORATION", hint: "Water turning into vapor" },
    { word: "NUCLEUS", hint: "Control center of a cell" },
    { word: "GRAVITY", hint: "Force that pulls objects down" },
    { word: "OXYGEN", hint: "Gas we breathe to survive" },
    { word: "MOLECULE", hint: "Smallest unit of a substance" },
    { word: "ECOSYSTEM", hint: "Community of living organisms" },
    { word: "CHROMOSOME", hint: "Carries genetic information" },
    { word: "MAGNETISM", hint: "Force between magnets" },
    { word: "CONDUCTOR", hint: "Material that allows electricity to flow" },
  ],
  math: [
    { word: "ALGEBRA", hint: "Branch of math using symbols and letters" },
    { word: "FRACTION", hint: "Part of a whole number" },
    { word: "GEOMETRY", hint: "Study of shapes and sizes" },
    { word: "THEOREM", hint: "A proven mathematical statement" },
    { word: "INTEGER", hint: "Whole number, positive or negative" },
    { word: "DIAGONAL", hint: "Line connecting opposite corners" },
    { word: "PERIMETER", hint: "Total length around a shape" },
    { word: "QUADRANT", hint: "One fourth of a coordinate plane" },
    { word: "VARIABLE", hint: "Unknown value in an equation" },
    { word: "PROBABILITY", hint: "Likelihood of an event occurring" },
  ],
  history: [
    { word: "REVOLUTION", hint: "Major political or social change" },
    { word: "CIVILIZATION", hint: "Advanced human society" },
    { word: "DEMOCRACY", hint: "Government by the people" },
    { word: "PARLIAMENT", hint: "Legislative body of government" },
    { word: "EMPEROR", hint: "Ruler of an empire" },
    { word: "CONSTITUTION", hint: "Fundamental laws of a nation" },
    { word: "COLONIZATION", hint: "Taking control of another territory" },
    { word: "NATIONALISM", hint: "Pride and loyalty to one's country" },
    { word: "MONARCHY", hint: "Rule by a king or queen" },
    { word: "INDEPENDENCE", hint: "Freedom from outside control" },
  ],
  english: [
    { word: "METAPHOR", hint: "Comparing two unlike things directly" },
    { word: "SYNONYM", hint: "Word with same meaning as another" },
    { word: "NARRATIVE", hint: "A story or account of events" },
    { word: "ADJECTIVE", hint: "Word that describes a noun" },
    { word: "PARAGRAPH", hint: "Group of related sentences" },
    { word: "VOCABULARY", hint: "Collection of words you know" },
    { word: "PUNCTUATION", hint: "Marks used in writing like comma, period" },
    { word: "PROTAGONIST", hint: "Main character of a story" },
    { word: "ALLITERATION", hint: "Repetition of same starting sound" },
    { word: "COMPREHENSION", hint: "Understanding of what you read" },
  ],
};

const scrambleWord = (word) => {
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const scrambled = arr.join("");
  return scrambled === word ? scrambleWord(word) : scrambled;
};

export default function WordScramble() {
  const router = useRouter();
  const [screen, setScreen] = useState("setup");
  const [subject, setSubject] = useState("science");
  const [currentWord, setCurrentWord] = useState(null);
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hints, setHints] = useState(3);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTime, setTotalTime] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [flash, setFlash] = useState(null);
  const [usedWords, setUsedWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(`wordscramble_hs_${subject}`);
    if (saved) setHighScore(parseInt(saved));
  }, [subject]);

  const getNextWord = useCallback((used = usedWords) => {
    const bank = WORD_BANK[subject];
    const available = bank.filter((w) => !used.includes(w.word));
    if (available.length === 0) {
      setGameOver(true);
      return null;
    }
    const picked = available[Math.floor(Math.random() * available.length)];
    return picked;
  }, [subject, usedWords]);

  const loadNextWord = useCallback((used = usedWords) => {
    const word = getNextWord(used);
    if (!word) return;
    setCurrentWord(word);
    setScrambled(scrambleWord(word.word));
    setInput("");
    setTimeLeft(30);
    setHintRevealed(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [getNextWord, usedWords]);

  const startGame = () => {
    const saved = localStorage.getItem(`wordscramble_hs_${subject}`);
    setHighScore(saved ? parseInt(saved) : 0);
    setScore(0);
    setStreak(0);
    setHints(3);
    setCorrect(0);
    setSkipped(0);
    setTotalTime(0);
    setUsedWords([]);
    setGameOver(false);
    setFlash(null);
    setScreen("game");
    const bank = WORD_BANK[subject];
    const picked = bank[Math.floor(Math.random() * bank.length)];
    setCurrentWord(picked);
    setScrambled(scrambleWord(picked.word));
    setInput("");
    setTimeLeft(30);
    setHintRevealed(false);
    setUsedWords([picked.word]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Timer per word
  useEffect(() => {
    if (screen !== "game" || gameOver) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Time up for this word — skip it
          clearInterval(timerRef.current);
          setStreak(0);
          setSkipped((s) => s + 1);
          setFlash("wrong");
          setTimeout(() => {
            setFlash(null);
            setUsedWords((prev) => {
              const newUsed = [...prev, currentWord?.word];
              loadNextWord(newUsed);
              return newUsed;
            });
          }, 500);
          return 0;
        }
        return t - 1;
      });
      setTotalTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [screen, gameOver, currentWord]);

  useEffect(() => {
  if (!gameOver) return;

  if (score > highScore) {
    setHighScore(score);
    localStorage.setItem(`wordscramble_hs_${subject}`, score);
  }

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
          game_name: "wordscramble",
          score: score,
          time_taken: totalTime,
          difficulty: subject,
        }),
      });
    } catch (err) { console.error("Score save error:", err); }
  };
  saveScore();
}, [gameOver]);

  const handleSubmit = useCallback(() => {
    if (!currentWord || gameOver) return;
    if (input.trim().toUpperCase() === currentWord.word) {
      clearInterval(timerRef.current);
      const timeBonus = Math.floor(timeLeft / 3);
      const newStreak = streak + 1;
      const streakBonus = newStreak >= 3 ? 2 : 1;
      setScore((s) => s + (10 + timeBonus) * streakBonus);
      setStreak(newStreak);
      setCorrect((c) => c + 1);
      setFlash("correct");
      setTimeout(() => {
        setFlash(null);
        setUsedWords((prev) => {
          const newUsed = [...prev, currentWord.word];
          loadNextWord(newUsed);
          return newUsed;
        });
      }, 500);
    } else {
      setFlash("wrong");
      setTimeout(() => setFlash(null), 300);
    }
  }, [currentWord, input, streak, timeLeft, gameOver, loadNextWord]);

  const useHint = () => {
    if (hints <= 0 || hintRevealed) return;
    setHints((h) => h - 1);
    setHintRevealed(true);
  };

  const skipWord = () => {
    clearInterval(timerRef.current);
    setStreak(0);
    setSkipped((s) => s + 1);
    setUsedWords((prev) => {
      const newUsed = [...prev, currentWord?.word];
      loadNextWord(newUsed);
      return newUsed;
    });
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleSubmit]);

  const timerColor = timeLeft > 15 ? "#10b981" : timeLeft > 8 ? "#f59e0b" : "#ef4444";

  // ════════════════════════════
  // SETUP SCREEN
  // ════════════════════════════
  if (screen === "setup") return (
    <div style={{ minHeight: "100vh", background: "#030f06", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "340px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "60px", marginBottom: "10px" }}>🔤</div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px 0" }}>Word Scramble</h1>
          <p style={{ color: "#14532d", fontSize: "13px", margin: 0 }}>Unscramble subject words — beat the clock!</p>
        </div>

        <div style={{ background: "#071a0d", border: "1px solid #14532d", borderRadius: "14px", padding: "18px", marginBottom: "14px" }}>
          <p style={{ color: "#14532d", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 10px 0" }}>Choose Subject</p>
          {[
            { id: "science", label: "Science",  emoji: "🔬", desc: "Biology, Physics, Chemistry words", color: "#10b981" },
            { id: "math",    label: "Math",     emoji: "📐", desc: "Mathematical terms and concepts",   color: "#34d399" },
            { id: "history", label: "History",  emoji: "📜", desc: "Historical events and terms",       color: "#6ee7b7" },
            { id: "english", label: "English",  emoji: "📚", desc: "Grammar, literature vocabulary",    color: "#a7f3d0" },
          ].map((d) => (
            <button key={d.id} onClick={() => setSubject(d.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "10px",
              padding: "11px 14px", borderRadius: "10px", marginBottom: "7px", cursor: "pointer",
              background: subject === d.id ? "rgba(16,185,129,0.12)" : "#040d06",
              border: subject === d.id ? `1.5px solid ${d.color}` : "1.5px solid #14532d",
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: "20px" }}>{d.emoji}</span>
              <div style={{ textAlign: "left", flex: 1 }}>
                <p style={{ color: "#fff", fontSize: "13px", fontWeight: "700", margin: "0 0 1px 0" }}>{d.label}</p>
                <p style={{ color: "#14532d", fontSize: "11px", margin: 0 }}>{d.desc}</p>
              </div>
              {subject === d.id && <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "5px", background: `${d.color}22`, color: d.color }}>✓</span>}
            </button>
          ))}
        </div>

        {highScore > 0 && (
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "10px", padding: "10px 16px", marginBottom: "14px", textAlign: "center" }}>
            <p style={{ color: "#14532d", fontSize: "11px", margin: "0 0 2px 0" }}>YOUR BEST</p>
            <p style={{ color: "#10b981", fontSize: "20px", fontWeight: "800", margin: 0 }}>{highScore} pts</p>
          </div>
        )}

        <button onClick={startGame} style={{
          width: "100%", padding: "14px", borderRadius: "11px", fontWeight: "800",
          fontSize: "15px", color: "#000", background: "linear-gradient(135deg,#10b981,#34d399)",
          border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(16,185,129,0.4)",
        }}>🔤 Start Game</button>

        <button onClick={() => router.push("/games")} style={{
          display: "block", width: "100%", marginTop: "10px", padding: "10px",
          background: "transparent", border: "none", color: "#14532d", fontSize: "13px", cursor: "pointer",
        }}>← Back to Games</button>
      </div>
    </div>
  );

  // ════════════════════════════
  // GAME OVER SCREEN
  // ════════════════════════════
  if (gameOver) return (
    <div style={{ minHeight: "100vh", background: "#030f06", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "340px", textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "12px" }}>{score >= highScore && score > 0 ? "🏆" : "🔤"}</div>
        <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: "800", margin: "0 0 4px 0" }}>
          {score >= highScore && score > 0 ? "New High Score!" : "Game Over!"}
        </h2>
        <p style={{ color: "#14532d", fontSize: "13px", margin: "0 0 24px 0" }}>All words completed!</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
          {[
            { label: "Score",     value: score,      color: "#10b981" },
            { label: "Best",      value: highScore,  color: "#34d399" },
            { label: "Correct",   value: correct,    color: "#4ade80" },
            { label: "Skipped",   value: skipped,    color: "#f87171" },
            { label: "Streak",    value: streak,     color: "#a78bfa" },
            { label: "Accuracy",  value: correct + skipped > 0 ? `${Math.round((correct / (correct + skipped)) * 100)}%` : "0%", color: "#60a5fa" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#071a0d", border: "1px solid #14532d", borderRadius: "10px", padding: "12px" }}>
              <p style={{ color: "#14532d", fontSize: "10px", margin: "0 0 3px 0", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: "20px", fontWeight: "800", margin: 0, fontFamily: "monospace" }}>{s.value}</p>
            </div>
          ))}
        </div>

        <button onClick={startGame} style={{
          width: "100%", padding: "14px", borderRadius: "11px", fontWeight: "800",
          fontSize: "15px", color: "#000", background: "linear-gradient(135deg,#10b981,#34d399)",
          border: "none", cursor: "pointer", marginBottom: "10px",
        }}>🔤 Play Again</button>

        <button onClick={() => setScreen("setup")} style={{
          width: "100%", padding: "12px", borderRadius: "11px", fontWeight: "700",
          fontSize: "14px", color: "#14532d", background: "transparent",
          border: "1px solid #14532d", cursor: "pointer",
        }}>⚙️ Change Subject</button>
      </div>
    </div>
  );

  // ════════════════════════════
  // GAME SCREEN
  // ════════════════════════════
  return (
    <div style={{
      minHeight: "100vh",
      background: flash === "correct" ? "#011a09" : flash === "wrong" ? "#1a0101" : "#030f06",
      color: "#fff", fontFamily: "system-ui,sans-serif", transition: "background 0.15s",
    }}>

      {/* TOPBAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", background: "#071a0d", borderBottom: "1px solid #14532d" }}>
        <button onClick={() => router.push("/games")} style={{ background: "none", border: "none", color: "#14532d", fontSize: "13px", cursor: "pointer" }}>← Games</button>
        <span style={{ fontWeight: "700", fontSize: "14px" }}>🔤 Word Scramble</span>
        <span style={{ fontSize: "11px", padding: "2px 7px", borderRadius: "5px", background: "#041009", color: "#10b981", textTransform: "capitalize" }}>{subject}</span>
      </div>

      {/* TIMER BAR */}
      <div style={{ height: "4px", background: "#071a0d" }}>
        <div style={{ height: "100%", width: `${(timeLeft / 30) * 100}%`, background: timerColor, transition: "width 1s linear, background 0.5s" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px", gap: "16px" }}>

        {/* STATS */}
        <div style={{ display: "flex", gap: "8px", width: "100%", maxWidth: "400px" }}>
          {[
            { label: "Score",   value: score,          color: "#10b981" },
            { label: "Time",    value: `${timeLeft}s`, color: timerColor },
            { label: "Streak",  value: `🔥 ${streak}`, color: streak >= 3 ? "#fb923c" : "#555" },
            { label: "Words",   value: `${correct}/${correct + skipped}`, color: "#6ee7b7" },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, background: "#071a0d", border: "1px solid #14532d", borderRadius: "8px", padding: "7px 5px", textAlign: "center" }}>
              <p style={{ color: "#14532d", fontSize: "9px", margin: "0 0 2px 0", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: "12px", fontWeight: "800", margin: 0, fontFamily: "monospace" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* SCRAMBLED WORD */}
        {currentWord && (
          <div style={{
            background: "#071a0d",
            border: `2px solid ${flash === "correct" ? "#10b981" : flash === "wrong" ? "#ef4444" : "#14532d"}`,
            borderRadius: "20px", padding: "32px 24px", textAlign: "center",
            width: "100%", maxWidth: "400px", transition: "border-color 0.15s",
          }}>
            <p style={{ color: "#14532d", fontSize: "11px", margin: "0 0 12px 0", textTransform: "uppercase", letterSpacing: "2px" }}>Unscramble this word</p>

            {/* Scrambled letters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center", marginBottom: "16px" }}>
              {scrambled.split("").map((letter, i) => (
                <div key={i} style={{
                  width: "clamp(28px,7vw,40px)", height: "clamp(28px,7vw,40px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#0d2a15", border: "1.5px solid #14532d",
                  borderRadius: "8px", fontSize: "clamp(14px,3.5vw,20px)",
                  fontWeight: "800", color: "#10b981", fontFamily: "monospace",
                }}>
                  {letter}
                </div>
              ))}
            </div>

            <p style={{ color: "#14532d", fontSize: "11px", margin: "0 0 4px 0" }}>
              {currentWord.word.length} letters • {subject}
            </p>

            {/* Hint */}
            {hintRevealed && (
              <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", padding: "8px 12px", marginTop: "10px" }}>
                <p style={{ color: "#10b981", fontSize: "12px", margin: 0 }}>💡 {currentWord.hint}</p>
              </div>
            )}
          </div>
        )}

        {/* INPUT */}
        <div style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "400px" }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="Type the word..."
            style={{
              flex: 1, padding: "14px 18px", borderRadius: "12px", fontSize: "18px",
              fontWeight: "700", fontFamily: "monospace", textAlign: "center",
              background: "#071a0d", border: "2px solid #14532d", color: "#10b981",
              outline: "none", letterSpacing: "3px",
            }}
          />
          <button onClick={handleSubmit} style={{
            padding: "14px 20px", borderRadius: "12px", fontSize: "20px",
            background: "linear-gradient(135deg,#10b981,#34d399)",
            border: "none", cursor: "pointer", fontWeight: "800", color: "#000",
          }}>→</button>
        </div>

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={useHint} disabled={hints <= 0 || hintRevealed} style={{
            padding: "9px 18px", borderRadius: "9px", fontSize: "12px", fontWeight: "700",
            background: hints > 0 && !hintRevealed ? "rgba(16,185,129,0.12)" : "#040d06",
            border: `1.5px solid ${hints > 0 && !hintRevealed ? "#10b981" : "#14532d"}`,
            color: hints > 0 && !hintRevealed ? "#10b981" : "#14532d",
            cursor: hints > 0 && !hintRevealed ? "pointer" : "not-allowed",
          }}>💡 Hint ({hints})</button>

          <button onClick={skipWord} style={{
            padding: "9px 18px", borderRadius: "9px", fontSize: "12px", fontWeight: "700",
            background: "transparent", border: "1.5px solid #14532d", color: "#14532d", cursor: "pointer",
          }}>⏭ Skip</button>
        </div>
      </div>
    </div>
  );
}