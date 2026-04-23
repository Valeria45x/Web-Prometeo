import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { MOCK_USERS, MOCK_POSTS, MOCK_REPLIES } from "../data/comunidad";

const ComunidadContext = createContext(null);

const LS = {
  USER: "prom_user",
  POSTS: "prom_posts",
  REPLIES: "prom_replies",
};

function loadFromLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — silent fail
  }
}

export function ComunidadProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() =>
    loadFromLS(LS.USER, null),
  );
  const [posts, setPosts] = useState(() => loadFromLS(LS.POSTS, MOCK_POSTS));
  const [replies, setReplies] = useState(() =>
    loadFromLS(LS.REPLIES, MOCK_REPLIES),
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  // pendingEmail: while waiting for user to "confirm" simulated email
  const [pendingUser, setPendingUser] = useState(null);

  // Persist on change
  useEffect(() => {
    saveToLS(LS.USER, currentUser);
  }, [currentUser]);
  useEffect(() => {
    saveToLS(LS.POSTS, posts);
  }, [posts]);
  useEffect(() => {
    saveToLS(LS.REPLIES, replies);
  }, [replies]);

  // ── Auth actions ────────────────────────────────────────────────────────────

  /** Creates a new user and enters "awaiting email confirmation" state */
  const register = useCallback((displayName, handle, email) => {
    const newUser = {
      id: `u_${Date.now()}`,
      handle: handle.replace(/^@/, ""),
      displayName,
      email,
      role: "miembro",
      emailVerified: false,
      certifiedAt: null,
      joinedAt: new Date().toISOString(),
      savedPosts: [],
    };
    setPendingUser(newUser);
    return newUser;
  }, []);

  /** Simulates clicking the confirmation link in the email */
  const confirmEmail = useCallback(() => {
    if (!pendingUser) return;
    const verified = { ...pendingUser, emailVerified: true };
    setCurrentUser(verified);
    setPendingUser(null);
  }, [pendingUser]);

  /** Demo login: pick any existing mock user by handle */
  const login = useCallback((handle) => {
    const found = MOCK_USERS.find((u) => u.handle === handle);
    if (found) setCurrentUser(found);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(LS.USER);
  }, []);

  // ── Post actions ────────────────────────────────────────────────────────────

  const createPost = useCallback(
    (title, body, tags) => {
      if (!currentUser?.emailVerified) return null;
      const newPost = {
        id: `p_${Date.now()}`,
        title,
        body,
        authorId: currentUser.id,
        tags,
        createdAt: new Date().toISOString(),
        upvotes: 0,
        upvotedBy: [],
        isSolved: false,
        solvedReplyId: null,
        followerIds: [currentUser.id],
      };
      setPosts((prev) => [newPost, ...prev]);
      return newPost;
    },
    [currentUser],
  );

  const upvotePost = useCallback(
    (postId) => {
      if (!currentUser) return;
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p;
          const already = p.upvotedBy.includes(currentUser.id);
          return {
            ...p,
            upvotes: already ? p.upvotes - 1 : p.upvotes + 1,
            upvotedBy: already
              ? p.upvotedBy.filter((id) => id !== currentUser.id)
              : [...p.upvotedBy, currentUser.id],
          };
        }),
      );
    },
    [currentUser],
  );

  const followPost = useCallback(
    (postId) => {
      if (!currentUser) return;
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p;
          const already = p.followerIds.includes(currentUser.id);
          return {
            ...p,
            followerIds: already
              ? p.followerIds.filter((id) => id !== currentUser.id)
              : [...p.followerIds, currentUser.id],
          };
        }),
      );
    },
    [currentUser],
  );

  // ── Reply actions ────────────────────────────────────────────────────────────

  const createReply = useCallback(
    (postId, body) => {
      if (!currentUser?.emailVerified) return null;
      const newReply = {
        id: `r_${Date.now()}`,
        postId,
        body,
        authorId: currentUser.id,
        createdAt: new Date().toISOString(),
        upvotes: 0,
        upvotedBy: [],
        isSolution: false,
      };
      setReplies((prev) => [...prev, newReply]);
      return newReply;
    },
    [currentUser],
  );

  const upvoteReply = useCallback(
    (replyId) => {
      if (!currentUser) return;
      setReplies((prev) =>
        prev.map((r) => {
          if (r.id !== replyId) return r;
          const already = r.upvotedBy.includes(currentUser.id);
          return {
            ...r,
            upvotes: already ? r.upvotes - 1 : r.upvotes + 1,
            upvotedBy: already
              ? r.upvotedBy.filter((id) => id !== currentUser.id)
              : [...r.upvotedBy, currentUser.id],
          };
        }),
      );
    },
    [currentUser],
  );

  /** Only Prometeo Team can mark or unmark a solution */
  const markSolution = useCallback(
    (replyId, postId) => {
      if (currentUser?.role !== "prometeo_team") return;
      // Toggle: if this reply is already the solution, unmark it
      const isAlreadySolution = (prev) =>
        prev.find((r) => r.id === replyId)?.isSolution ?? false;
      setReplies((prev) => {
        const unmarking = isAlreadySolution(prev);
        return prev.map((r) => {
          if (r.postId !== postId) return r;
          if (unmarking) return { ...r, isSolution: false };
          return { ...r, isSolution: r.id === replyId };
        });
      });
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p;
          const unmarking = p.solvedReplyId === replyId;
          if (unmarking) return { ...p, isSolved: false, solvedReplyId: null };
          return { ...p, isSolved: true, solvedReplyId: replyId };
        }),
      );
    },
    [currentUser],
  );

  // ── Certification ────────────────────────────────────────────────────────────

  const certify = useCallback(() => {
    if (!currentUser || currentUser.role !== "miembro") return;
    const updated = {
      ...currentUser,
      role: "certificado",
      certifiedAt: new Date().toISOString(),
    };
    setCurrentUser(updated);
  }, [currentUser]);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const getUserById = useCallback(
    (id) => {
      if (!id) return null;
      // check if it's the current user first (they might have updated role)
      if (currentUser && currentUser.id === id) return currentUser;
      return MOCK_USERS.find((u) => u.id === id) || null;
    },
    [currentUser],
  );

  const getRepliesForPost = useCallback(
    (postId) => {
      return replies.filter((r) => r.postId === postId);
    },
    [replies],
  );

  return (
    <ComunidadContext.Provider
      value={{
        currentUser,
        posts,
        replies,
        showAuthModal,
        setShowAuthModal,
        showNewPost,
        setShowNewPost,
        pendingUser,
        // auth
        register,
        confirmEmail,
        login,
        logout,
        // posts
        createPost,
        followPost,
        // replies
        createReply,
        markSolution,
        // profile
        certify,
        // helpers
        getUserById,
        getRepliesForPost,
      }}
    >
      {children}
    </ComunidadContext.Provider>
  );
}

export function useComunidad() {
  const ctx = useContext(ComunidadContext);
  if (!ctx)
    throw new Error("useComunidad must be used inside ComunidadProvider");
  return ctx;
}
