import { useState, useCallback, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useRouter } from "next/router";

export default function ChessGame() {
  const router = useRouter();
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [gameStatus, setGameStatus] = useState("idle");
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState("medium");
  const [moveHistory, setMoveHistory] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [screen, setScreen] = useState("setup");
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [capturedByPlayer, setCapturedByPlayer] = useState([]);
  const [capturedByAI, setCapturedByAI] = useState([]);
  const [timePlayer, setTimePlayer] = useState(0);
  const [timeAI, setTimeAI] = useState(0);
  const [boardWidth, setBoardWidth] = useState(360);
  const timerRef = useRef(null);
  const moveListRef = useRef(null);
  const boardContainerRef = useRef(null);

  const PIECE_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  const PIECE_EMOJI = { p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚" };

  // ── DYNAMIC BOARD SIZE ──
  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      // left panel 150 + gap 16 + right panel 150 + gap 16 + padding 40
      const available = vw - 150 - 150 - 32 - 40;
      const size = Math.min(Math.max(available, 280), 400);
      setBoardWidth(size);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // ── TIMER ──
  useEffect(() => {
    if (gameStatus === "playing" || gameStatus === "check") {
      timerRef.current = setInterval(() => {
        if (gameRef.current.turn() === "w") setTimePlayer((t) => t + 1);
        else setTimeAI((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStatus]);

  useEffect(() => {
    if (moveListRef.current) {
      moveListRef.current.scrollTop = moveListRef.current.scrollHeight;
    }
  }, [moveHistory]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // ── UPDATE STATUS ──
  const updateGameStatus = useCallback((g) => {
    if (g.isCheckmate()) {
      setGameStatus("checkmate");
      setWinner(g.turn() === "w" ? "ai" : "player");
      clearInterval(timerRef.current);
    } else if (g.isStalemate()) {
      setGameStatus("stalemate");
      clearInterval(timerRef.current);
    } else if (g.isDraw()) {
      setGameStatus("draw");
      clearInterval(timerRef.current);
    } else if (g.inCheck()) {
      setGameStatus("check");
    } else {
      setGameStatus("playing");
    }
  }, []);

  // ── BOARD EVALUATION ──
  const evaluateBoard = (g) => {
    let score = 0;
    const board = g.board();
    const centerSquares = ["d4", "d5", "e4", "e5"];
    const extendedCenter = ["c3","c4","c5","c6","d3","d4","d5","d6","e3","e4","e5","e6","f3","f4","f5","f6"];
    board.forEach((row) => {
      row.forEach((piece) => {
        if (!piece) return;
        const val = PIECE_VALUES[piece.type] * 100;
        if (piece.color === "b") score += val;
        else score -= val;
      });
    });
    g.moves({ verbose: true }).forEach((m) => {
      if (centerSquares.includes(m.to)) score += m.color === "b" ? 5 : -5;
      if (extendedCenter.includes(m.to)) score += m.color === "b" ? 2 : -2;
    });
    if (g.inCheck()) score += g.turn() === "w" ? 15 : -15;
    return score;
  };

  // ── MINIMAX ──
  const minimax = (g, depth, alpha, beta, isMaximizing) => {
    if (depth === 0 || g.isGameOver()) return evaluateBoard(g);
    const moves = g.moves({ verbose: true });
    if (isMaximizing) {
      let best = -Infinity;
      for (const move of moves) {
        const copy = new Chess(g.fen());
        copy.move(move);
        best = Math.max(best, minimax(copy, depth - 1, alpha, beta, false));
        alpha = Math.max(alpha, best);
        if (beta <= alpha) break;
      }
      return best;
    } else {
      let best = Infinity;
      for (const move of moves) {
        const copy = new Chess(g.fen());
        copy.move(move);
        best = Math.min(best, minimax(copy, depth - 1, alpha, beta, true));
        beta = Math.min(beta, best);
        if (beta <= alpha) break;
      }
      return best;
    }
  };

  // ── GET AI MOVE ──
  const getAIMove = useCallback((g) => {
    const moves = g.moves({ verbose: true });
    if (!moves.length) return null;
    if (difficulty === "easy") {
      const captures = moves.filter((m) => m.captured);
      if (captures.length && Math.random() > 0.4)
        return captures[Math.floor(Math.random() * captures.length)];
      return moves[Math.floor(Math.random() * moves.length)];
    }
    const depth = difficulty === "medium" ? 2 : 3;
    let bestMove = null;
    let bestScore = -Infinity;
    for (const move of moves) {
      const copy = new Chess(g.fen());
      copy.move(move);
      const score = minimax(copy, depth - 1, -Infinity, Infinity, false);
      if (score > bestScore) { bestScore = score; bestMove = move; }
    }
    return bestMove;
  }, [difficulty]);

  // ── MAKE AI MOVE ──
  const makeAIMove = useCallback((g) => {
    if (g.isGameOver()) return;
    setThinking(true);
    const delay = { easy: 400, medium: 800, hard: 1400 }[difficulty];
    setTimeout(() => {
      const aiMove = getAIMove(g);
      if (!aiMove) { setThinking(false); return; }
      const copy = new Chess(g.fen());
      const result = copy.move(aiMove);
      if (!result) { setThinking(false); return; }
      gameRef.current = copy;
      setFen(copy.fen());
      setLastMove({ from: aiMove.from, to: aiMove.to });
      setMoveHistory((prev) => [...prev, { san: result.san, color: "black" }]);
      setMoveCount((prev) => prev + 1);
      if (result.captured) setCapturedByAI((prev) => [...prev, result.captured]);
      updateGameStatus(copy);
      setThinking(false);
    }, delay);
  }, [difficulty, getAIMove, updateGameStatus]);

  // ── PLAYER MOVE via DRAG ──
  // KEY FIX: return true/false correctly and use FEN from gameRef
  const onPieceDrop = useCallback((sourceSquare, targetSquare, piece) => {
    const g = new Chess(gameRef.current.fen());
    if (thinking) return false;
    if (["checkmate", "draw", "stalemate"].includes(gameStatus)) return false;
    if (g.turn() !== "w") return false;

    const copy = new Chess(g.fen());
    let move = null;
    try {
      move = copy.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
    } catch {
      return false;
    }
    if (!move) return false;

    gameRef.current = copy;
    setFen(copy.fen());
    setLastMove({ from: sourceSquare, to: targetSquare });
    setSelectedSquare(null);
    setLegalMoves([]);
    setMoveHistory((prev) => [...prev, { san: move.san, color: "white" }]);
    setMoveCount((prev) => prev + 1);
    if (move.captured) setCapturedByPlayer((prev) => [...prev, move.captured]);
    updateGameStatus(copy);
    if (!copy.isGameOver()) makeAIMove(copy);
    return true;
  }, [thinking, gameStatus, makeAIMove, updateGameStatus]);

  // ── PLAYER MOVE via CLICK ──
  const onSquareClick = useCallback((square) => {
    const g = gameRef.current;
    if (thinking) return;
    if (["checkmate", "draw", "stalemate"].includes(gameStatus)) return;
    if (g.turn() !== "w") return;

    const piece = g.get(square);

    if (piece && piece.color === "w") {
      setSelectedSquare(square);
      const moves = g.moves({ square, verbose: true });
      setLegalMoves(moves.map((m) => m.to));
      return;
    }

    if (selectedSquare) {
      const copy = new Chess(g.fen());
      let move = null;
      try {
        move = copy.move({ from: selectedSquare, to: square, promotion: "q" });
      } catch {}

      if (move) {
        gameRef.current = copy;
        setFen(copy.fen());
        setLastMove({ from: selectedSquare, to: square });
        setSelectedSquare(null);
        setLegalMoves([]);
        setMoveHistory((prev) => [...prev, { san: move.san, color: "white" }]);
        setMoveCount((prev) => prev + 1);
        if (move.captured) setCapturedByPlayer((prev) => [...prev, move.captured]);
        updateGameStatus(copy);
        if (!copy.isGameOver()) makeAIMove(copy);
      } else {
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    }
  }, [thinking, gameStatus, selectedSquare, makeAIMove, updateGameStatus]);

  // ── SQUARE STYLES ──
  const getSquareStyles = useCallback(() => {
    const styles = {};
    if (lastMove) {
      styles[lastMove.from] = { backgroundColor: "rgba(255,255,100,0.2)" };
      styles[lastMove.to] = { backgroundColor: "rgba(255,255,100,0.3)" };
    }
    if (selectedSquare) {
      styles[selectedSquare] = { backgroundColor: "rgba(100,200,255,0.45)" };
    }
    legalMoves.forEach((sq) => {
      const piece = gameRef.current.get(sq);
      if (piece) {
        styles[sq] = { backgroundColor: "rgba(255,80,80,0.4)" };
      } else {
        styles[sq] = {
          background: "radial-gradient(circle, rgba(180,220,255,0.65) 28%, transparent 30%)",
        };
      }
    });
    if (gameRef.current.inCheck()) {
      const board = gameRef.current.board();
      const turn = gameRef.current.turn();
      board.forEach((row, r) => {
        row.forEach((p, c) => {
          if (p && p.type === "k" && p.color === turn) {
            const file = String.fromCharCode(97 + c);
            const rank = 8 - r;
            styles[`${file}${rank}`] = { backgroundColor: "rgba(255,40,40,0.7)" };
          }
        });
      });
    }
    return styles;
  }, [lastMove, selectedSquare, legalMoves]);

  // ── RESET ──
  const resetGame = useCallback(() => {
    clearInterval(timerRef.current);
    const newGame = new Chess();
    gameRef.current = newGame;
    setFen(newGame.fen());
    setGameStatus("playing");
    setWinner(null);
    setMoveHistory([]);
    setLastMove(null);
    setMoveCount(0);
    setThinking(false);
    setSelectedSquare(null);
    setLegalMoves([]);
    setCapturedByPlayer([]);
    setCapturedByAI([]);
    setTimePlayer(0);
    setTimeAI(0);
  }, []);

  const startGame = () => { resetGame(); setScreen("game"); };
  const isGameOver = ["checkmate", "draw", "stalemate"].includes(gameStatus);
  const materialScore = () => {
    const ps = capturedByPlayer.reduce((s, p) => s + (PIECE_VALUES[p] || 0), 0);
    const as = capturedByAI.reduce((s, p) => s + (PIECE_VALUES[p] || 0), 0);
    return { diff: ps - as };
  };
  const score = materialScore();

  // ════════════════════════════
  // SETUP SCREEN
  // ════════════════════════════
  if (screen === "setup") return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "340px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "64px", marginBottom: "10px" }}>♟️</div>
          <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: "800", margin: "0 0 4px 0" }}>Chess</h1>
          <p style={{ color: "#555577", fontSize: "13px", margin: 0 }}>Play against RAXX AI</p>
        </div>

        <div style={{ background: "#111111", border: "1px solid #222233", borderRadius: "14px", padding: "18px", marginBottom: "14px" }}>
          <p style={{ color: "#555577", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 10px 0" }}>Choose Difficulty</p>
          {[
            { id: "easy",   label: "Easy",   emoji: "😊", desc: "Random moves — great for beginners", color: "#00e5aa" },
            { id: "medium", label: "Medium", emoji: "🤔", desc: "Smart AI — thinks 2 moves ahead",    color: "#ffb830" },
            { id: "hard",   label: "Hard",   emoji: "😤", desc: "Strong AI — thinks 3 moves ahead",   color: "#ff6b6b" },
          ].map((d) => (
            <button key={d.id} onClick={() => setDifficulty(d.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "10px",
              padding: "11px 14px", borderRadius: "10px", marginBottom: "7px", cursor: "pointer",
              background: difficulty === d.id ? "rgba(255,255,255,0.05)" : "#0d0d0d",
              border: difficulty === d.id ? `1.5px solid ${d.color}` : "1.5px solid #222233",
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: "20px" }}>{d.emoji}</span>
              <div style={{ textAlign: "left", flex: 1 }}>
                <p style={{ color: "#fff", fontSize: "13px", fontWeight: "700", margin: "0 0 1px 0" }}>{d.label}</p>
                <p style={{ color: "#555577", fontSize: "11px", margin: 0 }}>{d.desc}</p>
              </div>
              {difficulty === d.id && (
                <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "5px", background: `${d.color}22`, color: d.color }}>✓</span>
              )}
            </button>
          ))}
        </div>

        <button onClick={startGame} style={{
          width: "100%", padding: "14px", borderRadius: "11px", fontWeight: "800",
          fontSize: "15px", color: "#fff", background: "linear-gradient(135deg,#4444aa,#7c6fff)",
          border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(124,111,255,0.3)",
        }}>♟️ Start Game</button>

        <button onClick={() => router.push("/games")} style={{
          display: "block", width: "100%", marginTop: "10px", padding: "10px",
          background: "transparent", border: "none", color: "#555577", fontSize: "13px", cursor: "pointer",
        }}>← Back to Games</button>
      </div>
    </div>
  );

  // ════════════════════════════
  // GAME SCREEN
  // ════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui,sans-serif" }}>

      {/* TOPBAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", background: "#111111", borderBottom: "1px solid #1e1e2e" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => router.push("/games")} style={{ background: "none", border: "none", color: "#555577", fontSize: "13px", cursor: "pointer" }}>← Games</button>
          <span style={{ fontWeight: "700", fontSize: "14px" }}>♟️ Chess</span>
          <span style={{ fontSize: "11px", padding: "2px 7px", borderRadius: "5px", background: "#1a1a2e", color: "#7777aa", textTransform: "capitalize" }}>{difficulty}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "#555577" }}>Move {moveCount}</span>
          {thinking && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#ffb830" }}>
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", border: "2px solid #ffb830", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
              AI thinking...
            </div>
          )}
          {gameStatus === "check" && !isGameOver && (
            <span style={{ fontSize: "11px", fontWeight: "700", padding: "2px 7px", borderRadius: "5px", background: "rgba(255,107,107,0.15)", color: "#ff6b6b" }}>⚠️ Check!</span>
          )}
          <button onClick={resetGame} style={{ fontSize: "12px", padding: "5px 11px", borderRadius: "7px", background: "#1a1a2e", border: "1px solid #2e2e50", color: "#aaaacc", cursor: "pointer" }}>🔄 New</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", padding: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* LEFT PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "140px", minWidth: "140px" }}>

          {/* AI */}
          <div style={{ background: "#111111", border: gameRef.current.turn() === "b" && !isGameOver ? "1.5px solid #7c6fff" : "1px solid #1e1e2e", borderRadius: "11px", padding: "11px", textAlign: "center" }}>
            <div style={{ fontSize: "26px", marginBottom: "3px" }}>🤖</div>
            <p style={{ color: "#fff", fontSize: "12px", fontWeight: "700", margin: "0 0 2px 0" }}>RAXX AI</p>
            <p style={{ color: "#555577", fontSize: "11px", margin: "0 0 3px 0" }}>Black ♟</p>
            <p style={{ color: "#555577", fontSize: "12px", fontFamily: "monospace", margin: 0 }}>{formatTime(timeAI)}</p>
            {capturedByAI.length > 0 && (
              <p style={{ color: "#ff6b6b", fontSize: "10px", marginTop: "5px", wordBreak: "break-all" }}>
                {capturedByAI.map((p) => PIECE_EMOJI[p]).join(" ")}
              </p>
            )}
            {score.diff < 0 && <p style={{ color: "#ff6b6b", fontSize: "10px", fontWeight: "700", margin: "3px 0 0 0" }}>+{Math.abs(score.diff)}</p>}
          </div>

          {/* Game Over */}
          {isGameOver && (
            <div style={{
              background: winner === "player" ? "rgba(0,229,170,0.07)" : winner === "ai" ? "rgba(255,107,107,0.07)" : "rgba(255,184,48,0.07)",
              border: `1px solid ${winner === "player" ? "rgba(0,229,170,0.3)" : winner === "ai" ? "rgba(255,107,107,0.3)" : "rgba(255,184,48,0.3)"}`,
              borderRadius: "11px", padding: "11px", textAlign: "center",
            }}>
              <p style={{ fontSize: "22px", margin: "0 0 3px 0" }}>{winner === "player" ? "🏆" : winner === "ai" ? "🤖" : "🤝"}</p>
              <p style={{ fontSize: "12px", fontWeight: "700", margin: "0 0 2px 0", color: winner === "player" ? "#00e5aa" : winner === "ai" ? "#ff6b6b" : "#ffb830" }}>
                {winner === "player" ? "You Win!" : winner === "ai" ? "AI Wins!" : "Draw!"}
              </p>
              <p style={{ color: "#555577", fontSize: "10px", margin: "0 0 7px 0" }}>
                {gameStatus === "checkmate" ? "Checkmate" : gameStatus === "stalemate" ? "Stalemate" : "Draw"}
              </p>
              <button onClick={resetGame} style={{ width: "100%", padding: "6px", borderRadius: "7px", background: "linear-gradient(135deg,#4444aa,#7c6fff)", border: "none", color: "#fff", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}>Play Again</button>
            </div>
          )}

          {/* Turn */}
          {!isGameOver && (
            <div style={{ background: "#111111", border: gameRef.current.turn() === "w" ? "1.5px solid #00e5aa" : "1px solid #1e1e2e", borderRadius: "11px", padding: "11px", textAlign: "center" }}>
              <p style={{ color: "#555577", fontSize: "10px", margin: "0 0 3px 0" }}>Turn</p>
              <p style={{ fontSize: "11px", fontWeight: "700", margin: 0, color: gameRef.current.turn() === "w" ? "#00e5aa" : "#7777aa" }}>
                {gameRef.current.turn() === "w" ? "♔ Your Move" : "♚ AI Move"}
              </p>
            </div>
          )}

          {/* You */}
          <div style={{ background: "#111111", border: gameRef.current.turn() === "w" && !isGameOver ? "1.5px solid #00e5aa" : "1px solid #1e1e2e", borderRadius: "11px", padding: "11px", textAlign: "center" }}>
            <div style={{ fontSize: "26px", marginBottom: "3px" }}>👤</div>
            <p style={{ color: "#fff", fontSize: "12px", fontWeight: "700", margin: "0 0 2px 0" }}>You</p>
            <p style={{ color: "#555577", fontSize: "11px", margin: "0 0 3px 0" }}>White ♙</p>
            <p style={{ color: "#555577", fontSize: "12px", fontFamily: "monospace", margin: 0 }}>{formatTime(timePlayer)}</p>
            {capturedByPlayer.length > 0 && (
              <p style={{ color: "#00e5aa", fontSize: "10px", marginTop: "5px", wordBreak: "break-all" }}>
                {capturedByPlayer.map((p) => PIECE_EMOJI[p]).join(" ")}
              </p>
            )}
            {score.diff > 0 && <p style={{ color: "#00e5aa", fontSize: "10px", fontWeight: "700", margin: "3px 0 0 0" }}>+{score.diff}</p>}
          </div>
        </div>

        {/* BOARD */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div ref={boardContainerRef} style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px #1e1e2e" }}>
            <Chessboard
  position={fen}
  onPieceDrop={onPieceDrop}
  onSquareClick={onSquareClick}
  boardOrientation="white"
  isDraggablePiece={({ piece }) => piece[0] === 'w'}
              customSquareStyles={getSquareStyles()}
              boardWidth={boardWidth}
              customDarkSquareStyle={{ backgroundColor: "#2a2a45" }}
              customLightSquareStyle={{ backgroundColor: "#454570" }}
              animationDuration={120}
              areArrowsAllowed={false}
              snapToCursor={false}
            />
          </div>

          {/* Bottom bar */}
          <div style={{ display: "flex", gap: "6px", width: `${boardWidth}px` }}>
            {[
              { label: "Moves", value: moveCount, color: "#fff" },
              { label: "Material", value: score.diff > 0 ? `+${score.diff} You` : score.diff < 0 ? `+${Math.abs(score.diff)} AI` : "Even", color: score.diff > 0 ? "#00e5aa" : score.diff < 0 ? "#ff6b6b" : "#fff" },
              { label: "Status", value: gameStatus === "playing" ? "Playing" : gameStatus === "check" ? "Check!" : gameStatus === "checkmate" ? "Mate" : gameStatus === "stalemate" ? "Stale" : gameStatus === "draw" ? "Draw" : "—", color: gameStatus === "check" || gameStatus === "checkmate" ? "#ff6b6b" : "#00e5aa" },
            ].map((item) => (
              <div key={item.label} style={{ flex: 1, background: "#111111", border: "1px solid #1e1e2e", borderRadius: "7px", padding: "6px 10px", textAlign: "center" }}>
                <p style={{ color: "#555577", fontSize: "9px", margin: "0 0 1px 0", textTransform: "uppercase", letterSpacing: "1px" }}>{item.label}</p>
                <p style={{ color: item.color, fontSize: "12px", fontWeight: "700", margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MOVE HISTORY */}
        <div style={{ width: "140px", minWidth: "140px", background: "#111111", border: "1px solid #1e1e2e", borderRadius: "11px", overflow: "hidden" }}>
          <div style={{ padding: "10px 12px", borderBottom: "1px solid #1e1e2e" }}>
            <p style={{ color: "#555577", fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", margin: 0 }}>Moves</p>
          </div>
          <div ref={moveListRef} style={{ height: "360px", overflowY: "auto", padding: "6px 8px" }}>
            {moveHistory.length === 0
              ? <p style={{ color: "#333355", fontSize: "11px", textAlign: "center", marginTop: "20px" }}>No moves yet</p>
              : moveHistory.reduce((rows, move, i) => {
                  if (i % 2 === 0) {
                    rows.push(
                      <div key={i} style={{ display: "flex", gap: "3px", marginBottom: "2px", alignItems: "center" }}>
                        <span style={{ color: "#333355", fontSize: "9px", width: "14px", flexShrink: 0 }}>{Math.floor(i / 2) + 1}.</span>
                        <span style={{ flex: 1, padding: "2px 5px", borderRadius: "4px", fontSize: "10px", fontWeight: "600", background: "rgba(255,255,255,0.05)", color: "#ddddff", fontFamily: "monospace" }}>{move.san}</span>
                        {moveHistory[i + 1] && (
                          <span style={{ flex: 1, padding: "2px 5px", borderRadius: "4px", fontSize: "10px", fontWeight: "600", background: "rgba(124,111,255,0.1)", color: "#7c6fff", fontFamily: "monospace" }}>{moveHistory[i + 1].san}</span>
                        )}
                      </div>
                    );
                  }
                  return rows;
                }, [])
            }
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #2e2e50; border-radius: 3px; }
      `}</style>
    </div>
  );
}