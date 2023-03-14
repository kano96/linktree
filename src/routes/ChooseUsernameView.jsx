import { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { existsUsername, updateUser } from "../firebase/firebase";

import style from "./ChooseUsername.module.css";

const ChooseUsernameView = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Loading");
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");
  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };
  const handleUserNotRegistered = (user) => {
    setCurrentUser(user);
    setCurrentState("NOT_REGISTERED");
  };
  const hanldeUserNotLoggedIn = () => {
    navigate("/login");
  };
  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleContinue = async () => {
    if (username) {
      const usernameExists = await existsUsername(username);
      if (usernameExists) {
        setCurrentState("USERNAME_TAKEN");
      } else {
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;

        await updateUser(tmp);
        setCurrentState("COMPLETED");
      }
    }
  };

  if (["NOT_REGISTERED", "USERNAME_TAKEN"].includes(currentState)) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>

        {currentState === "USERNAME_TAKEN" && (
          <p>El nombre de usuario ya existe, escoge otro</p>
        )}
        <div>
          <input className="input" type="text" onChange={handleInputUsername} />
        </div>
        <div>
          <button className="btn" onClick={handleContinue}>
            Continuar
          </button>
        </div>
      </div>
    );
  }

  if (currentState === "COMPLETED") {
    return (
      <div className={style.chooseUsernameContainer}>
        <h2>Felicidades! Ya puedes crear tus links</h2>
        <Link to="/dashboard">Continuar</Link>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={hanldeUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      Loading...
    </AuthProvider>
  );
};

export default ChooseUsernameView;
