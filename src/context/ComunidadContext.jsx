import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MOCK_USERS, MOCK_POSTS, MOCK_REPLIES } from "../data/comunidad";

const ComunidadContext = createContext(null);

const LS = {
  USERS: "prom_users",
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

function loadArrayFromLS(key, fallback) {
  const value = loadFromLS(key, fallback);
  return Array.isArray(value) ? value : fallback;
}

function loadObjectFromLS(key, fallback) {
  const value = loadFromLS(key, fallback);
  return value && typeof value === "object" && !Array.isArray(value)
    ? value
    : fallback;
}

function saveToLS(key, value) {
  try {
    if (value === null) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage might be full or unavailable in some browsers.
  }
}

function mergeUsers(storedUsers = []) {
  if (!Array.isArray(storedUsers)) {
    return [...MOCK_USERS];
  }

  const usersById = new Map(MOCK_USERS.map((user) => [user.id, user]));

  storedUsers.forEach((user) => {
    if (!user?.id) return;
    usersById.set(user.id, { ...usersById.get(user.id), ...user });
  });

  return [...usersById.values()];
}

function upsertUser(users, nextUser) {
  const existingIndex = users.findIndex((user) => user.id === nextUser.id);

  if (existingIndex === -1) {
    return [nextUser, ...users];
  }

  return users.map((user) => (user.id === nextUser.id ? nextUser : user));
}

export function ComunidadProvider({ children }) {
  const [users, setUsers] = useState(() =>
    mergeUsers(loadArrayFromLS(LS.USERS, [])),
  );
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = loadObjectFromLS(LS.USER, null);
    if (!storedUser) return null;

    return (
      mergeUsers(loadArrayFromLS(LS.USERS, [])).find(
        (user) => user.id === storedUser.id,
      ) ?? storedUser
    );
  });
  const [posts, setPosts] = useState(() =>
    loadArrayFromLS(LS.POSTS, MOCK_POSTS),
  );
  const [replies, setReplies] = useState(() =>
    loadArrayFromLS(LS.REPLIES, MOCK_REPLIES),
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  useEffect(() => {
    saveToLS(LS.USERS, users);
  }, [users]);

  useEffect(() => {
    saveToLS(LS.USER, currentUser);
  }, [currentUser]);

  useEffect(() => {
    saveToLS(LS.POSTS, posts);
  }, [posts]);

  useEffect(() => {
    saveToLS(LS.REPLIES, replies);
  }, [replies]);

  const register = useCallback(
    (displayName, handle, email) => {
      const normalizedHandle = handle.replace(/^@/, "").trim();
      const normalizedEmail = email.trim().toLowerCase();

      if (
        users.some(
          (user) => user.handle.toLowerCase() === normalizedHandle.toLowerCase(),
        )
      ) {
        return { ok: false, error: "Ese handle ya existe." };
      }

      if (
        users.some(
          (user) => user.email?.toLowerCase() === normalizedEmail,
        )
      ) {
        return { ok: false, error: "Ese email ya está en uso." };
      }

      const newUser = {
        id: `u_${Date.now()}`,
        handle: normalizedHandle,
        displayName: displayName.trim(),
        email: normalizedEmail,
        role: "miembro",
        emailVerified: false,
        certifiedAt: null,
        joinedAt: new Date().toISOString(),
        savedPosts: [],
      };

      setPendingUser(newUser);
      setUsers((currentUsers) => upsertUser(currentUsers, newUser));

      return { ok: true, user: newUser };
    },
    [users],
  );

  const confirmEmail = useCallback(() => {
    if (!pendingUser) return null;

    const verifiedUser = { ...pendingUser, emailVerified: true };
    setUsers((currentUsers) => upsertUser(currentUsers, verifiedUser));
    setCurrentUser(verifiedUser);
    setPendingUser(null);

    return verifiedUser;
  }, [pendingUser]);

  const login = useCallback(
    (handle) => {
      const normalizedHandle = handle.replace(/^@/, "").trim().toLowerCase();
      const foundUser = users.find(
        (user) => user.handle.toLowerCase() === normalizedHandle,
      );

      if (foundUser) {
        setCurrentUser(foundUser);
      }

      return foundUser ?? null;
    },
    [users],
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

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
        isSolved: false,
        solvedReplyId: null,
        followerIds: [currentUser.id],
      };

      setPosts((currentPosts) => [newPost, ...currentPosts]);
      return newPost;
    },
    [currentUser],
  );

  const followPost = useCallback(
    (postId) => {
      if (!currentUser) return;

      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id !== postId) return post;

          const isFollowing = post.followerIds.includes(currentUser.id);

          return {
            ...post,
            followerIds: isFollowing
              ? post.followerIds.filter((id) => id !== currentUser.id)
              : [...post.followerIds, currentUser.id],
          };
        }),
      );
    },
    [currentUser],
  );

  const createReply = useCallback(
    (postId, body) => {
      if (!currentUser?.emailVerified) return null;

      const newReply = {
        id: `r_${Date.now()}`,
        postId,
        body,
        authorId: currentUser.id,
        createdAt: new Date().toISOString(),
        isSolution: false,
      };

      setReplies((currentReplies) => [...currentReplies, newReply]);
      return newReply;
    },
    [currentUser],
  );

  const markSolution = useCallback(
    (replyId, postId) => {
      if (currentUser?.role !== "prometeo_team") return;

      setReplies((currentReplies) => {
        const shouldUnmark =
          currentReplies.find((reply) => reply.id === replyId)?.isSolution ??
          false;

        return currentReplies.map((reply) => {
          if (reply.postId !== postId) return reply;
          if (shouldUnmark) return { ...reply, isSolution: false };
          return { ...reply, isSolution: reply.id === replyId };
        });
      });

      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id !== postId) return post;

          const shouldUnmark = post.solvedReplyId === replyId;
          if (shouldUnmark) {
            return { ...post, isSolved: false, solvedReplyId: null };
          }

          return { ...post, isSolved: true, solvedReplyId: replyId };
        }),
      );
    },
    [currentUser],
  );

  const certify = useCallback(() => {
    if (!currentUser || currentUser.role !== "miembro") return;

    const updatedUser = {
      ...currentUser,
      role: "certificado",
      certifiedAt: new Date().toISOString(),
    };

    setCurrentUser(updatedUser);
    setUsers((currentUsers) => upsertUser(currentUsers, updatedUser));
  }, [currentUser]);

  const usersById = useMemo(
    () => new Map(users.map((user) => [user.id, user])),
    [users],
  );

  const getUserById = useCallback(
    (id) => {
      if (!id) return null;
      return usersById.get(id) ?? null;
    },
    [usersById],
  );

  const getRepliesForPost = useCallback(
    (postId) => replies.filter((reply) => reply.postId === postId),
    [replies],
  );

  const value = useMemo(
    () => ({
      users,
      currentUser,
      posts,
      replies,
      showAuthModal,
      setShowAuthModal,
      pendingUser,
      register,
      confirmEmail,
      login,
      logout,
      createPost,
      followPost,
      createReply,
      markSolution,
      certify,
      getUserById,
      getRepliesForPost,
    }),
    [
      users,
      currentUser,
      posts,
      replies,
      showAuthModal,
      pendingUser,
      register,
      confirmEmail,
      login,
      logout,
      createPost,
      followPost,
      createReply,
      markSolution,
      certify,
      getUserById,
      getRepliesForPost,
    ],
  );

  return (
    <ComunidadContext.Provider value={value}>
      {children}
    </ComunidadContext.Provider>
  );
}

export function useComunidad() {
  const context = useContext(ComunidadContext);

  if (!context) {
    throw new Error("useComunidad must be used inside ComunidadProvider");
  }

  return context;
}
