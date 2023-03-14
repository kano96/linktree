import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";

import style from "./LoginView.module.css";

const LoginView = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("");

  const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  };

  const signInWithGoogle = async (googleProvider) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
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
      <div className={style.loginView}>
        <h1>Link Tree</h1>
        <button className={style.provider} onClick={handleOnClick}>
          Login with Google
        </button>
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
