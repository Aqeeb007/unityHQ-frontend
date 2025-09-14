import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import apiClient from "../api/client";
import { URLs } from "../api/urls";
import { useLogin } from "../features/auth/api/useLogin";
import { useSignup } from "../features/auth/api/useSignup";

// Types for auth inputs
type LoginInput = {
  email: string;
  password: string;
};

type SignupInput = {
  email: string;
  password: string;
  name?: string;
};

// Replace this with a proper User type if your API returns one
export type AuthUser = Record<string, unknown> | null;

type AuthContextType = {
  user: AuthUser;
  isAuthenticated: boolean;
  loading: boolean;
  // actions
  login: (values: LoginInput) => Promise<AuthUser | undefined>;
  signup: (values: SignupInput) => Promise<unknown>;
  logout: () => Promise<void>;
  // optional setters if you need manual control
  setUser: React.Dispatch<React.SetStateAction<AuthUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_KEY = {
  user: "auth_user",
  authed: "is_authenticated",
} as const;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrating, setHydrating] = useState(true);

  // Existing API hooks
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  // Hydrate auth state from localStorage (fallback when there's no /me endpoint)
  useEffect(() => {
    try {
      const authed = localStorage.getItem(LOCAL_KEY.authed);
      const savedUser = localStorage.getItem(LOCAL_KEY.user);
      if (authed === "true") setIsAuthenticated(true);
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {
      // ignore hydration errors
    } finally {
      setHydrating(false);
    }
    ``;
  }, []);

  const persist = useCallback((nextUser: AuthUser, authed: boolean) => {
    try {
      if (authed) {
        localStorage.setItem(LOCAL_KEY.authed, "true");
      } else {
        localStorage.removeItem(LOCAL_KEY.authed);
      }
      if (nextUser) {
        localStorage.setItem(LOCAL_KEY.user, JSON.stringify(nextUser));
      } else {
        localStorage.removeItem(LOCAL_KEY.user);
      }
    } catch {
      // storage can fail in private mode; ignore
    }
  }, []);

  const login = useCallback(
    async (values: LoginInput) => {
      const data = await loginMutation.mutateAsync(values);
      // Try to extract a user object if returned; otherwise store a boolean only
      const nextUser: AuthUser =
        (data as any)?.user ?? (data as any)?.data ?? null;
      setUser(nextUser);
      setIsAuthenticated(true);
      persist(nextUser, true);
      return nextUser;
    },
    [loginMutation, persist]
  );

  const signup = useCallback(
    async (values: SignupInput) => {
      // Generally signup does not authenticate by default; we return the server data
      const data = await signupMutation.mutateAsync(values);
      return data;
    },
    [signupMutation]
  );

  const logout = useCallback(async () => {
    try {
      await apiClient.post(URLs.auth.logout);
    } catch {
      // even if server fails, we still clear local state
    }
    setUser(null);
    setIsAuthenticated(false);
    persist(null, false);
  }, [persist]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated,
      loading: hydrating || loginMutation.isPending,
      login,
      signup,
      logout,
      setUser,
      setIsAuthenticated,
    }),
    [
      user,
      isAuthenticated,
      hydrating,
      loginMutation.isPending,
      login,
      signup,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export default AuthContext;
