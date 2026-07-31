import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";

// ── PRE-BUILT PUZZLES ──
const PUZZLES = {
  easy: [
    {
      puzzle: [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9],
      ],
      solution: [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9],
      ],
    },
  ],
  medium: [
    {
      puzzle: [
        [0,0,0,2,6,0,7,0,1],
        [6,8,0,0,7,0,0,9,0],
        [1,9,0,0,0,4,5,0,0],
        [8,2,0,1,0,0,0,4,0],
        [0,0,4,6,0,2,9,0,0],
        [0,5,0,0,0,3,0,2,8],
        [0,0,9,3,0,0,0,7,4],
        [0,4,0,0,5,0,0,3,6],
        [7,0,3,0,1,8,0,0,0],
      ],
      solution: [
        [4,3,5,2,6,9,7,8,1],
        [6,8,2,5,7,1,4,9,3],
        [1,9,7,8,3,4,5,6,2],
        [8,2,6,1,9,5,3,4,7],
        [3,7,4,6,8,2,9,1,5],
        [9,5,1,7,4,3,6,2,8],
        [5,1,9,3,2,6,8,7,4],
        [2,4,8,9,5,7,1,3,6],
        [7,6,3,4,1,8,2,5,9],
      ],
    },
  ],
  hard: [
    {
      puzzle: [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,3,0,8,5],
        [0,0,1,0,2,0,0,0,0],
        [0,0,0,5,0,7,0,0,0],
        [0,0,4,0,0,0,1,0,0],
        [0,9,0,0,0,0,0,0,0],
        [5,0,0,0,0,0,0,7,3],
        [0,0,2,0,1,0,0,0,0],
        [0,0,0,0,4,0,0,0,9],
      ],
      solution: [
        [9,8,7,6,5,4,3,2,1],
        [2,4,6,1,7,3,9,8,5],
        [3,5,1,9,2,8,7,4,6],
        [1,2,8,5,3,7,6,9,4],
        [6,3,4,8,9,2,1,5,7],
        [7,9,5,4,6,1,8,3,2],
        [5,1,9,2,8,6,4,7,3],
        [4,7,2,3,1,9,5,6,8],
        [8,6,3,7,4,5,2,1,9],
      ],
    },
  ],
};

