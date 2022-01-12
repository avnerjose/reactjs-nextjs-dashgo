import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/apiClient";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SessionApiResponse = {
  token: string;
  refreshToken: string;
  permissions: string[];
  roles: string[];
  email: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  user: User;
  isAuthenticated: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, "@dashgo:token");
  destroyCookie(undefined, "@dashgo:refreshToken");

  authChannel.postMessage("signOut");

  Router.push("/");
}

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          Router.push("/");
          break;
        case "signIn":
          Router.push("/dashboard");
          break;
        default:
          break;
      }
      authChannel.close();
    };
  }, []);

  useEffect(() => {
    const { "@dashgo:token": token } = parseCookies();

    if (token) {
      api
        .get<SessionApiResponse>("/me")
        .then(
          ({ data: { token, refreshToken, roles, permissions, email } }) => {
            setUser({ email, permissions, roles });
          }
        )
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const {
        data: { token, refreshToken, roles, permissions },
      } = await api.post<SessionApiResponse>("sessions", { email, password });

      setCookie(undefined, "@dashgo:token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "@dashgo:refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        email,
        roles,
        permissions,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Router.push("/dashboard");
      authChannel.postMessage("signIn");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
