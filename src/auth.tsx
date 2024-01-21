import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

export const login = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    if (user) return true;
  } catch (error: any) {
    console.log("Failed to login: ", error.message);
  }
  return false;
};

type AuthProps = {
  children?: ReactNode;
};

export const AuthContext = createContext({
  currentUser: {} as User | null,
  setCurrentUser: (user: User) => {},
  logOut: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [setCurrentUser]);

  const logOut = () => {
    signOut(auth);
    setCurrentUser(null);
    navigate("/");
  };

  const value = {
    currentUser,
    setCurrentUser,
    logOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useContext(AuthContext);
  let location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