export default function Sudoku() {
  const router = useRouter();
  const [screen, setScreen] = useState("setup");
  const [difficulty, setDifficulty] = useState("easy");
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [hints, setHints] = useState(3);
  const [time, setTime] = useState(0);
  const [won, setWon] = useState(false);
  const [errors, setErrors] = useState({}); // "r-c": true
  const timerRef = useRef(null);

  // ── TIMER ──
  useEffect(() => {
    if (screen === "game" && !won) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, won]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // ── START GAME ──
  const startGame = () => {
    const puzzleSet = PUZZLES[difficulty];
    const picked = puzzleSet[Math.floor(Math.random() * puzzleSet.length)];
    const boardCopy = picked.puzzle.map((r) => [...r]);
    setBoard(boardCopy);
    setSolution(picked.solution.map((r) => [...r]));
    setInitialBoard(picked.puzzle.map((r) => [...r]));
    setSelected(null);
    setMistakes(0);
    setHints(3);
    setTime(0);
    setWon(false);
    setErrors({});
    setScreen("game");
  };

  // ── SELECT CELL ──
  const selectCell = (r, c) => {
    if (initialBoard[r][c] !== 0) return;
    setSelected({ r, c });
  };

  // ── INPUT NUMBER ──
  const inputNumber = useCallback((num) => {
    if (!selected || won) return;
    const { r, c } = selected;
    if (initialBoard[r][c] !== 0) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = num;
    setBoard(newBoard);

    if (num !== 0 && num !== solution[r][c]) {
      setErrors((prev) => ({ ...prev, [`${r}-${c}`]: true }));
      setMistakes((m) => m + 1);
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[`${r}-${c}`];
        return copy;
      });
    }

    // Check win
    const isWon = newBoard.every((row, ri) =>
      row.every((cell, ci) => cell === solution[ri][ci])
    );
    if (isWon) {
  setWon(true);
  clearInterval(timerRef.current);

  // Coins save karo
  const saveScore = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return;
      const user = JSON.parse(userData);
      const coinsEarned = difficulty === "easy" ? 30 : difficulty === "medium" ? 50 : 80;
      await fetch("http://127.0.0.1:8000/games/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user.id,
          game_name: "sudoku",
          score: coinsEarned,
          time_taken: time,
          difficulty: difficulty,
        }),
      });
    } catch (err) { console.error("Score save error:", err); }
  };
  saveScore();
}
  }, [selected, won, board, solution, initialBoard]);

  // ── HINT ──
  const useHint = () => {
    if (hints <= 0 || won) return;
    // Find empty or wrong cell
    const emptyCells = [];
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (initialBoard[r][c] === 0 && cell !== solution[r][c]) {
          emptyCells.push({ r, c });
        }
      });
    });
    if (emptyCells.length === 0) return;
    const pick = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = board.map((row) => [...row]);
    newBoard[pick.r][pick.c] = solution[pick.r][pick.c];
    setBoard(newBoard);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[`${pick.r}-${pick.c}`];
      return copy;
    });
    setHints((h) => h - 1);
    setSelected(pick);

    const isWon = newBoard.every((row, ri) =>
      row.every((cell, ci) => cell === solution[ri][ci])
    );
    if (isWon) {
  setWon(true);
  clearInterval(timerRef.current);

  const saveScore = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return;
      const user = JSON.parse(userData);
      const coinsEarned = difficulty === "easy" ? 20 : difficulty === "medium" ? 35 : 60;
      await fetch("http://127.0.0.1:8000/games/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user.id,
          game_name: "sudoku",
          score: coinsEarned,
          time_taken: time,
          difficulty: difficulty,
        }),
      });
    } catch (err) { console.error("Score save error:", err); }
  };
  saveScore();
}
  };

  // ── KEYBOARD INPUT ──
  useEffect(() => {
    const handler = (e) => {
      if (screen !== "game") return;
      const n = parseInt(e.key);
      if (n >= 1 && n <= 9) inputNumber(n);
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") inputNumber(0);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [screen, inputNumber]);

  // ── CELL COLOR ──
  const getCellStyle = (r, c) => {
    const isInitial = initialBoard[r][c] !== 0;
    const isSelected = selected?.r === r && selected?.c === c;
    const isError = errors[`${r}-${c}`];
    const isSameNum = selected && board[r][c] !== 0 && board[r][c] === board[selected.r]?.[selected.c];
    const isHighlighted =
      selected && (selected.r === r || selected.c === c ||
        (Math.floor(r / 3) === Math.floor(selected.r / 3) &&
          Math.floor(c / 3) === Math.floor(selected.c / 3)));

    let bg = "#0d1117";
    if (isHighlighted) bg = "#111827";
    if (isSameNum && !isSelected) bg = "#1e3a5f";
    if (isSelected) bg = "#1d4ed8";
    if (isError) bg = "#7f1d1d";

    return {
      width: "100%",
      aspectRatio: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "clamp(13px, 2vw, 18px)",
      fontWeight: isInitial ? "700" : "500",
      cursor: isInitial ? "default" : "pointer",
      background: bg,
      color: isError ? "#fca5a5" : isInitial ? "#e2e8f0" : isSelected ? "#ffffff" : "#93c5fd",
      borderRight: (c + 1) % 3 === 0 && c !== 8 ? "2px solid #334155" : "1px solid #1e293b",
      borderBottom: (r + 1) % 3 === 0 && r !== 8 ? "2px solid #334155" : "1px solid #1e293b",
      transition: "background 0.1s",
      userSelect: "none",
      fontFamily: "monospace",
    };
  };

  // ════════════════════════════
  // SETUP SCREEN
  // ════════════════════════════
  if (screen === "setup") return (
    <div style={{ minHeight: "100vh", background: "#060d1a", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "340px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "60px", marginBottom: "10px" }}>🧩</div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px 0" }}>Sudoku</h1>
          <p style={{ color: "#3b5a8a", fontSize: "13px", margin: 0 }}>Fill the grid — train your brain</p>
        </div>

        <div style={{ background: "#0d1117", border: "1px solid #1e3a5f", borderRadius: "14px", padding: "18px", marginBottom: "14px" }}>
          <p style={{ color: "#3b5a8a", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 10px 0" }}>Difficulty</p>
          {[
            { id: "easy",   label: "Easy",   emoji: "😊", desc: "Many cells filled — good for beginners", color: "#22d3ee" },
            { id: "medium", label: "Medium", emoji: "🤔", desc: "Balanced challenge",                      color: "#60a5fa" },
            { id: "hard",   label: "Hard",   emoji: "😤", desc: "Very few clues — expert level",           color: "#818cf8" },
          ].map((d) => (
            <button key={d.id} onClick={() => setDifficulty(d.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "10px",
              padding: "11px 14px", borderRadius: "10px", marginBottom: "7px", cursor: "pointer",
              background: difficulty === d.id ? "rgba(29,78,216,0.2)" : "#080f1a",
              border: difficulty === d.id ? `1.5px solid ${d.color}` : "1.5px solid #1e3a5f",
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: "20px" }}>{d.emoji}</span>
              <div style={{ textAlign: "left", flex: 1 }}>
                <p style={{ color: "#fff", fontSize: "13px", fontWeight: "700", margin: "0 0 1px 0" }}>{d.label}</p>
                <p style={{ color: "#3b5a8a", fontSize: "11px", margin: 0 }}>{d.desc}</p>
              </div>
              {difficulty === d.id && <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "5px", background: `${d.color}22`, color: d.color }}>✓</span>}
            </button>
          ))}
        </div>

        <button onClick={startGame} style={{
          width: "100%", padding: "14px", borderRadius: "11px", fontWeight: "800",
          fontSize: "15px", color: "#fff", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
          border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(29,78,216,0.4)",
        }}>🧩 Start Sudoku</button>

        <button onClick={() => router.push("/games")} style={{
          display: "block", width: "100%", marginTop: "10px", padding: "10px",
          background: "transparent", border: "none", color: "#3b5a8a", fontSize: "13px", cursor: "pointer",
        }}>← Back to Games</button>
      </div>
    </div>
  );

  // ════════════════════════════
  // GAME SCREEN
  // ════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: "#060d1a", color: "#fff", fontFamily: "system-ui,sans-serif" }}>

      {/* TOPBAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", background: "#0d1117", borderBottom: "1px solid #1e3a5f" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => router.push("/games")} style={{ background: "none", border: "none", color: "#3b5a8a", fontSize: "13px", cursor: "pointer" }}>← Games</button>
          <span style={{ fontWeight: "700", fontSize: "14px" }}>🧩 Sudoku</span>
          <span style={{ fontSize: "11px", padding: "2px 7px", borderRadius: "5px", background: "#0d1a2e", color: "#3b82f6", textTransform: "capitalize" }}>{difficulty}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "13px", fontFamily: "monospace", color: "#60a5fa" }}>⏱ {formatTime(time)}</span>
          <span style={{ fontSize: "12px", color: mistakes >= 3 ? "#f87171" : "#94a3b8" }}>❌ {mistakes}</span>
          <button onClick={startGame} style={{ fontSize: "12px", padding: "5px 11px", borderRadius: "7px", background: "#0d1a2e", border: "1px solid #1e3a5f", color: "#94a3b8", cursor: "pointer" }}>🔄 New</button>
        </div>
      </div>

      {/* WIN BANNER */}
      {won && (
        <div style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", padding: "14px", textAlign: "center" }}>
          <p style={{ color: "#fff", fontWeight: "800", fontSize: "16px", margin: "0 0 2px 0" }}>🎉 Puzzle Solved!</p>
          <p style={{ color: "#bfdbfe", fontSize: "13px", margin: 0 }}>Time: {formatTime(time)} | Mistakes: {mistakes}</p>
        </div>
      )}

      {/* MAIN */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px", gap: "16px" }}>

        {/* BOARD */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          width: "min(90vw, 380px)",
          border: "2px solid #334155",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
        }}>
          {board.map((row, r) =>
            row.map((cell, c) => (
              <div key={`${r}-${c}`} style={getCellStyle(r, c)} onClick={() => selectCell(r, c)}>
                {cell !== 0 ? cell : ""}
              </div>
            ))
          )}
        </div>

        {/* NUMBER PAD */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", width: "min(90vw, 380px)" }}>
          {[1,2,3,4,5,6,7,8,9].map((n) => (
            <button key={n} onClick={() => inputNumber(n)} style={{
              width: "52px", height: "52px", borderRadius: "10px", fontSize: "18px",
              fontWeight: "700", fontFamily: "monospace",
              background: "#0d1117", border: "1.5px solid #1e3a5f",
              color: "#60a5fa", cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={(e) => e.target.style.background = "#1d4ed8"}
            onMouseLeave={(e) => e.target.style.background = "#0d1117"}
            >{n}</button>
          ))}
          <button onClick={() => inputNumber(0)} style={{
            width: "52px", height: "52px", borderRadius: "10px", fontSize: "13px",
            fontWeight: "700", background: "#0d1117", border: "1.5px solid #1e3a5f",
            color: "#64748b", cursor: "pointer",
          }}>✕</button>
        </div>

        {/* BOTTOM ACTIONS */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={useHint} disabled={hints <= 0 || won} style={{
            padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: "700",
            background: hints > 0 ? "rgba(29,78,216,0.2)" : "#080f1a",
            border: `1.5px solid ${hints > 0 ? "#3b82f6" : "#1e3a5f"}`,
            color: hints > 0 ? "#60a5fa" : "#334155", cursor: hints > 0 ? "pointer" : "not-allowed",
          }}>💡 Hint ({hints} left)</button>

          <button onClick={startGame} style={{
            padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: "700",
            background: "rgba(29,78,216,0.15)", border: "1.5px solid #1e3a5f",
            color: "#94a3b8", cursor: "pointer",
          }}>🔄 New Puzzle</button>

          <button onClick={() => setScreen("setup")} style={{
            padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: "700",
            background: "transparent", border: "1.5px solid #1e3a5f",
            color: "#64748b", cursor: "pointer",
          }}>⚙️ Change Level</button>
        </div>

        {/* STATS */}
        <div style={{ display: "flex", gap: "10px", width: "min(90vw, 380px)" }}>
          {[
            { label: "Time",       value: formatTime(time), color: "#60a5fa" },
            { label: "Mistakes",   value: mistakes,          color: mistakes >= 3 ? "#f87171" : "#94a3b8" },
            { label: "Hints Left", value: hints,             color: "#818cf8" },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, background: "#0d1117", border: "1px solid #1e3a5f", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
              <p style={{ color: "#3b5a8a", fontSize: "10px", margin: "0 0 2px 0", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: "14px", fontWeight: "700", margin: 0, fontFamily: "monospace" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}