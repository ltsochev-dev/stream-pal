import {
  type FC,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: { uid: string; name: string; avatarUrl: string } | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(JWT_NAME);

    if (storedToken) {
      try {
        const decodedToken = JSON.parse(storedToken);

        setUser({
          uid: decodedToken.uid,
          name: decodedToken.name,
          avatarUrl: decodedToken.avatarUrl,
        });

        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error parsing token: ", err);
      }
    }

    setLoading(false);
  }, []);

  const login = (token: string, refreshToken: string) => {
    try {
      const decodedToken = JSON.parse(token);

      setUser({
        uid: decodedToken.uid,
        name: decodedToken.name,
        avatarUrl: decodedToken.avatarUrl,
      });

      setIsAuthenticated(true);

      localStorage.setItem(JWT_NAME, token);
      localStorage.setItem(JWT_REFRESH_NAME, refreshToken);
    } catch (err) {
      console.error("Error parsing token:", err);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(JWT_NAME);
    localStorage.removeItem(JWT_REFRESH_NAME);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const JWT_NAME = "streampal-jwt-sess" as const;
export const JWT_REFRESH_NAME = "streampal-jwt-refresh" as const;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
