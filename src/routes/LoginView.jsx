import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";

const LoginView = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Loading");

  const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  };

  const signInWithGoogle = async (googleProvider) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserLoggedIn = () => {
    navigate("/dashboard");
  };
  const handleUserNotRegistered = () => {
    navigate("/choose-username");
  };
  const hanldeUserNotLoggedIn = () => {
    setCurrentState("NOT_AUTHENTICATED");
  };

  if (currentState === "NOT_AUTHENTICATED") {
    return (
      <div>
        <button onClick={handleOnClick}>Login with Google</button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={hanldeUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
};

export default LoginView;
