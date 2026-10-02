// pages/community.jsx

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Community() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState({}); // { postId: { commentId, userName } }

  useEffect(() => {
    const userData = localStorage.getItem("raxx_user");
    if (!userData) {
      router.push("/login");
      return;
    }
    const parsed = JSON.parse(userData);
    setUser(parsed);
    fetchPosts();
    fetchNotifications(parsed.id);
  }, []);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE}/community/posts`);
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // Fetch notifications
  const fetchNotifications = async (userId) => {
    try {
      const res = await fetch(
        `${API_BASE}/community/notifications/${userId}`
      );
      const data = await res.json();
      if (data.success) setNotifications(data.notifications);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // Create new post
  const handlePost = async () => {
    if (!newPost.trim()) return;
    setPostLoading(true);
    try {
      const res = await fetch(`${API_BASE}/community/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, content: newPost }),
      });
      const data = await res.json();
      if (data.success) {
        setNewPost("");
        fetchPosts();
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
    setPostLoading(false);
  };

  // Toggle like
  const handleLike = async (postId) => {
    try {
      await fetch(`${API_BASE}/community/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, post_id: postId }),
      });
      fetchPosts();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // Toggle comments section
  const toggleComments = async (postId) => {
    const isExpanded = expandedComments[postId];
    setExpandedComments((prev) => ({ ...prev, [postId]: !isExpanded }));

    if (!isExpanded) {
      try {
        const res = await fetch(
          `${API_BASE}/community/comments/${postId}`
        );
        const data = await res.json();
        if (data.success) {
          setComments((prev) => ({ ...prev, [postId]: data.comments }));
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }
  };

  // Add comment
  const handleComment = async (postId) => {
    if (!newComment[postId]?.trim()) return;
    try {
      await fetch(`${API_BASE}/community/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          post_id: postId,
          content: newComment[postId],
          parent_comment_id: replyingTo[postId]?.commentId || null,
        }),
      });
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      setReplyingTo((prev) => ({ ...prev, [postId]: null }));
      // Refresh comments
      const res = await fetch(
        `${API_BASE}/community/comments/${postId}`
      );
      const data = await res.json();
      if (data.success) {
        setComments((prev) => ({ ...prev, [postId]: data.comments }));
      }
      fetchPosts();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // Mark notifications as read
  const handleOpenNotifications = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && notifications.length > 0) {
      await fetch(`${API_BASE}/community/notifications/read`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });
      setNotifications([]);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Head>
        <title>Community — RAXX AI</title>
      </Head>

      <div className="min-h-screen bg-[#09110c] text-[#d4e8db] flex justify-center selection:bg-[#b8523b]/30 font-sans">
        {/* Mobile App Container (RAXX Styled) */}
        <div className="w-full max-w-md bg-[#0d1712] min-h-screen flex flex-col border-x border-[#17271e] shadow-2xl relative">
          
          {/* RAXX Mobile Top Navigation Bar */}
          <header className="sticky top-0 z-40 bg-[#0d1712]/95 backdrop-blur-lg border-b border-[#182a1f] px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* RAXX Brand Badge */}
              <div className="w-8 h-8 rounded-xl bg-[#b8523b] text-white flex items-center justify-center font-black text-sm shadow-md shadow-[#4a1c12]/40">
                R
              </div>
              <div>
                <h1 className="text-white font-bold text-sm tracking-wide">
                  RAXX Community
                </h1>
                <p className="text-[#5b8067] text-[10px]">
                  Connect & Learn Together
                </p>
              </div>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={handleOpenNotifications}
                className="relative w-9 h-9 rounded-xl bg-[#132219] border border-[#1e3827] hover:bg-[#192e22] flex items-center justify-center transition active:scale-90"
                aria-label="Notifications"
              >
                <span className="text-base">🔔</span>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b8523b] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-[#122219] border border-[#1e3a27] rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-3 border-b border-[#1b3524] bg-[#0c1811]">
                    <p className="text-xs font-bold text-[#f0ad73]">
                      Notifications
                    </p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-[#5c7f68] text-xs p-4 text-center">
                        No new notifications
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-3 border-b border-[#182e20] hover:bg-[#172c20] transition"
                        >
                          <p className="text-xs text-[#d4e8db]">
                            <span className="text-[#f0ad73] font-semibold">
                              {n.users?.name}
                            </span>
                            {n.type === "like"
                              ? " liked your post"
                              : n.type === "reply"
                              ? " replied to your comment"
                              : " commented on your post"}
                          </p>
                          <p className="text-[10px] text-[#557861] mt-1 font-mono">
                            {formatTime(n.created_at)}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Main Scrollable Feed */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            
            {/* Create Post Box */}
            <div className="bg-[#122018] border border-[#1c3225] rounded-3xl p-4 shadow-lg space-y-3">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share a doubt, thought, or study note... 📚"
                className="w-full bg-[#09120d] text-white placeholder-[#3e5e48] resize-none outline-none text-xs sm:text-sm min-h-[85px] p-3 rounded-2xl border border-[#172b1f] focus:border-[#b8523b] transition"
                maxLength={500}
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-[#587a63]">
                  {newPost.length}/500
                </span>
                <button
                  onClick={handlePost}
                  disabled={postLoading || !newPost.trim()}
                  className="bg-[#b8523b] hover:bg-[#c95a41] disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl text-xs font-bold transition active:scale-95 shadow-md shadow-[#4a1c12]/50 flex items-center gap-1 uppercase tracking-wider"
                >
                  {postLoading ? "Posting..." : "Post 🚀"}
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            {posts.length === 0 ? (
              <div className="text-center py-12 bg-[#122018] border border-[#1c3225] rounded-3xl p-6 space-y-2">
                <div className="text-3xl">🌱</div>
                <p className="text-[#658a70] text-xs">
                  No community posts yet. Be the first to share!
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#122018] border border-[#1c3225] rounded-3xl p-4 shadow-lg space-y-3"
                >
                  {/* Post Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#b8523b] text-white font-bold flex items-center justify-center text-xs shadow-md shadow-[#4a1c12]/30 shrink-0">
                      {post.users?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">
                        {post.users?.name || "Student"}
                      </p>
                      <p className="text-[10px] text-[#557861] font-mono">
                        {formatTime(post.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-[#d4e8db] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap px-0.5">
                    {post.content}
                  </p>

                  {/* Action Buttons Bar */}
                  <div className="flex items-center gap-4 border-t border-[#1a3023] pt-2.5">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 text-[#7ea38a] hover:text-[#f0ad73] transition text-xs font-medium active:scale-95"
                    >
                      <span>👍</span>
                      <span>
                        {post.community_likes?.[0]?.count || 0} Likes
                      </span>
                    </button>

                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1.5 text-[#7ea38a] hover:text-[#f0ad73] transition text-xs font-medium active:scale-95"
                    >
                      <span>💬</span>
                      <span>
                        {post.community_comments?.[0]?.count || 0} Comments
                      </span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {expandedComments[post.id] && (
                    <div className="mt-3 border-t border-[#1a3023] pt-3 space-y-3">
                      {/* Comments Feed — top-level comments + nested replies */}
                      <div className="space-y-3">
                        {(comments[post.id] || []).filter((c) => !c.parent_comment_id).length === 0 ? (
                          <p className="text-[#557861] text-[11px] text-center py-2">
                            No comments yet. Start the conversation!
                          </p>
                        ) : (
                          (comments[post.id] || [])
                            .filter((c) => !c.parent_comment_id)
                            .map((c) => {
                              const replies = (comments[post.id] || []).filter(
                                (r) => r.parent_comment_id === c.id
                              );
                              return (
                                <div key={c.id}>
                                  {/* Top-level comment */}
                                  <div className="flex gap-2.5">
                                    <div className="w-6 h-6 rounded-lg bg-[#1a2f23] text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                                      {c.users?.name?.charAt(0).toUpperCase() || "?"}
                                    </div>
                                    <div className="flex-1">
                                      <div className="bg-[#09120d] border border-[#162c1f] rounded-2xl p-2.5">
                                        <p className="text-[11px] font-bold text-[#f0ad73]">
                                          {c.users?.name || "Student"}
                                        </p>
                                        <p className="text-xs text-[#d4e8db] mt-0.5">
                                          {c.content}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-3 mt-1 px-1">
                                        <p className="text-[9px] text-[#4d6d56] font-mono">
                                          {formatTime(c.created_at)}
                                        </p>
                                        <button
                                          onClick={() =>
                                            setReplyingTo((prev) => ({
                                              ...prev,
                                              [post.id]: { commentId: c.id, userName: c.users?.name || "Student" },
                                            }))
                                          }
                                          className="text-[10px] font-bold text-[#7ea38a] hover:text-[#f0ad73] transition"
                                        >
                                          Reply
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Nested replies — thoda indent karke dikhate hain */}
                                  {replies.length > 0 && (
                                    <div className="ml-8 mt-2 space-y-2 border-l border-[#1a3023] pl-3">
                                      {replies.map((r) => (
                                        <div key={r.id} className="flex gap-2">
                                          <div className="w-5 h-5 rounded-lg bg-[#1a2f23] text-emerald-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                                            {r.users?.name?.charAt(0).toUpperCase() || "?"}
                                          </div>
                                          <div className="flex-1">
                                            <div className="bg-[#09120d] border border-[#162c1f] rounded-2xl p-2.5">
                                              <p className="text-[10px] font-bold text-[#f0ad73]">
                                                {r.users?.name || "Student"}
                                              </p>
                                              <p className="text-[11px] text-[#d4e8db] mt-0.5">
                                                {r.content}
                                              </p>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 px-1">
                                              <p className="text-[9px] text-[#4d6d56] font-mono">
                                                {formatTime(r.created_at)}
                                              </p>
                                              <button
                                                onClick={() =>
                                                  setReplyingTo((prev) => ({
                                                    ...prev,
                                                    [post.id]: { commentId: c.id, userName: r.users?.name || "Student" },
                                                  }))
                                                }
                                                className="text-[10px] font-bold text-[#7ea38a] hover:text-[#f0ad73] transition"
                                              >
                                                Reply
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                        )}
                      </div>

                      {/* Replying-to indicator */}
                      {replyingTo[post.id] && (
                        <div className="flex items-center justify-between bg-[#132219] border border-[#1e3827] rounded-xl px-3 py-1.5">
                          <span className="text-[10px] text-[#7ea38a]">
                            Replying to <span className="font-bold text-[#f0ad73]">{replyingTo[post.id].userName}</span>
                          </span>
                          <button
                            onClick={() => setReplyingTo((prev) => ({ ...prev, [post.id]: null }))}
                            className="text-[#5b8067] hover:text-white text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      {/* Add Comment / Reply Bar */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newComment[post.id] || ""}
                          onChange={(e) =>
                            setNewComment((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleComment(post.id)
                          }
                          placeholder={replyingTo[post.id] ? `Reply to ${replyingTo[post.id].userName}...` : "Write a comment..."}
                          className="flex-1 bg-[#09120d] border border-[#172d20] rounded-xl px-3 py-2 text-xs text-white placeholder-[#3b5944] outline-none focus:border-[#b8523b] transition"
                        />
                        <button
                          onClick={() => handleComment(post.id)}
                          className="bg-[#b8523b] hover:bg-[#c95a41] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition active:scale-95 shadow-md"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}